"use client";

import { useState } from "react";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Switch } from "@/components/ui/8bit/switch";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ExportPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [formats, setFormats] = useState({
        "9:16": true,
        "16:9": false,
        "1:1": false
    });
    const [exporting, setExporting] = useState(false);

    const toggleFormat = (key: keyof typeof formats) => {
        setFormats(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleExport = () => {
        setExporting(true);
        setTimeout(() => {
            setExporting(false);
            router.push("/gallery");
        }, 2000);
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-black uppercase text-hp drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    FINAL EXPORT
                </h1>
                <p className="text-muted-foreground mt-2 uppercase text-sm font-sans tracking-wide">
                    Select desired formats and resolution
                </p>
            </div>

            <Card className="border-4 border-black mb-8 shadow-[8px_8px_0_0_#111]">
                <CardContent className="p-8 space-y-8">
                    <div>
                        <h3 className="font-pixel text-lg mb-4 text-mp">SELECT FORMATS</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {(["9:16", "16:9", "1:1"] as const).map((fmt) => (
                                <div
                                    key={fmt}
                                    className={`border-4 cursor-pointer flex flex-col items-center justify-center p-6 transition-all ${formats[fmt]
                                            ? 'border-success bg-success/10 shadow-[4px_4px_0_0_#92cc41] scale-[1.02]'
                                            : 'border-[#333] hover:border-[#555]'
                                        }`}
                                    onClick={() => toggleFormat(fmt)}
                                >
                                    <div className="text-2xl mb-2">
                                        {fmt === "9:16" ? "📱" : fmt === "16:9" ? "📺" : "📸"}
                                    </div>
                                    <span className="font-pixel text-xs">{fmt}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t-4 border-dashed border-[#333] pt-6 flex justify-between items-center">
                        <div>
                            <h3 className="font-pixel text-sm mb-1 text-xp">4K RESOLUTION</h3>
                            <p className="text-xs text-muted-foreground font-sans">Requires Creator plan or higher.</p>
                        </div>
                        <Switch checked={false} disabled /> {/* Mock disabled for free tier */}
                    </div>

                    <div className="border-t-4 border-dashed border-[#333] pt-6 flex justify-between items-center">
                        <div>
                            <h3 className="font-pixel text-sm mb-1 text-xp">REMOVE WATERMARK</h3>
                            <p className="text-xs text-muted-foreground font-sans">1 Credit per video without watermark.</p>
                        </div>
                        <Switch checked={true} />
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
                <Link href={`/projects/${params.id}/preview`}>
                    <Button variant="outline" className="border-4 text-xs">← BACK TO PREVIEW</Button>
                </Link>
                <Button
                    className="w-full md:w-auto text-base py-6 px-12 bg-success text-black border-4 border-black hover:bg-success/80 shadow-[4px_4px_0_0_currentColor]"
                    onClick={handleExport}
                    disabled={exporting || !Object.values(formats).some(Boolean)}
                >
                    {exporting ? "RENDERING..." : "↓ DOWNLOAD LOOT"}
                </Button>
            </div>
        </div>
    );
}
