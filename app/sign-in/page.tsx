"use client";

import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/8bit/card";
import { Input } from "@/components/ui/8bit/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signIn.email({
                email,
                password,
                callbackURL: "/dashboard"
            });
            // Router redirection handled by callbackURL, but just in case:
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            // Would normally show toast here
        } finally {
            setLoading(false);
        }
    };

    const handleOAuth = async (provider: 'github' | 'google') => {
        await signIn.social({
            provider,
            callbackURL: "/dashboard"
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
            <Link href="/" className="mb-8 font-black text-3xl text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)] animate-pulse">
                ⚡ VOXRA
            </Link>

            <Card className="w-full max-w-md border-4 border-black shadow-[8px_8px_0_0_#111] z-10 bg-background">
                <CardHeader className="text-center border-b-4 border-dashed border-[#333] pb-6 bg-muted/10">
                    <CardTitle className="text-2xl text-xp">RESUME QUEST</CardTitle>
                    <p className="text-xs font-sans text-muted-foreground mt-2">Sign in to access your projects</p>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-pixel uppercase">Email</Label>
                            <Input
                                type="email"
                                className="font-sans border-2 border-black"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-pixel uppercase">Password</Label>
                            <Input
                                type="password"
                                className="font-sans border-2 border-black"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-success text-black border-4 mt-2" disabled={loading}>
                            {loading ? "AUTHENTICATING..." : "LOG IN →"}
                        </Button>
                    </form>

                    <div className="relative my-8 text-center text-xs font-pixel text-muted-foreground uppercase flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-dashed border-[#333]"></div></div>
                        <span className="bg-background px-4 relative z-10">OR EQUIP</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button type="button" variant="outline" className="border-4" onClick={() => handleOAuth('github')}>
                            GITHUB
                        </Button>
                        <Button type="button" variant="outline" className="border-4" onClick={() => handleOAuth('google')}>
                            GOOGLE
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <p className="mt-8 text-xs font-pixel text-muted-foreground">
                New to the realm? <Link href="/sign-up" className="text-success hover:underline">Start a new quest</Link>
            </p>
        </div>
    );
}
