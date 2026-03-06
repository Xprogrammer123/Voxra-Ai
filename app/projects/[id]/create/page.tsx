"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/8bit/button";
import { StepIndicator } from "@/components/create/StepIndicator";
import { ScriptStep } from "@/components/create/ScriptStep";
import { VoiceStep } from "@/components/create/VoiceStep";
import { MusicStep } from "@/components/create/MusicStep";
import { StyleStep } from "@/components/create/StyleStep";
import { AssetsStep } from "@/components/create/AssetsStep";
import { useProjectStore } from "@/store/useProjectStore";

export default function CreateWizardPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { currentStep, stepsCompleted, nextStep, prevStep } = useProjectStore();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleNext = () => {
        if (currentStep < 5) {
            nextStep();
        } else {
            handleGenerate();
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        // Simulating API call to orchestrator
        setTimeout(() => {
            setIsGenerating(false);
            router.push(`/projects/${params.id}/preview?taskId=video_${Date.now()}`);
        }, 1500);
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

    return (
        <div className="max-w-4xl mx-auto py-8">
            <StepIndicator />

            <div className="bg-muted/5 border-4 border-black p-6 md:p-10 min-h-[500px] flex flex-col relative shadow-[8px_8px_0_0_#111]">

                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-success pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-success pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-success pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-success pointer-events-none"></div>

                <div className="flex-1">
                    {renderStep()}
                </div>

                <div className="mt-12 flex justify-between items-center border-t-4 border-[#333] pt-6">
                    <Button
                        variant="outline"
                        className="border-4 border-black bg-black text-white hover:bg-[#222]"
                        onClick={prevStep}
                        disabled={currentStep === 1 || isGenerating}
                    >
                        ← RETREAT
                    </Button>

                    <Button
                        className={`text-base py-6 px-8 border-4 border-black shadow-[4px_4px_0_0_currentColor] ${currentStep === 5
                                ? "bg-success text-black hover:bg-success/80 border-success shadow-[4px_4px_0_0_#92cc41]"
                                : "bg-[#fff] text-black hover:bg-[#eee]"
                            }`}
                        onClick={handleNext}
                        disabled={isGenerating}
                    >
                        {isGenerating ? "FORGING VIDEO..." : currentStep === 5 ? "⚡ GENERATE LOOT ⚡" : "ADVANCE →"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
