"use client";

import { useProjectStore } from "@/store/useProjectStore";

export function ScriptStep() {
    const { scriptText, setScriptText } = useProjectStore();

    const words = scriptText.trim().split(/\s+/).filter(w => w.length > 0).length;
    const estSecs = Math.round((words / 150) * 60);
    const isOver = words > 500;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span style={{ color: "#e76e55" }}>★</span>
                    <h2 className="text-xl font-black tracking-widest uppercase" style={{ color: "#e76e55", textShadow: "2px 2px 0 #000" }}>
                        INSCRIBE YOUR SCROLL
                    </h2>
                </div>
                <p className="text-[10px] tracking-widest" style={{ color: "#555" }}>
                    Paste your script. Veo 3 will handle voice, visuals, and pacing.
                </p>
            </div>

            {/* Textarea */}
            <div style={{ border: `3px solid ${isOver ? "#e76e55" : scriptText ? "#92cc41" : "#1e1e1e"}`, background: "#050505" }}>
                <textarea
                    className="w-full min-h-[280px] bg-transparent text-base p-5 outline-none resize-y leading-relaxed font-sans placeholder:text-[#333]"
                    style={{ color: "#ddd" }}
                    placeholder="Once upon a time in a land far, far away..."
                    value={scriptText}
                    onChange={e => setScriptText(e.target.value)}
                />
                {/* Footer */}
                <div
                    className="flex justify-between items-center px-5 py-2"
                    style={{ borderTop: "2px solid #1a1a1a", background: "#0a0a0a" }}
                >
                    <span className="text-[9px] tracking-widest" style={{ color: "#333" }}>
                        {words} WORDS
                    </span>
                    <span
                        className="text-[9px] font-black tracking-widest"
                        style={{ color: isOver ? "#e76e55" : words > 0 ? "#92cc41" : "#333" }}
                    >
                        ~{estSecs}s VIDEO
                    </span>
                </div>
            </div>

            {/* Warning */}
            {isOver && (
                <div className="flex items-center gap-3 px-4 py-3 text-xs font-black tracking-widest"
                    style={{ background: "#1a0000", border: "2px solid #e76e55", color: "#e76e55" }}>
                    ⚠ Scripts over 500 words may require the Studio plan for export.
                </div>
            )}

            {/* Tip */}
            {!scriptText && (
                <div className="flex gap-3 items-start px-4 py-3"
                    style={{ background: "#0a0a0a", border: "2px solid #1e1e1e" }}>
                    <span className="text-xl shrink-0">🧙</span>
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] tracking-widest" style={{ color: "#f7d51d" }}>★ FORGE MASTER</span>
                        <span className="text-[10px] leading-loose" style={{ color: "#666" }}>
                            Write your script as if speaking aloud. Veo 3 will match the voice, tone, and visuals to your words.
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}