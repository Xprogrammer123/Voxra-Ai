"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { StepIndicator } from "@/components/create/StepIndicator";
import { ScriptStep } from "@/components/create/ScriptStep";
import { VoiceStep } from "@/components/create/VoiceStep";
import { MusicStep } from "@/components/create/MusicStep";
import { StyleStep } from "@/components/create/StyleStep";
import { AssetsStep } from "@/components/create/AssetsStep";
import { useProjectStore } from "@/store/useProjectStore";

const LOADER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

// Read generationMode from the project — passed via query param from NewProjectPage
// e.g. /projects/[id]/create?mode=image
export default function CreateWizardPage({ params, searchParams }: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ mode?: string }>;
}) {
    const { id } = use(params);
    const { mode } = use(searchParams);
    const generationMode = (mode === "video" ? "video" : "image") as "image" | "video";

    const router = useRouter();
    const { currentStep, scriptText, voiceId, musicId, stylePreset, assets, nextStep, prevStep, reset } = useProjectStore();
    const [isGenerating, setIsGenerating] = useState(false);
    const [loaderFrame, setLoaderFrame] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleNext = () => {
        if (currentStep < 5) nextStep();
        else handleGenerate();
    };

    const handleGenerate = async () => {
        if (!scriptText.trim()) {
            setError("Script cannot be empty.");
            return;
        }

        setIsGenerating(true);
        setError(null);

        let frame = 0;
        const interval = setInterval(() => {
            frame = (frame + 1) % LOADER_FRAMES.length;
            setLoaderFrame(frame);
        }, 80);

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectId: id,
                    scriptText,
                    voiceId: voiceId || null,
                    musicId: musicId || null,
                    stylePreset: stylePreset || null,
                    assets: assets.length > 0 ? assets : null,
                    platform: "tiktok",
                    format: "9:16",
                    generationMode,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.taskId) {
                throw new Error(data.error || "Failed to start generation");
            }

            reset();
            router.push(`/projects/${id}/preview?taskId=${data.taskId}`);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Try again.");
            setIsGenerating(false);
        } finally {
            clearInterval(interval);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <ScriptStep />;
            case 2: return <VoiceStep />;
            case 3: return <MusicStep />;
            case 4: return <StyleStep />;
            case 5: return <AssetsStep />;
            default: return <ScriptStep />;
        }
    };

    const isLastStep = currentStep === 5;
    const canAdvance = currentStep === 1 ? scriptText.trim().length > 0 : true;
    const modeColor = generationMode === "video" ? "#209cee" : "#92cc41";
    const modeLabel = generationMode === "video" ? "VEO 3 · AI VIDEO" : "IMAGEN 3 · SLIDESHOW";

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">

            {/* Generating overlay */}
            {isGenerating && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
                    style={{ background: "rgba(0,0,0,0.94)" }}>
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)"
                    }} />
                    <div className="flex flex-col items-center gap-4 relative">
                        <div className="text-6xl font-black" style={{
                            color: modeColor,
                            textShadow: `0 0 30px ${modeColor}cc`,
                            fontFamily: "monospace",
                        }}>
                            {LOADER_FRAMES[loaderFrame]}
                        </div>
                        <span className="text-sm font-black tracking-widest" style={{ color: modeColor }}>
                            {generationMode === "video" ? "SUMMONING VEO 3..." : "FORGING IMAGES..."}
                        </span>
                        <span className="text-[10px] tracking-widest" style={{ color: "#555" }}>
                            {generationMode === "video" ? "GENERATING YOUR VOXEL VIDEO" : "SPLITTING SCRIPT INTO SCENES"}
                        </span>
                        <div className="w-48 h-4 mt-2" style={{ background: "#111", border: "2px solid #1e1e1e" }}>
                            <div className="h-full" style={{
                                background: `repeating-linear-gradient(90deg, ${modeColor} 0px, ${modeColor} 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)`,
                                animation: "progress-fill 2s linear forwards",
                            }} />
                        </div>
                    </div>
                    <style>{`@keyframes progress-fill { from { width: 0% } to { width: 100% } }`}</style>
                </div>
            )}

            {/* Mode badge */}
            <div className="flex justify-end mb-4">
                <span className="text-[9px] font-black tracking-widest px-3 py-1"
                    style={{ background: `${modeColor}18`, border: `1px solid ${modeColor}44`, color: modeColor }}>
                    ⚡ {modeLabel}
                </span>
            </div>

            <StepIndicator />

            {/* Main card */}
            <div className="relative min-h-[500px] flex flex-col"
                style={{ background: "#0a0a0a", border: "3px solid #1a1a1a", boxShadow: "8px 8px 0 #000" }}>
                {/* Corner accents */}
                {[
                    "top-0 left-0 border-t-[3px] border-l-[3px]",
                    "top-0 right-0 border-t-[3px] border-r-[3px]",
                    "bottom-0 left-0 border-b-[3px] border-l-[3px]",
                    "bottom-0 right-0 border-b-[3px] border-r-[3px]",
                ].map((cls, i) => (
                    <div key={i} className={`absolute w-5 h-5 pointer-events-none ${cls}`}
                        style={{ borderColor: modeColor }} />
                ))}

                <div className="flex-1 p-6 md:p-10">{renderStep()}</div>

                {error && (
                    <div className="mx-6 mb-4 px-4 py-3 text-xs font-black tracking-widest flex items-center gap-2"
                        style={{ background: "#1a0000", border: "2px solid #e76e55", color: "#e76e55" }}>
                        ⚠ {error}
                    </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center px-6 md:px-10 py-5"
                    style={{ borderTop: "2px solid #1a1a1a", background: "#0d0d0d" }}>
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1 || isGenerating}
                        className="font-black tracking-widest uppercase text-sm px-6 py-3 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{ background: "transparent", color: "#888", border: "3px solid #333", boxShadow: "3px 3px 0 #000" }}
                        onMouseEnter={e => {
                            if (currentStep === 1) return;
                            (e.currentTarget as HTMLElement).style.color = "#fff";
                            (e.currentTarget as HTMLElement).style.borderColor = "#fff";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.color = "#888";
                            (e.currentTarget as HTMLElement).style.borderColor = "#333";
                        }}
                    >
                        ← RETREAT
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="text-[9px] tracking-widest" style={{ color: "#333" }}>{currentStep}/5</span>
                        <button
                            onClick={handleNext}
                            disabled={isGenerating || !canAdvance}
                            className="font-black tracking-widest uppercase text-sm px-8 py-3 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{
                                background: isLastStep ? modeColor : "#fff",
                                color: "#000",
                                border: isLastStep ? "3px solid #fff" : "3px solid #000",
                                boxShadow: isLastStep ? `4px 4px 0 #000, 0 0 20px ${modeColor}66` : "4px 4px 0 #000",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px)";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = isLastStep
                                    ? `4px 4px 0 #000, 0 0 20px ${modeColor}66` : "4px 4px 0 #000";
                                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                            }}
                        >
                            {isLastStep ? "⚡ GENERATE LOOT ⚡" : "ADVANCE →"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}