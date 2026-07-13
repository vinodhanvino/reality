import { memo, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { WorkspaceDashboardOutletPanel } from "@/features/projects/components/WorkspaceDashboardOutletPanel";
import { WorkspacePageShell } from "@/features/projects/components/WorkspacePageShell";
import { auditorRoleName } from "@/config/app-settings";
import { useAuthStore } from "@/store/auth-store";
import { useApiDataStore } from "@/store/api-data-store";

function WorkspaceDashboardPageComponent() {
  const { workspaceId } = useParams();
  const token = useAuthStore((s) => s.token);
  const role = useAuthStore((s) => s.role);
  const canCreateOutlet = role === auditorRoleName();
  const currentId = useMemo(() => Number(workspaceId), [workspaceId]);
  const project = useApiDataStore((s) => s.projectById[currentId]);
  const ensureProjectDetail = useApiDataStore((s) => s.ensureProjectDetail);

  useEffect(() => {
    if (!token || !Number.isFinite(currentId)) return;
    void ensureProjectDetail(token, currentId);
  }, [token, currentId, ensureProjectDetail]);

  const workspaceLabel =
    project?.project_name || (Number.isFinite(currentId) ? `Workspace ${currentId}` : "");

  if (!token || !Number.isFinite(currentId)) {
    return null;
  }

  return (
    <WorkspacePageShell
      showSidebar
      workspaceId={currentId}
      token={token}
      workspaceLabel={workspaceLabel}
    >
      <WorkspaceDashboardOutletPanel
        token={token}
        workspaceId={currentId}
        canCreateOutlet={canCreateOutlet}
      />
    </WorkspacePageShell>
  );
}

WorkspaceDashboardPageComponent.displayName = "WorkspaceDashboardPage";

export const WorkspaceDashboardPage = memo(WorkspaceDashboardPageComponent);
export default WorkspaceDashboardPage;
