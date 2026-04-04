/** Area fill under the daily variance line. */
export function VarianceTrendDefs() {
  return (
    <defs>
      <linearGradient id="varianceTrendFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--destructive)" stopOpacity={0.45} />
        <stop offset="55%" stopColor="var(--destructive)" stopOpacity={0.12} />
        <stop offset="100%" stopColor="var(--destructive)" stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}
