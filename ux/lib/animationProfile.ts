/** Ultra-Responsive animation profile: engine + layers + performance */
export const animationProfile = {
  animation_profile: "Ultra-Responsive" as const,
  engine_settings: {
    fps_target: 120,
    interpolation_factor: 0.25,
    precision: "low-poly-hitbox" as const,
  },
  layers: [
    {
      selector: ".hero-title",
      depth: 15,
      friction: 0.02,
      type: "inverse-parallax" as const,
    },
    {
      selector: ".data-waves",
      depth: 40,
      friction: 0.08,
      type: "fluid-chase" as const,
    },
  ],
  performance_flags: [
    "GPU_RASTERIZATION",
    "DEBOUNCED_INPUT",
    "TRANSFORM_OPTIMIZED",
  ],
} as const;

export const heroTitleLayer = animationProfile.layers[0];
export const dataWavesLayer = animationProfile.layers[1];
