"use client";

import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const MESSAGES = [
    { speaker: "FORGE MASTER", msg: "The Voxra forge awaits your script..." },
    { speaker: "FORGE MASTER", msg: "Drop a script. Get a video. That's the whole quest." },
    { speaker: "FORGE MASTER", msg: "Voice. Subtitles. Export. All forged by Voxra." },
    { speaker: "FORGE MASTER", msg: "Your brand. Your style. Zero editing time." },
    { speaker: "FORGE MASTER", msg: "Join 10,000 creators already on the quest!" },
];

const FLOATERS = [
    {
        id: 1,
        platform: "TIKTOK",
        platformColor: "#e76e55",
        title: "5 habits that...",
        duration: "0:47",
        voice: "Rachel",
        style: { top: "8%", left: "2%", animationDelay: "0s", animationDuration: "6s" },
        bars: [{ color: "#e76e55", w: "85%" }, { color: "#209cee", w: "60%" }],
        subtitle: "Most people NEVER do this",
        subtitleHighlight: "NEVER",
    },
    {
        id: 2,
        platform: "REELS",
        platformColor: "#b06aee",
        title: "Why you're broke...",
        duration: "0:32",
        voice: "Marcus",
        style: { top: "5%", right: "2%", animationDelay: "1.5s", animationDuration: "7s" },
        bars: [{ color: "#b06aee", w: "70%" }, { color: "#f7d51d", w: "90%" }],
        subtitle: "The truth about money",
        subtitleHighlight: "truth",
    },
    {
        id: 3,
        platform: "SHORTS",
        platformColor: "#92cc41",
        title: "AI tools in 2026...",
        duration: "0:58",
        voice: "Aria",
        style: { bottom: "12%", left: "1%", animationDelay: "3s", animationDuration: "8s" },
        bars: [{ color: "#92cc41", w: "95%" }, { color: "#e76e55", w: "45%" }],
        subtitle: "This will CHANGE everything",
        subtitleHighlight: "CHANGE",
    },
    {
        id: 4,
        platform: "YOUTUBE",
        platformColor: "#209cee",
        title: "How I made $10k...",
        duration: "1:12",
        voice: "James",
        style: { bottom: "10%", right: "1%", animationDelay: "0.8s", animationDuration: "6.5s" },
        bars: [{ color: "#209cee", w: "78%" }, { color: "#92cc41", w: "55%" }],
        subtitle: "No one tells you this",
        subtitleHighlight: "tells",
    },
];

function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

