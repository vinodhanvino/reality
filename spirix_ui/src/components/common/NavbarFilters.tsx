import { CalendarDays, MapPin } from "lucide-react";

import { OUTLET_OPTIONS } from "@/config/spirix-dashboard-data";
import { Input } from "@/components/ui/input";
import { useDashboardFiltersStore } from "@/store/dashboard-filters-store";

export function NavbarFilters() {
  const selectedDate = useDashboardFiltersStore((s) => s.selectedDate);
  const outletId = useDashboardFiltersStore((s) => s.outletId);
  const setSelectedDate = useDashboardFiltersStore((s) => s.setSelectedDate);
  const setOutletId = useDashboardFiltersStore((s) => s.setOutletId);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex items-center gap-1.5">
        <CalendarDays
          className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="h-9 w-[148px] pl-9 text-xs md:text-sm"
          aria-label="Report date"
        />
      </div>
      <div className="relative flex items-center gap-1.5">
        <MapPin
          className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground"
          aria-hidden
        />
        <select
          value={outletId}
          onChange={(e) => setOutletId(e.target.value)}
          className="h-9 w-[148px] rounded-md border border-input bg-background py-1 pl-9 pr-2 text-xs md:text-sm"
          aria-label="Outlet"
        >
          {OUTLET_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
