"use client";

import type { DailyVarianceRow } from "@/lib/varianceChartData";
import {
  CHART_H,
  CHART_PAD,
  INNER_W,
  metricValue,
  type MetricMode,
  type VarianceLayout,
} from "@/lib/varianceChartGeometry";
import { VarianceChartSvgLayers } from "./VarianceChartSvgLayers";

type Colors = { primary: string; negative: string; accent: string; retailLine: string };

type Props = {
  daily: DailyVarianceRow[];
  layout: VarianceLayout;
  metric: MetricMode;
  hoverIdx: number | null;
  onHover: (i: number | null) => void;
  colors: Colors;
  yLabel: (v: number) => string;
};

export function VarianceChartSvg({
  daily,
  layout,
  metric,
  hoverIdx,
  onHover,
  colors,
  yLabel,
}: Props) {
  const { chartW, zeroY, stepX, barW, scaleBar, maxBar } = layout;
  const svgW = INNER_W;
  const svgH = CHART_H;
  const mb = maxBar;
  const gridYs = [
    { y: zeroY - scaleBar(mb), t: yLabel(mb) },
    { y: zeroY, t: yLabel(0) },
    { y: zeroY - scaleBar(-mb), t: yLabel(-mb) },
  ];

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full max-w-full select-none"
      style={{ height: CHART_H }}
    >
      {gridYs.map(({ y, t }, i) => (
        <g key={i}>
          <line
            x1={CHART_PAD.left}
            y1={y}
            x2={CHART_PAD.left + chartW}
            y2={y}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
          <text x={CHART_PAD.left - 8} y={y + 4} textAnchor="end" className="fill-zinc-500 text-[9px]">
            {t}
          </text>
        </g>
      ))}
      {daily.map((row, i) => {
        const v = metricValue(row, metric);
        const x = CHART_PAD.left + stepX * (i + 1) - barW / 2;
        const h = Math.max(Math.abs(scaleBar(v)), 1);
        const y = v >= 0 ? zeroY - h : zeroY;
        const dim = hoverIdx !== null && hoverIdx !== i;
        return (
          <g key={`b-${row.day}`}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={h}
              fill={v >= 0 ? colors.primary : colors.negative}
              opacity={dim ? 0.25 : 0.9}
              style={{ transition: "opacity 0.12s ease" }}
            />
          </g>
        );
      })}
      <VarianceChartSvgLayers
        daily={daily}
        layout={layout}
        hoverIdx={hoverIdx}
        onHover={onHover}
        colors={{ accent: colors.accent, retailLine: colors.retailLine }}
      />
    </svg>
  );
}
