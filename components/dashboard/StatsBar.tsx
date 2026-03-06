"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/8bit/card";

interface StatsBarProps {
    videosThisMonth: number;
    totalVideos: number;
    activePresets: number;
    creditsRemaining: number;
}

export function StatsBar({ stats }: { stats: StatsBarProps }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-4 border-black bg-hp/10">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-xs text-muted-foreground uppercase font-pixel tracking-tighter">
                        <span className="mr-2">⚔</span> THIS MONTH
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-black text-hp drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{stats.videosThisMonth}</div>
                </CardContent>
            </Card>

            <Card className="border-4 border-black bg-mp/10">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-xs text-muted-foreground uppercase font-pixel tracking-tighter">
                        <span className="mr-2">📜</span> TOTAL VIDEOS
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-black text-mp drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{stats.totalVideos}</div>
                </CardContent>
            </Card>

            <Card className="border-4 border-black bg-xp/10">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-xs text-muted-foreground uppercase font-pixel tracking-tighter">
                        <span className="mr-2">🎨</span> ACTIVE PRESETS
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-black text-xp drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{stats.activePresets}</div>
                </CardContent>
            </Card>

            <Card className="border-4 border-black bg-success/10">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-xs text-muted-foreground uppercase font-pixel tracking-tighter">
                        <span className="mr-2">💎</span> CREDITS
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-black text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{stats.creditsRemaining}</div>
                </CardContent>
            </Card>
        </div>
    );
}
