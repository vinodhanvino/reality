"use client";

import { motion } from "framer-motion";
import { solutionCopy } from "@/lib/settings";
import { viewportOnce } from "@/lib/motionPresets";

export function Solution() {
  return (
    <section className="px-4 py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-transparent to-primary/[0.06] p-8 shadow-xl sm:p-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55 }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <p className="section-label mb-4 text-accent/90">The solution</p>
          <h2 className="mb-6 font-display text-2xl font-bold text-white sm:text-3xl">
            One platform. Full visibility.
          </h2>
          <p className="relative text-lg leading-relaxed text-zinc-400">{solutionCopy}</p>
        </motion.div>
      </div>
    </section>
  );
}
