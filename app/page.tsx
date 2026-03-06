import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { ForWho } from "@/components/landing/ForWho";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";
import { NavBar } from "@/components/shared/NavBar"; // We will create this next

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-success/30">
      <NavBar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <ForWho />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <footer className="py-8 text-center border-t-4 border-black bg-black text-xs text-muted-foreground uppercase tracking-widest">
        <p>© 2026 VOXRA AI. BUILT FOR GLORY.</p>
      </footer>
    </div>
  );
}
