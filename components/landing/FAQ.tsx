"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/8bit/card";
import { useState } from "react";

const FAQS = [
    {
        q: "Is the video really ready to post?",
        a: "Yes. Voxra assembles the voiceover, underlying footage, subtitles, and music into a single mp4 file formatted for your chosen platform.",
        icon: "🎬",
    },
    {
        q: "Can I use my own voice?",
        a: "Currently we use ElevenLabs for high-quality AI voices. Custom voice cloning is coming to the Studio plan soon.",
        icon: "🎙️",
    },
    {
        q: "Do I own the rights to the videos?",
        a: "Absolutely. Once the video is generated, you own full rights to use it commercially.",
        icon: "⚔",
    },
    {
        q: "What if I don't like the generated clip?",
        a: "You can click 'Regenerate Footage' before final export. It only costs a fraction of a video credit.",
        icon: "🔄",
    },
    {
        q: "Can I upload my own gameplay/clips?",
        a: "Yes! In Step 5 (Inventory), you can upload your own mp4 clips, and Voxra will slice and layer them under the subtitles.",
        icon: "🎒",
    },
    {
        q: "What formats do you support?",
        a: "9:16 (TikTok/Reels/Shorts), 16:9 (YouTube), and 1:1 (Instagram Feed). You can export all three formats at once.",
        icon: "📱",
    },
];

export function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section className="py-24 px-4 max-w-3xl mx-auto" id="faq">

            {/* Section header */}
            <div className="text-center mb-16 flex flex-col items-center gap-4">
                <div
                    className="text-[9px] tracking-widest px-4 py-2 border-2"
                    style={{ color: "#f7d51d", borderColor: "#f7d51d", background: "rgba(247,213,29,0.06)" }}
                >
                    ✦ KNOWLEDGE BASE ✦
                </div>
                <h2
                    className="text-3xl md:text-5xl font-black uppercase leading-tight"
                    style={{ textShadow: "3px 3px 0 #000" }}
                >
                    ❓ SCROLL OF
                    <br />
                    <span style={{ color: "#f7d51d" }}>KNOWLEDGE</span>
                </h2>
                <p className="text-[10px] tracking-widest" style={{ color: "#555" }}>
                    COMMON QUESTS ANSWERED BELOW
                </p>
            </div>

            {/* FAQ list */}
            <div className="flex flex-col gap-3">
                {FAQS.map((faq, idx) => {
                    const isOpen = openIdx === idx;
                    const isHovered = hovered === idx;

                    return (
                        <div
                            key={idx}
                            onClick={() => setOpenIdx(isOpen ? null : idx)}
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                            className="cursor-pointer transition-all duration-100"
                            style={{
                                border: `3px solid ${isOpen ? "#f7d51d" : isHovered ? "#3a3a3a" : "#2a2a2a"}`,
                                background: isOpen ? "rgba(247,213,29,0.04)" : "#111",
                                boxShadow: isOpen
                                    ? "4px 4px 0 #000"
                                    : isHovered
                                    ? "3px 3px 0 #000"
                                    : "2px 2px 0 #000",
                                transform: isOpen
                                    ? "translate(-1px,-1px)"
                                    : isHovered
                                    ? "translate(-1px,-1px)"
                                    : "translate(0,0)",
                            }}
                        >
                            {/* Question row */}
                            <div className="flex items-center gap-4 px-5 py-4">
                                {/* Icon */}
                                <span className="text-lg shrink-0">{faq.icon}</span>

                                {/* Index + Question */}
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <span
                                        className="text-[8px] shrink-0 tabular-nums"
                                        style={{ color: isOpen ? "#f7d51d" : "#444" }}
                                    >
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className="text-[10px] md:text-xs leading-relaxed"
                                        style={{ color: isOpen ? "#fff" : "#aaa" }}
                                    >
                                        {faq.q}
                                    </span>
                                </div>

                                {/* Toggle arrow */}
                                <span
                                    className="shrink-0 text-xs transition-transform duration-150"
                                    style={{
                                        color: isOpen ? "#f7d51d" : "#444",
                                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                                        display: "inline-block",
                                    }}
                                >
                                    ▶
                                </span>
                            </div>

                            {/* Answer — slide open */}
                            {isOpen && (
                                <div
                                    className="px-5 pb-5 pt-0"
                                    style={{
                                        borderTop: "2px dashed #2a2a2a",
                                        animation: "faq-open 0.15s ease-out",
                                    }}
                                >
                                    {/* NPC dialogue style answer */}
                                    <div className="flex gap-3 items-start pt-4">
                                        <span className="text-xl shrink-0">🧙</span>
                                        <div className="flex flex-col gap-1">
                                            <span
                                                className="text-[8px] tracking-widest"
                                                style={{ color: "#f7d51d" }}
                                            >
                                                ★ FORGE MASTER
                                            </span>
                                            <p
                                                className="text-[10px] md:text-xs leading-loose"
                                                style={{ color: "#999" }}
                                            >
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Bottom note */}
            <div className="mt-12 text-center flex flex-col items-center gap-3">
                <div
                    className="w-full h-[2px]"
                    style={{
                        background: "repeating-linear-gradient(90deg, #2a2a2a 0px, #2a2a2a 8px, transparent 8px, transparent 12px)",
                    }}
                />
                <p className="text-[9px] tracking-widest" style={{ color: "#444" }}>
                    STILL HAVE QUESTIONS? SEND A SCROLL TO{" "}
                    <a
                        href="mailto:support@voxra.ai"
                        className="underline underline-offset-2"
                        style={{ color: "#92cc41" }}
                    >
                        SUPPORT@VOXRA.AI
                    </a>
                </p>
            </div>

            <style>{`
                @keyframes faq-open {
                    from { opacity: 0; transform: translateY(-6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}