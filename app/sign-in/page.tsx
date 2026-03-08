"use client";

import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import Link from "next/link";

const STARS = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 1.5 + Math.random() * 2,
}));

export default function SignInPage() {
    const handleGoogle = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">

            {/* Pixel star field */}
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

            {/* Scanline overlay */}
            <div
                className="absolute inset-0 pointer-events-none select-none z-10"
                style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
                }}
            />

            <div className="relative z-20 flex flex-col items-center gap-8 w-full max-w-sm mx-auto">

                {/* Logo */}
                <Link href="/" className="flex flex-col items-center gap-1">
                    <div className="relative">
                        <h1
                            className="text-5xl font-black tracking-tight leading-none select-none"
                            style={{
                                color: "#92cc41",
                                textShadow: "4px 4px 0 #000, 0 0 40px rgba(146,204,65,0.35)",
                            }}
                        >
                            VOXRA
                        </h1>
                        <sup
                            className="absolute -top-2 -right-8 text-base font-black"
                            style={{
                                color: "#f7d51d",
                                textShadow: "2px 2px 0 #000",
                                animation: "blink-kf 1.2s step-end infinite",
                            }}
                        >
                            AI
                        </sup>
                    </div>
                </Link>

                {/* Badge */}
                <Badge className="text-[10px] px-4 py-1 tracking-widest border-2">
                    ✦ PLAYER LOGIN ✦
                </Badge>

                {/* NPC dialogue card */}
                <Card className="w-full border-[3px]" style={{ boxShadow: "4px 4px 0 #000" }}>
                    <CardContent className="p-4 flex gap-4 items-start text-left">
                        <div className="shrink-0 text-3xl leading-none mt-1">🧙</div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] tracking-widest" style={{ color: "#f7d51d" }}>
                                ★ GATE KEEPER
                            </span>
                            <span className="text-[10px] leading-loose" style={{ color: "#ccc" }}>
                                Ah, a traveler! Verify thy identity with Google to enter the Voxra realm.
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* HP / XP bars */}
                <div className="flex flex-col gap-3 w-full">
                    {[
                        { label: "HP", pct: 85, color: "#e76e55", bg: "#1a0000", border: "#3a0000" },
                        { label: "XP", pct: 72, color: "#f7d51d", bg: "#1a1400", border: "#3a2800" },
                        { label: "MP", pct: 60, color: "#209cee", bg: "#00001a", border: "#00003a" },
                    ].map(({ label, pct, color, bg, border }) => (
                        <div key={label} className="flex items-center gap-3">
                            <span className="text-[9px] w-6 text-right shrink-0" style={{ color }}>{label}</span>
                            <div className="flex-1 h-4 relative overflow-hidden" style={{ background: bg, border: `2px solid ${border}` }}>
                                <div
                                    className="h-full"
                                    style={{
                                        width: `${pct}%`,
                                        background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 10px, rgba(0,0,0,0.2) 10px, rgba(0,0,0,0.2) 12px)`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Google button */}
                <Button
                    size="lg"
                    className="w-full text-sm px-8 py-4"
                    style={{
                        background: "#92cc41",
                        color: "#000",
                        border: "3px solid #fff",
                        boxShadow: "4px 4px 0 #000, 0 0 20px rgba(146,204,65,0.4)",
                    }}
                    onClick={handleGoogle}
                >
                    ▶ CONTINUE WITH GOOGLE
                </Button>

                {/* PRESS START blink */}
                <p
                    className="text-xs tracking-widest"
                    style={{
                        color: "#f7d51d",
                        animation: "blink-kf 1s step-end infinite",
                    }}
                >
                    — PRESS START TO CONTINUE —
                </p>

                <p className="text-xs" style={{ color: "#555" }}>
                    New to the realm?{" "}
                    <Link href="/sign-up" className="hover:underline" style={{ color: "#92cc41" }}>
                        Start a new quest →
                    </Link>
                </p>
            </div>

            <style>{`
                @keyframes twinkle {
                    from { opacity: 0.1; }
                    to   { opacity: 0.9; }
                }
                @keyframes blink-kf {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }
            `}</style>
        </div>
    );
}