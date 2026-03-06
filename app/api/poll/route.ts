import { db } from "@/lib/db";
import { videos } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const taskId = searchParams.get("taskId");

        if (!taskId) return Response.json({ error: "Missing taskId" }, { status: 400 });

        const [video] = await db.select().from(videos).where(eq(videos.id, taskId));

        if (!video) return Response.json({ error: "Not found" }, { status: 404 });

        // Verify ownership
        if (video.userId !== session.user.id) {
            return Response.json({ error: "Forbidden" }, { status: 403 });
        }

        return Response.json({
            status: video.status,
            phase: video.phase,
            progress: video.progress ?? 0,
            output: video.outputUrls ?? null,
        });
    } catch (err: any) {
        return Response.json({ error: "Internal error" }, { status: 500 });
    }
}
