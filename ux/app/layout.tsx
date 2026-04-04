import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { site, theme } from "@/lib/settings";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} – Bar Inventory & Liquor Variance Analytics`,
  description:
    "Spirix detects variance between sales, purchases, and physical inventory in real time. Stop liquor leakage.",
  openGraph: {
    title: `${site.name} – Bar Inventory & Liquor Variance Analytics`,
    description:
      "Spirix detects variance between sales, purchases, and physical inventory in real time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cssVars = {
    "--primary": theme.primary,
    "--accent": theme.accent,
    "--background": theme.background,
    "--surface": theme.surface,
    "--foreground": theme.foreground,
    "--muted": theme.muted,
    "--glow-primary": theme.glowPrimary,
    "--glow-accent": theme.glowAccent,
  } as CSSProperties;

  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${jakarta.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
        style={cssVars}
      >
        <Nav />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
