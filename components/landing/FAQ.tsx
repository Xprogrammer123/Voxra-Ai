"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/8bit/card";
import { useState } from "react";

const FAQS = [
    { q: "Is the video really ready to post?", a: "Yes. Voxra assembles the voiceover, underlying footage, subtitles, and music into a single mp4 file formatted for your chosen platform." },
    { q: "Can I use my own voice?", a: "Currently we use ElevenLabs for high-quality AI voices. Custom voice cloning is coming to the Studio plan soon." },
    { q: "Do I own the rights to the videos?", a: "Absolutely. Once the video is generated, you own full rights to use it commercially." },
    { q: "What if I don't like the generated clip?", a: "You can click 'Regenerate Footage' before final export. It only costs a fraction of a video credit." },
    { q: "Can I upload my own gameplay/clips?", a: "Yes! In Step 5 (Inventory), you can upload your own mp4 clips, and Voxra will slice and layer them under the subtitles." },
    { q: "What formats do you support?", a: "9:16 (TikTok/Reels/Shorts), 16:9 (YouTube), and 1:1 (Instagram Feed). You can export all three formats at once." }
];

export function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section className="py-24 px-4 max-w-3xl mx-auto" id="faq">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold uppercase drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
                    ❓ SCROLL OF KNOWLEDGE
                </h2>
            </div>

            <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                    <Card
                        key={idx}
                        className="border-4 border-black cursor-pointer transition-colors hover:bg-muted/10"
                        onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    >
                        <CardHeader className="py-4 px-6 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm md:text-base leading-relaxed w-11/12">{faq.q}</CardTitle>
                            <span className="text-success text-xl">{openIdx === idx ? "▼" : "▶"}</span>
                        </CardHeader>
                        {openIdx === idx && (
                            <CardContent className="px-6 pb-6 pt-0 text-muted-foreground text-sm leading-relaxed border-t-2 border-dashed border-[#333] mt-2 pt-4">
                                {faq.a}
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>
        </section>
    );
}
