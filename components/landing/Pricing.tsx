"use client";

import { Button } from "@/components/ui/8bit/button";
import { useState, useEffect } from "react";
import Link from "next/link";

const PLANS = [
    {
        name: "STARTER",
        price: "$29",
        period: "/mo",
        videos: "30 VIDEOS / MO",
        color: "#e76e55",
        icon: "🗡",
        tier: "NOVICE",
        features: [
            "1080p Export",
            "2 Style Presets",
            "1 User",
            "Text → Video",
            "Basic Voices",
        ],
        href: "/api/polar/checkout?productId=starter_id",
    },
    {
        name: "CREATOR",
        price: "$59",
        period: "/mo",
        videos: "100 VIDEOS / MO",
        color: "#92cc41",
        icon: "⚔",
        tier: "ADVENTURER",
        popular: true,
        features: [
            "1080p Export",
            "10 Style Presets",
            "3 ElevenLabs Voices",
            "Priority Rendering",
            "2 Users",
        ],
        href: "/api/polar/checkout?productId=creator_id",
    },
    {
        name: "STUDIO",
        price: "$129",
        period: "/mo",
        videos: "300 VIDEOS / MO",
        color: "#209cee",
        icon: "🛡",
        tier: "LEGEND",
        features: [
            "4K Export",
            "Unlimited Presets",
            "All Voices",
            "Fastest Rendering",
            "5 Users",
        ],
        href: "/api/polar/checkout?productId=studio_id",
    },
    {
        name: "AGENCY",
        price: "Custom",
        period: "",
        videos: "UNLIMITED",
        color: "#b06aee",
        icon: "👑",
        tier: "MYTHIC",
        features: [
            "White-label Export",
            "Full API Access",
            "Dedicated Account Mgr",
            "Custom Integrations",
            "Unlimited Users",
        ],
        href: "mailto:hello@voxra.ai",
    },
];

