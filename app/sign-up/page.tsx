"use client";

import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/8bit/card";
import { Input } from "@/components/ui/8bit/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signUp.email({
                name,
                email,
                password,
                callbackURL: "/dashboard"
            });
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOAuth = async (provider: 'github' | 'google') => {
        // Actually using signIn.social handles registration too for OAuth
        // But import signIn from auth-client would be needed. 
        // We can assume they go back to sign-in page for OAuth or we import it.
        window.location.href = "/sign-in";
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
            <Link href="/" className="mb-8 font-black text-3xl text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)] animate-pulse">
                ⚡ VOXRA
            </Link>

            <Card className="w-full max-w-md border-4 border-black shadow-[8px_8px_0_0_#111] z-10 bg-background">
                <CardHeader className="text-center border-b-4 border-dashed border-[#333] pb-6 bg-muted/10">
                    <CardTitle className="text-2xl text-hp">NEW QUEST</CardTitle>
                    <p className="text-xs font-sans text-muted-foreground mt-2">Create your character profile</p>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-pixel uppercase">Display Name</Label>
                            <Input
                                className="font-sans border-2 border-black"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
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
                                minLength={8}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-hp text-black border-4 mt-2" disabled={loading}>
                            {loading ? "INITIALIZING..." : "CREATE ACCOUNT →"}
                        </Button>
                    </form>

                    <p className="text-[10px] font-sans text-muted-foreground text-center">
                        By creating an account, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </CardContent>
            </Card>

            <p className="mt-8 text-xs font-pixel text-muted-foreground">
                Already have an account? <Link href="/sign-in" className="text-success hover:underline">Log in</Link>
            </p>
        </div>
    );
}
