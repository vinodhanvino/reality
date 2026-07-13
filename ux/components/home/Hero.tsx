"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/settings";
import { HeroPhysics } from "./HeroPhysics";
import { BrandTextFloat } from "./BrandTextFloat";
import { HeroBackground } from "./HeroBackground";
import { HeroActions } from "./HeroActions";
import { useMouseProximity } from "@/hooks/useMouseProximity";
import { useSmoothedNorm } from "@/hooks/useSmoothedNorm";
import { heroTitleLayer } from "@/lib/animationProfile";
import { easeOut } from "@/lib/motionPresets";

export function Hero() {
  const { norm, isInside } = useMouseProximity();
  const titleSmoothed = useSmoothedNorm(norm, isInside, heroTitleLayer.friction);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 hero-gradient">
      <HeroBackground />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_88%)]" />
      <HeroPhysics norm={norm} isInside={isInside} />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <span>
            <BrandTextFloat />
          </span>
        </motion.div>
        <motion.p
          className="section-label mb-5 text-accent/90"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: easeOut }}
        >
          {hero.eyebrow}
        </motion.p>
        <motion.h1
          className="hero-title gpu-layer mb-6 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
          style={{
            transform: `translate3d(${-titleSmoothed.x * heroTitleLayer.depth}px, ${-titleSmoothed.y * heroTitleLayer.depth}px, 0)`,
          }}
        >
          <span className="block sm:inline">{hero.headlineLead}</span>{" "}
          <span className="text-gradient-hero">{hero.headlineAccent}</span>
        </motion.h1>
        <motion.p
          className="type-body mx-auto mb-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: easeOut }}
        >
          {hero.subheadline}
        </motion.p>
        <HeroActions />
      </div>
    </section>
  );
}
