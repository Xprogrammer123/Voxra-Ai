"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

const items = [
    { title: "QUEST BOARD", url: "/dashboard",    icon: "🗺️", color: "#92cc41" },
    { title: "NEW QUEST",   url: "/projects/new", icon: "⚔",  color: "#f7d51d" },
    { title: "QUEST LOG",   url: "/gallery",      icon: "📜", color: "#209cee" },
    { title: "OPTIONS",     url: "/settings",     icon: "⚙️", color: "#888"    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <aside
            className="flex flex-col h-full w-64 shrink-0"
            style={{ background: "#080808", borderRight: "3px solid #1a1a1a" }}
        >
            {/* Logo */}
            <div
                className="px-5 py-5"
                style={{ borderBottom: "2px solid #1a1a1a" }}
            >
                <Link href="/" className="flex items-center gap-2">
                    <span
                        className="text-xl font-black tracking-widest"
                        style={{
                            color: "#92cc41",
                            textShadow: "3px 3px 0 #000, 0 0 20px rgba(146,204,65,0.4)",
                        }}
                    >
                        ⚡ VOXRA
                    </span>
                    <sup
                        className="text-[9px] font-black"
                        style={{ color: "#f7d51d", textShadow: "1px 1px 0 #000" }}
                    >
                        AI
                    </sup>
                </Link>
                <div className="mt-1 text-[8px] tracking-widest" style={{ color: "#333" }}>
                    VIDEO FORGE v1.0
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                <div className="text-[8px] tracking-widest mb-3 px-2" style={{ color: "#333" }}>
                    NAVIGATION
                </div>
                {items.map((item) => {
                    const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            className="flex items-center gap-3 px-3 py-3 text-xs font-black tracking-widest uppercase transition-all duration-100"
                            style={{
                                background: isActive ? `${item.color}15` : "transparent",
                                border: `2px solid ${isActive ? item.color : "transparent"}`,
                                color: isActive ? item.color : "#444",
                                boxShadow: isActive ? `3px 3px 0 #000` : "none",
                            }}
                            onMouseEnter={e => {
                                if (isActive) return;
                                (e.currentTarget as HTMLElement).style.color = "#888";
                                (e.currentTarget as HTMLElement).style.borderColor = "#222";
                            }}
                            onMouseLeave={e => {
                                if (isActive) return;
                                (e.currentTarget as HTMLElement).style.color = "#444";
                                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                            }}
                        >
                            <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
                            <span>{item.title}</span>
                            {isActive && (
                                <span className="ml-auto text-[8px]" style={{ color: item.color }}>▶</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Pixel divider */}
            <div className="mx-3 h-[2px]" style={{
                background: "repeating-linear-gradient(90deg, #1e1e1e 0px, #1e1e1e 4px, transparent 4px, transparent 8px)"
            }} />

            {/* Footer / user */}
            <div className="px-4 py-4" style={{ borderTop: "2px solid #1a1a1a" }}>
                {session ? (
                    <div className="flex flex-col gap-4">
                        {/* User info */}
                        <div className="flex items-center gap-3">
                            <div
                                className="w-9 h-9 shrink-0 flex items-center justify-center text-sm font-black overflow-hidden"
                                style={{
                                    background: "#0a1400",
                                    border: "2px solid #92cc41",
                                    color: "#92cc41",
                                    boxShadow: "2px 2px 0 #000",
                                }}
                            >
                                {session.user.image
                                    ? <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                                    : session.user.name?.charAt(0).toUpperCase() ?? "U"
                                }
                            </div>
                            <div className="overflow-hidden flex flex-col gap-0.5">
                                <p className="text-xs font-black tracking-widest truncate" style={{ color: "#ddd" }}>
                                    {session.user.name}
                                </p>
                                <p className="text-[9px] truncate" style={{ color: "#444" }}>
                                    {session.user.email}
                                </p>
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={() => signOut()}
                            className="w-full text-xs font-black tracking-widest uppercase py-2.5 transition-all duration-100"
                            style={{
                                background: "#1a0000",
                                color: "#e76e55",
                                border: "2px solid #3a0000",
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
                            LOGOUT [ESC]
                        </button>
                    </div>
                ) : (
                    <div className="text-[9px] tracking-widest" style={{ color: "#333" }}>
                        NOT LOGGED IN
                    </div>
                )}
            </div>
        </aside>
    );
}