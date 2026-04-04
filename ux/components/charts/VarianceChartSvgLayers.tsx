"use client";

import type { DailyVarianceRow } from "@/lib/varianceChartData";
import { CHART_H, CHART_PAD, type VarianceLayout } from "@/lib/varianceChartGeometry";

type Colors = { accent: string; retailLine: string };

type Props = {
  daily: DailyVarianceRow[];
  layout: VarianceLayout;
  hoverIdx: number | null;
  onHover: (i: number | null) => void;
  colors: Colors;
};

export function VarianceChartSvgLayers({ daily, layout, hoverIdx, onHover, colors }: Props) {
  const { zeroY, stepX, costPath, retailPath, scaleLine } = layout;
  const svgH = CHART_H;

  return (
    <>
      <path
        d={costPath}
        fill="none"
        stroke={colors.accent}
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={retailPath}
        fill="none"
        stroke={colors.retailLine}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        strokeLinejoin="round"
      />
      {daily.map((row, i) => {
        const x = CHART_PAD.left + stepX * (i + 1);
        const hi = hoverIdx === i;
        return (
          <g key={`d-${row.day}`}>
            <circle cx={x} cy={zeroY - scaleLine(row.cost)} r={hi ? 5 : 3} fill={colors.accent} />
            <circle
              cx={x}
              cy={zeroY - scaleLine(row.retail)}
              r={hi ? 4 : 2.5}
              fill="transparent"
              stroke={colors.retailLine}
              strokeWidth="1.5"
            />
          </g>
        );
      })}
      {hoverIdx !== null && (
        <line
          x1={CHART_PAD.left + stepX * (hoverIdx + 1)}
          y1={CHART_PAD.top}
          x2={CHART_PAD.left + stepX * (hoverIdx + 1)}
          y2={svgH - CHART_PAD.bottom}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      )}
      {daily.map((_, i) => (
        <rect
          key={`h-${i}`}
          x={CHART_PAD.left + stepX * (i + 1) - stepX * 0.46}
          y={CHART_PAD.top}
          width={stepX * 0.92}
          height={svgH - CHART_PAD.bottom}
          fill="transparent"
          className="cursor-crosshair"
          onMouseEnter={() => onHover(i)}
        />
      ))}
      {daily.map((row, i) => (
        <text
          key={`t-${row.day}`}
          x={CHART_PAD.left + stepX * (i + 1)}
          y={svgH - 12}
          textAnchor="middle"
          className="pointer-events-none fill-zinc-400 text-[10px]"
        >
          {row.day}
        </text>
      ))}
    </>
  );
}
