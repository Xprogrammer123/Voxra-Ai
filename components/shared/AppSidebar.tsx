"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/8bit/blocks/sidebar";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/8bit/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/8bit/avatar";

const items = [
    { title: "QUEST BOARD", url: "/dashboard", icon: "🗺️" },
    { title: "NEW QUEST", url: "/projects/new", icon: "⚔" },
    { title: "QUEST LOG", url: "/gallery", icon: "📜" },
    { title: "OPTIONS", url: "/settings", icon: "⚙️" },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <Sidebar className="border-r-4 border-black bg-muted/10 font-sans">
            <SidebarHeader className="p-4 border-b-4 border-black bg-background">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="text-xl font-black text-success drop-shadow-[2px_2px_0_rgba(0,0,0,1)] font-pixel">
                        ⚡ VOXRA
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="p-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="font-pixel text-xs text-muted-foreground uppercase mb-4">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`h-12 border-2 border-transparent transition-all font-pixel text-xs ${isActive
                                                    ? "bg-success/20 text-success border-success"
                                                    : "hover:bg-muted/40 hover:border-border"
                                                }`}
                                        >
                                            <Link href={item.url}>
                                                <span className="text-xl mr-2">{item.icon}</span>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t-4 border-black bg-background">
                {session && (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-black rounded-sm">
                                <AvatarImage src={session.user.image || ""} />
                                <AvatarFallback className="bg-xp text-black rounded-sm font-pixel text-xs">
                                    {session.user.name?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
                                <p className="font-pixel text-xs truncate">{session.user.name}</p>
                                <p className="text-xs text-muted-foreground truncate font-sans">{session.user.email}</p>
                            </div>
                        </div>
                        <Button
                            variant="destructive"
                            className="w-full font-pixel py-4 border-2 shadow-none hover:bg-destructive/80 text-xs"
                            onClick={() => signOut()}
                        >
                            LOGOUT [ESC]
                        </Button>
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
