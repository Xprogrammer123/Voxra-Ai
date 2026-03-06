export function VideoPlayer({ url }: { url?: string }) {
    if (!url) {
        return (
            <div className="w-full aspect-[9/16] max-h-[70vh] bg-black border-4 border-[#333] flex items-center justify-center relative overflow-hidden">
                {/* CRT Scanline effect using CSS class we created */}
                <div className="absolute inset-0 pointer-events-none z-10 crt"></div>
                <div className="text-center">
                    <span className="text-6xl block mb-4 animate-bounce">🎬</span>
                    <p className="font-pixel text-xs text-muted-foreground uppercase">NO SIGNAL</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full aspect-[9/16] max-h-[70vh] bg-black border-4 border-black relative rounded-sm shadow-[8px_8px_0_0_#111] overflow-hidden group">
            <div className="absolute inset-0 pointer-events-none z-10 crt opacity-50"></div>

            {/* Fake video controls for the prototype */}
            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 flex gap-4 items-center">
                <button className="text-white hover:text-success text-xl">▶</button>
                <div className="flex-1 h-2 bg-white/20 border-2 border-black cursor-pointer">
                    <div className="h-full bg-success w-1/3"></div>
                </div>
            </div>

            <video
                src={url}
                controls={false}
                loop
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
            />
        </div>
    );
}