function FloatingVideoCard({ card }: { card: typeof FLOATERS[0] }) {
    return (
        <div
            className="absolute hidden lg:flex flex-col select-none pointer-events-none"
            style={{
                ...card.style,
                width: "138px",
                animation: `float-card ${card.style.animationDuration} ${card.style.animationDelay} ease-in-out infinite alternate`,
                zIndex: 5,
            }}
        >
            <div
                className="flex flex-col overflow-hidden"
                style={{
                    border: "3px solid #2a2a2a",
                    background: "#0a0a0a",
                    boxShadow: `3px 3px 0 #000, 0 0 16px rgba(${hexToRgb(card.platformColor)}, 0.2)`,
                }}
            >
                <div className="flex items-center justify-between px-2 py-1" style={{ background: "#111", borderBottom: "2px solid #1a1a1a" }}>
                    <span className="text-[7px] font-black tracking-widest" style={{ color: card.platformColor }}>{card.platform}</span>
                    <span className="text-[6px]" style={{ color: "#444" }}>{card.duration}</span>
                </div>
                <div className="relative flex flex-col items-center justify-end" style={{ height: "196px", background: "linear-gradient(180deg, #050510 0%, #0a0a20 60%, #111118 100%)" }}>
                    <div className="absolute inset-0 overflow-hidden">
                        {[
                            { l: "6px",   w: "18px", h: "55px" },
                            { l: "26px",  w: "22px", h: "75px" },
                            { l: "50px",  w: "16px", h: "45px" },
                            { l: "68px",  w: "28px", h: "90px" },
                            { l: "98px",  w: "18px", h: "60px" },
                            { l: "118px", w: "14px", h: "40px" },
                        ].map((b, bi) => (
                            <div key={bi} className="absolute bottom-0" style={{ left: b.l, width: b.w, height: b.h, background: "#141418", borderTop: "2px solid #1e1e24" }} />
                        ))}
                        <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: `linear-gradient(0deg, rgba(${hexToRgb(card.platformColor)}, 0.12) 0%, transparent 100%)` }} />
                    </div>
                    <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)" }} />
                    <div className="relative z-10 w-full px-2 pb-2">
                        <div className="text-center py-1 px-2 text-[7px] font-black" style={{ background: "rgba(0,0,0,0.85)", color: "#fff" }}>
                            {card.subtitle.split(card.subtitleHighlight).map((part, pi, arr) => (
                                <span key={pi}>
                                    {part}
                                    {pi < arr.length - 1 && <span style={{ color: card.platformColor }}>{card.subtitleHighlight}</span>}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 py-2" style={{ background: "#0d0d0d", borderTop: "2px solid #1a1a1a" }}>
                    <div className="flex items-center justify-between">
                        <span className="text-[7px]" style={{ color: "#555" }}>🎙 {card.voice}</span>
                        <span className="text-[6px] px-1 py-0.5" style={{ background: `rgba(${hexToRgb(card.platformColor)}, 0.15)`, color: card.platformColor }}>✓ READY</span>
                    </div>
                    {card.bars.map((bar, bi) => (
                        <div key={bi} className="h-[4px] w-full" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
                            <div className="h-full" style={{ width: bar.w, background: `repeating-linear-gradient(90deg, ${bar.color} 0px, ${bar.color} 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)` }} />
                        </div>
                    ))}
                    <p className="text-[7px] truncate" style={{ color: "#444" }}>{card.title}</p>
                </div>
            </div>
        </div>
    );
}

// Seeded random — no Math.random() to avoid hydration mismatch
function seededRandom(seed: number) {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

const STARS = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.round(seededRandom(i * 4) * 10000) / 100,
    y: Math.round(seededRandom(i * 4 + 1) * 10000) / 100,
    delay: Math.round(seededRandom(i * 4 + 2) * 300) / 100,
    duration: Math.round((1.5 + seededRandom(i * 4 + 3) * 2) * 100) / 100,
}));