export function Pricing() {
    const [hovered, setHovered] = useState<number | null>(null);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const b = setInterval(() => setBlink(p => !p), 600);
        return () => clearInterval(b);
    }, []);

    return (
        <section
            className="py-24 px-4"
            id="pricing"
            style={{ borderTop: "4px solid #2a2a2a", borderBottom: "4px solid #2a2a2a", background: "#0d0d0d" }}
        >
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 flex flex-col items-center gap-4">
                    <div
                        className="text-[9px] tracking-widest px-4 py-2 border-2"
                        style={{ color: "#e76e55", borderColor: "#e76e55", background: "rgba(231,110,85,0.06)" }}
                    >
                        ✦ TIER SELECTION ✦
                    </div>
                    <h2
                        className="text-3xl md:text-5xl font-black uppercase leading-tight"
                        style={{ color: "#e76e55", textShadow: "3px 3px 0 #000" }}
                    >
                        💰 SELECT YOUR
                        <br />
                        <span style={{ color: "#fff" }}>TIER</span>
                    </h2>
                    <p className="text-[9px] tracking-widest" style={{ color: "#444" }}>
                        UPGRADE OR DOWNGRADE ANYTIME
                    </p>
                </div>

                {/* Plan cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {PLANS.map((plan, i) => {
                        const isHovered = hovered === i;

                        return (
                            <div
                                key={plan.name}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                className="relative flex flex-col transition-all duration-100"
                                style={{
                                    border: `3px solid ${isHovered || plan.popular ? plan.color : "#2a2a2a"}`,
                                    background: isHovered || plan.popular
                                        ? `rgba(${hexToRgb(plan.color)}, 0.05)`
                                        : "#111",
                                    boxShadow: plan.popular
                                        ? `4px 4px 0 #000, 0 0 24px rgba(${hexToRgb(plan.color)}, 0.25)`
                                        : isHovered
                                        ? `4px 4px 0 #000, 0 0 16px rgba(${hexToRgb(plan.color)}, 0.15)`
                                        : "3px 3px 0 #000",
                                    transform: plan.popular
                                        ? "translate(-2px,-2px) scale(1.02)"
                                        : isHovered
                                        ? "translate(-2px,-2px)"
                                        : "translate(0,0)",
                                    zIndex: plan.popular ? 10 : 1,
                                }}
                            >
                                {/* Popular badge */}
                                {plan.popular && (
                                    <div
                                        className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] px-4 py-1 font-black border-2 border-black whitespace-nowrap"
                                        style={{
                                            background: plan.color,
                                            color: "#000",
                                            animation: "blink-kf 1.5s step-end infinite",
                                        }}
                                    >
                                        ★ MOST POPULAR ★
                                    </div>
                                )}

                                {/* Top — tier + icon */}
                                <div
                                    className="flex items-center justify-between px-4 py-3"
                                    style={{ borderBottom: `2px solid ${isHovered || plan.popular ? plan.color : "#1a1a1a"}` }}
                                >
                                    <div className="flex flex-col gap-1">
                                        <span
                                            className="text-[7px] tracking-widest"
                                            style={{ color: plan.color }}
                                        >
                                            {plan.tier}
                                        </span>
                                        <span
                                            className="text-xs font-black"
                                            style={{ color: isHovered || plan.popular ? "#fff" : "#aaa" }}
                                        >
                                            {plan.name}
                                        </span>
                                    </div>
                                    <span className="text-2xl">{plan.icon}</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-end gap-1 px-4 py-5">
                                    <span
                                        className="text-4xl font-black leading-none"
                                        style={{
                                            color: plan.color,
                                            textShadow: `2px 2px 0 #000`,
                                        }}
                                    >
                                        {plan.price}
                                    </span>
                                    <span className="text-[9px] mb-1" style={{ color: "#444" }}>
                                        {plan.period}
                                    </span>
                                </div>

                                {/* Videos quota */}
                                <div
                                    className="mx-4 mb-4 px-3 py-2 text-center text-[8px] tracking-widest font-black"
                                    style={{
                                        background: `rgba(${hexToRgb(plan.color)}, 0.08)`,
                                        border: `2px solid rgba(${hexToRgb(plan.color)}, 0.2)`,
                                        color: plan.color,
                                    }}
                                >
                                    {plan.videos}
                                </div>

                                {/* Features */}
                                <ul className="flex flex-col gap-3 px-4 pb-4 flex-1">
                                    {plan.features.map((f, fi) => (
                                        <li key={fi} className="flex items-start gap-2">
                                            <span className="text-[8px] mt-0.5 shrink-0" style={{ color: plan.color }}>▶</span>
                                            <span className="text-[9px] leading-snug" style={{ color: "#777" }}>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA button */}
                                <div className="p-4 mt-auto" style={{ borderTop: "1px solid #1a1a1a" }}>
                                    <Link href={plan.href}>
                                        <Button
                                            className="w-full text-[9px] py-5 transition-all duration-100"
                                            style={{
                                                background: isHovered || plan.popular ? plan.color : "#1a1a1a",
                                                color: isHovered || plan.popular ? "#000" : "#555",
                                                border: `2px solid ${isHovered || plan.popular ? plan.color : "#2a2a2a"}`,
                                                boxShadow: isHovered || plan.popular ? "3px 3px 0 #000" : "none",
                                            }}
                                        >
                                            {plan.price === "Custom" ? "CONTACT US" : `SELECT ${plan.name}`}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Free trial note */}
                <div className="mt-12 flex flex-col items-center gap-4">
                    {/* Pixel divider */}
                    <div
                        className="w-full h-[2px]"
                        style={{
                            background: "repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 8px, transparent 8px, transparent 12px)",
                        }}
                    />

                    <p
                        className="text-[10px] tracking-widest"
                        style={{
                            color: "#f7d51d",
                            opacity: blink ? 1 : 0,
                            transition: "opacity 0.1s",
                        }}
                    >
                        ✦ TRY 5 VIDEOS FREE — NO CARD REQUIRED — NO WATERMARK ✦
                    </p>

                    <p className="text-[8px] tracking-widest" style={{ color: "#333" }}>
                        ALL PLANS INCLUDE RUNWAY · ELEVENLABS · WHISPER POWERED GENERATION
                    </p>
                </div>

            </div>

            <style>{`
                @keyframes blink-kf {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }
            `}</style>
        </section>
    );
}

function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}