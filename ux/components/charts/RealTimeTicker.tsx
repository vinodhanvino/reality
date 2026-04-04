"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analyticsVariance } from "@/lib/analyticsVarianceConfig";
import { CHART_COLORS } from "@/lib/varianceVisualizationData";

type Props = { onPulse?: () => void; pulseKey?: number };

export function RealTimeTicker({ onPulse, pulseKey = 0 }: Props) {
  const [pulse, setPulse] = useState(false);
  const lines = analyticsVariance.tickerLines;
  const idx = pulseKey % lines.length;
  const line = lines[idx];

  useEffect(() => {
    setPulse(true);
    onPulse?.();
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [pulseKey, onPulse]);

  return (
    <div className="flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-2">
        <motion.span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: CHART_COLORS.cyan }}
          animate={{
            scale: pulse ? [1, 1.4, 1] : 1,
            opacity: pulse ? [1, 0.6, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: CHART_COLORS.cyan }}
        >
          {analyticsVariance.tickerHeadline}
        </span>
      </div>
      <div className="text-right min-h-[2.25rem] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-[11px] text-white/70"
          >
            <span className="text-white/45">{line.label}: </span>
            <span className="text-white/90 font-medium tabular-nums">{line.value}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
