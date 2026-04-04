"use client";

import type { MetricMode } from "@/lib/varianceChartGeometry";
import { varianceChartUi } from "@/lib/varianceChartLabels";
import { cn } from "@/lib/utils";

const MODES: { key: MetricMode; label: string }[] = [
  { key: "units", label: varianceChartUi.metrics.units },
  { key: "cost", label: varianceChartUi.metrics.cost },
  { key: "retail", label: varianceChartUi.metrics.retail },
];

type Props = {
  metric: MetricMode;
  onMetric: (m: MetricMode) => void;
};

export function VarianceChartControls({ metric, onMetric }: Props) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {MODES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onMetric(key)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              metric === key
                ? "border-accent/50 bg-accent/15 text-accent"
                : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-sm bg-primary/80" />
          {varianceChartUi.legend.bars}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-6 rounded bg-accent" />
          {varianceChartUi.legend.costLine}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-6 rounded border border-dashed border-white/40" />
          {varianceChartUi.legend.retailLine}
        </span>
      </div>
    </div>
  );
}
