import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { LEAK_CHART } from "@/config/leak-chart-settings";

import { LeakBarTooltip } from "./LeakBarTooltip";
import { LeakChartDefs } from "./LeakChartDefs";
import {
  tierGradientId,
  type LeakChartRow,
} from "./top-leakage-chart.support";

const axisStroke = "var(--muted-foreground)" as const;

type Props = {
  rows: LeakChartRow[];
  avgPerSku: number;
};

export function LeakBarChartPlot({ rows, avgPerSku }: Props) {
  return (
    <ResponsiveContainer width="100%" height={LEAK_CHART.height}>
      <BarChart
        data={rows}
        layout="vertical"
        margin={LEAK_CHART.margin}
        barCategoryGap="18%"
      >
        <LeakChartDefs />
        <CartesianGrid horizontal stroke="var(--border)" strokeDasharray="4 4" />
        <XAxis
          type="number"
          stroke={axisStroke}
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: axisStroke }}
          domain={[0, (max: number) => Math.ceil(max * LEAK_CHART.xDomainPad)]}
        />
        <YAxis
          type="category"
          dataKey="name"
          stroke={axisStroke}
          width={LEAK_CHART.yAxisWidth}
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "color-mix(in oklab, var(--primary) 6%, transparent)" }}
          content={<LeakBarTooltip />}
        />
        <ReferenceLine
          x={avgPerSku}
          stroke="var(--primary)"
          strokeDasharray="5 5"
          strokeOpacity={0.85}
          label={{
            value: `Avg ${avgPerSku.toFixed(0)}`,
            position: "top",
            fill: "var(--primary)",
            fontSize: 11,
          }}
        />
        <Bar
          dataKey="value"
          radius={LEAK_CHART.barRadius}
          maxBarSize={LEAK_CHART.barMaxSize}
          animationDuration={600}
        >
          {rows.map((entry) => (
            <Cell key={entry.name} fill={`url(#${tierGradientId(entry.tier)})`} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            fill="var(--foreground)"
            fontSize={11}
            fontWeight={600}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
