import { create } from "zustand";

function todayIso(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

interface DashboardFiltersState {
  selectedDate: string;
  outletId: string;
  setSelectedDate: (v: string) => void;
  setOutletId: (v: string) => void;
}

export const useDashboardFiltersStore = create<DashboardFiltersState>((set) => ({
  selectedDate: todayIso(),
  outletId: "all",
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setOutletId: (outletId) => set({ outletId }),
}));
