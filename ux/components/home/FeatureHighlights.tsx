"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/settings";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motionPresets";

export function FeatureHighlights() {
  return (
    <section id="features" className="px-4 py-28 bg-surface/50">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="section-label mb-4 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
        >
          Features
        </motion.p>
        <motion.h2
          className="mb-14 text-center font-display text-3xl font-bold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.05 }}
        >
          Built for bar operators
        </motion.h2>
        <motion.ul
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {features.map((feature, i) => (
            <motion.li
              key={feature}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 380, damping: 28 } }}
              className="group rounded-xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-shadow hover:border-primary/30 hover:shadow-lg"
            >
              <span className="font-mono text-xs font-medium text-accent/90">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-medium text-white">{feature}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
