"use client";

import { useProjectStore } from "@/store/useProjectStore";

const TONES = [
    { id: "narrator",   label: "NARRATOR",   icon: "🎬", desc: "Deep, authoritative, cinematic." },
    { id: "tutorial",   label: "TUTORIAL",   icon: "📚", desc: "Clear, upbeat, engaging." },
    { id: "mystery",    label: "MYSTERY",    icon: "🌑", desc: "Gritty, low pitch, intense." },
    { id: "energetic",  label: "ENERGETIC",  icon: "⚡", desc: "Fast-paced, hype, modern." },
];

export function VoiceStep() {
    const { voiceId, setVoiceId } = useProjectStore();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span style={{ color: "#209cee" }}>★</span>
                    <h2 className="text-xl font-black tracking-widest uppercase" style={{ color: "#209cee", textShadow: "2px 2px 0 #000" }}>
                        SELECT YOUR BARD
                    </h2>
                </div>
                <p className="text-[10px] tracking-widest" style={{ color: "#555" }}>
                    Veo 3 generates the voice. Pick a tone to guide the narration style.
                </p>
            </div>

            {/* Veo 3 badge */}
            <div className="flex items-center gap-3 px-4 py-3"
                style={{ background: "#00001a", border: "2px solid #209cee33" }}>
                <div className="w-6 h-6 flex items-center justify-center text-[8px] font-black shrink-0"
                    style={{ background: "#209cee", color: "#000", border: "2px solid #fff" }}>
                    AI
                </div>
                <span className="text-[10px] leading-loose" style={{ color: "#666" }}>
                    Voice is generated natively by <span style={{ color: "#209cee" }}>Veo 3</span>. No external TTS required.
                </span>
            </div>

            {/* Tone selector */}
            <div className="grid grid-cols-2 gap-3">
                {TONES.map(t => {
                    const isSelected = voiceId === t.id;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setVoiceId(t.id)}
                            className="flex flex-col gap-2 p-4 text-left transition-all duration-100"
                            style={{
                                background: isSelected ? "#00001a" : "#0a0a0a",
                                border: `3px solid ${isSelected ? "#209cee" : "#1e1e1e"}`,
                                boxShadow: isSelected ? "4px 4px 0 #000, 0 0 12px rgba(32,156,238,0.3)" : "none",
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-2xl">{t.icon}</span>
                                {isSelected && (
                                    <span className="text-[8px] font-black px-2 py-0.5"
                                        style={{ background: "#209cee", color: "#000" }}>
                                        EQUIPPED
                                    </span>
                                )}
                            </div>
                            <span className="text-xs font-black tracking-widest"
                                style={{ color: isSelected ? "#209cee" : "#555" }}>
                                {t.label}
                            </span>
                            <span className="text-[10px]" style={{ color: "#444" }}>{t.desc}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}