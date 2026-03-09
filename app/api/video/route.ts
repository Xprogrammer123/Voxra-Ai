import { ai } from "@/lib/google";
import { db } from "@/lib/db";
import { videos } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { videoId, scriptText, platform, format } = body;

        if (!videoId || !scriptText) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Build a prompt that includes platform/format context
        const aspectRatio = format === "16:9" ? "16:9" : format === "1:1" ? "1:1" : "9:16";
        const prompt = `Create a faceless video for ${platform ?? "social media"} with the following narration script. 
Include natural voiceover matching the script text. Use engaging visuals relevant to the topic.
Aspect ratio: ${aspectRatio}.

Script:
${scriptText}`;

        // Kick off Veo 3 generation
        const operation = await ai.models.generateVideos({
            model: "veo-3.1-generate-preview",
            prompt,
            config: {
                aspectRatio,
                durationSeconds: 8,
            },
        });

        const operationName = operation.name;

        if (!operationName) {
            throw new Error("Veo 3 did not return an operation name");
        }

        // Save operation name so poll route can track it
        await db.update(videos)
            .set({
                runwayTaskId: operationName, // reusing this column for the Veo operation name
                phase: "footage",
                progress: 30,
                status: "processing",
            })
            .where(eq(videos.id, videoId));

        return Response.json({ success: true, operationName });
    } catch (err: any) {
        console.error("Video Gen error:", err);

        await db.update(videos)
            .set({ status: "failed", phase: "failed" })
            .where(eq(videos.id, body?.videoId));

        return Response.json({ error: err.message || "Internal error" }, { status: 500 });
    }
}