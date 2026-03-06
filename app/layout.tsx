import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata = {
  title: "VOXRA — Script to Video",
  description: "Your script. Your style. Voxra does the rest.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pressStart.variable} dark`}>
      <body className="font-pixel bg-background min-h-screen text-foreground antialiased">{children}</body>
    </html>
  );
}
