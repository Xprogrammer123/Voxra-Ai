"use client";

import { useState } from "react";
import { videos, projects } from "@/lib/schema";

const PLATFORM_COLORS: Record<string, string> = {
    tiktok: "#e76e55",
    reels: "#b06aee",
    shorts: "#92cc41",
    youtube: "#209cee",
    default: "#f7d51d",
};

const FILTERS = ["ALL", "9:16", "16:9", "1:1"];

function seededRandom(seed: number) {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

// Pixel city buildings for video placeholder
function PixelCity({ color }: { color: string }) {
    const buildings = [18, 55, 30, 75, 20, 60, 40, 85, 25, 50];
    return (
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[2px]">
            {buildings.map((h, i) => (
                <div key={i} style={{ width: 12, height: h, background: "#141418", borderTop: `2px solid ${color}44` }} />
            ))}
        </div>
    );
}

interface VideoWithProject {
    id: string;
    projectId: string;
    projectName: string;
    format: string | null;
    platform: string | null;
    createdAt: Date;
    durationSecs: number | null;
    outputUrls: any;
}

function VideoCard({ video }: { video: VideoWithProject }) {
    const [hovered, setHovered] = useState(false);
    const platform = video.platform?.toLowerCase() || "default";
    const color = PLATFORM_COLORS[platform] || PLATFORM_COLORS.default;
    const format = video.format || "9:16";
    const isVertical = format === "9:16";

    const videoUrl = video.outputUrls?.[format] || video.outputUrls?.[Object.keys(video.outputUrls || {})[0]];

    const handleDownload = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!videoUrl) return;

        try {
            const response = await fetch(videoUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `voxra-${video.projectName.toLowerCase().replace(/\s+/g, "-")}-${video.id.slice(0, 5)}.mp4`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error("Download failed:", err);
            // Fallback: open in new tab
            window.open(videoUrl, "_blank");
        }
    };

    return (
        <div
            className="flex flex-col transition-all duration-150"
            style={{
                background: "#0a0a0a",
                border: `3px solid ${hovered ? color : "#1a1a1a"}`,
                boxShadow: hovered ? `4px 4px 0 #000, 0 0 20px ${color}33` : "4px 4px 0 #000",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Video preview */}
            <div
                className="relative overflow-hidden flex items-center justify-center"
                style={{
                    aspectRatio: isVertical ? "9/16" : format === "1:1" ? "1/1" : "16/9",
                    background: "linear-gradient(180deg, #050510 0%, #0a0a20 60%, #111118 100%)",
                    maxHeight: isVertical ? 350 : undefined,
                }}
            >
                {/* Scanlines */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)"
                }} />

                {videoUrl ? (
                    <video
                        src={videoUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                        }}
                    />
                ) : (
                    <>
                        <PixelCity color={color} />
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="text-2xl font-black" style={{ color, textShadow: `0 0 10px ${color}88`, fontFamily: "monospace" }}>
                                📹
                            </div>
                            <span className="text-[8px] tracking-widest font-black" style={{ color: "#333" }}>
                                NO SIGNAL
                            </span>
                        </div>
                    </>
                )}

                {/* Duration badge */}
                {video.durationSecs && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 text-[8px] font-black"
                        style={{ background: "rgba(0,0,0,0.85)", color: "#ddd", border: `1px solid #333` }}>
                        {Math.floor(video.durationSecs / 60)}:{String(video.durationSecs % 60).padStart(2, "0")}
                    </div>
                )}

                {/* Platform badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 text-[7px] font-black tracking-widest"
                    style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>
                    {platform.toUpperCase()}
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3 p-4" style={{ borderTop: "2px solid #1a1a1a" }}>
                <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-black tracking-widest truncate" style={{ color: "#ddd" }}>
                        {video.projectName}
                    </span>
                    <span className="text-[8px] font-black px-2 py-0.5 shrink-0"
                        style={{ background: `${color}18`, color, border: `1px solid ${color}44` }}>
                        {format}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-widest" style={{ color: "#444" }}>
                        {new Date(video.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {/* Pixel bar */}
                <div className="h-[3px] w-full" style={{ background: "#111", border: "1px solid #1e1e1e" }}>
                    <div className="h-full" style={{
                        width: "100%",
                        background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 5px)`,
                    }} />
                </div>

                {/* Download button */}
                <button
                    onClick={handleDownload}
                    className="w-full text-xs font-black tracking-widest uppercase py-2.5 transition-all duration-100"
                    style={{
                        background: "#92cc41",
                        color: "#000",
                        border: "3px solid #fff",
                        boxShadow: "3px 3px 0 #000",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        (e.currentTarget as HTMLElement).style.transform = "translate(3px,3px)";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #000";
                        (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                    }}
                >
                    ↓ DOWNLOAD LOOT
                </button>
            </div>
        </div>
    );
}

export function GalleryClient({ initialVideos }: { initialVideos: VideoWithProject[] }) {
    const [filter, setFilter] = useState("ALL");

    const filtered = filter === "ALL" ? initialVideos : initialVideos.filter(v => v.format === filter);

    return (
        <div className="max-w-6xl mx-auto pb-12 px-4 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6"
                style={{ borderBottom: "3px solid #1a1a1a" }}>
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] tracking-widest" style={{ color: "#f7d51d", animation: "blink-kf 1s step-end infinite" }}>
                        ▶ INVENTORY
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none"
                        style={{ color: "#92cc41", textShadow: "4px 4px 0 #000, 0 0 40px rgba(146,204,65,0.25)" }}>
                        QUEST LOG
                    </h1>
                    <p className="text-[10px] tracking-widest uppercase mt-1" style={{ color: "#555" }}>
                        {initialVideos.length} VIDEOS FORGED
                    </p>
                </div>

                {/* Format filter */}
                <div className="flex gap-2">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className="text-[9px] font-black tracking-widest uppercase px-3 py-2 transition-all duration-100"
                            style={{
                                background: filter === f ? "#92cc41" : "transparent",
                                color: filter === f ? "#000" : "#444",
                                border: `2px solid ${filter === f ? "#92cc41" : "#1e1e1e"}`,
                                boxShadow: filter === f ? "2px 2px 0 #000" : "none",
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-16"
                    style={{ border: "3px dashed #1e1e1e", background: "#0a0a0a" }}>
                    <span className="text-4xl">📭</span>
                    <p className="text-sm font-black tracking-widest" style={{ color: "#333" }}>
                        NO LOOT FOUND IN INVENTORY.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(v => <VideoCard key={v.id} video={v} />)}
                </div>
            )}

            <style>{`
                @keyframes blink-kf {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }
            `}</style>
        </div>
    );
}
