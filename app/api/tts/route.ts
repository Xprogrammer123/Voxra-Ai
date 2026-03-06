import { generateSpeech } from "@/lib/elevenlabs";
import { db } from "@/lib/db";
import { videos } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
// In a real app we'd use uploadthing or S3 here. 
// For this prototype, we'll assume we can encode the buffer or store it briefly, 
// or simply fake the URL since we have limited storage.

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { videoId, text, voiceId, speed = 1.0 } = body;

        if (!videoId || !text || !voiceId) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const audioData = await generateSpeech(text, voiceId, speed);

        if ('error' in audioData) {
            throw new Error(audioData.error as string);
        }

        // Fake upload URL for the hackathon
        const fakeAudioUrl = `https://cdn.voxra.ai/audio/${videoId}.mp3`;

        // Update DB
        await db.update(videos)
            .set({
                audioUrl: fakeAudioUrl,
                phase: "subtitles",
                progress: 30
            })
            .where(eq(videos.id, videoId));

        return Response.json({ audioUrl: fakeAudioUrl });
    } catch (err: any) {
        console.error("TTS error:", err);
        return Response.json({ error: err.message || "Internal error" }, { status: 500 });
    }
}
