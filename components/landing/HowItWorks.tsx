"use client";

import { useState, useEffect } from "react";

const STEPS = [
    {
        num: 1,
        title: "PASTE YOUR SCRIPT",
        desc: "Drop a script or upload a .txt. Choose your format (9:16, 16:9, 1:1) and platform.",
        icon: "📜",
        color: "#e76e55",
        label: "STEP 1",
        detail: "TikTok · Reels · Shorts · YouTube",
    },
    {
        num: 2,
        title: "CHOOSE YOUR STYLE",
        desc: "Pick a voice, set the music, customize fonts, colors, and transitions. Save as a preset.",
        icon: "🎨",
        color: "#209cee",
        label: "STEP 2",
        detail: "ElevenLabs · Custom Presets · Brand Kit",
    },
    {
        num: 3,
        title: "RECEIVE YOUR LOOT",
        desc: "Get ready-to-post MP4 files for every platform. Voiceover, subtitles and music included.",
        icon: "💎",
        color: "#92cc41",
        label: "STEP 3",
        detail: "9:16 · 16:9 · 1:1 · 1080p · 4K",
    },
];

export function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);
    const [blink, setBlink] = useState(true);

    // Auto-cycle steps
    useEffect(() => {
        const t = setInterval(() => setActiveStep(p => (p + 1) % STEPS.length), 3000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const b = setInterval(() => setBlink(p => !p), 500);
        return () => clearInterval(b);
    }, []);

    return (
        <section className="py-24 px-4" id="quest">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 flex flex-col items-center gap-4">
                    <div
                        className="text-[9px] tracking-widest px-4 py-2 border-2"
                        style={{ color: "#f7d51d", borderColor: "#f7d51d", background: "rgba(247,213,29,0.06)" }}
                    >
                        ✦ MAIN QUEST ✦
                    </div>
                    <h2
                        className="text-3xl md:text-5xl font-black uppercase leading-tight"
                        style={{ color: "#f7d51d", textShadow: "3px 3px 0 #000" }}
                    >
                        ⚔ THE QUEST
                    </h2>
                    <p className="text-[9px] tracking-widest" style={{ color: "#444" }}>
                        3 STEPS TO FORGE YOUR VIDEO
                    </p>
                </div>

                {/* Quest progress bar */}
                <div className="flex items-center justify-center gap-0 mb-16 max-w-lg mx-auto">
                    {STEPS.map((step, i) => (
                        <div key={i} className="flex items-center flex-1">
                            {/* Node */}
                            <button
                                onClick={() => setActiveStep(i)}
                                className="flex flex-col items-center gap-2 group"
                                style={{ flex: "0 0 auto" }}
                            >
                                <div
                                    className="w-10 h-10 flex items-center justify-center text-sm font-black border-3 transition-all duration-150"
                                    style={{
                                        border: `3px solid ${activeStep >= i ? step.color : "#2a2a2a"}`,
                                        background: activeStep === i
                                            ? step.color
                                            : activeStep > i
                                            ? `rgba(${hexToRgb(step.color)}, 0.15)`
                                            : "#111",
                                        color: activeStep === i ? "#000" : activeStep > i ? step.color : "#444",
                                        boxShadow: activeStep === i ? `0 0 12px rgba(${hexToRgb(step.color)}, 0.5)` : "none",
                                    }}
                                >
                                    {activeStep > i ? "✓" : step.num}
                                </div>
                                <span
                                    className="text-[7px] tracking-widest whitespace-nowrap"
                                    style={{ color: activeStep >= i ? step.color : "#333" }}
                                >
                                    {step.label}
                                </span>
                            </button>

                            {/* Connector line */}
                            {i < STEPS.length - 1 && (
                                <div className="flex-1 h-[3px] mx-2" style={{ background: "#1a1a1a" }}>
                                    <div
                                        className="h-full transition-all duration-500"
                                        style={{
                                            width: activeStep > i ? "100%" : "0%",
                                            background: STEPS[i].color,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Step cards */}
                <div className="grid md:grid-cols-3 gap-4">
                    {STEPS.map((step, i) => {
                        const isActive = activeStep === i;
                        const isDone = activeStep > i;

                        return (
                            <div
                                key={step.num}
                                onClick={() => setActiveStep(i)}
                                className="flex flex-col cursor-pointer transition-all duration-150"
                                style={{
                                    border: `3px solid ${isActive ? step.color : isDone ? `rgba(${hexToRgb(step.color)}, 0.3)` : "#2a2a2a"}`,
                                    background: isActive ? `rgba(${hexToRgb(step.color)}, 0.06)` : "#111",
                                    boxShadow: isActive
                                        ? `4px 4px 0 #000, 0 0 20px rgba(${hexToRgb(step.color)}, 0.2)`
                                        : "3px 3px 0 #000",
                                    transform: isActive ? "translate(-2px,-2px)" : "translate(0,0)",
                                    opacity: isDone ? 0.7 : 1,
                                }}
                            >
                                {/* Top */}
                                <div
                                    className="flex items-center justify-between px-5 py-4"
                                    style={{ borderBottom: `2px solid ${isActive ? step.color : "#1a1a1a"}` }}
                                >
                                    {/* Step badge */}
                                    <div
                                        className="text-[8px] tracking-widest px-3 py-1 font-black"
                                        style={{
                                            background: isActive ? step.color : "#1a1a1a",
                                            color: isActive ? "#000" : "#444",
                                            border: `2px solid ${isActive ? step.color : "#2a2a2a"}`,
                                        }}
                                    >
                                        {isDone ? "✓ DONE" : step.label}
                                    </div>

                                    {/* Icon */}
                                    <span
                                        className="text-3xl"
                                        style={{
                                            filter: isActive ? "none" : "grayscale(0.6)",
                                            animation: isActive ? "float-step 2s ease-in-out infinite" : "none",
                                        }}
                                    >
                                        {step.icon}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-3 p-5 flex-1">
                                    <h3
                                        className="text-[10px] md:text-xs font-black leading-snug"
                                        style={{ color: isActive ? step.color : "#888" }}
                                    >
                                        {step.title}
                                    </h3>
                                    <p className="text-[9px] leading-loose" style={{ color: "#555" }}>
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Footer detail tag */}
                                <div
                                    className="px-5 py-3 text-[7px] tracking-widest"
                                    style={{
                                        borderTop: "1px solid #1a1a1a",
                                        color: isActive ? step.color : "#333",
                                    }}
                                >
                                    {step.detail}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Active step NPC dialogue */}
                <div
                    className="mt-8 flex gap-4 items-start p-4"
                    style={{ border: "3px solid #1a1a1a", background: "#0d0d0d" }}
                >
                    <span className="text-2xl shrink-0">🧙</span>
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] tracking-widest" style={{ color: "#f7d51d" }}>
                            ★ FORGE MASTER
                        </span>
                        <p className="text-[10px] leading-loose" style={{ color: "#666" }}>
                            {activeStep === 0 && "Drop your script and I'll handle the rest. Choose your platform and format first."}
                            {activeStep === 1 && "Pick a voice, set the vibe. Save your style as a preset and reuse it on every future quest."}
                            {activeStep === 2 && "⚔️ LOOT ACQUIRED! Your video is ready to post. 9:16, 16:9, 1:1 — all forged at once."}
                        </p>
                    </div>
                    {/* Blinking cursor */}
                    <span
                        className="text-xs shrink-0 mt-auto"
                        style={{ color: STEPS[activeStep].color, opacity: blink ? 1 : 0 }}
                    >
                        ▼
                    </span>
                </div>

            </div>

            <style>{`
                @keyframes float-step {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-5px); }
                }
            `}</style>
        </section>
    );
}

function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}