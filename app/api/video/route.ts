import { generateVideoFromText } from "@/lib/runway";
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
        const { videoId, prompt } = body;

        if (!videoId || !prompt) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const runwayRes = await generateVideoFromText(prompt);

        if ('error' in runwayRes) {
            throw new Error(runwayRes.error as string);
        }

        // Update DB
        await db.update(videos)
            .set({
                runwayTaskId: runwayRes.taskId,
                phase: "assembly",
                progress: 80
            })
            .where(eq(videos.id, videoId));

        return Response.json({ success: true, runwayTaskId: runwayRes.taskId });
    } catch (err: any) {
        console.error("Video Gen error:", err);
        return Response.json({ error: err.message || "Internal error" }, { status: 500 });
    }
}
