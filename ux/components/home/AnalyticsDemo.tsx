"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { viewportOnce } from "@/lib/motionPresets";

const InventoryVarianceCharts = dynamic(
  () =>
    import("@/components/charts/InventoryVarianceCharts").then(
      (m) => m.InventoryVarianceCharts
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] rounded-xl bg-white/[0.02] animate-pulse" />
    ),
  }
);

export function AnalyticsDemo() {
  return (
    <section id="analytics" className="py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="section-label text-center mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
        >
          Analytics
        </motion.p>
        <motion.h2
          className="type-section-title mb-4 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.05 }}
        >
          Variance detection in real time
        </motion.h2>
        <motion.p
          className="type-body-sm mb-14 max-w-2xl text-center mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.08 }}
        >
          Compare expected stock (POS + purchases) to physical counts, see dollar impact by cause, and
          catch SKU drift before it becomes a blind spot.
        </motion.p>
        <motion.div
          className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.1 }}
        >
          <InventoryVarianceCharts />
        </motion.div>
      </div>
    </section>
  );
}
