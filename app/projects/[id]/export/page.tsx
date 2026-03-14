"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FORMATS = [
    { value: "9:16", icon: "▯", label: "Vertical",   desc: "TikTok / Reels / Shorts" },
    { value: "16:9", icon: "▭", label: "Horizontal", desc: "YouTube / Landscape" },
    { value: "1:1",  icon: "□", label: "Square",     desc: "Instagram / LinkedIn" },
];

export default function ExportPage({ params, searchParams }: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ videoId?: string }>;
}) {
    const { id } = use(params);
    const { videoId } = use(searchParams);
    const router = useRouter();

    const [formats, setFormats] = useState<Record<string, boolean>>({ "9:16": true, "16:9": false, "1:1": false });
    const [removeWatermark, setRemoveWatermark] = useState(false);
    const [exporting, setExporting] = useState(false);

    const toggleFormat = (key: string) => setFormats(prev => ({ ...prev, [key]: !prev[key] }));
    const selectedCount = Object.values(formats).filter(Boolean).length;

    const handleExport = () => {
        setExporting(true);
        setTimeout(() => {
            setExporting(false);
            router.push("/gallery");
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">

            {exporting && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
                    style={{ background: "rgba(0,0,0,0.94)" }}>
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)"
                    }} />
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-5xl">📦</span>
                        <span className="text-sm font-black tracking-widest" style={{ color: "#209cee" }}>PACKAGING LOOT...</span>
                        <div className="w-48 h-4" style={{ background: "#111", border: "2px solid #1e1e1e" }}>
                            <div className="h-full" style={{
                                background: "repeating-linear-gradient(90deg, #209cee 0px, #209cee 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)",
                                animation: "progress-fill 2s linear forwards",
                            }} />
                        </div>
                    </div>
                    <style>{`@keyframes progress-fill { from { width: 0% } to { width: 100% } }`}</style>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col items-center gap-3 mb-10 text-center">
                <span className="text-[9px] tracking-widest" style={{ color: "#209cee", animation: "blink-kf 1s step-end infinite" }}>
                    ▶ FINAL STEP
                </span>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none"
                    style={{ color: "#209cee", textShadow: "4px 4px 0 #000, 0 0 40px rgba(32,156,238,0.25)" }}>
                    EXPORT LOOT
                </h1>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: "#555" }}>
                    Select formats and download your video
                </p>
            </div>

            <div style={{ border: "3px solid #1a1a1a", background: "#0a0a0a", boxShadow: "6px 6px 0 #000" }}>

                {/* Section header */}
                <div className="flex items-center gap-3 px-6 py-4"
                    style={{ borderBottom: "2px solid #1a1a1a", background: "#0d0d0d" }}>
                    <span style={{ color: "#209cee" }}>★</span>
                    <span className="text-sm font-black tracking-widest" style={{ color: "#209cee" }}>EXPORT OPTIONS</span>
                    <div className="flex-1 h-[2px]" style={{
                        background: "repeating-linear-gradient(90deg, #209cee22 0px, #209cee22 4px, transparent 4px, transparent 8px)"
                    }} />
                </div>

                <div className="px-6 py-6 flex flex-col gap-8">

                    {/* Format picker */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[9px] tracking-widest uppercase" style={{ color: "#555" }}>
                            OUTPUT FORMATS
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {FORMATS.map(f => (
                                <button key={f.value} onClick={() => toggleFormat(f.value)}
                                    className="flex flex-col items-center gap-2 py-5 transition-all duration-100"
                                    style={{
                                        background: formats[f.value] ? "#209cee18" : "#0d0d0d",
                                        border: `2px solid ${formats[f.value] ? "#209cee" : "#1e1e1e"}`,
                                        boxShadow: formats[f.value] ? "3px 3px 0 #000" : "none",
                                    }}>
                                    <span className="text-3xl">{f.icon}</span>
                                    <span className="text-[9px] font-black tracking-widest"
                                        style={{ color: formats[f.value] ? "#209cee" : "#444" }}>
                                        {f.value}
                                    </span>
                                    <span className="text-[8px]" style={{ color: "#333" }}>{f.desc}</span>
                                    {formats[f.value] && (
                                        <span className="text-[8px] font-black px-1"
                                            style={{ background: "#209cee", color: "#000" }}>✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[9px] tracking-widest uppercase" style={{ color: "#555" }}>OPTIONS</label>

                        {/* 4K — locked */}
                        <div className="flex items-center justify-between px-4 py-3 opacity-50"
                            style={{ background: "#0d0d0d", border: "2px solid #1a1a1a" }}>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-black tracking-widest" style={{ color: "#888" }}>4K RESOLUTION</span>
                                <span className="text-[9px]" style={{ color: "#444" }}>Requires Creator plan</span>
                            </div>
                            <div className="w-10 h-5 flex items-center px-1"
                                style={{ background: "#111", border: "2px solid #222" }}>
                                <div className="w-3 h-3" style={{ background: "#333" }} />
                            </div>
                        </div>

                        {/* Remove watermark */}
                        <button onClick={() => setRemoveWatermark(p => !p)}
                            className="flex items-center justify-between px-4 py-3 transition-all duration-100"
                            style={{
                                background: removeWatermark ? "#209cee18" : "#0d0d0d",
                                border: `2px solid ${removeWatermark ? "#209cee" : "#1a1a1a"}`,
                            }}>
                            <div className="flex flex-col gap-1 text-left">
                                <span className="text-xs font-black tracking-widest"
                                    style={{ color: removeWatermark ? "#209cee" : "#888" }}>
                                    REMOVE WATERMARK
                                </span>
                                <span className="text-[9px]" style={{ color: "#444" }}>1 credit per video</span>
                            </div>
                            <div className="w-10 h-5 flex items-center px-1 transition-all"
                                style={{ background: removeWatermark ? "#209cee" : "#111", border: "2px solid #222" }}>
                                <div className="w-3 h-3 transition-all" style={{
                                    background: removeWatermark ? "#000" : "#333",
                                    marginLeft: removeWatermark ? "auto" : "0",
                                }} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 gap-4"
                    style={{ borderTop: "2px solid #1a1a1a", background: "#0d0d0d" }}>
                    <Link href={`/projects/${id}/preview${videoId ? `?taskId=${videoId}` : ""}`}>
                        <button className="text-xs font-black tracking-widest uppercase px-5 py-3"
                            style={{ background: "transparent", color: "#555", border: "3px solid #222", boxShadow: "3px 3px 0 #000" }}>
                            ← BACK
                        </button>
                    </Link>

                    <div className="flex items-center gap-3">
                        {selectedCount > 0 && (
                            <span className="text-[9px] tracking-widest" style={{ color: "#555" }}>
                                {selectedCount} FORMAT{selectedCount > 1 ? "S" : ""} SELECTED
                            </span>
                        )}
                        <button
                            onClick={handleExport}
                            disabled={exporting || selectedCount === 0}
                            className="text-sm font-black tracking-widest uppercase px-6 py-3 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{
                                background: selectedCount > 0 ? "#209cee" : "#1a1a1a",
                                color: selectedCount > 0 ? "#000" : "#333",
                                border: `3px solid ${selectedCount > 0 ? "#fff" : "#222"}`,
                                boxShadow: selectedCount > 0 ? "4px 4px 0 #000" : "none",
                            }}
                            onMouseEnter={e => {
                                if (!selectedCount) return;
                                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px)";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = selectedCount > 0 ? "4px 4px 0 #000" : "none";
                                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                            }}
                        >
                            ↓ DOWNLOAD LOOT
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blink-kf { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            `}</style>
        </div>
    );
}