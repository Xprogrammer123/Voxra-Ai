import { StatsBar } from "@/components/dashboard/StatsBar";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Button } from "@/components/ui/8bit/button";
import EnemyHealthDisplay from "@/components/ui/8bit/enemy-health-display";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { projects, videos } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

export default async function DashboardPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    // Fetch user projects
    const userProjects = await db.select()
        .from(projects)
        .where(eq(projects.userId, session!.user.id))
        .orderBy(desc(projects.createdAt));

    // For real implementation we'd do a join or separate count query
    // Mocking video counts for the UI demo
    const projectsWithCounts = userProjects.map(p => ({
        ...p,
        videoCount: Math.floor(Math.random() * 5)
    }));

    const mockStats = {
        videosThisMonth: projectsWithCounts.reduce((acc, p) => acc + p.videoCount, 0),
        totalVideos: projectsWithCounts.reduce((acc, p) => acc + p.videoCount, 0) + 12,
        activePresets: 2,
        creditsRemaining: 25,
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b-4 border-black pb-4">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black uppercase text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)] tracking-tighter">
                        QUEST BOARD
                    </h1>
                    <p className="text-muted-foreground mt-2 uppercase text-sm font-sans tracking-wide">
                        {session?.user.name}'s active campaigns
                    </p>
                </div>
                <Link href="/projects/new">
                    <Button className="bg-success text-black border-4 border-black shadow-[4px_4px_0_0_#92cc41] hover:bg-success/80 animate-pulse hover:animate-none">
                        + NEW QUEST
                    </Button>
                </Link>
            </div>

            <EnemyHealthDisplay
                enemyName="MONTHLY LIMIT BOSS"
                currentHealth={mockStats.videosThisMonth}
                maxHealth={mockStats.creditsRemaining + mockStats.videosThisMonth}
            />

            <StatsBar stats={mockStats} />

            <div>
                <h2 className="text-xl font-black uppercase mb-6 drop-shadow-[1px_1px_0_rgba(0,0,0,1)] text-xp">
                    ACTIVE QUESTS
                </h2>

                {projectsWithCounts.length === 0 ? (
                    <div className="border-4 border-black border-dashed p-12 text-center bg-muted/5">
                        <p className="text-muted-foreground mb-4 font-pixel text-sm">NO ACTIVE QUESTS FOUND.</p>
                        <Link href="/projects/new">
                            <Button variant="outline" className="border-4 border-black">START A NEW QUEST</Button>
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
        </div>
    );
}
