"use client";

export function AssetsStep() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span style={{ color: "#f7d51d" }}>★</span>
                    <h2 className="text-xl font-black tracking-widest uppercase" style={{ color: "#f7d51d", textShadow: "2px 2px 0 #000" }}>
                        UPLOAD INVENTORY
                    </h2>
                </div>
                <p className="text-[10px] tracking-widest" style={{ color: "#555" }}>
                    Provide custom b-roll or let Veo 3 generate footage for you.
                </p>
            </div>

            {/* Drop zone */}
            <div
                className="flex flex-col items-center justify-center gap-4 py-16 cursor-pointer transition-all duration-150"
                style={{ border: "3px dashed #1e1e1e", background: "#0a0a0a" }}
                onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#f7d51d";
                    (e.currentTarget as HTMLElement).style.background = "#0d0d00";
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1e1e1e";
                    (e.currentTarget as HTMLElement).style.background = "#0a0a0a";
                }}
            >
                <span className="text-5xl transition-transform hover:scale-110">📤</span>
                <div className="flex flex-col items-center gap-1 text-center">
                    <span className="text-sm font-black tracking-widest" style={{ color: "#888" }}>
                        DRAG & DROP LOOT HERE
                    </span>
                    <span className="text-[9px] tracking-widest" style={{ color: "#444" }}>
                        MP4 · MOV · PNG · JPG — MAX 50MB
                    </span>
                </div>
                <button
                    className="text-xs font-black tracking-widest uppercase px-5 py-2 transition-all duration-150"
                    style={{
                        background: "transparent",
                        color: "#f7d51d",
                        border: "3px solid #f7d51d",
                        boxShadow: "3px 3px 0 #000",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "#f7d51d";
                        (e.currentTarget as HTMLElement).style.color = "#000";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "#f7d51d";
                    }}
                >
                    BROWSE FILES
                </button>
            </div>

            {/* AI fallback notice */}
            <div className="flex items-start gap-3 px-4 py-3"
                style={{ background: "#0a0a0a", border: "2px solid #1e1e1e" }}>
                <div className="w-6 h-6 flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5"
                    style={{ background: "#92cc41", color: "#000", border: "2px solid #fff" }}>
                    AI
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black tracking-widest" style={{ color: "#92cc41" }}>
                        VEO 3 FOOTAGE GENERATION ENABLED
                    </span>
                    <span className="text-[10px] leading-loose" style={{ color: "#555" }}>
                        If no assets are uploaded, Veo 3 will generate cinematic footage matching your script automatically.
                    </span>
                </div>
            </div>
        </div>
    );
}