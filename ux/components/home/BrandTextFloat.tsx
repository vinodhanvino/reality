"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/settings";

export function BrandTextFloat() {
  return (
    <motion.span
      className="type-hero-kicker inline-block gpu-layer"
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
