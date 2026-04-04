"use client";

import { useState, useEffect, useCallback } from "react";
import { VarianceBreakdownChart } from "./VarianceBreakdownChart";
import { BulletGraph } from "./BulletGraph";
import { RealTimeTicker } from "./RealTimeTicker";
import {
  varianceBreakdownData,
  defaultBulletData,
  bookBaselineUsd,
} from "@/lib/varianceVisualizationData";
import { analyticsVariance } from "@/lib/analyticsVarianceConfig";

export function InventoryVarianceCharts() {
  const [pulseKey, setPulseKey] = useState(0);
  const handlePulse = useCallback(() => setPulseKey((k) => k + 1), []);

  useEffect(() => {
    const id = setInterval(handlePulse, analyticsVariance.tickerIntervalMs);
    return () => clearInterval(id);
  }, [handlePulse]);

  return (
    <div className="bg-black text-white rounded-xl p-6">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-white/55 text-sm leading-relaxed max-w-xl">
          {analyticsVariance.sectionIntro}
        </p>
        <RealTimeTicker pulseKey={pulseKey} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VarianceBreakdownChart data={varianceBreakdownData} bookBaselineUsd={bookBaselineUsd} />
        <BulletGraph data={defaultBulletData} />
      </div>
    </div>
  );
}
