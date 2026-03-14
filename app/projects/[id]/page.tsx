import { db } from "@/lib/db";
import { projects, videos } from "@/lib/schema";
import { eq, desc, count } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const PLATFORM_COLORS: Record<string, string> = {
    tiktok: "#e76e55", reels: "#b06aee", shorts: "#92cc41",
    youtube: "#209cee", linkedin: "#f7d51d", default: "#f7d51d",
};

const STATUS_COLORS: Record<string, string> = {
    done: "#92cc41", processing: "#f7d51d", failed: "#e76e55",
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/sign-in");

    const [project] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    if (!project || project.userId !== session.user.id) redirect("/dashboard");

    const projectVideos = await db.select().from(videos)
        .where(eq(videos.projectId, id))
        .orderBy(desc(videos.createdAt));

    const color = PLATFORM_COLORS[project.platform?.toLowerCase() ?? "default"] ?? PLATFORM_COLORS.default;

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
                style={{ borderBottom: "3px solid #1a1a1a", paddingBottom: "2rem" }}>
                <div className="flex flex-col gap-3">
                    <span className="text-[9px] tracking-widest" style={{ color: "#555" }}>▶ PROJECT</span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none"
                        style={{ color, textShadow: `4px 4px 0 #000, 0 0 30px ${color}44` }}>
                        {project.name}
                    </h1>
                    <div className="flex gap-2">
                        {[project.platform?.toUpperCase(), project.format].map((tag, i) => (
                            <span key={i} className="text-[9px] font-black tracking-widest px-2 py-1"
                                style={{ background: `${color}18`, border: `1px solid ${color}44`, color }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <Link href={`/projects/${id}/create`}>
                    <button className="text-sm font-black tracking-widest uppercase px-6 py-3"
                        style={{
                            background: "#92cc41", color: "#000",
                            border: "3px solid #fff",
                            boxShadow: "4px 4px 0 #000, 0 0 20px rgba(146,204,65,0.3)",
                        }}>
                        ⚡ GENERATE NEW VIDEO
                    </button>
                </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                    { label: "TOTAL VIDEOS", value: projectVideos.length, color: "#f7d51d" },
                    { label: "COMPLETED", value: projectVideos.filter(v => v.status === "done").length, color: "#92cc41" },
                    { label: "FAILED", value: projectVideos.filter(v => v.status === "failed").length, color: "#e76e55" },
                ].map(stat => (
                    <div key={stat.label} className="flex flex-col gap-2 p-4"
                        style={{ background: "#0a0a0a", border: "3px solid #1a1a1a", boxShadow: "4px 4px 0 #000" }}>
                        <span className="text-[9px] tracking-widest" style={{ color: "#444" }}>{stat.label}</span>
                        <span className="text-3xl font-black" style={{ color: stat.color, textShadow: "2px 2px 0 #000" }}>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Videos list */}
            <div className="flex flex-col gap-1 mb-6">
                <span className="text-[9px] tracking-widest" style={{ color: "#555" }}>GENERATED VIDEOS</span>
                <div className="h-[2px]" style={{
                    background: "repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 4px, transparent 4px, transparent 8px)"
                }} />
            </div>

            {projectVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-6 py-20"
                    style={{ border: "3px dashed #1a1a1a", background: "#050505" }}>
                    <span className="text-4xl">🎬</span>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-black tracking-widest" style={{ color: "#333" }}>NO LOOT ACQUIRED YET</span>
                        <span className="text-[10px] tracking-widest" style={{ color: "#222" }}>Start the generator to forge your first video</span>
                    </div>
                    <Link href={`/projects/${id}/create`}>
                        <button className="text-xs font-black tracking-widest uppercase px-6 py-3"
                            style={{ background: "#0a0a0a", color: "#92cc41", border: "3px solid #92cc41", boxShadow: "3px 3px 0 #000" }}>
                            ▶ START GENERATOR
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {projectVideos.map(video => {
                        const sc = STATUS_COLORS[video.status ?? "processing"] ?? "#555";
                        const urls = video.outputUrls as Record<string, string> | null;
                        const videoUrl = urls ? Object.values(urls)[0] : null;
                        return (
                            <div key={video.id} className="flex items-center gap-4 px-4 py-4"
                                style={{ background: "#0a0a0a", border: "3px solid #1a1a1a", boxShadow: "3px 3px 0 #000" }}>
                                {/* Thumbnail / status */}
                                <div className="shrink-0 w-14 h-14 flex items-center justify-center"
                                    style={{ background: "#111", border: `2px solid ${sc}33` }}>
                                    {video.status === "done" ? (
                                        <span className="text-xl">🎬</span>
                                    ) : video.status === "failed" ? (
                                        <span className="text-xl">💀</span>
                                    ) : (
                                        <span className="text-xl" style={{ animation: "spin 1s linear infinite" }}>⠋</span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex flex-col gap-1 flex-1 min-w-0">
                                    <span className="text-xs font-black truncate" style={{ color: "#ddd" }}>
                                        {video.scriptText?.slice(0, 60)}...
                                    </span>
                                    <div className="flex gap-3">
                                        <span className="text-[9px] tracking-widest font-black" style={{ color: sc }}>
                                            {video.status?.toUpperCase()}
                                        </span>
                                        <span className="text-[9px] tracking-widest" style={{ color: "#333" }}>
                                            {video.platform?.toUpperCase()} · {new Date(video.createdAt!).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {video.status === "processing" && (
                                        <div className="w-32 h-2" style={{ background: "#111", border: "1px solid #1e1e1e" }}>
                                            <div className="h-full" style={{
                                                width: `${video.progress ?? 0}%`,
                                                background: `repeating-linear-gradient(90deg, #f7d51d 0px, #f7d51d 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)`,
                                            }} />
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 shrink-0">
                                    {video.status === "done" && videoUrl && (
                                        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                                            <button className="text-[9px] font-black tracking-widest uppercase px-3 py-2"
                                                style={{ background: "#0a1400", color: "#92cc41", border: "2px solid #92cc41" }}>
                                                ↗ VIEW
                                            </button>
                                        </a>
                                    )}
                                    {video.status === "done" && (
                                        <Link href={`/projects/${id}/export?videoId=${video.id}`}>
                                            <button className="text-[9px] font-black tracking-widest uppercase px-3 py-2"
                                                style={{ background: "#0a0a1a", color: "#209cee", border: "2px solid #209cee" }}>
                                                ↓ EXPORT
                                            </button>
                                        </Link>
                                    )}
                                    {video.status === "processing" && (
                                        <Link href={`/projects/${id}/preview?taskId=${video.id}`}>
                                            <button className="text-[9px] font-black tracking-widest uppercase px-3 py-2"
                                                style={{ background: "#1a1400", color: "#f7d51d", border: "2px solid #f7d51d" }}>
                                                ⟳ WATCH
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}