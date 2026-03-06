"use client";

import { useState, useEffect, useRef } from "react";

const CLASSES = [
    {
        name: "CREATOR",
        desc: "Faceless page owners.",
        quote: "You write. AI edits.",
        icon: "🧙",
        color: "#92cc41",
        tagline: "SOLO ADVENTURER",
        stats: [
            { label: "REACH",   val: 80,  color: "#e76e55" },
            { label: "SPEED",   val: 95,  color: "#209cee" },
            { label: "CONTROL", val: 60,  color: "#f7d51d" },
        ],
    },
    {
        name: "AGENCY",
        desc: "Editors & teams.",
        quote: "Scale output without hiring.",
        icon: "⚔",
        color: "#e76e55",
        tagline: "GUILD MASTER",
        stats: [
            { label: "REACH",   val: 100, color: "#e76e55" },
            { label: "SPEED",   val: 70,  color: "#209cee" },
            { label: "CONTROL", val: 90,  color: "#f7d51d" },
        ],
    },
    {
        name: "BRAND",
        desc: "Full message control.",
        quote: "Automate, stay on-brand.",
        icon: "🛡",
        color: "#209cee",
        tagline: "ROYAL GUARDIAN",
        stats: [
            { label: "REACH",   val: 90,  color: "#e76e55" },
            { label: "SPEED",   val: 60,  color: "#209cee" },
            { label: "CONTROL", val: 100, color: "#f7d51d" },
        ],
    },
];

function StatBar({ label, val, color, animate }: { label: string; val: number; color: string; animate: boolean }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (animate) {
            const t = setTimeout(() => setWidth(val), 80);
            return () => clearTimeout(t);
        } else {
            setWidth(0);
        }
    }, [animate, val]);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
                <span className="text-[8px] tracking-widest" style={{ color: "#555" }}>{label}</span>
                <span className="text-[8px]" style={{ color }}>{val}</span>
            </div>
            <div className="h-[10px] w-full" style={{ background: "#0a0a0a", border: `2px solid #1a1a1a` }}>
                <div
                    className="h-full"
                    style={{
                        width: `${width}%`,
                        background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 8px, rgba(0,0,0,0.25) 8px, rgba(0,0,0,0.25) 10px)`,
                        transition: "width 0.6s ease-out",
                        boxShadow: `0 0 6px rgba(${color}, 0.3)`,
                    }}
                />
            </div>
        </div>
    );
}

export function ForWho() {
    const [selected, setSelected] = useState<number | null>(null);
    const [confirmed, setConfirmed] = useState<number | null>(null);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const b = setInterval(() => setBlink(p => !p), 600);
        return () => clearInterval(b);
    }, []);

    function handleSelect(i: number) {
        setSelected(i);
        setConfirmed(null);
    }

    function handleConfirm() {
        if (selected !== null) setConfirmed(selected);
    }

    return (
        <section className="py-24 px-4" id="classes">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 flex flex-col items-center gap-4">
                    <div
                        className="text-[9px] tracking-widest px-4 py-2 border-2"
                        style={{ color: "#92cc41", borderColor: "#92cc41", background: "rgba(146,204,65,0.06)" }}
                    >
                        ✦ CHARACTER SELECT ✦
                    </div>
                    <h2
                        className="text-3xl md:text-5xl font-black uppercase leading-tight"
                        style={{ textShadow: "3px 3px 0 #000" }}
                    >
                        CHOOSE YOUR
                        <br />
                        <span style={{ color: "#92cc41" }}>CLASS</span>
                    </h2>
                    <p className="text-[9px] tracking-widest" style={{ color: "#444" }}>
                        SELECT A CLASS TO VIEW STATS
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {CLASSES.map((cls, i) => {
                        const isSelected = selected === i;
                        const isConfirmed = confirmed === i;

                        return (
                            <div
                                key={cls.name}
                                onClick={() => handleSelect(i)}
                                className="flex flex-col cursor-pointer transition-all duration-100 select-none"
                                style={{
                                    border: `3px solid ${isSelected ? cls.color : "#2a2a2a"}`,
                                    background: isSelected ? `rgba(${hexToRgb(cls.color)}, 0.06)` : "#111",
                                    boxShadow: isSelected
                                        ? `4px 4px 0 #000, 0 0 20px rgba(${hexToRgb(cls.color)}, 0.2)`
                                        : "3px 3px 0 #000",
                                    transform: isSelected ? "translate(-2px, -2px)" : "translate(0,0)",
                                }}
                            >
                                {/* Card top */}
                                <div
                                    className="flex flex-col items-center gap-3 py-8 px-4"
                                    style={{ borderBottom: `2px solid ${isSelected ? cls.color : "#1a1a1a"}` }}
                                >
                                    {/* Selection cursor */}
                                    <div className="h-4 flex items-center justify-center">
                                        {isSelected && (
                                            <span
                                                className="text-[10px]"
                                                style={{ color: cls.color, opacity: blink ? 1 : 0 }}
                                            >
                                                ▶ SELECTED ◀
                                            </span>
                                        )}
                                    </div>

                                    <span className="text-5xl leading-none">{cls.icon}</span>

                                    <div className="flex flex-col items-center gap-1">
                                        <span
                                            className="text-xs font-black tracking-widest"
                                            style={{ color: isSelected ? cls.color : "#ccc" }}
                                        >
                                            {cls.name}
                                        </span>
                                        <span
                                            className="text-[8px] tracking-widest"
                                            style={{ color: "#555" }}
                                        >
                                            {cls.tagline}
                                        </span>
                                    </div>

                                    <p className="text-[9px] text-center" style={{ color: "#666" }}>
                                        {cls.desc}
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="flex flex-col gap-3 p-5">
                                    {cls.stats.map(s => (
                                        <StatBar
                                            key={s.label}
                                            label={s.label}
                                            val={s.val}
                                            color={s.color}
                                            animate={isSelected}
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <div
                                    className="mx-4 mb-4 p-3 flex gap-2 items-start"
                                    style={{ background: "#0a0a0a", border: "1px solid #1a1a1a" }}
                                >
                                    <span className="text-base shrink-0">🧙</span>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[7px] tracking-widest" style={{ color: "#444" }}>
                                            FORGE MASTER
                                        </span>
                                        <span className="text-[9px] italic leading-loose" style={{ color: "#666" }}>
                                            "{cls.quote}"
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Confirm button */}
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={handleConfirm}
                        disabled={selected === null}
                        className="text-[10px] tracking-widest px-10 py-4 transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{
                            background: selected !== null ? CLASSES[selected].color : "#1a1a1a",
                            color: "#000",
                            border: "3px solid #fff",
                            boxShadow: selected !== null ? "4px 4px 0 #000" : "none",
                            fontFamily: "inherit",
                            cursor: selected !== null ? "pointer" : "not-allowed",
                        }}
                    >
                        {confirmed !== null
                            ? `✓ ${CLASSES[confirmed].name} SELECTED — START QUEST`
                            : selected !== null
                            ? `▶ CONFIRM ${CLASSES[selected].name}`
                            : "SELECT A CLASS FIRST"}
                    </button>

                    {confirmed !== null && (
                        <p
                            className="text-[9px] tracking-widest"
                            style={{ color: CLASSES[confirmed].color, animation: "blink-kf 1s step-end infinite" }}
                        >
                            ★ CLASS LOCKED IN — ADVENTURE AWAITS ★
                        </p>
                    )}
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