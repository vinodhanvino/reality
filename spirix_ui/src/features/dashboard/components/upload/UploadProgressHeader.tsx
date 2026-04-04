import { analytics } from "@/config/analytics-theme";
import { uploadPage } from "@/config/upload-ui";
import { cn } from "@/lib/utils";

type Props = {
  count: number;
  total: number;
  pct: number;
  dash: string;
};

export function UploadProgressHeader({ count, total, pct, dash }: Props) {
  return (
    <div className="border-b border-border bg-gradient-to-br from-primary/[0.07] via-card to-card p-6 md:p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-xl space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">
            {uploadPage.centerTitle}
          </h3>
          <p className={cn("text-sm leading-relaxed", analytics.textMuted)}>
            {uploadPage.centerLead}
          </p>
        </div>
        <div className="flex items-center gap-5 lg:shrink-0">
          <div className="text-right">
            <p className="text-sm font-medium tabular-nums">
              {count}/{total} {uploadPage.uploadedLabel.toLowerCase()}
            </p>
            <p className={cn("text-xs", analytics.textMuted)}>Progress</p>
          </div>
          <div className="relative size-14">
            <svg className="size-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="var(--border)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="var(--primary)"
                strokeWidth="4"
                fill="none"
                strokeDasharray={dash}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-primary tabular-nums">
              {pct}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
