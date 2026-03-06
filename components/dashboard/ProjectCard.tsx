import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import Link from "next/link";
import { Project } from "@/lib/schema";

interface ProjectCardProps {
    project: Project & { videoCount: number };
}

export function ProjectCard({ project }: ProjectCardProps) {
    // Mock healthbar logic
    const maxVideos = 10;
    const remaining = Math.max(0, maxVideos - project.videoCount);
    const healthPct = (remaining / maxVideos) * 100;

    return (
        <Card className="border-4 border-black flex flex-col hover:-translate-y-1 transition-transform group">
            <CardHeader className="border-b-4 border-black bg-muted/20 pb-4 relative">
                <CardTitle className="text-lg text-xp drop-shadow-[1px_1px_0_rgba(0,0,0,1)] truncate pr-16 leading-relaxed">
                    {project.name}
                </CardTitle>
                <Badge className="absolute top-4 right-4 bg-background border-2 border-black text-xs">
                    {project.platform.toUpperCase()}
                </Badge>
            </CardHeader>

            <CardContent className="pt-4 flex-1">
                <div className="mb-4">
                    <div className="flex justify-between text-xs font-pixel mb-1 text-muted-foreground">
                        <span>QUOTA HP</span>
                        <span>{remaining}/{maxVideos}</span>
                    </div>
                    <div className="w-full h-4 border-2 border-black bg-black p-0.5">
                        <div
                            className={`h-full transition-all duration-500 ${healthPct > 30 ? 'bg-hp' : 'bg-destructive animate-pulse'}`}
                            style={{ width: `${healthPct}%` }}
                        ></div>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground font-sans">
                    Format: {project.format}
                </p>
                <p className="text-xs text-muted-foreground font-sans">
                    Generated: {project.videoCount} videos
                </p>
            </CardContent>

            <CardFooter className="pt-0 flex gap-2">
                <Link href={`/projects/${project.id}/create`} className="flex-1">
                    <Button className="w-full text-xs box-border border-4 py-4 bg-success text-black hover:bg-success/80 border-black shadow-[2px_2px_0_0_#92cc41] group-hover:shadow-[4px_4px_0_0_#92cc41]">
                        OPEN QUEST
                    </Button>
                </Link>
                {/* Placeholder for delete action */}
                <Button variant="destructive" size="icon" className="border-4 shrink-0 text-xs px-2" title="Delete Project">
                    🗑
                </Button>
            </CardFooter>
        </Card>
    );
}
