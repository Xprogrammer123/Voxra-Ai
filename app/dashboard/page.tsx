import { StatsBar } from "@/components/dashboard/StatsBar";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import EnemyHealthDisplay from "@/components/ui/8bit/enemy-health-display";
import Link from "next/link";
import { NewQuestButton } from "@/components/dashboard/NewQuestButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { projects, videos } from "@/lib/schema";
import { eq, desc, sql } from "drizzle-orm";

export default async function DashboardPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    const userProjects = await db.select()
        .from(projects)
        .where(eq(projects.userId, session!.user.id))
        .orderBy(desc(projects.createdAt));

    // Real video counts — no Math.random()
    const videoCounts = await db
        .select({
            projectId: videos.projectId,
            count: sql<number>`count(*)::int`,
        })
        .from(videos)
        .where(eq(videos.userId, session!.user.id))
        .groupBy(videos.projectId);

    const countMap = Object.fromEntries(videoCounts.map(v => [v.projectId, v.count]));

    const projectsWithCounts = userProjects.map(p => ({
        ...p,
        videoCount: countMap[p.id] ?? 0,
    }));

    const totalVideos = Object.values(countMap).reduce((a, b) => a + b, 0);

    const mockStats = {
        videosThisMonth:  totalVideos,
        totalVideos,
        activePresets:    2,
        creditsRemaining: 25,
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4">

            <div
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6"
                style={{ borderBottom: "3px solid #1a1a1a" }}
            >
                <div className="flex flex-col gap-1">
                    <span style={{ color: "#f7d51d", fontSize: "10px", letterSpacing: "0.2em" }}>
                        ▶ ACTIVE
                    </span>
                    <h1
                        className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none"
                        style={{ color: "#92cc41", textShadow: "4px 4px 0 #000, 0 0 40px rgba(146,204,65,0.25)" }}
                    >
                        QUEST BOARD
                    </h1>
                    <p className="text-[10px] tracking-widest uppercase mt-1" style={{ color: "#555" }}>
                        {session?.user.name}'s active campaigns
                    </p>
                </div>

                {/* NewQuestButton is already "use client" — handles hover internally */}
                <NewQuestButton />
            </div>

            <EnemyHealthDisplay
                enemyName="MONTHLY LIMIT BOSS"
                currentHealth={mockStats.videosThisMonth}
                maxHealth={mockStats.creditsRemaining + mockStats.videosThisMonth}
            />

            <StatsBar stats={mockStats} />

            <div>
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-[9px] tracking-widest" style={{ color: "#f7d51d" }}>★</span>
                    <h2
                        className="text-lg font-black uppercase tracking-widest"
                        style={{ color: "#f7d51d", textShadow: "2px 2px 0 #000" }}
                    >
                        ACTIVE QUESTS
                    </h2>
                    <div className="flex-1 h-[2px]" style={{
                        background: "repeating-linear-gradient(90deg, #f7d51d22 0px, #f7d51d22 4px, transparent 4px, transparent 8px)"
                    }} />
                    <span className="text-[9px] tracking-widest" style={{ color: "#333" }}>
                        {projectsWithCounts.length} FOUND
                    </span>
                </div>

                {projectsWithCounts.length === 0 ? (
                    <div className="p-12 text-center"
                        style={{ border: "3px dashed #1e1e1e", background: "#0a0a0a" }}>
                        <p className="text-sm font-black tracking-widest mb-6" style={{ color: "#333" }}>
                            NO ACTIVE QUESTS FOUND.
                        </p>
                        <Link href="/projects/new">
                            <button
                                className="text-xs font-black tracking-widest uppercase px-6 py-3"
                                style={{
                                    background: "transparent",
                                    color: "#92cc41",
                                    border: "3px solid #92cc41",
                                    boxShadow: "4px 4px 0 #000",
                                }}
                            >
                                ▶ START A NEW QUEST
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectsWithCounts.map(p => (
                            <ProjectCard key={p.id} project={p as any} />
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes blink-kf {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }
            `}</style>
        </div>
    );
}