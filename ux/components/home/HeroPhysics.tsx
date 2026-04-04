"use client";

import { BottleSilhouette } from "./BottleSilhouette";
import { DataWaveLiquid } from "./DataWaveLiquid";

type Props = {
  norm: { x: number; y: number };
  isInside: boolean;
  waveSmoothed?: { x: number; y: number };
};

export function HeroPhysics({ norm, isInside, waveSmoothed: _waveSmoothed }: Props) {
  return (
    <>
      <DataWaveLiquid />
      <BottleSilhouette normX={norm.x} normY={norm.y} isInside={isInside} />
    </>
  );
}
