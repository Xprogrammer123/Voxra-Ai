import { ai } from "@/lib/google";
import { db } from "@/lib/db";
import { videos } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const taskId = searchParams.get("taskId");

        if (!taskId) return Response.json({ error: "Missing taskId" }, { status: 400 });

        const [video] = await db.select().from(videos).where(eq(videos.id, taskId));

        if (!video) return Response.json({ error: "Not found" }, { status: 404 });
        if (video.userId !== session.user.id) return Response.json({ error: "Forbidden" }, { status: 403 });

        // If already done or failed, return immediately
        if (video.status === "done" || video.status === "failed") {
            return Response.json({
                status: video.status,
                phase: video.phase,
                progress: video.progress ?? 0,
                output: video.outputUrls ?? null,
            });
        }

        // If we have an operation name, poll Veo 3
        if (video.runwayTaskId) {
            let operation = await ai.operations.getVideosOperation({
                operation: { name: video.runwayTaskId },
            });

            if (operation.done) {
                const generatedVideo = operation.response?.generatedVideos?.[0];
                const videoUri = generatedVideo?.video?.uri;

                if (!videoUri) {
                    await db.update(videos)
                        .set({ status: "failed", phase: "failed" })
                        .where(eq(videos.id, taskId));

                    return Response.json({ status: "failed", phase: "failed", progress: 0, output: null });
                }

                // Build output URLs — same video for all formats for now
                const outputUrls = {
                    "9:16": videoUri,
                    "16:9": videoUri,
                    "1:1":  videoUri,
                };

                await db.update(videos)
                    .set({
                        status: "done",
                        phase: "done",
                        progress: 100,
                        outputUrls,
                    })
                    .where(eq(videos.id, taskId));

                return Response.json({
                    status: "done",
                    phase: "done",
                    progress: 100,
                    output: outputUrls,
                });
            }

            // Still processing — bump progress incrementally
            const newProgress = Math.min((video.progress ?? 30) + 10, 90);
            await db.update(videos)
                .set({ progress: newProgress })
                .where(eq(videos.id, taskId));

            return Response.json({
                status: "processing",
                phase: video.phase,
                progress: newProgress,
                output: null,
            });
        }

        // Fallback — just return current DB state
        return Response.json({
            status: video.status,
            phase: video.phase,
            progress: video.progress ?? 0,
            output: video.outputUrls ?? null,
        });

    } catch (err: any) {
        console.error("Poll error:", err);
        return Response.json({ error: "Internal error" }, { status: 500 });
    }
}