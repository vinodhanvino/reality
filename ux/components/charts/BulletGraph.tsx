"use client";

import { useMemo } from "react";
import type { BulletSKU } from "@/lib/varianceVisualizationData";
import { CHART_COLORS } from "@/lib/varianceVisualizationData";
import { analyticsVariance } from "@/lib/analyticsVarianceConfig";

const ROW_H = 40;
const PAD = { top: 36, right: 80, bottom: 8, left: 140 };
const BAR_H = 14;
const TRACK_W = 280;

type Props = { data: BulletSKU[] };

function barColor(actual: number, target: number): string {
  if (target <= 0) return CHART_COLORS.cyan;
  const pct = (actual / target) * 100;
  if (pct < 90) return CHART_COLORS.red;
  if (pct > 105) return CHART_COLORS.yellow;
  return CHART_COLORS.cyan;
}

export function BulletGraph({ data }: Props) {
  const cfg = analyticsVariance.bullet;
  const { width, height, maxVal, rows } = useMemo(() => {
    const maxVal = Math.max(...data.map((d) => Math.max(d.target, d.actual)), 1) * 1.1;
    const height = PAD.top + data.length * ROW_H + PAD.bottom;
    const width = PAD.left + TRACK_W + PAD.right;
    const scale = (v: number) => (v / maxVal) * TRACK_W;
    const rows = data.map((d, i) => ({
      ...d,
      y: PAD.top + i * ROW_H + (ROW_H - BAR_H) / 2,
      targetW: scale(d.target),
      actualW: scale(Math.max(0, d.actual)),
      color: barColor(d.actual, d.target),
    }));
    return { width, height, maxVal, rows };
  }, [data]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      <p className="text-white/80 text-sm font-medium mb-0.5">{cfg.title}</p>
      <p className="text-white/45 text-[11px] leading-snug mb-3">{cfg.subtitle}</p>
      <div className="flex flex-wrap gap-4 mb-2 text-[10px] text-white/55">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2 w-8 rounded-sm opacity-90"
            style={{ background: CHART_COLORS.targetBg, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }}
          />
          {cfg.legendTarget}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-6 rounded-sm" style={{ background: CHART_COLORS.cyan }} />
          {cfg.legendActual}
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minHeight: height }}>
        {rows.map((row) => (
          <g key={row.sku}>
            <text
              x={PAD.left - 8}
              y={row.y + BAR_H / 2 + 4}
              textAnchor="end"
              className="fill-white/90 text-[11px]"
            >
              {row.sku.length > 22 ? row.sku.slice(0, 20) + "…" : row.sku}
            </text>
            <rect
              x={PAD.left}
              y={row.y}
              width={TRACK_W}
              height={BAR_H}
              rx={4}
              fill={CHART_COLORS.targetBg}
            />
            <rect
              x={PAD.left + row.targetW - 1}
              y={row.y}
              width={2}
              height={BAR_H}
              fill="rgba(255,255,255,0.35)"
            />
            <rect
              x={PAD.left}
              y={row.y + (BAR_H - 6) / 2}
              width={row.actualW}
              height={6}
              rx={3}
              fill={row.color}
            />
            <text
              x={PAD.left + TRACK_W + 8}
              y={row.y + BAR_H / 2 + 4}
              className="fill-white/45 text-[9px]"
            >
              {row.actual}/{row.target}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
