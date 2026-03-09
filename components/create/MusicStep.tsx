"use client";

import { useProjectStore } from "@/store/useProjectStore";

const TRACKS = [
    { id: "m1",   name: "Epic Boss Fight", genre: "ORCHESTRAL", color: "#e76e55", desc: "Intense, dramatic, heavy." },
    { id: "m2",   name: "Cyberpunk City",  genre: "SYNTHWAVE",  color: "#b06aee", desc: "Dark, bass-heavy, fast." },
    { id: "m3",   name: "Lo-Fi Tavern",   genre: "CHILL",      color: "#f7d51d", desc: "Relaxed, slow, melodic." },
    { id: "m4",   name: "Cinematic Drone",genre: "AMBIENT",    color: "#209cee", desc: "Spooky, atmospheric, quiet." },
    { id: "none", name: "No Music",       genre: "SILENCE",    color: "#333",    desc: "Voice & SFX only." },
];

export function MusicStep() {
    const { musicId, setMusicId } = useProjectStore();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span style={{ color: "#e76e55" }}>★</span>
                    <h2 className="text-xl font-black tracking-widest uppercase" style={{ color: "#e76e55", textShadow: "2px 2px 0 #000" }}>
                        SET THE VIBE
                    </h2>
                </div>
                <p className="text-[10px] tracking-widest" style={{ color: "#555" }}>
                    Choose background music to underscore your narrative.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                {TRACKS.map(t => {
                    const isSelected = musicId === t.id;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setMusicId(t.id)}
                            className="flex items-center gap-4 px-4 py-3 text-left w-full transition-all duration-100"
                            style={{
                                background: isSelected ? `${t.color}12` : "#0a0a0a",
                                border: `3px solid ${isSelected ? t.color : "#1e1e1e"}`,
                                boxShadow: isSelected ? `4px 4px 0 #000, 0 0 12px ${t.color}33` : "none",
                            }}
                        >
                            {/* Color dot */}
                            <div className="w-3 h-3 shrink-0" style={{
                                background: isSelected ? t.color : "#222",
                                border: `2px solid ${isSelected ? t.color : "#333"}`,
                                boxShadow: isSelected ? `0 0 8px ${t.color}88` : "none",
                            }} />

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-black tracking-widest truncate"
                                        style={{ color: isSelected ? t.color : "#888" }}>
                                        {t.name}
                                    </span>
                                    <span className="text-[8px] font-black px-2 py-0.5 shrink-0"
                                        style={{
                                            background: isSelected ? `${t.color}22` : "#111",
                                            border: `1px solid ${isSelected ? t.color : "#222"}`,
                                            color: isSelected ? t.color : "#444",
                                        }}>
                                        {t.genre}
                                    </span>
                                </div>
                                <span className="text-[9px]" style={{ color: "#444" }}>{t.desc}</span>
                            </div>

                            {isSelected && (
                                <span className="text-[9px] font-black shrink-0" style={{ color: t.color }}>▶ EQUIPPED</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}