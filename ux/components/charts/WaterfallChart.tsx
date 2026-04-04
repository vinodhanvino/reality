"use client";

import { useMemo } from "react";
import type { WaterfallStep } from "@/lib/varianceVisualizationData";
import { CHART_COLORS } from "@/lib/varianceVisualizationData";

const PAD = { top: 12, right: 12, bottom: 28, left: 120 };
const BAR_GAP = 8;
const LABEL_GAP = 6;

type Props = { data: WaterfallStep[] };

function formatVal(n: number) {
  if (n === 0) return "—";
  const sign = n >= 0 ? "+" : "";
  return `${sign}$${Math.abs(n).toLocaleString()}`;
}

function barFill(bar: WaterfallStep & { isStart: boolean; isEnd: boolean }): string {
  if (bar.isStart || bar.isEnd) return CHART_COLORS.teal;
  const v = bar.variant ?? (bar.value >= 0 ? "positive" : "negative");
  if (v === "warning") return CHART_COLORS.yellow;
  if (v === "negative") return CHART_COLORS.red;
  return CHART_COLORS.teal;
}

export function WaterfallChart({ data }: Props) {
  const { width, height, bars } = useMemo(() => {
    const width = 560;
    const height = Math.max(320, data.length * 28 + PAD.top + PAD.bottom);
    const trackW = width - PAD.left - PAD.right;
    const maxVal = Math.max(...data.map((d) => d.end), 1) * 1.05;
    const scale = (v: number) => PAD.left + (v / maxVal) * trackW;
    const barH = (height - PAD.top - PAD.bottom - (data.length - 1) * BAR_GAP) / data.length;
    const bars = data.map((d, i) => {
      const prevEnd = i === 0 ? 0 : data[i - 1].end;
      const isStart = i === 0;
      const isEnd = i === data.length - 1;
      const barStart = scale(isEnd ? 0 : Math.min(prevEnd, d.end));
      const barW = isEnd ? scale(d.end) - PAD.left : Math.abs(scale(d.end) - scale(prevEnd)) || 2;
      const y = PAD.top + i * (barH + BAR_GAP) + LABEL_GAP;
      const barHeight = barH - LABEL_GAP;
      return {
        ...d,
        y,
        barHeight,
        barStart,
        barW,
        isStart,
        isEnd,
        labelY: y + barHeight / 2 + 4,
      };
    });
    return { width, height, bars };
  }, [data]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      <p className="text-white/60 text-xs uppercase tracking-wider mb-3">
        Why system inventory differs from physical
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
        {bars.map((bar, i) => (
          <g key={bar.name}>
            <text
              x={PAD.left - 8}
              y={bar.labelY}
              textAnchor="end"
              className="fill-white/90 text-[11px]"
            >
              {bar.name}
            </text>
            <rect
              x={bar.barStart}
              y={bar.y}
              width={bar.barW}
              height={bar.barHeight}
              fill={barFill(bar)}
              opacity={bar.isStart || bar.isEnd ? 0.5 : 0.9}
              rx={2}
            />
            <text
              x={bar.barStart + bar.barW / 2}
              y={bar.y + bar.barHeight / 2 - 6}
              textAnchor="middle"
              className="fill-white text-[10px] font-medium"
            >
              {formatVal(bar.value)}
            </text>
            {bar.isEnd && bar.end > 0 && (
              <text
                x={bar.barStart + bar.barW / 2}
                y={bar.y + bar.barHeight / 2 + 8}
                textAnchor="middle"
                className="fill-white/70 text-[9px]"
              >
                ${bar.end.toLocaleString()}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
