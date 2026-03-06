import { AppSidebar } from "@/components/shared/AppSidebar";
import { SidebarProvider } from "@/components/ui/8bit/blocks/sidebar";
import { NavBar } from "@/components/shared/NavBar"; // Assuming you want a top nav too, or just sidebar
// A typical game UI has a nav bar + side panels. Let's use both.

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background selection:bg-success/30">
                <AppSidebar />
                <main className="flex-1 flex flex-col relative">
                    <header className="h-16 border-b-4 border-black bg-muted/5 flex items-center px-6 sticky top-0 z-40 backdrop-blur-sm">
                        <div className="font-pixel text-muted-foreground text-xs uppercase animate-pulse">
                            [SYSTEM READY]
                        </div>
                    </header>
                    <div className="flex-1 overflow-y-auto p-4 md:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
