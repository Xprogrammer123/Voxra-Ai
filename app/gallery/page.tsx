"use client";

import { Card, CardContent } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { VideoPlayer } from "@/components/preview/VideoPlayer";

// Mock data
const VIDEOS = [
    { id: "v1", project: "Daily Tech Tips", format: "9:16", url: "#", date: "2 Hours Ago" },
    { id: "v2", project: "Daily Tech Tips", format: "16:9", url: "#", date: "2 Hours Ago" },
    { id: "v3", project: "Gaming Lore", format: "9:16", url: "#", date: "1 Day Ago" },
];

export default function GalleryPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div className="border-b-4 border-black pb-4 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-black uppercase text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)] tracking-tighter">
                    QUEST LOG
                </h1>
                <p className="text-muted-foreground mt-2 uppercase text-sm font-sans tracking-wide">
                    Your library of forged videos
                </p>
            </div>

            {VIDEOS.length === 0 ? (
                <div className="border-4 border-black border-dashed p-12 text-center bg-muted/5">
                    <p className="text-muted-foreground mb-4 font-pixel text-sm">NO LOOT FOUND IN INVENTORY.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {VIDEOS.map(v => (
                        <Card key={v.id} className="border-4 border-black flex flex-col group">
                            <CardContent className="p-0 relative">
                                <div className="aspect-[9/16] bg-black">
                                    <VideoPlayer url={undefined} /> {/* Show NO SIGNAL placeholder for mock */}
                                </div>
                                <div className="p-4 bg-muted/5 border-t-4 border-black flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-pixel text-sm truncate pr-2 text-mp">{v.project}</h3>
                                        <Badge className="bg-background border-black">{v.format}</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground font-sans">{v.date}</p>
                                    <Button className="w-full text-xs py-4 mt-2 bg-success text-black border-black hover:bg-success/80">
                                        ↓ DOWNLOAD
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
