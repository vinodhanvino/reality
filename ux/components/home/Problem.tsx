"use client";

import { motion } from "framer-motion";
import { problemPoints } from "@/lib/settings";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motionPresets";

export function Problem() {
  return (
    <section id="how-it-works" className="py-28 px-4 bg-surface/50">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="section-label text-center mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
        >
          The problem
        </motion.p>
        <motion.h2
          className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.05 }}
        >
          Bars lose revenue every day
        </motion.h2>
        <motion.p
          className="text-center text-zinc-400 mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.08 }}
        >
          Common issues that add up:
        </motion.p>
        <motion.ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          variants={staggerContainer(0.055)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {problemPoints.map((point) => (
            <motion.li
              key={point}
              variants={staggerItem}
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 24 } }}
              className="rounded-xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent px-5 py-4 font-medium text-white shadow-sm transition-shadow hover:border-accent/25 hover:shadow-md"
            >
              {point}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
