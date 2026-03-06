import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import { useState, useEffect } from "react";
import Link from "next/link";

const MESSAGES = [
    "The Voxra forge awaits your script...",
    "Drop a script. Get a video. That's the whole quest.",
    "Voice. Subtitles. Export. All forged by Voxra.",
    "Your brand. Your style. Zero editing time.",
    "Join 10,000 creators already on the quest!"
];

export function Hero() {
    const [msgIdx, setMsgIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 min-h-[80vh] overflow-hidden">
            {/* Stars Background simulation */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 select-none pointer-events-none" />

            <div className="z-10 animate-pixel-in relative">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-success drop-shadow-[4px_4px_0_rgba(0,0,0,1)] lg:drop-shadow-[6px_6px_0_rgba(0,0,0,1)] mb-6 animate-float">
                    VOXRA
                    <span className="text-xp text-xl md:text-3xl align-top select-none absolute -mr-12 animate-blink">AI</span>
                </h1>

                <p className="text-xl md:text-2xl text-foreground max-w-2xl mx-auto leading-relaxed mb-4">
                    Turn your scripts into ready-to-post faceless videos.
                </p>
                <p className="text-muted-foreground mb-12 uppercase tracking-widest text-sm md:text-base">
                    "Your script. Your style. Voxra does the rest."
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                    <Link href="/sign-up">
                        <Button size="lg" className="text-lg bg-success text-black hover:bg-success/80 border-4 border-black shadow-[4px_4px_0_0_#92cc41]">
                            ▶ START NOW
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="text-lg border-4 shadow-[4px_4px_0_0_#209cee]">
                        ◈ WATCH DEMO
                    </Button>
                </div>

                <div className="flex flex-col items-center gap-2 mb-12">
                    <div className="text-xs text-muted-foreground uppercase">LEVEL UP YOUR CONTENT GAME</div>
                    <div className="w-64 h-6 border-4 border-black bg-black p-1">
                        <div className="h-full bg-xp animate-[pulse_2s_infinite]" style={{ width: '85%' }}></div>
                    </div>
                </div>

                <div className="max-w-md mx-auto relative group">
                    <Card className="border-4 shadow-[8px_8px_0_0_#e76e55]">
                        <CardContent className="p-6 text-sm md:text-base leading-relaxed text-left min-h-[100px] flex items-center justify-center">
                            <span className="text-muted-foreground mr-2">▶</span> {MESSAGES[msgIdx]}
                        </CardContent>
                    </Card>
                    <div className="absolute -bottom-6 -right-6 text-4xl animate-float">💬</div>
                </div>
            </div>
        </section>
    );
}
