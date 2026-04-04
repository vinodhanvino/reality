import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TREND_LINE_CHART } from "@/config/insight-charts-settings";
import { TREND_LINE_DATA } from "@/config/spirix-dashboard-data";

import { VarianceTrendDefs } from "./VarianceTrendDefs";
import { VarianceTrendTooltip } from "./VarianceTrendTooltip";

const axisStroke = "var(--muted-foreground)" as const;

type Point = (typeof TREND_LINE_DATA)[number];

type Props = {
  data: readonly Point[];
  mean: number;
};

export function VarianceTrendPlot({ data, mean }: Props) {
  return (
    <ResponsiveContainer width="100%" height={TREND_LINE_CHART.height}>
      <ComposedChart data={[...data]} margin={TREND_LINE_CHART.margin}>
        <VarianceTrendDefs />
        <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
        <XAxis
          dataKey="day"
          stroke={axisStroke}
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: axisStroke }}
        />
        <YAxis
          stroke={axisStroke}
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          domain={[(min: number) => min * 1.08, (max: number) => max * 0.92]}
        />
        <Tooltip
          cursor={{ stroke: "color-mix(in oklab, var(--destructive) 40%, transparent)" }}
          content={(props) => <VarianceTrendTooltip {...props} mean={mean} />}
        />
        <ReferenceLine
          y={mean}
          stroke="var(--primary)"
          strokeDasharray="5 5"
          strokeOpacity={0.85}
          label={{
            value: `Avg ${mean.toFixed(0)}`,
            position: "insideTopRight",
            fill: "var(--primary)",
            fontSize: 11,
          }}
        />
        <Area
          type="monotone"
          dataKey="variance"
          fill="url(#varianceTrendFill)"
          stroke="none"
          isAnimationActive
        />
        <Line
          type="monotone"
          dataKey="variance"
          stroke="var(--destructive)"
          strokeWidth={TREND_LINE_CHART.strokeWidth}
          dot={{ r: TREND_LINE_CHART.dotRadius, fill: "var(--destructive)" }}
          activeDot={{ r: 6, stroke: "var(--background)", strokeWidth: 2 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
