"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PLATFORMS = [
    { value: "tiktok",    label: "TikTok",            color: "#e76e55" },
    { value: "reels",     label: "Instagram Reels",   color: "#b06aee" },
    { value: "shorts",    label: "YouTube Shorts",    color: "#92cc41" },
    { value: "youtube",   label: "YouTube Longform",  color: "#209cee" },
    { value: "linkedin",  label: "LinkedIn",          color: "#f7d51d" },
];

const FORMATS = [
    { value: "9:16",  label: "Vertical 9:16",    icon: "▯" },
    { value: "16:9",  label: "Horizontal 16:9",  icon: "▭" },
    { value: "1:1",   label: "Square 1:1",       icon: "□" },
];

const LOADER_FRAMES = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loaderFrame, setLoaderFrame] = useState(0);
    const [name, setName] = useState("");
    const [platform, setPlatform] = useState("tiktok");
    const [format, setFormat] = useState("9:16");

    const selectedPlatform = PLATFORMS.find(p => p.value === platform)!;

    const handleCreate = async () => {
        if (!name || loading) return;
        setLoading(true);

        // Animate loader
        let frame = 0;
        const interval = setInterval(() => {
            frame = (frame + 1) % LOADER_FRAMES.length;
            setLoaderFrame(frame);
        }, 80);

        try {
            await new Promise(r => setTimeout(r, 1800)); // simulate API
            const fakeId = "proj-" + Math.random().toString(36).substr(2, 9);
            router.push(`/projects/${fakeId}/create`);
        } catch (e) {
            console.error(e);
            setLoading(false);
        } finally {
            clearInterval(interval);
        }
    };

    return (
        <div className="max-w-xl mx-auto pt-12 px-4 pb-16">

            {/* Loading overlay */}
            {loading && (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
                    style={{ background: "rgba(0,0,0,0.92)" }}
                >
                    {/* Scanlines */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)"
                    }} />

                    <div className="relative flex flex-col items-center gap-4">
                        <div
                            className="text-6xl font-black"
                            style={{
                                color: "#92cc41",
                                textShadow: "0 0 30px rgba(146,204,65,0.8)",
                                fontFamily: "monospace",
                            }}
                        >
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

                        {/* Pixel progress bar */}
                        <div className="w-48 h-4" style={{ background: "#111", border: "2px solid #1e1e1e" }}>
                            <div
                                className="h-full"
                                style={{
                                    background: "repeating-linear-gradient(90deg, #92cc41 0px, #92cc41 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)",
                                    animation: "progress-fill 1.8s linear forwards",
                                }}
                            />
                        </div>
                    </div>

                    <style>{`
                        @keyframes progress-fill {
                            from { width: 0%; }
                            to   { width: 100%; }
                        }
                    `}</style>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col items-center gap-3 mb-10 text-center">
                <span className="text-[9px] tracking-widest" style={{ color: "#f7d51d", animation: "blink-kf 1s step-end infinite" }}>
                    ▶ NEW QUEST AVAILABLE
                </span>
                <h1
                    className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none"
                    style={{
                        color: "#92cc41",
                        textShadow: "4px 4px 0 #000, 0 0 40px rgba(146,204,65,0.25)",
                    }}
                >
                    NEW QUEST
                </h1>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: "#555" }}>
                    Define the parameters of your next video
                </p>
            </div>

            {/* Card */}
            <div style={{ border: "3px solid #1a1a1a", background: "#0a0a0a", boxShadow: "6px 6px 0 #000" }}>

                {/* Card header */}
                <div
                    className="flex items-center gap-3 px-6 py-4"
                    style={{ borderBottom: "2px solid #1a1a1a", background: "#0d0d0d" }}
                >
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

                    {/* Platform */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[9px] tracking-widest uppercase" style={{ color: "#555" }}>
                            TARGET PLATFORM
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {PLATFORMS.map(p => (
                                <button
                                    key={p.value}
                                    onClick={() => setPlatform(p.value)}
                                    className="px-3 py-3 text-xs font-black tracking-widest uppercase text-left transition-all duration-100"
                                    style={{
                                        background: platform === p.value ? `${p.color}18` : "#0d0d0d",
                                        border: `2px solid ${platform === p.value ? p.color : "#1e1e1e"}`,
                                        color: platform === p.value ? p.color : "#444",
                                        boxShadow: platform === p.value ? `3px 3px 0 #000` : "none",
                                    }}
                                >
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
                                <button
                                    key={f.value}
                                    onClick={() => setFormat(f.value)}
                                    className="flex flex-col items-center gap-2 py-4 text-xs font-black tracking-widest uppercase transition-all duration-100"
                                    style={{
                                        background: format === f.value ? "#92cc4118" : "#0d0d0d",
                                        border: `2px solid ${format === f.value ? "#92cc41" : "#1e1e1e"}`,
                                        color: format === f.value ? "#92cc41" : "#444",
                                        boxShadow: format === f.value ? "3px 3px 0 #000" : "none",
                                    }}
                                >
                                    <span className="text-2xl">{f.icon}</span>
                                    <span className="text-[9px]">{f.value}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{ borderTop: "2px solid #1a1a1a", background: "#0d0d0d" }}
                >
                    <div className="flex flex-col gap-1">
                        {name && (
                            <>
                                <span className="text-[9px] tracking-widest" style={{ color: "#555" }}>READY TO FORGE</span>
                                <span className="text-xs font-black" style={{ color: selectedPlatform.color }}>
                                    {name} · {platform.toUpperCase()} · {format}
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
            `}</style>
        </div>
    );
}