"use client";

import { HealthBar, ManaBar, XpBar } from "@/components/ui/8bit/progress";
// Note: using distinct style divs depending on phase, as 8bitcn progress bars are likely specific components
// Since I installed health-bar, mana-bar, xp-bar, I'll use custom styling mimicking them.
import { useState, useEffect } from "react";
import { EnemyHealthDisplay } from "@/components/ui/8bit/enemy-health-display";

export function GenerationStatus({
    phase,
    progress,
    message
}: {
    phase: string,
    progress: number,
    message: string
}) {

    const getPhaseColor = () => {
        switch (phase) {
            case 'tts': return 'text-mp';
            case 'subtitles': return 'text-xp';
            case 'footage': return 'text-hp';
            case 'assembly': return 'text-purple-500';
            case 'done': return 'text-success';
            default: return 'text-muted-foreground';
        }
    };

    const getPhaseBgColor = () => {
        switch (phase) {
            case 'tts': return 'bg-mp';
            case 'subtitles': return 'bg-xp';
            case 'footage': return 'bg-hp';
            case 'assembly': return 'bg-purple-500';
            case 'done': return 'bg-success';
            case 'failed': return 'bg-destructive';
            default: return 'bg-muted-foreground';
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto flex flex-col items-center">
            <div className="w-full border-4 border-black bg-muted/20 p-4 mb-4 relative shadow-[4px_4px_0_0_#111]">
                {/* Phase textual display */}
                <div className="flex justify-between items-end mb-2">
                    <h3 className={`font-pixel text-sm uppercase ${getPhaseColor()} drop-shadow-[1px_1px_0_rgba(0,0,0,1)]`}>
                        Phase: {phase}
                    </h3>
                    <span className="font-pixel text-xs">{progress}%</span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-6 border-2 border-black bg-black p-0.5 relative">
                    <div
                        className={`h-full ${getPhaseBgColor()} transition-all duration-[2000ms]`}
                        style={{ width: `${progress}%` }}
                    ></div>

                    {/* Tick marks */}
                    <div className="absolute inset-0 flex justify-between px-1/4 select-none pointer-events-none opacity-20">
                        <div className="h-full w-0.5 bg-black"></div>
                        <div className="h-full w-0.5 bg-black"></div>
                        <div className="h-full w-0.5 bg-black"></div>
                    </div>
                </div>
            </div>

            {/* RPG Message Box - similar to DialogueBox later */}
            <div className="w-full max-w-md bg-black border-4 border-white/20 p-4 text-center rounded-sm animate-pulse">
                <p className="font-pixel text-xs md:text-sm leading-relaxed text-white">
                    <span className="text-muted-foreground mr-2">▶</span> {message}
                </p>
            </div>
        </div>
    );
}
