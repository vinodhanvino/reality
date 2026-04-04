/** SVG gradients for tiered leakage bars — keeps TopLeakageChart lean. */
export function LeakChartDefs() {
  return (
    <defs>
      <linearGradient id="leakGrad-critical" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="var(--destructive)" stopOpacity={1} />
        <stop offset="100%" stopColor="var(--destructive)" stopOpacity={0.55} />
      </linearGradient>
      <linearGradient id="leakGrad-high" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="var(--destructive)" stopOpacity={0.85} />
        <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.65} />
      </linearGradient>
      <linearGradient id="leakGrad-medium" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.9} />
        <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity={0.45} />
      </linearGradient>
    </defs>
  );
}
