"use client";

import Link from "next/link";

export function NewQuestButton() {
    return (
        <Link href="/projects/new">
            <button
                className="text-sm font-black tracking-widest uppercase px-6 py-3 transition-all duration-150"
                style={{
                    background: "#92cc41",
                    color: "#000",
                    border: "3px solid #fff",
                    boxShadow: "4px 4px 0 #000, 0 0 20px rgba(146,204,65,0.3)",
                }}
                onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px)";
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #000, 0 0 20px rgba(146,204,65,0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                }}
            >
                + NEW QUEST
            </button>
        </Link>
    );
}