"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";

const PRESETS = [
    { id: "p1", name: "HORMOSI STYLE", desc: "Bold yellow text, fast cuts, emojis.", bg: "bg-yellow-500/10", border: "border-yellow-500" },
    { id: "p2", name: "MINIMALIST", desc: "Clean white sans-serif, slow zooms.", bg: "bg-white/10", border: "border-white" },
    { id: "p3", name: "GAMER", desc: "Pixel fonts, neon colors, VHS effects.", bg: "bg-xp/10", border: "border-xp" },
    { id: "p4", name: "CINEMATIC", desc: "No text, widescreen bars, dramatic color grade.", bg: "bg-hp/10", border: "border-hp" },
];

export function StyleStep() {
    const { stylePreset, setStylePreset } = useProjectStore();

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    FORGE YOUR AESTHETIC
                </h2>
                <p className="text-muted-foreground mt-2 font-sans">
                    Apply a visual preset for subtitles and pacing.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {PRESETS.map((p) => {
                    const isSelected = stylePreset === p.id;
                    return (
                        <Card
                            key={p.id}
                            className={`border-4 cursor-pointer transition-all h-full ${isSelected
                                    ? `${p.border} ${p.bg} shadow-[4px_4px_0_0_currentColor] scale-[1.02]`
                                    : "border-black hover:bg-muted/10 hover:-translate-y-1"
                                }`}
                            onClick={() => setStylePreset(p.id)}
                        >
                            <CardHeader className="p-4 pb-2 border-b-2 border-dashed border-[#333] mb-2 relative">
                                <CardTitle className={`text-xl font-black ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {p.name}
                                </CardTitle>
                                {isSelected && (
                                    <Badge className="absolute top-4 right-4 bg-success text-black border-2 border-black animate-pulse">
                                        EQUIPPED
                                    </Badge>
                                )}
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-sm font-sans leading-relaxed text-muted-foreground">
                                    {p.desc}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="bg-muted/10 border-4 border-black border-dashed p-6 text-center mt-8 cursor-pointer hover:bg-muted/20 transition-colors">
                <span className="text-4xl block mb-2">⚙️</span>
                <h3 className="font-pixel text-lg mb-1">CUSTOM STYLE</h3>
                <p className="text-xs text-muted-foreground font-sans">Pro & Studio Users can create custom editing presets.</p>
            </div>
        </div>
    );
}
