"use client";

import type { BreakdownLayoutRow } from "@/lib/varianceBreakdownLayout";
import { formatVarianceVal } from "@/lib/varianceBreakdownHelpers";

const PAD = { top: 28, bottom: 20, left: 130 };
const BAR_MAX_W = 180;

type Props = {
  width: number;
  height: number;
  rows: BreakdownLayoutRow[];
  axisLess: string;
  axisMore: string;
};

export function VarianceBreakdownSvg({ width, height, rows, axisLess, axisMore }: Props) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minHeight: height }}>
      <text
        x={PAD.left + BAR_MAX_W - 4}
        y={14}
        textAnchor="end"
        className="fill-white/40 text-[9px]"
      >
        {axisLess}
      </text>
      <text
        x={PAD.left + BAR_MAX_W + 4}
        y={14}
        textAnchor="start"
        className="fill-white/40 text-[9px]"
      >
        {axisMore}
      </text>
      <line
        x1={PAD.left + BAR_MAX_W}
        y1={PAD.top}
        x2={PAD.left + BAR_MAX_W}
        y2={height - PAD.bottom}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />
      {rows.map((row) => (
        <g key={row.name}>
          <text
            x={PAD.left - 8}
            y={row.y + 4}
            textAnchor="end"
            className="fill-white/90 text-[11px]"
          >
            {row.name}
          </text>
          <rect
            x={row.barStart}
            y={row.y - 10}
            width={row.barW}
            height={20}
            rx={4}
            fill={row.color}
            opacity={0.9}
          />
          <text
            x={
              row.value >= 0
                ? row.barW > 70
                  ? row.barStart + 8
                  : row.barStart + row.barW + 6
                : row.barStart - 6
            }
            y={row.y + 4}
            textAnchor={row.value >= 0 ? "start" : "end"}
            className="text-[10px] font-medium"
            style={{
              pointerEvents: "none",
              fill: row.barW > 70 && row.value > 0 ? "#0f172a" : "rgba(255,255,255,0.95)",
            }}
          >
            {formatVarianceVal(row.value)}
          </text>
        </g>
      ))}
    </svg>
  );
}
