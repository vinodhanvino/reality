"use client";

import { useState, useEffect, useRef } from "react";

/** Lerp current toward target each frame. friction = interpolation per frame (e.g. 0.02 = slow, 0.08 = faster). */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Smoothed norm for a layer. Runs rAF loop, lerps toward (isInside ? norm : 0).
 * DEBOUNCED_INPUT: driven by useMouseProximity; TRANSFORM_OPTIMIZED: output is translate-only.
 */
export function useSmoothedNorm(
  norm: { x: number; y: number },
  isInside: boolean,
  friction: number
) {
  const [smoothed, setSmoothed] = useState({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  target.current.x = isInside ? norm.x : 0;
  target.current.y = isInside ? norm.y : 0;

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.x = lerp(c.x, t.x, friction);
      c.y = lerp(c.y, t.y, friction);
      setSmoothed({ x: c.x, y: c.y });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [friction]);

  return smoothed;
}
