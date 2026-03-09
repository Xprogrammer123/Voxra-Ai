"use client";

import { useProjectStore } from "@/store/useProjectStore";

const STEPS = [
    { id: 1, name: "SCRIPT",    icon: "📜" },
    { id: 2, name: "VOICE",     icon: "🎙" },
    { id: 3, name: "MUSIC",     icon: "🎵" },
    { id: 4, name: "STYLE",     icon: "🎨" },
    { id: 5, name: "INVENTORY", icon: "🎒" },
];

export function StepIndicator() {
    const { currentStep, stepsCompleted } = useProjectStore();

    return (
        <div className="w-full mb-8 relative">
            {/* Connector line */}
            <div className="absolute top-5 left-0 right-0 h-[2px] pointer-events-none"
                style={{
                    background: "repeating-linear-gradient(90deg, #1e1e1e 0px, #1e1e1e 6px, transparent 6px, transparent 10px)"
                }}
            />

            <div className="flex justify-between items-start relative z-10">
                {STEPS.map((step) => {
                    const isCurrent   = currentStep === step.id;
                    const isCompleted = stepsCompleted.includes(step.id);
                    const isFuture    = !isCurrent && !isCompleted;

                    const borderColor = isCurrent ? "#f7d51d" : isCompleted ? "#92cc41" : "#1e1e1e";
                    const bg          = isCurrent ? "#1a1400" : isCompleted ? "#0a1400" : "#0a0a0a";
                    const color       = isCurrent ? "#f7d51d" : isCompleted ? "#92cc41" : "#333";

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2">
                            <div
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-black transition-all duration-300"
                                style={{
                                    background: bg,
                                    border: `3px solid ${borderColor}`,
                                    boxShadow: isCurrent
                                        ? `0 0 15px rgba(247,213,29,0.5), 3px 3px 0 #000`
                                        : isCompleted
                                        ? `3px 3px 0 #000`
                                        : "none",
                                    animation: isCurrent ? "blink-border 1.5s ease-in-out infinite" : "none",
                                }}
                            >
                                {isCompleted && !isCurrent
                                    ? <span style={{ color: "#92cc41" }}>✓</span>
                                    : step.icon
                                }
                            </div>
                            <span
                                className="text-[8px] md:text-[9px] font-black tracking-widest uppercase"
                                style={{ color }}
                            >
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            <style>{`
                @keyframes blink-border {
                    0%, 100% { box-shadow: 0 0 15px rgba(247,213,29,0.5), 3px 3px 0 #000; }
                    50%      { box-shadow: 0 0 25px rgba(247,213,29,0.9), 3px 3px 0 #000; }
                }
            `}</style>
        </div>
    );
}