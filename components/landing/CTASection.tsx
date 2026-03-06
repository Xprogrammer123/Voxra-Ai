"use client";

import { Button } from "@/components/ui/8bit/button";
import { useState, useEffect } from "react";
import Link from "next/link";

const PIXEL_CHARS = ["░", "▒", "▓", "█"];

const STARS = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 1.5 + Math.random() * 2,
    char: PIXEL_CHARS[Math.floor(Math.random() * PIXEL_CHARS.length)],
}));

const STATS = [
    { label: "VIDEOS FORGED", value: "124,000+", color: "#92cc41" },
    { label: "CREATORS", value: "10,000+", color: "#f7d51d" },
    { label: "AVG RENDER TIME", value: "< 90s", color: "#209cee" },
    { label: "PLATFORMS", value: "4", color: "#e76e55" },
];

export function CTASection() {
    const [blink, setBlink] = useState(true);
    const [hovered, setHovered] = useState(false);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        const b = setInterval(() => setBlink(p => !p), 600);
        return () => clearInterval(b);
    }, []);

    function handleHover() {
        setHovered(true);
        setShake(true);
        setTimeout(() => setShake(false), 400);
    }

    return (
        <section className="relative py-28 px-4 overflow-hidden" style={{ borderTop: "4px solid #2a2a2a" }}>

            {/* Pixel starfield */}
            <div className="absolute inset-0 pointer-events-none select-none">
                {STARS.map(s => (
                    <span
                        key={s.id}
                        className="absolute text-[8px] font-mono"
                        style={{
                            left: `${s.x}%`,
                            top: `${s.y}%`,
                            color: "#222",
                            animation: `twinkle-cta ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
                        }}
                    >
                        {s.char}
                    </span>
                ))}
            </div>

            {/* Green ground glow */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at 50% 100%, rgba(146,204,65,0.08) 0%, transparent 70%)",
                }}
            />

            {/* Scanlines */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
                }}
            />

            <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center gap-12 text-center">

                {/* Boss encounter label */}
                <div
                    className="text-[9px] tracking-widest px-4 py-2 border-2"
                    style={{
                        color: "#e76e55",
                        borderColor: "#e76e55",
                        background: "rgba(231,110,85,0.08)",
                        animation: "blink-kf 1s step-end infinite",
                    }}
                >
                    ⚠ FINAL BOSS ENCOUNTER ⚠
                </div>

                {/* Headline */}
                <div className="flex flex-col gap-4">
                    <h2
                        className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight"
                        style={{ textShadow: "4px 4px 0 #000" }}
                    >
                        READY TO STOP
                        <br />
                        <span style={{ color: "#e76e55", textShadow: "4px 4px 0 #000" }}>
                            WASTING TIME
                        </span>
                        <br />
                        EDITING?
                    </h2>
                    <p className="text-sm md:text-base max-w-xl mx-auto leading-loose" style={{ color: "#888" }}>
                        Paste your first script. Get a ready-to-post video in minutes.
                        <br />
                        No editing. No rendering. No headache.
                    </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {STATS.map(({ label, value, color }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center gap-2 py-4 px-3 border-2"
                            style={{ borderColor: "#2a2a2a", background: "#111" }}
                        >
                            <span
                                className="text-xl md:text-2xl font-black"
                                style={{ color, textShadow: `2px 2px 0 #000` }}
                            >
                                {value}
                            </span>
                            <span className="text-[8px] tracking-widest" style={{ color: "#555" }}>
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Main CTA button */}
                <div className="flex flex-col items-center gap-4">
                    <Link href="/sign-up">
                        <Button
                            size="lg"
                            onMouseEnter={handleHover}
                            onMouseLeave={() => setHovered(false)}
                            className="text-sm md:text-base px-10 py-6 transition-all duration-100"
                            style={{
                                background: hovered ? "#a8e45a" : "#92cc41",
                                color: "#000",
                                border: "3px solid #fff",
                                boxShadow: hovered
                                    ? "2px 2px 0 #000, 0 0 30px rgba(146,204,65,0.6)"
                                    : "5px 5px 0 #000, 0 0 20px rgba(146,204,65,0.3)",
                                transform: hovered ? "translate(3px, 3px)" : "translate(0,0)",
                                animation: shake ? "shake 0.3s ease" : "none",
                            }}
                        >
                            ⚔ GENERATE MY FIRST VIDEO
                        </Button>
                    </Link>

                    {/* No card required */}
                    <p className="text-[9px] tracking-widest" style={{ color: "#555" }}>
                        ✦ 5 FREE VIDEOS · NO CARD REQUIRED · NO WATERMARK ✦
                    </p>
                </div>

                {/* Press start blink */}
                <p
                    className="text-[10px] tracking-widest"
                    style={{
                        color: "#f7d51d",
                        opacity: blink ? 1 : 0,
                        transition: "opacity 0.1s",
                    }}
                >
                    — PRESS START TO BEGIN YOUR QUEST —
                </p>

                {/* Pixel divider */}
                <div className="w-full flex items-center gap-3">
                    <div className="flex-1 h-[2px]" style={{ background: "repeating-linear-gradient(90deg, #2a2a2a 0px, #2a2a2a 8px, transparent 8px, transparent 12px)" }} />
                    <span className="text-[10px]" style={{ color: "#333" }}>✦</span>
                    <div className="flex-1 h-[2px]" style={{ background: "repeating-linear-gradient(90deg, #2a2a2a 0px, #2a2a2a 8px, transparent 8px, transparent 12px)" }} />
                </div>

                {/* Footer note */}
                <p className="text-[9px] tracking-widest" style={{ color: "#333" }}>
                    © 2026 VOXRA · ALL RIGHTS RESERVED · WORDS BECOME REELS
                </p>

            </div>

            <style>{`
                @keyframes twinkle-cta {
                    from { opacity: 0.05; color: #1a1a1a; }
                    to   { opacity: 0.4;  color: #333; }
                }
                @keyframes blink-kf {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }
                @keyframes shake {
                    0%  { transform: translate(0, 0); }
                    25% { transform: translate(-2px, 0); }
                    50% { transform: translate(2px, 0); }
                    75% { transform: translate(-1px, 0); }
                    100%{ transform: translate(0, 0); }
                }
            `}</style>
        </section>
    );
}