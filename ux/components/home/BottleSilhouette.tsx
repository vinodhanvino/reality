"use client";

import { motion } from "framer-motion";
import { physics } from "@/lib/physics";

const TILT_DEG = 8;
const { factor } = physics.bottle;
const mult = physics.velocity_multiplier;

type Props = {
  normX: number;
  normY: number;
  isInside: boolean;
};

export function BottleSilhouette({ normX, normY, isInside }: Props) {
  const rotateY = isInside ? -normX * factor * TILT_DEG * mult : 0;
  const rotateX = isInside ? normY * factor * TILT_DEG * mult : 0;

  return (
    <motion.div
      className="absolute pointer-events-none select-none gpu-layer"
      style={{ left: "50%", top: "42%", transform: "translate3d(-50%, -50%, 0)" }}
      animate={{ rotateX, rotateY }}
      transition={
        isInside
          ? physics.easing.hover
          : physics.easing.leave
      }
    >
      <svg
        width="120"
        height="200"
        viewBox="0 0 120 200"
        fill="none"
        className="opacity-20"
        aria-hidden
      >
        <path
          d="M60 20v160c-22 0-40-18-40-40V60c0-22 18-40 40-40z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          className="text-white"
        />
        <path
          d="M60 20c22 0 40 18 40 40v80c0 22-18 40-40 40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          className="text-white"
        />
      </svg>
    </motion.div>
  );
}
