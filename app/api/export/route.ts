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
        const { videoId, formats } = body;

        if (!videoId || !formats || !Array.isArray(formats)) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const outputUrls: Record<string, string> = {};

        // Fake assembly process that returns URLs grouped by format
        for (const format of formats) {
            outputUrls[format] = `https://cdn.voxra.ai/exports/${videoId}_${format.replace(':', 'x')}.mp4`;
        }

        // Mark done
        await db.update(videos)
            .set({
                status: "done",
                phase: "done",
                progress: 100,
                outputUrls
            })
            .where(eq(videos.id, videoId));

        return Response.json({ success: true, outputUrls });
    } catch (err: any) {
        console.error("Export error:", err);
        return Response.json({ error: err.message || "Internal error" }, { status: 500 });
    }
}
