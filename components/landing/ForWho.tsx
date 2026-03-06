import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/8bit/card";
import { Progress } from "@/components/ui/8bit/progress";
// Note: 8bitcn/progress might map to something else, using generic progress or a fake bar.
// We'll use custom div bars styled like HealthBar/ManaBar since they need context.

const CLASSES = [
    {
        name: "CREATOR",
        desc: "Faceless page owners.",
        quote: "\"You write. AI edits.\"",
        icon: "🧙",
        stats: {
            hp: { label: "REACH", val: 80, color: "bg-hp border-hp" },
            mp: { label: "SPEED", val: 95, color: "bg-mp border-mp" },
            xp: { label: "CONTROL", val: 60, color: "bg-xp border-xp" },
        }
    },
    {
        name: "AGENCY",
        desc: "Editors & teams.",
        quote: "\"Scale output without hiring.\"",
        icon: "⚔",
        stats: {
            hp: { label: "REACH", val: 100, color: "bg-hp border-hp" },
            mp: { label: "SPEED", val: 70, color: "bg-mp border-mp" },
            xp: { label: "CONTROL", val: 90, color: "bg-xp border-xp" },
        }
    },
    {
        name: "BRAND",
        desc: "Full message control.",
        quote: "\"Automate, stay on-brand.\"",
        icon: "🛡",
        stats: {
            hp: { label: "REACH", val: 90, color: "bg-hp border-hp" },
            mp: { label: "SPEED", val: 60, color: "bg-mp border-mp" },
            xp: { label: "CONTROL", val: 100, color: "bg-xp border-xp" },
        }
    }
];

export function ForWho() {
    return (
        <section className="py-24 px-4 container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold uppercase drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
                    ✦ CHOOSE YOUR CLASS
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {CLASSES.map((cls) => (
                    <Card key={cls.name} className="group relative border-4 border-black hover:-translate-y-2 transition-transform duration-200">
                        <CardHeader className="text-center pb-4 border-b-4 border-black bg-muted/20">
                            <div className="text-6xl mb-4 group-hover:animate-float">{cls.icon}</div>
                            <CardTitle className="text-2xl">{cls.name}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-2">{cls.desc}</p>
                        </CardHeader>
                        <CardContent className="pt-6 relative font-sans">
                            <p className="italic text-center mb-6 py-2 px-4 bg-black text-white/90 border-2 border-[#444] rounded-sm font-pixel text-xs leading-relaxed">
                                {cls.quote}
                            </p>

                            <div className="space-y-4">
                                {Object.entries(cls.stats).map(([key, stat]) => (
                                    <div key={key} className="space-y-1">
                                        <div className="flex justify-between text-xs font-pixel">
                                            <span>{stat.label}</span>
                                            <span>{stat.val}</span>
                                        </div>
                                        <div className="w-full h-4 border-2 border-black bg-black p-0.5">
                                            <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: `${stat.val}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
