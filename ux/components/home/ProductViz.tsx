"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { viewportOnce } from "@/lib/motionPresets";

const VarianceChart = dynamic(
  () => import("@/components/charts/VarianceChart").then((m) => m.VarianceChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] rounded-xl bg-white/[0.02] animate-pulse" />
    ),
  }
);

export function ProductViz() {
  return (
    <section id="product" className="py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="section-label text-center mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
        >
          Product
        </motion.p>
        <motion.h2
          className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.05 }}
        >
          Analytics at a glance
        </motion.h2>
        <motion.p
          className="text-center text-zinc-400 mb-14 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.1 }}
        >
          Variance between sales, purchases, and physical inventory—in one view.
        </motion.p>
        <motion.div
          className="rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.12 }}
        >
          <VarianceChart />
        </motion.div>
      </div>
    </section>
  );
}
