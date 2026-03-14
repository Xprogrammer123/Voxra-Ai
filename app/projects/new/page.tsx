"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PLATFORMS = [
    { value: "tiktok",   label: "TikTok",           color: "#e76e55" },
    { value: "reels",    label: "Instagram Reels",  color: "#b06aee" },
    { value: "shorts",   label: "YouTube Shorts",   color: "#92cc41" },
    { value: "youtube",  label: "YouTube Longform", color: "#209cee" },
    { value: "linkedin", label: "LinkedIn",         color: "#f7d51d" },
];

const FORMATS = [
    { value: "9:16", label: "Vertical 9:16",   icon: "▯" },
    { value: "16:9", label: "Horizontal 16:9", icon: "▭" },
    { value: "1:1",  label: "Square 1:1",      icon: "□" },
];

const GENERATION_MODES = [
    {
        value: "image",
        label: "Image Slideshow",
        icon: "🖼",
        desc: "Free · Imagen 3",
        color: "#92cc41",
        detail: "Generates scene images stitched into a video",
    },
    {
        value: "video",
        label: "AI Video",
        icon: "🎬",
        desc: "Paid · Veo 3",
        color: "#209cee",
        detail: "Full AI video generation via Veo 3",
    },
];

const LOADER_FRAMES = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loaderFrame, setLoaderFrame] = useState(0);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [platform, setPlatform] = useState("tiktok");
    const [format, setFormat] = useState("9:16");
    const [generationMode, setGenerationMode] = useState<"image" | "video">("image");

    const selectedPlatform = PLATFORMS.find(p => p.value === platform)!;
    const selectedMode = GENERATION_MODES.find(m => m.value === generationMode)!;

    const handleCreate = async () => {
        if (!name || loading) return;
        setLoading(true);
        setError("");

        let frame = 0;
        const interval = setInterval(() => {
            frame = (frame + 1) % LOADER_FRAMES.length;
            setLoaderFrame(frame);
        }, 80);

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, platform, format, generationMode }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? "Failed to create project");
            }

            const { id } = await res.json();
            router.push(`/projects/${id}/create`);
        } catch (e: any) {
            setError(e.message ?? "Something went wrong");
            setLoading(false);
        } finally {
            clearInterval(interval);
        }
    };

    return (
        <div className="max-w-xl mx-auto pt-12 px-4 pb-16">

            {loading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
                    style={{ background: "rgba(0,0,0,0.92)" }}>
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)"
                    }} />
                    <div className="relative flex flex-col items-center gap-4">
                        <div className="text-6xl font-black" style={{
                            color: "#92cc41",
                            textShadow: "0 0 30px rgba(146,204,65,0.8)",
                            fontFamily: "monospace",
                        }}>
                            {LOADER_FRAMES[loaderFrame]}
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-black tracking-widest" style={{ color: "#92cc41" }}>
                                INITIALIZING QUEST
                            </span>
                            <span className="text-[10px] tracking-widest" style={{ color: "#555" }}>
                                FORGING {name.toUpperCase()}...
                            </span>
                        </div>
                        <div className="w-48 h-4" style={{ background: "#111", border: "2px solid #1e1e1e" }}>
                            <div className="h-full" style={{
                                background: "repeating-linear-gradient(90deg, #92cc41 0px, #92cc41 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)",
                                animation: "progress-fill 1.8s linear forwards",
                            }} />
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col items-center gap-3 mb-10 text-center">
                <span className="text-[9px] tracking-widest" style={{ color: "#f7d51d", animation: "blink-kf 1s step-end infinite" }}>
                    ▶ NEW QUEST AVAILABLE
                </span>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none"
                    style={{ color: "#92cc41", textShadow: "4px 4px 0 #000, 0 0 40px rgba(146,204,65,0.25)" }}>
                    NEW QUEST
                </h1>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: "#555" }}>
                    Define the parameters of your next video
                </p>
            </div>

            {error && (
                <div className="mb-6 px-4 py-3 text-xs font-black tracking-widest"
                    style={{ background: "#1a0000", border: "2px solid #e76e55", color: "#e76e55" }}>
                    ⚠ {error.toUpperCase()}
                </div>
            )}

            <div style={{ border: "3px solid #1a1a1a", background: "#0a0a0a", boxShadow: "6px 6px 0 #000" }}>

                <div className="flex items-center gap-3 px-6 py-4"
                    style={{ borderBottom: "2px solid #1a1a1a", background: "#0d0d0d" }}>
                    <span style={{ color: "#f7d51d" }}>★</span>
                    <span className="text-sm font-black tracking-widest uppercase" style={{ color: "#f7d51d" }}>
                        QUEST SETUP
                    </span>
                    <div className="flex-1 h-[2px]" style={{
                        background: "repeating-linear-gradient(90deg, #f7d51d22 0px, #f7d51d22 4px, transparent 4px, transparent 8px)"
                    }} />
                </div>

                <div className="px-6 py-6 flex flex-col gap-8">

                    {/* Project name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[9px] tracking-widest uppercase" style={{ color: "#555" }}>
                            PROJECT NAME
                        </label>
                        <input
                            className="w-full bg-transparent font-black text-lg px-4 py-3 outline-none transition-all duration-150 placeholder:font-normal"
                            style={{
                                color: "#ddd",
                                border: "2px solid #1e1e1e",
                                boxShadow: name ? "3px 3px 0 #92cc41" : "3px 3px 0 #000",
                            }}
                            placeholder="e.g. Daily Tech Tips"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onFocus={e => (e.currentTarget.style.borderColor = "#92cc41")}
                            onBlur={e => (e.currentTarget.style.borderColor = "#1e1e1e")}
                        />
                    </div>

                    {/* Generation mode */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[9px] tracking-widest uppercase" style={{ color: "#555" }}>
                            GENERATION MODE
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {GENERATION_MODES.map(m => (
                                <button
                                    key={m.value}
                                    onClick={() => setGenerationMode(m.value as "image" | "video")}
                                    className="flex flex-col gap-2 px-4 py-4 text-left transition-all duration-100"
                                    style={{
                                        background: generationMode === m.value ? `${m.color}18` : "#0d0d0d",
                                        border: `2px solid ${generationMode === m.value ? m.color : "#1e1e1e"}`,
                                        boxShadow: generationMode === m.value ? "3px 3px 0 #000" : "none",
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl">{m.icon}</span>
                                        {generationMode === m.value && (
                                            <span className="text-[8px] font-black px-1 py-0.5"
                                                style={{ background: m.color, color: "#000" }}>
                                                SELECTED
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs font-black tracking-widest uppercase"
                                        style={{ color: generationMode === m.value ? m.color : "#555" }}>
                                        {m.label}
                                    </span>
                                    <span className="text-[8px] tracking-widest"
                                        style={{ color: generationMode === m.value ? m.color + "aa" : "#333" }}>
                                        {m.desc}
                                    </span>
                                    <span className="text-[8px] leading-relaxed" style={{ color: "#444" }}>
                                        {m.detail}
                                    </span>
                                </button>
                            ))}
                        </div>
                        {generationMode === "video" && (
                            <div className="px-3 py-2 text-[9px] tracking-widest"
                                style={{ background: "#00001a", border: "1px solid #209cee33", color: "#209cee88" }}>
                                ⚠ REQUIRES BILLING — Veo 3 is a paid model
                            </div>
                        )}
                        {generationMode === "image" && (
                            <div className="px-3 py-2 text-[9px] tracking-widest"
                                style={{ background: "#001400", border: "1px solid #92cc4133", color: "#92cc4188" }}>
                                ✓ FREE TIER — Imagen 3 + FFmpeg slideshow pipeline
                            </div>
                        )}
                    </div>

                    {/* Platform */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[9px] tracking-widest uppercase" style={{ color: "#555" }}>
                            TARGET PLATFORM
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {PLATFORMS.map(p => (
                                <button key={p.value} onClick={() => setPlatform(p.value)}
                                    className="px-3 py-3 text-xs font-black tracking-widest uppercase text-left transition-all duration-100"
                                    style={{
                                        background: platform === p.value ? `${p.color}18` : "#0d0d0d",
                                        border: `2px solid ${platform === p.value ? p.color : "#1e1e1e"}`,
                                        color: platform === p.value ? p.color : "#444",
                                        boxShadow: platform === p.value ? "3px 3px 0 #000" : "none",
                                    }}>
                                    {platform === p.value && <span className="mr-1">▶</span>}
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Format */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[9px] tracking-widest uppercase" style={{ color: "#555" }}>
                            VIDEO FORMAT
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {FORMATS.map(f => (
                                <button key={f.value} onClick={() => setFormat(f.value)}
                                    className="flex flex-col items-center gap-2 py-4 text-xs font-black tracking-widest uppercase transition-all duration-100"
                                    style={{
                                        background: format === f.value ? "#92cc4118" : "#0d0d0d",
                                        border: `2px solid ${format === f.value ? "#92cc41" : "#1e1e1e"}`,
                                        color: format === f.value ? "#92cc41" : "#444",
                                        boxShadow: format === f.value ? "3px 3px 0 #000" : "none",
                                    }}>
                                    <span className="text-2xl">{f.icon}</span>
                                    <span className="text-[9px]">{f.value}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex items-center justify-between"
                    style={{ borderTop: "2px solid #1a1a1a", background: "#0d0d0d" }}>
                    <div className="flex flex-col gap-1">
                        {name && (
                            <>
                                <span className="text-[9px] tracking-widest" style={{ color: "#555" }}>READY TO FORGE</span>
                                <span className="text-xs font-black" style={{ color: selectedPlatform.color }}>
                                    {name} · {platform.toUpperCase()} · {format} · {selectedMode.label.toUpperCase()}
                                </span>
                            </>
                        )}
                    </div>
                    <button
                        onClick={handleCreate}
                        disabled={!name || loading}
                        className="text-sm font-black tracking-widest uppercase px-6 py-3 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{
                            background: name ? "#92cc41" : "#1a1a1a",
                            color: name ? "#000" : "#333",
                            border: `3px solid ${name ? "#fff" : "#222"}`,
                            boxShadow: name ? "4px 4px 0 #000" : "none",
                        }}
                        onMouseEnter={e => {
                            if (!name) return;
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                            (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.boxShadow = name ? "4px 4px 0 #000" : "none";
                            (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                        }}
                    >
                        ENTER THE QUEST →
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes blink-kf {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }
                @keyframes progress-fill {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
            `}</style>
        </div>
    );
}