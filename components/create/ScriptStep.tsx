"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { Textarea } from "@/components/ui/8bit/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/8bit/card";

export function ScriptStep() {
    const { scriptText, setScriptText } = useProjectStore();

    const words = scriptText.trim().split(/\s+/).filter(w => w.length > 0).length;
    // Estimate ~150 words per minute
    const estMinutes = (words / 150).toFixed(1);

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-hp drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    INSCRIBE YOUR SCROLL
                </h2>
                <p className="text-muted-foreground mt-2 font-sans">
                    Paste the script for your video. Our AI will handle the rest.
                </p>
            </div>

            <Card className="border-4 border-black">
                <CardHeader className="bg-muted/10 border-b-4 border-black pb-4">
                    <div className="flex justify-between items-center text-xs font-pixel uppercase">
                        <CardTitle className="text-sm">Video Script</CardTitle>
                        <span className={`${words > 500 ? 'text-destructive' : 'text-success'}`}>
                            {words} WORDS (~{estMinutes} MIN)
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Textarea
                        className="w-full min-h-[300px] font-sans text-lg md:text-xl p-6 border-0 focus-visible:ring-0 resize-y leading-relaxed bg-background"
                        placeholder="Once upon a time in a land far, far away..."
                        value={scriptText}
                        onChange={(e) => setScriptText(e.target.value)}
                    />
                </CardContent>
            </Card>

            {words > 500 && (
                <div className="bg-destructive/20 border-2 border-destructive p-3 text-sm flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    <span>Warning: Scripts over 500 words may require the Studio plan for export.</span>
                </div>
            )}
        </div>
    );
}
