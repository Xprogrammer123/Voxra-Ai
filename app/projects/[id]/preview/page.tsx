"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const PHASE_LABELS: Record<string, string> = {
    footage: "SUMMONING VEO 3",
    subtitles: "FORGING SUBTITLES",
    assembly: "ASSEMBLING FOOTAGE",
    done: "LOOT ACQUIRED",
    failed: "QUEST FAILED",
};

const PHASE_MESSAGES: Record<string, string[]> = {
    footage: ["Veo 3 is painting your world...", "AI neurons firing at full power...", "Rendering cinematic magic..."],
    subtitles: ["Carving words into stone...", "Timing the narrator's cadence..."],
    assembly: ["Stitching the final reel...", "Almost there, adventurer..."],
    done: ["Your video has been forged!", "The quest is complete!"],
    failed: ["Something went wrong in the forge...", "The spirits were not cooperative..."],
};

const LOADER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function PixelBar({ pct, color }: { pct: number; color: string }) {
    return (
        <div className="w-full h-5" style={{ background: "#111", border: "2px solid #1e1e1e" }}>
            <div
                className="h-full transition-all duration-700"
                style={{
                    width: `${pct}%`,
                    background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 6px, rgba(0,0,0,0.25) 6px, rgba(0,0,0,0.25) 8px)`,
                }}
            />
        </div>
    );
}

export default function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const searchParams = useSearchParams();
    const taskId = searchParams.get("taskId");

    const [status, setStatus] = useState("processing");
    const [phase, setPhase] = useState("footage");
    const [progress, setProgress] = useState(0);
    const [output, setOutput] = useState<Record<string, string> | null>(null);
    const [msgIdx, setMsgIdx] = useState(0);
    const [loaderFrame, setLoaderFrame] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const loaderRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!taskId) return;

        // Loader animation
        loaderRef.current = setInterval(() => {
            setLoaderFrame(f => (f + 1) % LOADER_FRAMES.length);
        }, 80);

        // Poll every 4 seconds
        const poll = async () => {
            try {
                const res = await fetch(`/api/poll?taskId=${taskId}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.error);

                setStatus(data.status);
                setPhase(data.phase ?? "footage");
                setProgress(data.progress ?? 0);

                if (data.status === "done") {
                    setOutput(data.outputUrls);
                    clearInterval(pollRef.current!);
                    clearInterval(loaderRef.current!);
                }

                if (data.status === "failed") {
                    setError("Generation failed. Please try again.");
                    clearInterval(pollRef.current!);
                    clearInterval(loaderRef.current!);
                }
            } catch (err: any) {
                setError(err.message || "Polling error");
                clearInterval(pollRef.current!);
                clearInterval(loaderRef.current!);
            }
        };

        poll(); // immediate first call
        pollRef.current = setInterval(poll, 4000);

        return () => {
            clearInterval(pollRef.current!);
            clearInterval(loaderRef.current!);
        };
    }, [taskId]);

    // Cycle messages
    useEffect(() => {
        const msgs = PHASE_MESSAGES[phase] ?? [];
        setMsgIdx(0);
        const t = setInterval(() => setMsgIdx(i => (i + 1) % msgs.length), 3000);
        return () => clearInterval(t);
    }, [phase]);

    const isDone = status === "done";
    const isFailed = status === "failed";
    const phaseColor = isDone ? "#92cc41" : isFailed ? "#e76e55" : "#f7d51d";
    const currentMsg = (PHASE_MESSAGES[phase] ?? [])[msgIdx] ?? "Working...";
    const videoUrl = output?.["9:16"] ?? output?.[Object.keys(output ?? {})[0]];

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">

            {/* Header */}
            <div className="flex flex-col items-center gap-3 mb-10 text-center">
                <span
                    className="text-[9px] tracking-widest"
                    style={{ color: phaseColor, animation: !isDone ? "blink-kf 1s step-end infinite" : "none" }}
                >
                    ▶ {PHASE_LABELS[phase] ?? "PROCESSING"}
                </span>
                <h1
                    className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none"
                    style={{
                        color: isDone ? "#92cc41" : isFailed ? "#e76e55" : "#f7d51d",
                        textShadow: `4px 4px 0 #000, 0 0 40px ${phaseColor}44`,
                    }}
                >
                    {isDone ? "LOOT ACQUIRED" : isFailed ? "QUEST FAILED" : "FORGING VIDEO"}
                </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">

                {/* Video panel */}
                <div className="w-full md:w-72 shrink-0">
                    <div
                        className="relative overflow-hidden flex items-center justify-center"
                        style={{
                            aspectRatio: "9/16",
                            background: "#050510",
                            border: `3px solid ${isDone ? "#92cc41" : "#1a1a1a"}`,
                            boxShadow: isDone ? "0 0 30px rgba(146,204,65,0.3), 6px 6px 0 #000" : "6px 6px 0 #000",
                        }}
                    >
                        {/* Scanlines */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)"
                        }} />

                        {isDone && videoUrl ? (
                            <video
                                src={videoUrl}
                                controls
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-4 relative z-10">
                                {/* Pixel city buildings */}
                                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 opacity-20">
                                    {[40, 70, 50, 90, 35, 60, 80].map((h, i) => (
                                        <div key={i} style={{ width: 24, height: h, background: "#1a1a2e", borderTop: "2px solid #2a2a4e" }} />
                                    ))}
                                </div>
                                <div
                                    className="text-5xl font-black relative z-10"
                                    style={{
                                        color: "#f7d51d",
                                        textShadow: "0 0 20px rgba(247,213,29,0.6)",
                                        fontFamily: "monospace",
                                    }}
                                >
                                    {LOADER_FRAMES[loaderFrame]}
                                </div>
                                <span className="text-[9px] tracking-widest relative z-10" style={{ color: "#555" }}>
                                    RENDERING...
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Format label */}
                    <div className="flex justify-between mt-2 px-1">
                        <span className="text-[9px] tracking-widest" style={{ color: "#333" }}>FORMAT</span>
                        <span className="text-[9px] font-black" style={{ color: "#555" }}>9:16 VERTICAL</span>
                    </div>
                </div>

                {/* Status / Result panel */}
                <div className="flex-1 w-full">
                    {!isDone && !isFailed ? (
                        <div
                            className="flex flex-col gap-6 p-6"
                            style={{ background: "#0a0a0a", border: "3px solid #1a1a1a", boxShadow: "6px 6px 0 #000" }}
                        >
                            {/* Phase label */}
                            <div className="flex items-center gap-3">
                                <span style={{ color: "#f7d51d" }}>★</span>
                                <span className="text-sm font-black tracking-widest" style={{ color: "#f7d51d" }}>
                                    {PHASE_LABELS[phase] ?? "PROCESSING"}
                                </span>
                            </div>

                            {/* Progress bar */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <span className="text-[9px] tracking-widest" style={{ color: "#555" }}>PROGRESS</span>
                                    <span className="text-[9px] font-black" style={{ color: "#f7d51d" }}>{progress}%</span>
                                </div>
                                <PixelBar pct={progress} color="#f7d51d" />
                            </div>

                            {/* Phase steps */}
                            <div className="flex flex-col gap-2">
                                {["footage", "subtitles", "assembly", "done"].map((p, i) => {
                                    const phases = ["footage", "subtitles", "assembly", "done"];
                                    const currentIdx = phases.indexOf(phase);
                                    const stepIdx = phases.indexOf(p);
                                    const isDoneStep = stepIdx < currentIdx;
                                    const isCurrentStep = stepIdx === currentIdx;
                                    return (
                                        <div key={p} className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 shrink-0 flex items-center justify-center text-[8px] font-black"
                                                style={{
                                                    background: isDoneStep ? "#92cc41" : isCurrentStep ? "#f7d51d" : "#111",
                                                    border: `2px solid ${isDoneStep ? "#92cc41" : isCurrentStep ? "#f7d51d" : "#222"}`,
                                                    color: "#000",
                                                    animation: isCurrentStep ? "blink-kf 0.8s step-end infinite" : "none",
                                                }}
                                            >
                                                {isDoneStep ? "✓" : isCurrentStep ? "▶" : ""}
                                            </div>
                                            <span className="text-[10px] tracking-widest uppercase" style={{
                                                color: isDoneStep ? "#92cc41" : isCurrentStep ? "#f7d51d" : "#333"
                                            }}>
                                                {PHASE_LABELS[p]}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* NPC message */}
                            <div style={{ borderTop: "2px solid #1a1a1a" }} className="pt-4 flex gap-3 items-start">
                                <span className="text-2xl shrink-0">🧙</span>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] tracking-widest" style={{ color: "#f7d51d" }}>★ FORGE MASTER</span>
                                    <span className="text-[11px] leading-loose" style={{ color: "#888" }}>{currentMsg}</span>
                                </div>
                            </div>
                        </div>
                    ) : isFailed ? (
                        <div className="flex flex-col gap-6 p-6"
                            style={{ background: "#0a0000", border: "3px solid #e76e55", boxShadow: "6px 6px 0 #000" }}>
                            <span className="text-4xl">💀</span>
                            <p className="text-sm font-black tracking-widest" style={{ color: "#e76e55" }}>
                                {error ?? "Generation failed."}
                            </p>
                            <button
                                onClick={() => router.back()}
                                className="text-sm font-black tracking-widest uppercase px-6 py-3"
                                style={{ background: "#e76e55", color: "#000", border: "3px solid #fff", boxShadow: "4px 4px 0 #000" }}
                            >
                                ← TRY AGAIN
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6 p-6"
                            style={{ background: "#0a1400", border: "3px solid #92cc41", boxShadow: "6px 6px 0 #000, 0 0 30px rgba(146,204,65,0.2)" }}>

                            <div className="flex items-center gap-3">
                                <span style={{ color: "#92cc41" }}>★</span>
                                <span className="text-sm font-black tracking-widest" style={{ color: "#92cc41" }}>
                                    QUEST COMPLETE
                                </span>
                            </div>

                            <PixelBar pct={100} color="#92cc41" />

                            <p className="text-xs leading-relaxed" style={{ color: "#888" }}>
                                Your video has been forged by Veo 3. Review the preview on the left before exporting.
                            </p>

                            {/* Output URLs */}
                            {output && (
                                <div className="flex flex-col gap-2">
                                    <span className="text-[9px] tracking-widest" style={{ color: "#555" }}>AVAILABLE FORMATS</span>
                                    {Object.entries(output).map(([fmt, url]) => (
                                        <a
                                            key={fmt}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between px-3 py-2 text-xs font-black tracking-widest"
                                            style={{ background: "#0d1a00", border: "2px solid #1a2e00", color: "#92cc41" }}
                                        >
                                            <span>{fmt}</span>
                                            <span>↗ OPEN</span>
                                        </a>
                                    ))}
                                </div>
                            )}

                            <div style={{ borderTop: "2px solid #1a2e00" }} className="pt-4 flex flex-col gap-3">
                                <Link href={`/projects/${id}/export`} className="w-full">
                                    <button
                                        className="w-full text-sm font-black tracking-widest uppercase py-4 transition-all duration-150"
                                        style={{
                                            background: "#92cc41",
                                            color: "#000",
                                            border: "3px solid #fff",
                                            boxShadow: "4px 4px 0 #000, 0 0 20px rgba(146,204,65,0.4)",
                                            animation: "blink-kf 2s ease-in-out infinite",
                                        }}
                                    >
                                        PROCEED TO EXPORT →
                                    </button>
                                </Link>
                                <button
                                    onClick={() => router.back()}
                                    className="w-full text-sm font-black tracking-widest uppercase py-3"
                                    style={{
                                        background: "transparent",
                                        color: "#555",
                                        border: "3px solid #1e1e1e",
                                        boxShadow: "3px 3px 0 #000",
                                    }}
                                >
                                    ← REGENERATE
                                </button>
                            </div>
                        </div>
                    )}
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