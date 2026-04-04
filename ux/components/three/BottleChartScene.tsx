"use client";

import { useRef } from "react";
import { useBottleChartScene } from "./useBottleChartScene";

export function BottleChartScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  useBottleChartScene(containerRef);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-pointer"
      aria-hidden
    />
  );
}
