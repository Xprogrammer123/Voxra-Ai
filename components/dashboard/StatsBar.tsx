"use client";

const STATS = [
    { icon: "⚔", label: "THIS MONTH",     valueKey: "videosThisMonth", color: "#e76e55", bg: "#1a0000", border: "#3a0000" },
    { icon: "📜", label: "TOTAL VIDEOS",   valueKey: "totalVideos",     color: "#209cee", bg: "#00001a", border: "#00003a" },
    { icon: "🎨", label: "ACTIVE PRESETS", valueKey: "activePresets",   color: "#f7d51d", bg: "#1a1400", border: "#3a2800" },
    { icon: "💎", label: "CREDITS",        valueKey: "creditsRemaining",color: "#92cc41", bg: "#0a1400", border: "#1a2800" },
];

interface StatsBarProps {
    videosThisMonth: number;
    totalVideos: number;
    activePresets: number;
    creditsRemaining: number;
}

export function StatsBar({ stats }: { stats: StatsBarProps }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {STATS.map(({ icon, label, valueKey, color, bg, border }) => {
                const value = stats[valueKey as keyof StatsBarProps];
                return (
                    <div
                        key={valueKey}
                        style={{
                            background: bg,
                            border: `3px solid ${border}`,
                            boxShadow: `4px 4px 0 #000, 0 0 12px ${color}22`,
                        }}
                        className="flex flex-col gap-3 p-4 relative overflow-hidden"
                    >
                        {/* Corner glow */}
                        <div
                            className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
                            style={{ background: `radial-gradient(circle at top right, ${color}22, transparent 70%)` }}
                        />

                        {/* Label */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm">{icon}</span>
                            <span className="text-[9px] tracking-widest uppercase" style={{ color: "#555" }}>
                                {label}
                            </span>
                        </div>

                        {/* Value */}
                        <div
                            className="text-3xl font-black leading-none"
                            style={{
                                color,
                                textShadow: `2px 2px 0 #000, 0 0 20px ${color}66`,
                            }}
                        >
                            {value}
                        </div>

                        {/* Pixel bar */}
                        <div className="h-[4px] w-full" style={{ background: "#111", border: "1px solid #222" }}>
                            <div
                                className="h-full"
                                style={{
                                    width: "100%",
                                    background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)`,
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}