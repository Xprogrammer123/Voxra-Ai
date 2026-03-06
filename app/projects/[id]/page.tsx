import { db } from "@/lib/db";
import { projects, videos } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
    const session = await auth.api.getSession({ headers: await headers() });

    // Real implementation:
    // const [project] = await db.select().from(projects).where(eq(projects.id, params.id));
    // if (!project || project.userId !== session?.user.id) redirect("/dashboard");

    // Mock for prototyping
    const project = { id: params.id, name: "Sample Project", platform: "tiktok", format: "9:16", createdAt: new Date() };

    // const projectVideos = await db.select().from(videos).where(eq(videos.projectId, project.id)).orderBy(desc(videos.createdAt));
    const projectVideos: any[] = [];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-4 border-black pb-4">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black uppercase text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)] tracking-tighter">
                        {project.name}
                    </h1>
                    <div className="flex gap-2 mt-4">
                        <Badge className="bg-background border-2 border-black">{project.platform.toUpperCase()}</Badge>
                        <Badge className="bg-background border-2 border-black">{project.format}</Badge>
                    </div>
                </div>
                <Link href={`/projects/${project.id}/create`}>
                    <Button className="bg-hp text-black border-4 border-black shadow-[4px_4px_0_0_#e76e55] hover:bg-hp/80 animate-pulse hover:animate-none">
                        ⚔ GENERATE NEW VIDEO
                    </Button>
                </Link>
            </div>

            <div>
                <h2 className="text-xl font-black uppercase mb-6 drop-shadow-[1px_1px_0_rgba(0,0,0,1)] text-mp">
                    GENERATED VIDEOS
                </h2>

                {projectVideos.length === 0 ? (
                    <div className="border-4 border-black border-dashed p-12 text-center bg-muted/5">
                        <p className="text-muted-foreground mb-4 font-pixel text-sm uppercase">No loot acquired yet.</p>
                        <Link href={`/projects/${project.id}/create`}>
                            <Button variant="outline" className="border-4 border-black">START THE GENERATOR</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {/* Map over videos here using a VideoCard component */}
                    </div>
                )}
            </div>
        </div>
    );
}
