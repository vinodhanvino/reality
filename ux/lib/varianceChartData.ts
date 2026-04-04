export type DailyVarianceRow = {
  day: string;
  units: number;
  cost: number;
  retail: number;
};

export type VarianceChartData = {
  summary: {
    net_variance_cost: number;
    potential_revenue_loss: number;
    variance_rate: string;
  };
  daily_data: DailyVarianceRow[];
};

export const defaultVarianceData: VarianceChartData = {
  summary: {
    net_variance_cost: -4200,
    potential_revenue_loss: -8500,
    variance_rate: "1.2%",
  },
  daily_data: [
    { day: "Mon", units: 12, cost: 600, retail: 1200 },
    { day: "Tue", units: -4, cost: -200, retail: -450 },
    { day: "Wed", units: 8, cost: 450, retail: 900 },
    { day: "Thu", units: -18, cost: -3200, retail: -5400 },
    { day: "Fri", units: 6, cost: 300, retail: 700 },
    { day: "Sat", units: 15, cost: 1100, retail: 2200 },
    { day: "Sun", units: -2, cost: -100, retail: -250 },
  ],
};
