"use client";

import { useMemo, useState } from "react";
import type { VarianceChartData } from "@/lib/varianceChartData";
import { defaultVarianceData } from "@/lib/varianceChartData";
import { buildVarianceLayout, type MetricMode } from "@/lib/varianceChartGeometry";
import { weeklyVarianceInsight } from "@/lib/varianceChartInsight";
import { varianceChartUi } from "@/lib/varianceChartLabels";
import { theme } from "@/lib/settings";
import { VarianceChartControls } from "./VarianceChartControls";
import { VarianceChartSvg } from "./VarianceChartSvg";
import { VarianceChartTooltip } from "./VarianceChartTooltip";
import { VarianceKPICards } from "./VarianceKPICards";

type Props = { data?: VarianceChartData };

function yAxisLabel(metric: MetricMode, v: number) {
  if (v === 0) return "0";
  if (metric === "units") return `${v > 0 ? "+" : ""}${Math.round(v)}`;
  const s = v >= 0 ? "+" : "-";
  return `${s}$${Math.abs(Math.round(v)).toLocaleString()}`;
}

export function VarianceAnalyticsChart({ data: propData }: Props) {
  const data = propData ?? defaultVarianceData;
  const daily = data.daily_data;
  const [metric, setMetric] = useState<MetricMode>("units");
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const layout = useMemo(() => buildVarianceLayout(daily, metric), [daily, metric]);
  const insight = useMemo(() => weeklyVarianceInsight(daily), [daily]);
  const yLabel = (v: number) => yAxisLabel(metric, v);

  const colors = useMemo(
    () => ({
      primary: theme.primary,
      negative: "#c45c5c",
      accent: theme.accent,
      retailLine: "rgba(244,244,245,0.48)",
    }),
    []
  );

  return (
    <div className="rounded-xl bg-gradient-to-b from-zinc-900/40 to-black/50 p-4 text-white ring-1 ring-white/[0.06] sm:p-6">
      <VarianceKPICards data={data.summary} />
      <VarianceChartControls metric={metric} onMetric={setMetric} />
      <div
        className="relative min-h-[300px]"
        onMouseLeave={() => setHoverIdx(null)}
      >
        <VarianceChartSvg
          daily={daily}
          layout={layout}
          metric={metric}
          hoverIdx={hoverIdx}
          onHover={setHoverIdx}
          colors={colors}
          yLabel={yLabel}
        />
        {hoverIdx !== null && daily[hoverIdx] && (
          <div
            className="pointer-events-none absolute top-2 z-20 max-w-[260px] px-2 sm:max-w-[280px]"
            style={{
              left: `${((hoverIdx + 0.5) / daily.length) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <VarianceChartTooltip row={daily[hoverIdx]} />
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed text-zinc-400">{insight}</p>
      <p className="mt-1 text-center text-[10px] text-zinc-600">{varianceChartUi.axisFootnote}</p>
    </div>
  );
}
