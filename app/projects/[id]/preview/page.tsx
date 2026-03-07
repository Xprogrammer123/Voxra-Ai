"use client";

import { useEffect, useState } from "react";
import { VideoPlayer } from "@/components/preview/VideoPlayer";
import { GenerationStatus } from "@/components/shared/GenerationStatus";
import { RPG_DIALOGUE } from "@/lib/dialogue";
import { Button } from "@/components/ui/8bit/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PreviewPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [status, setStatus] = useState("processing");
    const [phase, setPhase] = useState("tts");
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState(RPG_DIALOGUE.tts[0]);

    // Simulate generation polling
    useEffect(() => {
        const phases = ["tts", "subtitles", "footage", "assembly", "done"];
        let currentIdx = 0;

        const interval = setInterval(() => {
            setProgress(p => {
                const np = p + 5;
                if (np >= 100) {
                    clearInterval(interval);
                    setStatus("done");
                    setPhase("done");
                    setMessage(RPG_DIALOGUE.done[0]);
                    return 100;
                }

                const newIdx = Math.floor((np / 100) * (phases.length - 1));
                if (newIdx !== currentIdx) {
                    currentIdx = newIdx;
                    setPhase(phases[currentIdx]);
                    // Pick rand message
                    const msgs = (RPG_DIALOGUE as any)[phases[currentIdx]];
                    setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
                }

                return np;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-black uppercase text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    {status === "done" ? "LOOT ACQUIRED" : "FORGING VIDEO..."}
                </h1>
                {status === "done" && (
                    <p className="text-muted-foreground mt-2 uppercase text-sm font-sans tracking-wide">
                        Review your video before final export
                    </p>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                <div className="w-full max-w-sm shrink-0">
                    <VideoPlayer url={status === "done" ? "#" : undefined} />
                </div>

                <div className="flex-1 w-full max-w-xl">
                    {status !== "done" ? (
                        <GenerationStatus phase={phase} progress={progress} message={message} />
                    ) : (
                        <div className="space-y-6 text-center md:text-left bg-muted/10 border-4 border-black p-8 shadow-[8px_8px_0_0_#111]">
                            <h2 className="text-2xl font-black uppercase text-xp drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                SUCCESS!
                            </h2>
                            <p className="font-sans text-muted-foreground leading-relaxed">
                                The video has been successfully forged using your script, selected voice, and custom style preset.
                            </p>

                            <div className="pt-6 border-t-4 border-dashed border-[#333] flex flex-col gap-4">
                                <Link href={`/projects/${params.id}/export`} className="w-full">
                                    <Button className="w-full text-base py-6 bg-success text-black border-4 border-black hover:bg-success/80 animate-pulse shadow-[4px_4px_0_0_#92cc41]">
                                        PROCEED TO EXPORT →
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full border-4 text-sm" onClick={() => router.back()}>
                                    ← EDIT SETTINGS & REGENERATE
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
