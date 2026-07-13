"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ctaSection } from "@/lib/settings";
import { viewportOnce } from "@/lib/motionPresets";

export function CtaSection() {
  return (
    <section className="px-4 py-28">
      <motion.div
        className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-primary/[0.15] via-surface to-accent/[0.08] p-[1px] shadow-2xl glow-primary"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.55 }}
      >
        <div className="rounded-[calc(1.5rem-1px)] bg-surface/95 px-10 py-14 text-center backdrop-blur-sm sm:px-16 sm:py-16">
          <h2 className="type-section-title mb-8">{ctaSection.headline}</h2>
          <Button asChild size="lg" variant="accent" className="rounded-full px-10 font-semibold shadow-lg glow-accent">
            <Link href="/book-demo">{ctaSection.button}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
