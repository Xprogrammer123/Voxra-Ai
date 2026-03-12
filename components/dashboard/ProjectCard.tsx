"use client"

import Link from "next/link";
import { Project } from "@/lib/schema";

const PLATFORM_COLORS: Record<string, string> = {
    tiktok:   "#e76e55",
    reels:    "#b06aee",
    shorts:   "#92cc41",
    youtube:  "#209cee",
    default:  "#f7d51d",
};

interface ProjectCardProps {
    project: Project & { videoCount: number };
}

export function ProjectCard({ project }: ProjectCardProps) {
    const maxVideos = 10;
    const remaining = Math.max(0, maxVideos - project.videoCount);
    const healthPct = (remaining / maxVideos) * 100;
    const platformKey = project.platform?.toLowerCase() ?? "default";
    const color = PLATFORM_COLORS[platformKey] ?? PLATFORM_COLORS.default;
    const isLow = healthPct <= 30;

    return (
        <div
            className="flex flex-col group transition-all duration-150 hover:-translate-y-1"
            style={{
                background: "#0a0a0a",
                border: "3px solid #1a1a1a",
                boxShadow: `4px 4px 0 #000, 0 0 16px ${color}18`,
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `4px 4px 0 #000, 0 0 24px ${color}44`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = `4px 4px 0 #000, 0 0 16px ${color}18`)}
        >
            {/* Header */}
            <div
                className="flex items-start justify-between px-4 py-3 gap-2"
                style={{ borderBottom: "2px solid #1a1a1a", background: "#0d0d0d" }}
            >
                <span
                    className="font-black text-sm truncate leading-relaxed"
                    style={{ color: "#ddd", textShadow: "1px 1px 0 #000" }}
                >
                    {project.name}
                </span>
                <span
                    className="text-[8px] font-black tracking-widest shrink-0 px-2 py-1"
                    style={{
                        color,
                        background: `${color}18`,
                        border: `1px solid ${color}44`,
                    }}
                >
                    {project.platform.toUpperCase()}
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4 px-4 py-4 flex-1">

                {/* Quota HP bar */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span className="text-[9px] tracking-widest" style={{ color: "#555" }}>QUOTA HP</span>
                        <span className="text-[9px] font-black" style={{ color: isLow ? "#e76e55" : color }}>
                            {remaining}/{maxVideos}
                        </span>
                    </div>
                    <div className="h-4 w-full" style={{ background: "#111", border: "2px solid #1e1e1e" }}>
                        <div
                            className="h-full transition-all duration-500"
                            style={{
                                width: `${healthPct}%`,
                                background: isLow
                                    ? `repeating-linear-gradient(90deg, #e76e55 0px, #e76e55 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)`
                                    : `repeating-linear-gradient(90deg, ${color} 0px, ${color} 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)`,
                                animation: isLow ? "pulse 1s step-end infinite" : "none",
                            }}
                        />
                    </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                        <span className="text-[9px]" style={{ color: "#444" }}>FORMAT</span>
                        <span className="text-[9px] font-black" style={{ color: "#888" }}>{project.format}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[9px]" style={{ color: "#444" }}>GENERATED</span>
                        <span className="text-[9px] font-black" style={{ color: "#888" }}>{project.videoCount} VIDEOS</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex gap-2 px-4 pb-4">
                <Link href={`/projects/${project.id}/create`} className="flex-1">
                    <button
                        className="w-full text-xs font-black tracking-widest uppercase py-3 px-4 transition-all duration-150"
                        style={{
                            background: "#92cc41",
                            color: "#000",
                            border: "3px solid #fff",
                            boxShadow: "3px 3px 0 #000",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                            (e.currentTarget as HTMLElement).style.transform = "translate(3px, 3px)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #000";
                            (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                        }}
                    >
                        ▶ OPEN QUEST
                    </button>
                </Link>
                <button
                    className="shrink-0 px-3 py-3 text-sm font-black transition-all duration-150"
                    title="Delete Project"
                    style={{
                        background: "#1a0000",
                        color: "#e76e55",
                        border: "3px solid #3a0000",
                        boxShadow: "3px 3px 0 #000",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "#e76e55";
                        (e.currentTarget as HTMLElement).style.color = "#000";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "#1a0000";
                        (e.currentTarget as HTMLElement).style.color = "#e76e55";
                    }}
                >
                    🗑
                </button>
            </div>
        </div>
    );
}