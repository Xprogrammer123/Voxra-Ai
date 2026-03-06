import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import { Badge } from "@/components/ui/8bit/badge";
import Link from "next/link";

const PLANS = [
    {
        name: "STARTER",
        price: "$29",
        videos: "30 videos",
        features: ["1080p Export", "2 Presets", "1 User"],
        href: "/api/polar/checkout?productId=starter_id"
    },
    {
        name: "CREATOR",
        price: "$59",
        videos: "100 videos",
        features: ["1080p Export", "10 Presets", "3 Voices", "2 Users"],
        popular: true,
        href: "/api/polar/checkout?productId=creator_id"
    },
    {
        name: "STUDIO",
        price: "$129",
        videos: "300 videos",
        features: ["4K Export", "Unlimited Presets", "All Voices", "5 Users"],
        href: "/api/polar/checkout?productId=studio_id"
    },
    {
        name: "AGENCY",
        price: "Custom",
        videos: "Unlimited",
        features: ["White-label Export", "API Access", "Dedicated AM"],
        href: "mailto:hello@voxra.ai"
    }
];

export function Pricing() {
    return (
        <section className="py-24 px-4 container mx-auto" id="pricing">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold uppercase text-hp drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
                    💰 SELECT YOUR TIER
                </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {PLANS.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`flex flex-col border-4 border-black relative transition-transform hover:-translate-y-1 ${plan.popular ? "border-success shadow-[0_0_20px_rgba(146,204,65,0.4)] scale-105 z-10" : ""
                            }`}
                    >
                        {plan.popular && (
                            <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-success text-black border-2 border-black animate-pulse">
                                POPULAR
                            </Badge>
                        )}
                        <CardHeader className="text-center border-b-4 border-black bg-muted/10 pb-6">
                            <CardTitle className="text-xl mb-4">{plan.name}</CardTitle>
                            <div className="text-4xl text-xp drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                {plan.price}<span className="text-sm text-muted-foreground font-sans">/mo</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 flex-1 flex flex-col">
                            <div className="text-center font-bold text-lg mb-6 text-mp uppercase border-b-2 border-dashed border-[#444] pb-4">
                                {plan.videos}
                            </div>
                            <ul className="space-y-4 flex-1 mb-8">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex gap-3 text-sm leading-snug">
                                        <span className="text-success text-xs mt-0.5">▶</span> {f}
                                    </li>
                                ))}
                            </ul>
                            <Link href={plan.href} className="mt-auto">
                                <Button className={`w-full text-base py-6 border-4 border-black ${plan.popular ? "bg-success text-black hover:bg-success/80 shadow-[4px_4px_0_0_#92cc41]" : "bg-black text-white hover:bg-[#222]"}`}>
                                    SELECT {plan.name}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-16 text-center">
                <p className="text-xp animate-blink text-sm md:text-base uppercase">Try 5 videos free — no card required</p>
            </div>
        </section>
    );
}
