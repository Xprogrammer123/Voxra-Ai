"use client";

import { useProjectStore } from "@/store/useProjectStore";

const PRESETS = [
    { id: "p1", name: "HORMOZI STYLE", icon: "💛", color: "#f7d51d", desc: "Bold yellow text, fast cuts, emojis." },
    { id: "p2", name: "MINIMALIST",    icon: "⬜", color: "#ffffff", desc: "Clean white sans-serif, slow zooms." },
    { id: "p3", name: "GAMER",         icon: "🎮", color: "#92cc41", desc: "Pixel fonts, neon colors, VHS effects." },
    { id: "p4", name: "CINEMATIC",     icon: "🎬", color: "#e76e55", desc: "No text, widescreen bars, dramatic grade." },
];

export function StyleStep() {
    const { stylePreset, setStylePreset } = useProjectStore();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span style={{ color: "#92cc41" }}>★</span>
                    <h2 className="text-xl font-black tracking-widest uppercase" style={{ color: "#92cc41", textShadow: "2px 2px 0 #000" }}>
                        FORGE YOUR AESTHETIC
                    </h2>
                </div>
                <p className="text-[10px] tracking-widest" style={{ color: "#555" }}>
                    Apply a visual preset for subtitles and pacing.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {PRESETS.map(p => {
                    const isSelected = stylePreset === p.id;
                    return (
                        <button
                            key={p.id}
                            onClick={() => setStylePreset(p.id)}
                            className="flex flex-col gap-3 p-4 text-left transition-all duration-100 relative"
                            style={{
                                background: isSelected ? `${p.color}10` : "#0a0a0a",
                                border: `3px solid ${isSelected ? p.color : "#1e1e1e"}`,
                                boxShadow: isSelected ? `4px 4px 0 #000, 0 0 16px ${p.color}33` : "none",
                            }}
                        >
                            {isSelected && (
                                <span
                                    className="absolute top-2 right-2 text-[8px] font-black px-2 py-0.5"
                                    style={{ background: p.color, color: "#000" }}
                                >
                                    EQUIPPED
                                </span>
                            )}
                            <span className="text-3xl">{p.icon}</span>
                            <span className="text-xs font-black tracking-widest"
                                style={{ color: isSelected ? p.color : "#666" }}>
                                {p.name}
                            </span>
                            <span className="text-[10px] leading-relaxed" style={{ color: "#444" }}>{p.desc}</span>
                        </button>
                    );
                })}
            </div>

            {/* Custom style CTA */}
            <button
                className="flex flex-col items-center gap-2 py-5 w-full transition-all duration-100"
                style={{ background: "#0a0a0a", border: "3px dashed #1e1e1e" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#333")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1e1e1e")}
            >
                <span className="text-3xl">⚙️</span>
                <span className="text-xs font-black tracking-widest" style={{ color: "#444" }}>CUSTOM STYLE</span>
                <span className="text-[9px]" style={{ color: "#333" }}>Pro & Studio users only</span>
            </button>
        </div>
    );
}