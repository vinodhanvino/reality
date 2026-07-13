import { OutletCreateDialog } from "@/features/outlets/components/OutletCreateDialog";
import type { OutletItem } from "@/features/outlets/api/outlets-api";
import { OUTLET_UI } from "@/config/app-settings";
import { WorkspaceOutletEmptyState } from "@/features/projects/components/WorkspaceOutletEmptyState";
import { WorkspaceOutletTileList } from "@/features/projects/components/WorkspaceOutletTileList";

type Props = {
  list: OutletItem[];
  canCreateOutlet: boolean;
  createOpen: boolean;
  creating: boolean;
  onCloseCreate: () => void;
  onCreate: (name: string, description: string) => void;
  onCreateClick: () => void;
  onOpenOutlet: (outletId: number) => void;
};

export function WorkspaceDashboardOutletPanelBody({
  list,
  canCreateOutlet,
  createOpen,
  creating,
  onCloseCreate,
  onCreate,
  onCreateClick,
  onOpenOutlet,
}: Props) {
  if (!list.length) {
    return (
      <>
        {canCreateOutlet ? (
          <OutletCreateDialog
            open={createOpen}
            pending={creating}
            onClose={onCloseCreate}
            onCreate={onCreate}
          />
        ) : null}
        <WorkspaceOutletEmptyState
          canCreateOutlet={canCreateOutlet}
          onCreateClick={onCreateClick}
        />
      </>
    );
  }

  return (
    <>
      {canCreateOutlet ? (
        <OutletCreateDialog
          open={createOpen}
          pending={creating}
          onClose={onCloseCreate}
          onCreate={onCreate}
        />
      ) : null}
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">{OUTLET_UI.choose_title}</p>
        <WorkspaceOutletTileList
          list={list}
          canCreateOutlet={canCreateOutlet}
          onCreateClick={onCreateClick}
          onOpenOutlet={onOpenOutlet}
        />
      </div>
    </>
  );
}
