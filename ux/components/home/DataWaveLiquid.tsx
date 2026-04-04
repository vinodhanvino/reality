"use client";

import { motion } from "framer-motion";
import { FluidWaveCanvas } from "@/components/waves/FluidWaveCanvas";

type Props = {
  smoothedX?: number;
  smoothedY?: number;
  depth?: number;
  isInside?: boolean;
};

/** Renders continuous fluid-dynamics wave (Perlin idle + vector disruption on hover). */
export function DataWaveLiquid(_props?: Props) {
  return (
    <motion.div
      className="data-waves absolute inset-0 overflow-hidden pointer-events-none gpu-layer"
      aria-hidden
    >
      <FluidWaveCanvas />
    </motion.div>
  );
}
