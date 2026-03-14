import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { videos } from "@/lib/schema";
import { ai } from "@/lib/google";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const taskId = req.nextUrl.searchParams.get("taskId");
        if (!taskId) {
            return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
        }

        // Get video record
        const [video] = await db
            .select()
            .from(videos)
            .where(eq(videos.id, taskId))
            .limit(1);

        if (!video) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }

        // If already done or failed, return current state
        if (video.status === "done" || video.status === "failed") {
            return NextResponse.json({
                status: video.status,
                phase: video.phase,
                progress: video.progress,
                outputUrls: video.outputUrls,
            });
        }

        // No operation name means something went wrong at generation time
        if (!video.runwayTaskId) {
            await db.update(videos)
                .set({ status: "failed", phase: "footage" })
                .where(eq(videos.id, taskId));

            return NextResponse.json({ status: "failed", phase: "footage", progress: 0 });
        }

        // --- START MOCK SIMULATION ---
        if (video.runwayTaskId.startsWith("mock-veo-job-")) {
            // Fake a delay based on the timestamp in the ID (if they've been waiting 15 seconds, finish it)
            const timestampStr = video.runwayTaskId.split("-").pop() || "0";
            const startedAt = parseInt(timestampStr, 10);
            const elapsed = Date.now() - startedAt;

            if (elapsed < 15000) {
                // Still "processing"
                const newProgress = Math.min((video.progress ?? 10) + 15, 85);
                await db.update(videos).set({ progress: newProgress }).where(eq(videos.id, taskId));
                return NextResponse.json({ status: "processing", phase: "footage", progress: newProgress });
            } else {
                // "Done" — output a dummy video
                const dummyVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
                const outputUrls = { [video.platform ?? "9:16"]: dummyVideoUrl };
                const subtitles = generateSubtitles(video.scriptText);

                await db.update(videos)
                    .set({
                        status: "done",
                        phase: "done",
                        progress: 100,
                        outputUrls,
                        subtitlesJson: subtitles,
                    })
                    .where(eq(videos.id, taskId));

                return NextResponse.json({ status: "done", phase: "done", progress: 100, outputUrls });
            }
        }
        // --- END MOCK SIMULATION ---

        // Poll actual Veo operation
        const operation = await ai.operations.getVideosOperation({
            operation: { name: video.runwayTaskId } as any,
        });

        // Still running
        if (!operation.done) {
            // Bump progress slightly each poll to show activity
            const newProgress = Math.min((video.progress ?? 10) + 5, 85);
            await db.update(videos)
                .set({ progress: newProgress })
                .where(eq(videos.id, taskId));

            return NextResponse.json({
                status: "processing",
                phase: "footage",
                progress: newProgress,
            });
        }

        // Done — extract video URL
        const generatedVideos = operation.response?.generatedVideos;
        if (!generatedVideos || generatedVideos.length === 0) {
            await db.update(videos)
                .set({ status: "failed", phase: "footage" })
                .where(eq(videos.id, taskId));

            return NextResponse.json({ status: "failed", phase: "footage", progress: 0 });
        }

        const videoUri = generatedVideos[0].video?.uri;
        if (!videoUri) {
            await db.update(videos)
                .set({ status: "failed", phase: "footage" })
                .where(eq(videos.id, taskId));

            return NextResponse.json({ status: "failed", phase: "footage", progress: 0 });
        }

        // Generate subtitles from script (simple word-timing approach)
        const subtitles = generateSubtitles(video.scriptText);

        // Save everything
        const outputUrls = { [video.platform ?? "9:16"]: videoUri };

        await db.update(videos)
            .set({
                status: "done",
                phase: "done",
                progress: 100,
                outputUrls,
                subtitlesJson: subtitles,
            })
            .where(eq(videos.id, taskId));

        return NextResponse.json({
            status: "done",
            phase: "done",
            progress: 100,
            outputUrls,
        });

    } catch (err: any) {
        console.error("[/api/poll]", err);
        return NextResponse.json({ error: err.message ?? "Poll failed" }, { status: 500 });
    }
}

// Simple subtitle generator — splits script into ~5-word chunks at 2.5 words/sec
function generateSubtitles(script: string) {
    const words = script.trim().split(/\s+/);
    const CHUNK = 5;
    const WPS = 2.5;
    const subs = [];

    for (let i = 0; i < words.length; i += CHUNK) {
        const chunk = words.slice(i, i + CHUNK).join(" ");
        const start = (i / WPS);
        const end = ((i + CHUNK) / WPS);
        subs.push({ id: subs.length + 1, start, end, text: chunk });
    }

    return subs;
}