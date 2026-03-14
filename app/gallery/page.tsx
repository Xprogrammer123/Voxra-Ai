import { db } from "@/lib/db";
import { videos, projects } from "@/lib/schema";
import { eq, desc, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export default async function GalleryPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <span className="text-4xl">🔒</span>
                <p className="text-sm font-black tracking-widest text-[#555]">PLEASE LOG IN TO VIEW YOUR INVENTORY</p>
            </div>
        );
    }

    const userVideos = await db
        .select({
            id: videos.id,
            projectId: videos.projectId,
            projectName: projects.name,
            format: videos.platform, // Using platform column for format currently or we can adjust
            platform: videos.platform,
            createdAt: videos.createdAt,
            durationSecs: videos.durationSecs,
            outputUrls: videos.outputUrls,
        })
        .from(videos)
        .innerJoin(projects, eq(videos.projectId, projects.id))
        .where(
            and(
                eq(videos.userId, session.user.id),
                eq(videos.status, "done")
            )
        )
        .orderBy(desc(videos.createdAt));

    // Map DB fields to what GalleryClient expects if they differ
    // Ensure format is what we expect (e.g. 9:16)
    const formattedVideos = userVideos.map(v => ({
        ...v,
        format: filterToFormat(v.format)
    }));

    return <GalleryClient initialVideos={formattedVideos as any} />;
}

function filterToFormat(val: string | null) {
    if (!val) return "9:16";
    if (["tiktok", "reels", "shorts"].includes(val.toLowerCase())) return "9:16";
    if (val.toLowerCase() === "youtube") return "16:9";
    return val;
}