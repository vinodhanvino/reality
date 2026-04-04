/** Vertical gradients for outlet variance bars. */
export function OutletBarDefs() {
  return (
    <defs>
      <linearGradient id="outletBar-0" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.95} />
        <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0.35} />
      </linearGradient>
      <linearGradient id="outletBar-1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.95} />
        <stop offset="100%" stopColor="var(--chart-4)" stopOpacity={0.4} />
      </linearGradient>
      <linearGradient id="outletBar-2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.9} />
        <stop offset="100%" stopColor="var(--chart-5)" stopOpacity={0.35} />
      </linearGradient>
    </defs>
  );
}
