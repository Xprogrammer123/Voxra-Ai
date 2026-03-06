"use client";

import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";
import { useSession, signOut } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/8bit/spinner";

export function NavBar() {
    const { data: session, isPending } = useSession();

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b-4 border-black px-4 py-3">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="text-xl md:text-2xl font-black text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)] group-hover:animate-float">
                        ⚡ VOXRA<sup className="text-xp text-xs ml-1">AI</sup>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm uppercase">
                    <Link href="#quest" className="hover:text-success hover:-translate-y-0.5 transition-transform">Quest</Link>
                    <Link href="#abilities" className="hover:text-success hover:-translate-y-0.5 transition-transform">Abilities</Link>
                    <Link href="#pricing" className="hover:text-success hover:-translate-y-0.5 transition-transform">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    {isPending ? (
                        <Spinner />
                    ) : session ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="outline" className="text-xs md:text-sm border-2">DASHBOARD</Button>
                            </Link>
                            <Button
                                variant="destructive"
                                className="text-xs md:text-sm border-2"
                                onClick={() => signOut()}
                            >
                                LOGOUT
                            </Button>
                        </>
                    ) : (
                        <Link href="/sign-in">
                            <Button className="text-xs md:text-sm bg-success text-black border-2 border-black hover:bg-success/80 shadow-[2px_2px_0_0_#92cc41]">
                                START QUEST
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
