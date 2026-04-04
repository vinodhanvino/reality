/** Continuous fluid dynamics: idle + on_hover vector disruption */
export const waveParams = {
  idle: {
    frequency: 0.005,
    amplitude: 12,
    wavelength: 1.2,
  },
  on_hover: {
    radius: 150,
    force_magnitude: 0.35,
    easing: "ease-out" as const,
  },
  performance: {
    debounced: true,
    vector_caching: true,
  },
} as const;
