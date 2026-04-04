import { useDataFileUploads } from "@/features/dashboard/hooks/use-data-file-uploads";
import { UploadProgressHeader } from "@/features/dashboard/components/upload/UploadProgressHeader";
import { UploadSlotCard } from "@/features/dashboard/components/upload/UploadSlotCard";
import { UploadStatusFooters } from "@/features/dashboard/components/upload/UploadStatusFooters";
import { analytics } from "@/config/analytics-theme";
import { UPLOAD_SLOTS } from "@/config/upload-slots";
import { cn } from "@/lib/utils";

export function DataFileUploads() {
  const {
    uploaded,
    fileNames,
    uploading,
    fileInputRef,
    onDrop,
    remove,
    onSlotClick,
    onFileInputChange,
    count,
    total,
    pct,
    dash,
  } = useDataFileUploads();

  return (
    <div className={cn(analytics.surface, "overflow-hidden shadow-md")}>
      <UploadProgressHeader
        count={count}
        total={total}
        pct={pct}
        dash={dash}
      />

      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 lg:p-8">
        {UPLOAD_SLOTS.map((slot) => {
          const done = Boolean(uploaded[slot.id]);
          const busy = Boolean(uploading[slot.id]);
          return (
            <UploadSlotCard
              key={slot.id}
              slot={slot}
              done={done}
              busy={busy}
              fileName={fileNames[slot.id]}
              onDrop={(e) => void onDrop(slot.id, e)}
              onActivate={() => onSlotClick(slot.id, done)}
              onRemove={() => remove(slot.id)}
            />
          );
        })}
      </div>

      <UploadStatusFooters count={count} total={total} />

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={onFileInputChange}
      />
    </div>
  );
}
