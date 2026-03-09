import { db } from "@/lib/db";
import { videos } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Auto-generate subtitle segments from script text.
// Splits into ~5 word chunks and assigns approximate timings
// based on average speaking speed (~2.5 words/second).
function generateSubtitlesFromScript(scriptText: string) {
    const words = scriptText.trim().split(/\s+/);
    const WORDS_PER_CHUNK = 5;
    const WORDS_PER_SECOND = 2.5;
    const segments = [];

    for (let i = 0; i < words.length; i += WORDS_PER_CHUNK) {
        const chunk = words.slice(i, i + WORDS_PER_CHUNK);
        const startTime = i / WORDS_PER_SECOND;
        const endTime = (i + chunk.length) / WORDS_PER_SECOND;

        segments.push({
            id: segments.length + 1,
            start: parseFloat(startTime.toFixed(2)),
            end: parseFloat(endTime.toFixed(2)),
            text: chunk.join(" "),
        });
    }

    return segments;
}

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { videoId, scriptText } = body;

        if (!videoId || !scriptText) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const subtitlesJson = generateSubtitlesFromScript(scriptText);

        await db.update(videos)
            .set({
                subtitlesJson,
                phase: "assembly",
                progress: 60,
            })
            .where(eq(videos.id, videoId));

        return Response.json({ success: true, subtitles: subtitlesJson });
    } catch (err: any) {
        console.error("Subtitles error:", err);
        return Response.json({ error: err.message || "Internal error" }, { status: 500 });
    }
}