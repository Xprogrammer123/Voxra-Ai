import { Button } from "@/components/ui/8bit/button";
import Link from "next/link";

export function CTASection() {
    return (
        <section className="py-32 px-4 border-t-4 border-black bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] relative overflow-hidden">
            {/* Background glow overlay */}
            <div className="absolute inset-0 bg-success/5 z-0"></div>

            <div className="container mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] mb-8 leading-tight max-w-4xl mx-auto">
                    READY TO STOP <br />
                    <span className="text-hp">WASTING TIME</span> EDITING?
                </h2>

                <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                    Paste your first script. Get a ready-to-post video in minutes.
                </p>

                <Link href="/sign-up">
                    <Button size="lg" className="text-xl md:text-2xl py-8 px-12 bg-success text-black hover:bg-success/80 border-4 border-black shadow-[8px_8px_0_0_#92cc41] hover:translate-y-1 hover:shadow-[4px_4px_0_0_#92cc41] transition-all">
                        ⚔ GENERATE MY FIRST VIDEO
                    </Button>
                </Link>
            </div>
        </section>
    );
}