export function Hero() {
    const [msgIdx, setMsgIdx] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [typing, setTyping] = useState(true);
    const [blink, setBlink] = useState(true);
    const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const full = MESSAGES[msgIdx].msg;
        setDisplayed("");
        setTyping(true);
        let i = 0;
        const type = () => {
            if (i <= full.length) {
                setDisplayed(full.slice(0, i));
                i++;
                typingRef.current = setTimeout(type, 38);
            } else {
                setTyping(false);
            }
        };
        type();
        return () => { if (typingRef.current) clearTimeout(typingRef.current); };
    }, [msgIdx]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const b = setInterval(() => setBlink(p => !p), 500);
        return () => clearInterval(b);
    }, []);

    return (
        <section className="relative flex flex-col items-center justify-center text-center px-4 pt-28 pb-20 min-h-[90vh] overflow-hidden">

            {FLOATERS.map(card => (
                <FloatingVideoCard key={card.id} card={card} />
            ))}

            <div className="absolute inset-0 pointer-events-none select-none">
                {STARS.map(s => (
                    <div
                        key={s.id}
                        className="absolute w-[2px] h-[2px] bg-white"
                        style={{
                            left: `${s.x}%`,
                            top: `${s.y}%`,
                            opacity: 0.6,
                            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
                        }}
                    />
                ))}
            </div>

            <div
                className="absolute inset-0 pointer-events-none select-none z-10"
                style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)" }}
            />

            <div className="relative z-20 flex flex-col items-center w-full max-w-4xl mx-auto gap-10">

                <Badge className="text-[10px] px-4 py-1 tracking-widest animate-bounce border-2">
                    ✦ NEW QUEST AVAILABLE ✦
                </Badge>

                <div className="relative">
                    <h1
                        className="text-6xl md:text-8xl font-black tracking-tight leading-none select-none"
                        style={{ color: "#92cc41", textShadow: "4px 4px 0 #000, 0 0 40px rgba(146,204,65,0.35)" }}
                    >
                        VOXRA
                    </h1>
                    <sup
                        className="absolute -top-2 -right-10 text-base md:text-xl font-black"
                        style={{ color: "#f7d51d", textShadow: "2px 2px 0 #000", animation: "blink-kf 1.2s step-end infinite" }}
                    >
                        AI
                    </sup>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-base md:text-xl text-foreground max-w-xl mx-auto leading-relaxed">
                        Turn your scripts into ready-to-post faceless videos.
                    </p>
                    <p className="text-xs md:text-sm tracking-widest uppercase" style={{ color: "#888" }}>
                        Your script. Your style. Voxra does the rest.
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full max-w-xs">
                    {[
                        { label: "HP", value: "850/1000", pct: 85, color: "#e76e55", bg: "#1a0000", border: "#3a0000" },
                        { label: "XP", value: "LEVEL UP YOUR CONTENT", pct: 72, color: "#f7d51d", bg: "#1a1400", border: "#3a2800" },
                        { label: "MP", value: "600/1000", pct: 60, color: "#209cee", bg: "#00001a", border: "#00003a" },
                    ].map(({ label, value, pct, color, bg, border }) => (
                        <div key={label} className="flex items-center gap-3">
                            <span className="text-[9px] w-6 text-right shrink-0" style={{ color }}>{label}</span>
                            <div className="flex-1 h-4 relative overflow-hidden" style={{ background: bg, border: `2px solid ${border}` }}>
                                <div className="h-full" style={{ width: `${pct}%`, background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 10px, rgba(0,0,0,0.2) 10px, rgba(0,0,0,0.2) 12px)` }} />
                            </div>
                            <span className="text-[8px] shrink-0" style={{ color: "#555" }}>
                                {typeof value === "string" && value.includes("/") ? value : ""}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/sign-up">
                        <Button size="lg" className="text-sm px-8 py-4" style={{ background: "#92cc41", color: "#000", border: "3px solid #fff", boxShadow: "4px 4px 0 #000, 0 0 20px rgba(146,204,65,0.4)" }}>
                            ▶ START QUEST
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="text-sm px-8 py-4" style={{ border: "3px solid #444", boxShadow: "4px 4px 0 #000" }}>
                        ◈ WATCH DEMO
                    </Button>
                </div>

                <p className="text-xs tracking-widest" style={{ color: "#f7d51d", animation: "blink-kf 1s step-end infinite" }}>
                    — PRESS START TO CONTINUE —
                </p>

                <div className="w-full max-w-lg">
                    <Card className="border-[3px]" style={{ boxShadow: "4px 4px 0 #000" }}>
                        <CardContent className="p-4 flex gap-4 items-start text-left min-h-[90px]">
                            <div className="shrink-0 text-3xl leading-none mt-1">🧙</div>
                            <div className="flex flex-col gap-2 flex-1">
                                <span className="text-[9px] tracking-widest" style={{ color: "#f7d51d" }}>
                                    ★ {MESSAGES[msgIdx].speaker}
                                </span>
                                <span className="text-[10px] leading-loose" style={{ color: "#ccc", minHeight: "2.5em" }}>
                                    {displayed}
                                    <span style={{ opacity: blink && typing ? 1 : 0, color: "#92cc41" }}>█</span>
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex justify-center gap-2 mt-3">
                        {MESSAGES.map((_, i) => (
                            <div key={i} className="w-2 h-2 border border-current" style={{ background: i === msgIdx ? "#92cc41" : "transparent", borderColor: i === msgIdx ? "#92cc41" : "#333", transition: "background 0.3s" }} />
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float-card {
                    from { transform: translateY(0px) rotate(-1deg); }
                    to   { transform: translateY(-18px) rotate(1deg); }
                }
                @keyframes twinkle {
                    from { opacity: 0.1; }
                    to   { opacity: 0.9; }
                }
                @keyframes blink-kf {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }
            `}</style>
        </section>
    );
}