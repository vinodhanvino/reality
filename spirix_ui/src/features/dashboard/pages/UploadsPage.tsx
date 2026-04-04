import { Database, ListChecks, UploadCloud } from "lucide-react";

import { DataFileUploads } from "@/features/dashboard/components/DataFileUploads";
import { analytics } from "@/config/analytics-theme";
import { uploadPage, uploadSteps } from "@/config/upload-ui";
import { cn } from "@/lib/utils";

const stepIcons = [UploadCloud, ListChecks, Database] as const;

export default function UploadsPage() {
  return (
    <div className="space-y-8 pb-10">
      <header className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {uploadPage.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {uploadPage.subtitle}
          </p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3">
          {uploadSteps.map((step, i) => {
            const Icon = stepIcons[i] ?? UploadCloud;
            return (
              <li
                key={step.title}
                className={cn(
                  "flex gap-3 rounded-xl border border-border bg-card p-4 shadow-sm",
                  analytics.surfaceHover,
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Step {i + 1}
                  </p>
                  <p className="font-medium leading-snug">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </header>
      <DataFileUploads />
    </div>
  );
}
