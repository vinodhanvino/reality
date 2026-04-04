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

import { OUTLET_BAR_CHART } from "@/config/insight-charts-settings";
import { OUTLET_BAR_DATA } from "@/config/spirix-dashboard-data";

import { OutletBarDefs } from "./OutletBarDefs";
import { OutletBarTooltip } from "./OutletBarTooltip";

const axisStroke = "var(--muted-foreground)" as const;

type Row = (typeof OUTLET_BAR_DATA)[number];

type Props = {
  rows: readonly Row[];
  avg: number;
};

export function OutletBarPlot({ rows, avg }: Props) {
  return (
    <ResponsiveContainer width="100%" height={OUTLET_BAR_CHART.height}>
      <BarChart
        data={[...rows]}
        margin={OUTLET_BAR_CHART.margin}
        barCategoryGap="14%"
      >
        <OutletBarDefs />
        <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
        <XAxis
          dataKey="name"
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
          cursor={{ fill: "color-mix(in oklab, var(--primary) 6%, transparent)" }}
          content={(props) => <OutletBarTooltip {...props} avg={avg} />}
        />
        <ReferenceLine
          y={avg}
          stroke="var(--primary)"
          strokeDasharray="5 5"
          strokeOpacity={0.9}
          label={{
            value: `Avg ${avg.toFixed(0)}`,
            position: "insideTopRight",
            fill: "var(--primary)",
            fontSize: 11,
          }}
        />
        <Bar
          dataKey="variance"
          radius={OUTLET_BAR_CHART.barRadius}
          maxBarSize={44}
          animationDuration={600}
        >
          {rows.map((_, i) => (
            <Cell key={rows[i].name} fill={`url(#outletBar-${i % 3})`} />
          ))}
          <LabelList
            dataKey="variance"
            position="top"
            fill="var(--foreground)"
            fontSize={11}
            fontWeight={600}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
