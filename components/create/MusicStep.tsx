"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import { useState } from "react";

const TRACKS = [
    { id: "m1", name: "Epic Boss Fight", genre: "ORCHESTRAL", vibe: "Intense, dramatic, heavy." },
    { id: "m2", name: "Cyberpunk City", genre: "SYNTHWAVE", vibe: "Dark, bass-heavy, fast." },
    { id: "m3", name: "Lo-Fi Tavern", genre: "CHILL", vibe: "Relaxed, slow, melodic." },
    { id: "m4", name: "Cinematic Drone", genre: "AMBIENT", vibe: "Spooky, atmospheric, quiet." },
    { id: "none", name: "No Music", genre: "SILENCE", vibe: "Voice & SFX only." },
];

export function MusicStep() {
    const { musicId, setMusicId } = useProjectStore();
    const [playing, setPlaying] = useState<string | null>(null);

    const togglePlay = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (id === "none") return;
        if (playing === id) setPlaying(null);
        else setPlaying(id);
        // Real app: audio.play()
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-hp drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    SET THE VIBE
                </h2>
                <p className="text-muted-foreground mt-2 font-sans">
                    Choose background music to underscore your narrative.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {TRACKS.map((t) => {
                    const isSelected = musicId === t.id;
                    return (
                        <Card
                            key={t.id}
                            className={`border-4 cursor-pointer transition-all ${isSelected
                                    ? "border-hp bg-hp/10 shadow-[4px_4px_0_0_#e76e55] scale-[1.02]"
                                    : "border-black hover:bg-muted/10 hover:-translate-y-1"
                                }`}
                            onClick={() => setMusicId(t.id)}
                        >
                            <CardContent className="p-4 flex items-start gap-4">
                                <button
                                    className={`w-12 h-12 shrink-0 border-2 border-black flex items-center justify-center text-xl transition-colors ${t.id === "none" ? "bg-muted text-muted-foreground cursor-not-allowed" :
                                            playing === t.id ? "bg-hp text-black animate-pulse" : "bg-black text-hp hover:bg-muted"
                                        }`}
                                    onClick={(e) => togglePlay(e, t.id)}
                                    disabled={t.id === "none"}
                                >
                                    {t.id === "none" ? "🔇" : playing === t.id ? "⏸" : "▶"}
                                </button>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-pixel text-lg truncate">{t.name}</h3>
                                        <Badge className="bg-background border-black">{t.genre}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-sans truncate">{t.vibe}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
