import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";

const FEATURES = [
    {
        title: "YOU ARE IN CONTROL",
        desc: "Your script, style, voice, music. Voxra executes precisely.",
        icon: "🎭",
    },
    {
        title: "MULTI-FORMAT EXPORT",
        desc: "9:16, 16:9, 1:1 in a single click. No extra rendering.",
        icon: "📱",
        extra: <Badge className="absolute -top-3 -right-3 bg-xp text-black border-2 border-black animate-pulse">NEW</Badge>
    },
    {
        title: "REALISTIC VOICES",
        desc: "Powered by ElevenLabs. Multiple languages, tones, speeds.",
        icon: "🎙️",
        extra: <Badge className="absolute -top-3 -right-3 bg-hp text-black border-2 border-black">HOT</Badge>
    },
    {
        title: "SMART SUBTITLES",
        desc: "Word-timed captions via Whisper API. Fully customizable.",
        icon: "📝",
    },
    {
        title: "YOUR BRAND ASSETS",
        desc: "Upload clips, logos, and custom color palettes.",
        icon: "🎨",
    },
    {
        title: "PRESETS PER CLIENT",
        desc: "Save and reuse entire style configurations instantly.",
        icon: "⚡",
    }
];

export function Features() {
    return (
        <section className="py-24 px-4 bg-muted/10 border-y-4 border-black" id="abilities">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase text-mp drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
                        ◈ ABILITIES UNLOCKED
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature, i) => (
                        <Card key={i} className="relative border-4 border-black bg-background hover:bg-muted/20 transition-colors">
                            {feature.extra}
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <span className="text-3xl bg-black p-3 border-2 border-white/10 rounded-sm">{feature.icon}</span>
                                <CardTitle className="text-sm md:text-base leading-snug">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
