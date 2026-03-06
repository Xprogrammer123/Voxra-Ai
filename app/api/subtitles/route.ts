import { generateSubtitles } from "@/lib/whisper";
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
        const { videoId, audioUrl } = body;

        if (!videoId || !audioUrl) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const subtitlesJson = await generateSubtitles(audioUrl);

        if (subtitlesJson?.error) {
            throw new Error(subtitlesJson.error);
        }

        // Update DB
        await db.update(videos)
            .set({
                subtitlesJson,
                phase: "footage",
                progress: 55
            })
            .where(eq(videos.id, videoId));

        return Response.json({ success: true, subtitles: subtitlesJson });
    } catch (err: any) {
        console.error("Subtitles error:", err);
        return Response.json({ error: err.message || "Internal error" }, { status: 500 });
    }
}
