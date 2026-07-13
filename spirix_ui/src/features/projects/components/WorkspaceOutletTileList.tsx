import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CreateOutletCard } from "@/features/outlets/components/CreateOutletCard";
import type { OutletItem } from "@/features/outlets/api/outlets-api";

type Props = {
  list: OutletItem[];
  canCreateOutlet: boolean;
  onCreateClick: () => void;
  onOpenOutlet: (outletId: number) => void;
};

const gridClass =
  "m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(148px,1fr))] items-start gap-2 p-0";

export function WorkspaceOutletTileList({
  list,
  canCreateOutlet,
  onCreateClick,
  onOpenOutlet,
}: Props) {
  return (
    <ul className={gridClass}>
      {canCreateOutlet ? (
        <li className="flex min-w-0">
          <CreateOutletCard onClick={onCreateClick} />
        </li>
      ) : null}
      {list.map((o) => (
        <li key={o.id} className="flex min-w-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="box-border h-[76px] w-full flex-col items-stretch justify-between gap-1 border px-2.5 py-2 text-left font-normal"
            onClick={() => onOpenOutlet(o.id)}
          >
            <span className="line-clamp-2 text-xs font-medium leading-snug">{o.outlet_name}</span>
            <span className="flex items-center justify-end gap-0.5 text-[10px] text-muted-foreground">
              Open
              <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
            </span>
          </Button>
        </li>
      ))}
    </ul>
  );
}
