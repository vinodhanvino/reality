import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { analytics } from "@/config/analytics-theme";
import { uploadAlerts, uploadPage } from "@/config/upload-ui";
import { cn } from "@/lib/utils";

type Props = {
  count: number;
  total: number;
};

export function UploadStatusFooters({ count, total }: Props) {
  const navigate = useNavigate();
  const incomplete = count > 0 && count < total;
  const complete = count === total && total > 0;

  return (
    <>
      {incomplete ? (
        <div className="mx-5 mb-5 flex gap-3 rounded-xl border border-amber-500/35 bg-amber-500/[0.09] p-4 dark:border-amber-400/30">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="mb-1 text-sm font-semibold text-amber-900 dark:text-amber-100">
              {uploadAlerts.incompleteTitle}
            </p>
            <p className={cn("text-xs leading-relaxed", analytics.textMuted)}>
              {uploadAlerts.incompleteBody}
            </p>
          </div>
        </div>
      ) : null}

      {complete ? (
        <div className="flex flex-col items-stretch justify-between gap-4 border-t border-border bg-muted/20 p-6 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {uploadAlerts.allReadyTitle}
              </p>
              <p className={cn("text-xs", analytics.textMuted)}>
                {uploadAlerts.allReadyBody}
              </p>
            </div>
          </div>
          <Button
            type="button"
            className="shrink-0 font-medium"
            onClick={() => navigate("/")}
          >
            {uploadPage.processCta}
          </Button>
        </div>
      ) : null}
    </>
  );
}
