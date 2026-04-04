"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroBackground() {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className="pointer-events-none absolute inset-0 hero-mesh" aria-hidden />;
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 hero-mesh" />
      <motion.div
        className="absolute -left-[20%] top-[10%] h-[55vmin] w-[55vmin] rounded-full bg-primary/20 blur-[100px]"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] bottom-[5%] h-[45vmin] w-[45vmin] rounded-full bg-accent/15 blur-[90px]"
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1.03, 1, 1.03] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
