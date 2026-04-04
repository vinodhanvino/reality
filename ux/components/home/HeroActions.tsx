"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/settings";
import { easeOut } from "@/lib/motionPresets";

export function HeroActions() {
  return (
    <>
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.26, ease: easeOut }}
      >
        <Button asChild size="lg" variant="accent" className="rounded-full px-8 font-semibold shadow-lg glow-accent">
          <Link href="/book-demo">{hero.ctaPrimary}</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="rounded-full border-white/15 bg-white/[0.03] px-8 text-white backdrop-blur-sm hover:bg-white/10"
        >
          <Link href="/how-it-works">{hero.ctaSecondary}</Link>
        </Button>
      </motion.div>
      <motion.a
        href="#product"
        className="mt-20 inline-flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <span>Explore</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5 text-accent/70" aria-hidden />
        </motion.span>
      </motion.a>
    </>
  );
}
