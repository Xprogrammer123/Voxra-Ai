"use client";

import { useSession } from "@/lib/auth-client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/8bit/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/8bit/tabs";
// Note: assuming standard 8bitcn tabs are available. If not, we'll build basic ones or use shadcn's default styling wrapped in 8bit.
import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/8bit/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SettingsPage() {
    const { data: session } = useSession();

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="border-b-4 border-black pb-4 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-black uppercase text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)] tracking-tighter">
                    OPTIONS
                </h1>
                <p className="text-muted-foreground mt-2 uppercase text-sm font-sans tracking-wide">
                    Manage your account, billing, and API keys
                </p>
            </div>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 border-4 border-black bg-muted/10 h-auto p-0 mb-8 rounded-none">
                    <TabsTrigger value="account" className="font-pixel text-xs py-4 data-[state=active]:bg-success data-[state=active]:text-black rounded-none">ACT</TabsTrigger>
                    <TabsTrigger value="presets" className="font-pixel text-xs py-4 data-[state=active]:bg-xp data-[state=active]:text-black rounded-none">PRESETS</TabsTrigger>
                    <TabsTrigger value="api" className="font-pixel text-xs py-4 data-[state=active]:bg-mp data-[state=active]:text-black rounded-none">API KEYS</TabsTrigger>
                    <TabsTrigger value="billing" className="font-pixel text-xs py-4 data-[state=active]:bg-hp data-[state=active]:text-black rounded-none">BILLING</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <Card className="border-4 border-black shadow-[8px_8px_0_0_#111]">
                        <CardHeader className="border-b-4 border-dashed border-[#333] pb-4">
                            <CardTitle className="text-xl">ACCOUNT DETAILS</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label className="font-pixel text-muted-foreground text-xs uppercase">Email Address</Label>
                                <Input value={session?.user.email || ""} disabled className="bg-muted/10 border-2 font-sans" />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-pixel text-muted-foreground text-xs uppercase">Display Name</Label>
                                <Input value={session?.user.name || ""} className="font-sans border-2" />
                            </div>
                            <Button className="bg-success text-black border-4 mt-4">SAVE CHANGES</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="presets">
                    <Card className="border-4 border-black border-dashed bg-muted/5">
                        <CardContent className="p-12 text-center text-muted-foreground font-sans">
                            Custom presets are available on the Studio plan. Upgrade to unlock the forge.
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="api">
                    <Card className="border-4 border-black shadow-[8px_8px_0_0_#111]">
                        <CardHeader className="border-b-4 border-dashed border-[#333] pb-4 flex flex-row justify-between items-center">
                            <CardTitle className="text-xl text-mp">YOUR KEYS</CardTitle>
                            <Button className="bg-mp text-black border-2 border-black test-xs px-2 py-1 h-auto">GENERATE NEW</Button>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex gap-2 items-center">
                                <Input type="password" value="sk_test_1234567890abcdef" disabled className="font-sans bg-muted/10 font-mono tracking-widest text-lg border-2" />
                                <Button variant="outline" className="border-2 text-xl" title="Copy">📋</Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 font-sans">Keep your API key secret. It grants full access to your Voxra account.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="billing">
                    <Card className="border-4 border-black shadow-[8px_8px_0_0_#111]">
                        <CardHeader className="border-b-4 border-dashed border-[#333] pb-4">
                            <CardTitle className="text-xl text-hp">SUBSCRIPTION</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="flex justify-between items-center bg-muted/10 border-2 border-[#333] p-4">
                                <div>
                                    <h3 className="font-pixel text-lg mb-1">FREE TIER</h3>
                                    <p className="text-xs text-muted-foreground font-sans">0 / 5 Videos Genereated</p>
                                </div>
                                <Link href="/api/polar/portal">
                                    <Button variant="outline" className="border-4 text-xs">MANAGE BILLING</Button>
                                </Link>
                            </div>

                            <div className="bg-success/10 border-2 border-success p-4 rounded-sm">
                                <h3 className="font-pixel text-success text-sm mb-2">UPGRADE TO CREATOR</h3>
                                <p className="font-sans text-sm text-muted-foreground mb-4">Unlock 100 videos/mo, 4K export, and premium AI voices.</p>
                                <Link href="/api/polar/checkout?productId=creator_id">
                                    <Button className="w-full bg-success text-black border-4 shadow-[2px_2px_0_0_#92cc41]">⚡ UPGRADE NOW</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
}
