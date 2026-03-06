"use client";

import { Badge } from "@/components/ui/8bit/badge";
import { useState } from "react";

const FEATURES = [
    {
        title: "YOU ARE IN CONTROL",
        desc: "Your script, style, voice, music. Voxra executes precisely. No surprises, no guesswork.",
        icon: "🎭",
        color: "#92cc41",
        stat: { label: "CONTROL", value: 100 },
    },
    {
        title: "MULTI-FORMAT EXPORT",
        desc: "9:16, 16:9, 1:1 in a single click. No extra rendering. All platforms covered.",
        icon: "📱",
        color: "#f7d51d",
        badge: { text: "NEW", bg: "#f7d51d" },
        stat: { label: "FORMATS", value: 3 },
    },
    {
        title: "REALISTIC VOICES",
        desc: "Powered by ElevenLabs. Multiple languages, tones, speeds. No robotic junk.",
        icon: "🎙️",
        color: "#e76e55",
        badge: { text: "HOT", bg: "#e76e55" },
        stat: { label: "VOICES", value: 30 },
    },
    {
        title: "SMART SUBTITLES",
        desc: "Word-timed captions via Whisper API. Highlight, box, outline — fully customizable.",
        icon: "📝",
        color: "#209cee",
        stat: { label: "ACCURACY", value: 98 },
    },
    {
        title: "YOUR BRAND ASSETS",
        desc: "Upload your clips, logos, and color palettes. Mix with stock or AI footage.",
        icon: "🎨",
        color: "#b06aee",
        stat: { label: "ASSETS", value: 99 },
    },
    {
        title: "PRESETS PER CLIENT",
        desc: "Save and reuse entire style configurations instantly. One click, on-brand every time.",
        icon: "⚡",
        color: "#92cc41",
        stat: { label: "TIME SAVED", value: 80 },
    },
];

export function Features() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section
            className="py-24 px-4"
            id="abilities"
            style={{ borderTop: "4px solid #2a2a2a", borderBottom: "4px solid #2a2a2a", background: "#0d0d0d" }}
        >
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 flex flex-col items-center gap-4">
                    <div
                        className="text-[9px] tracking-widest px-4 py-2 border-2"
                        style={{ color: "#209cee", borderColor: "#209cee", background: "rgba(32,156,238,0.06)" }}
                    >
                        ✦ SKILL TREE ✦
                    </div>
                    <h2
                        className="text-3xl md:text-5xl font-black uppercase leading-tight"
                        style={{ color: "#209cee", textShadow: "3px 3px 0 #000" }}
                    >
                        ◈ ABILITIES
                        <br />
                        <span style={{ color: "#fff" }}>UNLOCKED</span>
                    </h2>
                    <p className="text-[9px] tracking-widest" style={{ color: "#444" }}>
                        ALL SKILLS AVAILABLE FROM LEVEL 1
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FEATURES.map((f, i) => {
                        const isHovered = hovered === i;
                        return (
                            <div
                                key={i}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                className="relative flex flex-col gap-4 p-5 cursor-default transition-all duration-100"
                                style={{
                                    border: `3px solid ${isHovered ? f.color : "#2a2a2a"}`,
                                    background: isHovered ? `rgba(${hexToRgb(f.color)}, 0.05)` : "#111",
                                    boxShadow: isHovered ? `4px 4px 0 #000, 0 0 16px rgba(${hexToRgb(f.color)}, 0.15)` : "3px 3px 0 #000",
                                    transform: isHovered ? "translate(-1px,-1px)" : "translate(0,0)",
                                }}
                            >
                                {/* Badge */}
                                {f.badge && (
                                    <div
                                        className="absolute -top-3 -right-3 text-[8px] px-2 py-1 font-black border-2 border-black"
                                        style={{ background: f.badge.bg, color: "#000" }}
                                    >
                                        {f.badge.text}
                                    </div>
                                )}

                                {/* Icon + title row */}
                                <div className="flex items-center gap-4">
                                    <div
                                        className="text-2xl w-12 h-12 flex items-center justify-center shrink-0 border-2"
                                        style={{ borderColor: f.color, background: `rgba(${hexToRgb(f.color)}, 0.08)` }}
                                    >
                                        {f.icon}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span
                                            className="text-[9px] md:text-[10px] font-black leading-snug tracking-wide"
                                            style={{ color: isHovered ? f.color : "#ccc" }}
                                        >
                                            {f.title}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-[9px] md:text-[10px] leading-loose" style={{ color: "#666" }}>
                                    {f.desc}
                                </p>

                                {/* Stat bar */}
                                <div className="flex flex-col gap-1 mt-auto pt-2" style={{ borderTop: "1px solid #1a1a1a" }}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[7px] tracking-widest" style={{ color: "#444" }}>
                                            {f.stat.label}
                                        </span>
                                        <span className="text-[7px]" style={{ color: f.color }}>
                                            {f.stat.value}{f.stat.value <= 100 && f.stat.label !== "VOICES" && f.stat.label !== "FORMATS" ? "%" : "+"}
                                        </span>
                                    </div>
                                    <div className="h-[6px] w-full" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
                                        <div
                                            className="h-full transition-all duration-500"
                                            style={{
                                                width: isHovered
                                                    ? `${Math.min(f.stat.value, 100)}%`
                                                    : "0%",
                                                background: `repeating-linear-gradient(90deg, ${f.color} 0px, ${f.color} 6px, rgba(0,0,0,0.2) 6px, rgba(0,0,0,0.2) 8px)`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

// Helper to convert hex to rgb values for rgba()
function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}