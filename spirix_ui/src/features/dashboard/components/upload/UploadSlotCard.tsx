import { CheckCircle2, FileText, Loader2, Upload } from "lucide-react";
import type { DragEvent, KeyboardEvent } from "react";

import { analytics } from "@/config/analytics-theme";
import type { UploadSlot } from "@/config/upload-slots";
import { UploadSlotToolbar } from "@/features/dashboard/components/upload/UploadSlotToolbar";
import { cn } from "@/lib/utils";

type Props = {
  slot: UploadSlot;
  done: boolean;
  fileName?: string;
  busy: boolean;
  onDrop: (e: DragEvent) => void;
  onActivate: () => void;
  onRemove: () => void;
};

export function UploadSlotCard({
  slot,
  done,
  fileName,
  busy,
  onDrop,
  onActivate,
  onRemove,
}: Props) {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!done && !busy) onActivate();
    }
  };

  return (
    <div
      role="button"
      tabIndex={done || busy ? -1 : 0}
      aria-label={`Upload ${slot.label}. ${slot.description}`}
      aria-busy={busy}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onKeyDown={onKey}
      onClick={() => {
        if (!done && !busy) onActivate();
      }}
      className={cn(
        "group rounded-xl border-2 border-dashed p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        done
          ? "border-primary/45 bg-primary/[0.08] shadow-sm"
          : "border-border hover:border-primary/35 hover:bg-muted/40",
        busy && "pointer-events-none opacity-90",
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-xl",
            done ? "bg-primary/20" : analytics.inputBg,
          )}
        >
          {busy ? (
            <Loader2 className="size-5 animate-spin text-primary" />
          ) : done ? (
            <CheckCircle2 className="size-5 text-primary" />
          ) : (
            <Upload className="size-5 text-muted-foreground group-hover:text-primary" />
          )}
        </div>
        <UploadSlotToolbar slot={slot} done={done} onRemove={onRemove} />
      </div>
      <h4 className="mb-1 font-semibold leading-tight">{slot.label}</h4>
      <p className={cn("mb-3 text-sm leading-snug", analytics.textMuted)}>
        {slot.description}
      </p>
      {done ? (
        <div className="flex items-center gap-2 rounded-md bg-background/60 px-2 py-1.5 text-xs text-primary">
          <FileText className="size-3.5 shrink-0" />
          <span className="truncate font-medium">
            {fileName ?? `uploaded_${slot.id}.csv`}
          </span>
        </div>
      ) : (
        <p className={cn("text-xs leading-relaxed", analytics.textSoft)}>
          Drop <span className="font-medium">{slot.acceptDisplay}</span> or click
          to browse.
        </p>
      )}
    </div>
  );
}
