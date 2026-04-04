"use client";

import { useRef, useEffect } from "react";
import { createNoise2D } from "simplex-noise";
import { waveParams } from "@/lib/waveParams";

const { idle, on_hover } = waveParams;
const RES = 400;
const BOB_AMPLITUDE = 10;
const BOB_FREQ = 0.6;
const VERTICAL_SWAY = 40;

/** Three waves: silver, alternating phase + little up/down bob */
const WAVES: { phase: number; opacity: number; baseYScale: number; bobPhase: number }[] = [
  { phase: 0, opacity: 0.15, baseYScale: 0.6, bobPhase: 0 },
  { phase: 2, opacity: 0.25, baseYScale: 0.65, bobPhase: Math.PI * 0.66 },
  { phase: 4, opacity: 0.4, baseYScale: 0.7, bobPhase: Math.PI * 1.33 },
];
  
export function FluidWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const timeRef = useRef(0);
  const cacheRef = useRef<Float32Array[]>(
    WAVES.map(() => new Float32Array(RES * 2))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise2D = createNoise2D();

    const setSize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleLeave = () => {
      mouseRef.current = null;
    };

    setSize();
    canvas.addEventListener("mousemove", handleMouse, { passive: true });
    canvas.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", setSize);

    let rafId: number;
    const animate = () => {
      const cssW = canvas.offsetWidth;
      const cssH = canvas.offsetHeight;
      if (!cssW || !cssH) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += idle.frequency;
      const t = timeRef.current;
      const mouse = mouseRef.current;
      const { wavelength, amplitude } = idle;
      const { radius, force_magnitude } = on_hover;

      WAVES.forEach((wave, wi) => {
        const cache = cacheRef.current[wi];
        const waveT = t + wave.phase;
        const bob = Math.sin(waveT * BOB_FREQ + wave.bobPhase) * BOB_AMPLITUDE;
        const baseY = cssH * wave.baseYScale + bob;

        for (let i = 0; i < RES; i++) {
          const x = (i / (RES - 1)) * cssW;
          const nx = (x / cssW) * wavelength + waveT;
          const ny = waveT * 0.2;
          let yOff = noise2D(nx, ny) * amplitude;
          yOff += Math.sin(nx * 0.015 + waveT * 0.5) * VERTICAL_SWAY;

          if (mouse) {
            const dx = x - mouse.x;
            const dy = baseY + yOff - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < radius) {
              const forceFactor = (radius - d) / radius;
              const easeOut = 1 - (1 - forceFactor) ** 2;
              yOff -= force_magnitude * amplitude * easeOut;
            }
          }

          cache[i * 2] = x;
          cache[i * 2 + 1] = baseY + yOff;
        }
      });

      ctx.clearRect(0, 0, cssW, cssH);
      WAVES.forEach((wave, wi) => {
        const cache = cacheRef.current[wi];
        ctx.beginPath();
        ctx.moveTo(0, cssH);
        for (let i = 0; i < RES; i++) {
          ctx.lineTo(cache[i * 2], cache[i * 2 + 1]);
        }
        ctx.lineTo(cssW, cssH);
        ctx.closePath();
        ctx.fillStyle = `rgba(192, 192, 200, ${wave.opacity})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-1/3 gpu-layer pointer-events-auto"
      style={{ height: "33%" }}
      aria-hidden
    />
  );
}
