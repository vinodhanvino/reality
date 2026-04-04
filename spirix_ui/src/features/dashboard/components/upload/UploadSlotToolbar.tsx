import { CircleHelp, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { UploadSlot } from "@/config/upload-slots";

type Props = {
  slot: UploadSlot;
  done: boolean;
  onRemove: () => void;
};

export function UploadSlotToolbar({ slot, done, onRemove }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      <Badge
        variant={slot.usesApi ? "default" : "secondary"}
        className="text-[10px] font-medium uppercase tracking-wide"
      >
        {slot.usesApi ? "Server import" : "Session only"}
      </Badge>
      <Tooltip>
        <TooltipTrigger
          type="button"
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={(e) => e.stopPropagation()}
          aria-label={`More about ${slot.label}`}
        >
          <CircleHelp className="size-4" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px] text-left">
          {slot.hint}
        </TooltipContent>
      </Tooltip>
      {done ? (
        <button
          type="button"
          className="rounded-md p-1 hover:bg-muted"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove file"
        >
          <X className="size-3.5 text-muted-foreground" />
        </button>
      ) : null}
    </div>
  );
}
