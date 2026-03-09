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
        const { projectId, scriptText, stylePreset, platform, format } = body;

        if (!projectId || !scriptText) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Insert initial video record
        const [video] = await db.insert(videos).values({
            userId: session.user.id,
            projectId,
            scriptText,
            stylePreset: stylePreset ?? null,
            status: "processing",
            platform: platform ?? "tiktok",
            phase: "footage",
            progress: 0,
        }).returning();

        // 2. Kick off Veo 3 generation (fire and forget — client polls for status)
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

        fetch(`${baseUrl}/api/video`, {
            method: "POST",
            headers: { "Content-Type": "application/json", cookie: req.headers.get("cookie") ?? "" },
            body: JSON.stringify({ videoId: video.id, scriptText, platform, format }),
        }).catch(err => console.error("Failed to kick off video generation:", err));

        // 3. Also generate subtitles immediately from script (no external API needed)
        fetch(`${baseUrl}/api/subtitles`, {
            method: "POST",
            headers: { "Content-Type": "application/json", cookie: req.headers.get("cookie") ?? "" },
            body: JSON.stringify({ videoId: video.id, scriptText }),
        }).catch(err => console.error("Failed to generate subtitles:", err));

        return Response.json({ taskId: video.id });
    } catch (err: any) {
        console.error("Generate error:", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}