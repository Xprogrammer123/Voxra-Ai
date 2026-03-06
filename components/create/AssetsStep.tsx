"use client";

import { Card, CardContent } from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";

export function AssetsStep() {
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-xp drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    UPLOAD INVENTORY
                </h2>
                <p className="text-muted-foreground mt-2 font-sans">
                    Provide custom b-roll, logos, or let our AI generate footage for you.
                </p>
            </div>

            <Card className="border-4 border-black bg-muted/5 border-dashed">
                <CardContent className="p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                    <span className="text-6xl mb-6 opacity-80 hover:scale-110 transition-transform cursor-pointer">📤</span>
                    <h3 className="font-pixel text-xl mb-2 text-foreground">DRAG & DROP LOOT HERE</h3>
                    <p className="text-sm font-sans text-muted-foreground max-w-md mx-auto mb-8">
                        Supports MP4, MOV, PNG, JPG (Max 50MB per file). If no assets are provided, we will generate cinematic AI footage matching your script.
                    </p>
                    <Button variant="outline" className="border-4 border-black text-sm">
                        BROWSE FILES
                    </Button>
                </CardContent>
            </Card>

            <div className="flex items-center gap-4 bg-black/40 border-2 border-[#333] p-4 rounded-sm">
                <div className="w-8 h-8 flex items-center justify-center border-2 border-xp text-xp font-black animate-pulse text-xs shrink-0">AI</div>
                <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                    AI Footage Generation is enabled by default. Uploading custom inventory will prioritize your clips over AI generation.
                </p>
            </div>
        </div>
    );
}
