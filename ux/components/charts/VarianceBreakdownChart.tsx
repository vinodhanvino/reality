"use client";

import { useMemo } from "react";
import type { VarianceFactor } from "@/lib/varianceVisualizationData";
import { CHART_COLORS, physicalStockFromDrivers } from "@/lib/varianceVisualizationData";
import { analyticsVariance } from "@/lib/analyticsVarianceConfig";
import { buildBreakdownRows } from "@/lib/varianceBreakdownLayout";
import { VarianceBreakdownSvg } from "./VarianceBreakdownSvg";

type Props = {
  data: VarianceFactor[];
  bookBaselineUsd: number;
};

export function VarianceBreakdownChart({ data, bookBaselineUsd }: Props) {
  const { width, height, rows } = useMemo(() => buildBreakdownRows(data), [data]);
  const physical = physicalStockFromDrivers(bookBaselineUsd, data);
  const cfg = analyticsVariance.breakdown;

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      <p className="text-white/80 text-sm font-medium mb-0.5">{cfg.title}</p>
      <p className="text-white/45 text-[11px] leading-snug mb-3">{cfg.subtitle}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
        {cfg.legend.map((L) => (
          <span key={L.key} className="inline-flex items-center gap-1.5 text-[10px] text-white/55">
            <span className="h-2 w-2 rounded-sm" style={{ background: L.color }} />
            {L.label}
          </span>
        ))}
      </div>
      <p className="text-[11px] text-white/50 mb-1">
        Book baseline{" "}
        <span className="text-white/80 font-medium">${bookBaselineUsd.toLocaleString()}</span>
      </p>
      <VarianceBreakdownSvg
        width={width}
        height={height}
        rows={rows}
        axisLess={cfg.axisLess}
        axisMore={cfg.axisMore}
      />
      <p className="text-white/50 text-xs mt-2 border-t border-white/10 pt-2 leading-relaxed">
        After drivers: physical stock ≈{" "}
        <span className="font-medium" style={{ color: CHART_COLORS.cyan }}>
          ${physical.toLocaleString()}
        </span>
        <span className="text-white/35"> (book + sum of drivers)</span>
      </p>
    </div>
  );
}
