import { useMemo } from "react";

import { analytics } from "@/config/analytics-theme";
import { TREND_LINE_DATA } from "@/config/spirix-dashboard-data";
import { cn } from "@/lib/utils";

import { buildTrendStats } from "./variance-trend-chart.support";
import { VarianceTrendHeader } from "./VarianceTrendHeader";
import { VarianceTrendMetricStrip } from "./VarianceTrendMetricStrip";
import { VarianceTrendPlot } from "./VarianceTrendPlot";

const panel = cn(analytics.surface, analytics.surfaceHover, "p-5");

export function VarianceTrendChart() {
  const stats = useMemo(() => buildTrendStats(TREND_LINE_DATA), []);

  return (
    <div className={panel}>
      <VarianceTrendHeader />
      <VarianceTrendPlot data={TREND_LINE_DATA} mean={stats.mean} />
      <VarianceTrendMetricStrip
        latest={stats.latest}
        mean={stats.mean}
        min={stats.min}
        max={stats.max}
        minDay={stats.minDay}
        maxDay={stats.maxDay}
      />
    </div>
  );
}
