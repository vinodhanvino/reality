/** Mouse-proximity physics: interaction tuning + spring values */
export const physics = {
  bottle: {
    movement: "parallax_tilt" as const,
    intensity: "low" as const,
    factor: 0.05,
  },
  dataWave: {
    movement: "magnetic_follow" as const,
    intensity: "high" as const,
    factor: 0.15,
  },
  brandText: {
    movement: "static_float" as const,
    intensity: "minimal" as const,
  },
  /** power4.out ≈ cubic-bezier(0.22, 1, 0.36, 1), 16ms target, linear interpolation */
  easing: {
    hover: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
    leave: {
      type: "spring" as const,
      stiffness: 200,
      damping: 14,
      mass: 0.1,
    },
  },
  /** Scale movement response (latency target 16ms via rAF) */
  velocity_multiplier: 2.5,
} as const;
