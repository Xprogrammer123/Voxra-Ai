"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import { useState } from "react";

const VOICES = [
    { id: "v1", name: "Marcus", tag: "NARRATOR", desc: "Deep, authoritative, cinematic.", gender: "M" },
    { id: "v2", name: "Sarah", tag: "TUTORIAL", desc: "Clear, upbeat, engaging.", gender: "F" },
    { id: "v3", name: "Atlas", tag: "MYSTERY", desc: "Gritty, low pitch, intense.", gender: "M" },
    { id: "v4", name: "Nova", tag: "TECH", desc: "Crisp, fast-paced, modern.", gender: "F" },
];

export function VoiceStep() {
    const { voiceId, setVoiceId } = useProjectStore();
    const [playing, setPlaying] = useState<string | null>(null);

    const togglePlay = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (playing === id) setPlaying(null);
        else setPlaying(id);
        // Real app: audio.play()
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-mp drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    SELECT YOUR BARD
                </h2>
                <p className="text-muted-foreground mt-2 font-sans">
                    Choose the voice that will narrate your quest.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {VOICES.map((v) => {
                    const isSelected = voiceId === v.id;
                    return (
                        <Card
                            key={v.id}
                            className={`border-4 cursor-pointer transition-all ${isSelected
                                    ? "border-mp bg-mp/10 shadow-[4px_4px_0_0_#209cee] scale-[1.02]"
                                    : "border-black hover:bg-muted/10 hover:-translate-y-1"
                                }`}
                            onClick={() => setVoiceId(v.id)}
                        >
                            <CardContent className="p-4 flex items-start gap-4">
                                <button
                                    className={`w-12 h-12 shrink-0 border-2 border-black flex items-center justify-center text-xl transition-colors ${playing === v.id ? "bg-mp text-black animate-pulse" : "bg-black text-mp hover:bg-muted"
                                        }`}
                                    onClick={(e) => togglePlay(e, v.id)}
                                >
                                    {playing === v.id ? "⏸" : "▶"}
                                </button>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-pixel text-lg truncate">{v.name}</h3>
                                        <Badge className="bg-background border-black">{v.tag}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-sans truncate">{v.desc}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
