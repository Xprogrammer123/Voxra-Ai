"use client";

import { useProjectStore } from "@/store/useProjectStore";

const STEPS = [
    { id: 1, name: "SCRIPT", icon: "📜" },
    { id: 2, name: "VOICE", icon: "🎙️" },
    { id: 3, name: "MUSIC", icon: "🎵" },
    { id: 4, name: "STYLE", icon: "🎨" },
    { id: 5, name: "INVENTORY", icon: "🎒" }
];

export function StepIndicator() {
    const { currentStep, stepsCompleted } = useProjectStore();

    return (
        <div className="w-full mb-8 relative">
            <div className="absolute top-1/2 w-full h-1 bg-muted/20 -z-10 -translate-y-1/2"></div>

            <div className="flex justify-between items-center">
                {STEPS.map((step) => {
                    const isCurrent = currentStep === step.id;
                    const isCompleted = stepsCompleted.includes(step.id);
                    const isFuture = !isCurrent && !isCompleted;

                    let bg = "bg-background border-[#333] text-muted-foreground";
                    if (isCurrent) bg = "bg-warning border-warning text-black animate-pulse shadow-[0_0_15px_rgba(231,110,85,0.5)]";
                    else if (isCompleted) bg = "bg-success border-success text-black shadow-[2px_2px_0_rgba(0,0,0,1)]";

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border-4 rounded-sm text-xl md:text-2xl transition-all duration-300 ${bg}`}>
                                {isCompleted && !isCurrent ? "✓" : step.icon}
                            </div>
                            <span className={`text-[10px] md:text-xs font-pixel uppercase ${isFuture ? "text-muted-foreground" : "text-foreground drop-shadow-[1px_1px_0_rgba(0,0,0,1)]"}`}>
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
