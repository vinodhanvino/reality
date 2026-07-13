import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { OUTLET_UI } from "@/config/app-settings";
import { OutletCreateDialog } from "@/features/outlets/components/OutletCreateDialog";
import { WorkspaceDashboardOutletPanelBody } from "@/features/projects/components/WorkspaceDashboardOutletPanelBody";
import { useApiDataStore } from "@/store/api-data-store";

type Props = { token: string; workspaceId: number; canCreateOutlet: boolean };

function WorkspaceDashboardOutletPanelComponent({
  token,
  workspaceId,
  canCreateOutlet,
}: Props) {
  const navigate = useNavigate();
  const items = useApiDataStore((s) => s.outletsByProjectId[workspaceId]);
  const fetchError = useApiDataStore((s) => s.outletsErrorByProjectId[workspaceId]);
  const ensureOutlets = useApiDataStore((s) => s.ensureOutlets);
  const createOutletAndCache = useApiDataStore((s) => s.createOutletAndCache);
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    void ensureOutlets(token, workspaceId);
  }, [token, workspaceId, ensureOutlets]);

  async function handleCreate(name: string, description: string) {
    setCreating(true);
    try {
      await createOutletAndCache(token, workspaceId, { outlet_name: name, description });
    } finally {
      setCreating(false);
    }
  }

  if (items === undefined && !fetchError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">{OUTLET_UI.loading}</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {fetchError}
        </p>
      </div>
    );
  }

  return (
    <WorkspaceDashboardOutletPanelBody
      list={items ?? []}
      canCreateOutlet={canCreateOutlet}
      createOpen={createOpen}
      creating={creating}
      onCloseCreate={() => setCreateOpen(false)}
      onCreate={handleCreate}
      onCreateClick={() => setCreateOpen(true)}
      onOpenOutlet={(id) => navigate(`/workspace/${workspaceId}/outlet/${id}`)}
    />
  );
}

WorkspaceDashboardOutletPanelComponent.displayName = "WorkspaceDashboardOutletPanel";

export const WorkspaceDashboardOutletPanel = memo(WorkspaceDashboardOutletPanelComponent);
