import { db } from "@/lib/db";
import { videos } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { projectId, scriptText, voiceId, musicId, stylePreset, platform, format } = body;

        // 1. Insert initial video record into DB
        const [video] = await db.insert(videos).values({
            userId: session.user.id,
            projectId,
            scriptText,
            voiceId,
            musicId,
            stylePreset,
            status: "processing",
            platform,
            phase: "tts",
            progress: 0,
        }).returning();

        // 2. Kick off background generation pipeline
        // In a real production app we'd use a queue (Inngest, Trigger.dev, etc).
        // For this hackathon, we'll simulate the orchestrator by hitting our own internal endpoints without awaiting them,
        // or by letting the client poll through the steps.
        // For maximum reliability over serverless functions that time out, we'll let the client coordinate the steps.
        // So this endpoint just creates the db record and returns the ID.

        return Response.json({ taskId: video.id });
    } catch (err: any) {
        console.error("Generate error:", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
