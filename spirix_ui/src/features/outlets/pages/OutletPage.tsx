import { memo, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { OUTLET_UI } from "@/config/app-settings";
import { WorkspacePageShell } from "@/features/projects/components/WorkspacePageShell";
import { useAuthStore } from "@/store/auth-store";
import { useApiDataStore } from "@/store/api-data-store";

function OutletPageComponent() {
  const { workspaceId, outletId } = useParams();
  const token = useAuthStore((s) => s.token);
  const wid = useMemo(() => Number(workspaceId), [workspaceId]);
  const oid = useMemo(() => Number(outletId), [outletId]);
  const key = Number.isFinite(wid) && Number.isFinite(oid) ? `${wid}-${oid}` : "";
  const project = useApiDataStore((s) => s.projectById[wid]);
  const outlet = useApiDataStore((s) => (key ? s.outletByKey[key] : undefined));
  const ensureProjectDetail = useApiDataStore((s) => s.ensureProjectDetail);
  const ensureOutletDetail = useApiDataStore((s) => s.ensureOutletDetail);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !Number.isFinite(wid) || !Number.isFinite(oid)) return;
    setError(null);
    void Promise.all([ensureProjectDetail(token, wid), ensureOutletDetail(token, wid, oid)]).catch(
      (e) => {
        setError(e instanceof Error ? e.message : "Failed");
      },
    );
  }, [token, wid, oid, ensureProjectDetail, ensureOutletDetail]);

  if (!token || !Number.isFinite(wid)) {
    return null;
  }

  const label = project?.project_name || (Number.isFinite(wid) ? `Workspace ${wid}` : "");

  return (
    <WorkspacePageShell showSidebar workspaceId={wid} token={token} workspaceLabel={label}>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-2">
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-foreground">
              {outlet?.outlet_name || "…"}
            </h2>
            <p className="text-sm text-muted-foreground">{OUTLET_UI.page_placeholder}</p>
          </>
        )}
      </div>
    </WorkspacePageShell>
  );
}

OutletPageComponent.displayName = "OutletPage";

export const OutletPage = memo(OutletPageComponent);
export default OutletPage;
