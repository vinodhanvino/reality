import { OUTLET_UI } from "@/config/app-settings";
import { CreateOutletCard } from "@/features/outlets/components/CreateOutletCard";

type Props = { canCreateOutlet: boolean; onCreateClick: () => void };

export function WorkspaceOutletEmptyState({ canCreateOutlet, onCreateClick }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4">
      <div className="w-full rounded-lg border border-dashed border-border bg-card/50 px-4 py-5 text-center">
        <p className="text-sm font-semibold text-foreground">{OUTLET_UI.empty_title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{OUTLET_UI.empty_body}</p>
      </div>
      {canCreateOutlet ? (
        <div className="flex w-full justify-center">
          <div className="w-[148px] shrink-0">
            <CreateOutletCard onClick={onCreateClick} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
