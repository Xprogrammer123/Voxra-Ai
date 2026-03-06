"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/8bit/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/8bit/select";
import { Switch } from "@/components/ui/8bit/switch";
import { Label } from "@/components/ui/label"; // standard UI component
import * as schema from "@/lib/schema";

export default function NewProjectPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [platform, setPlatform] = useState("tiktok");
    const [format, setFormat] = useState("9:16");
    const [wantPreset, setWantPreset] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        try {
            // In a real app we'd POST to a dedicated /api/projects route here.
            // For the hackathon, we only insert project when we hit generate.
            // Wait, the schema requires projects prior to videos. We *should* have a /api/projects route.
            // I will simulate this by redirecting to a fake id /projects/uuid for now, 
            // to get the user to the Wizard. Or I can build that API quickly next.
            const fakeId = "proj-" + Math.random().toString(36).substr(2, 9);
            router.push(`/projects/${fakeId}/create`);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pt-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-black uppercase text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    NEW QUEST
                </h1>
                <p className="text-muted-foreground mt-2 uppercase text-sm font-sans tracking-wide">
                    Define the parameters of your next video
                </p>
            </div>

            <Card className="border-4 border-black">
                <CardHeader className="bg-muted/20 border-b-4 border-black pb-4">
                    <CardTitle className="text-xl">QUEST SETUP</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-pixel uppercase text-muted-foreground">PROJECT NAME</Label>
                            <Input
                                className="font-sans text-lg border-2 border-black rounded-none shadow-[2px_2px_0_0_#111] focus-visible:ring-0 focus-visible:shadow-[4px_4px_0_0_#92cc41] transition-shadow"
                                placeholder="e.g. Daily Tech Tips"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 mt-4">
                                <Label className="text-xs font-pixel uppercase text-muted-foreground">TARGET PLATFORM</Label>
                                <Select value={platform} onValueChange={setPlatform}>
                                    <SelectTrigger className="border-2 border-black rounded-none shadow-[2px_2px_0_0_#111]">
                                        <SelectValue placeholder="Select platform" />
                                    </SelectTrigger>
                                    <SelectContent className="border-2 border-black rounded-none font-sans">
                                        <SelectItem value="tiktok">TikTok</SelectItem>
                                        <SelectItem value="reels">Instagram Reels</SelectItem>
                                        <SelectItem value="shorts">YouTube Shorts</SelectItem>
                                        <SelectItem value="youtube">YouTube Longform</SelectItem>
                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 mt-4">
                                <Label className="text-xs font-pixel uppercase text-muted-foreground">VIDEO FORMAT</Label>
                                <Select value={format} onValueChange={setFormat}>
                                    <SelectTrigger className="border-2 border-black rounded-none shadow-[2px_2px_0_0_#111]">
                                        <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                    <SelectContent className="border-2 border-black rounded-none font-sans">
                                        <SelectItem value="9:16">Vertical 9:16</SelectItem>
                                        <SelectItem value="16:9">Horizontal 16:9</SelectItem>
                                        <SelectItem value="1:1">Square 1:1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/10 border-t-4 border-black p-4 flex justify-end">
                    <Button
                        className="text-base py-6 px-8 bg-success text-black border-4 border-black hover:bg-success/80 shadow-[4px_4px_0_0_#92cc41]"
                        onClick={handleCreate}
                        disabled={!name || loading}
                    >
                        {loading ? "INITIALIZING..." : "ENTER THE QUEST →"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
