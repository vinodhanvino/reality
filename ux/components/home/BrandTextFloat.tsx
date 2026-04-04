"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/settings";

export function BrandTextFloat() {
  return (
    <motion.span
      className="inline-block font-display font-bold tracking-tight text-white/90 gpu-layer"
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1],
      }}
      aria-hidden
    >
      {site.name}
    </motion.span>
  );
}
