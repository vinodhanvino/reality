import { memo } from "react";
import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
};

function CreateWorkspaceCardComponent({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid min-h-[112px] place-items-center rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-3 text-primary transition hover:bg-primary/10"
    >
      <span className="grid place-items-center gap-1 text-xs font-semibold">
        <Plus className="size-4" />
        Create workspace
      </span>
    </button>
  );
}

CreateWorkspaceCardComponent.displayName = "CreateWorkspaceCard";

export const CreateWorkspaceCard = memo(CreateWorkspaceCardComponent);
