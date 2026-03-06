import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";

const STEPS = [
    {
        num: 1,
        title: "PASTE YOUR SCRIPT",
        desc: "Drop a script or upload a .txt. Choose your format (9:16, 16:9).",
        icon: "📜",
        color: "bg-hp border-hp",
    },
    {
        num: 2,
        title: "CHOOSE YOUR STYLE",
        desc: "Pick a voice, set the music, customize fonts and colors.",
        icon: "🎨",
        color: "bg-mp border-mp",
    },
    {
        num: 3,
        title: "RECEIVE YOUR LOOT",
        desc: "Get ready-to-post, highly engaging videos for every platform.",
        icon: "💎",
        color: "bg-success border-success",
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 px-4 container mx-auto" id="quest">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold uppercase text-xp drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
                    ⚔ THE QUEST
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {STEPS.map((step) => (
                    <Card key={step.num} className="group hover:-translate-y-2 transition-transform duration-200 border-4 border-black hover:shadow-[0_0_20px_rgba(146,204,65,0.4)]">
                        <CardHeader className="border-b-4 border-black bg-muted/30 pb-4">
                            <div className="flex justify-between items-start mb-4">
                                <Badge variant="default" className={`text-black text-xl px-4 py-2 border-2 border-black ${step.color}`}>
                                    STEP {step.num}
                                </Badge>
                                <span className="text-4xl group-hover:animate-float">{step.icon}</span>
                            </div>
                            <CardTitle className="text-lg leading-snug">{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
