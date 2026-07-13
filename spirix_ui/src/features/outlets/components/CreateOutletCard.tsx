import { memo } from "react";
import { Plus } from "lucide-react";

import { OUTLET_UI } from "@/config/app-settings";

type Props = { onClick: () => void };

function CreateOutletCardComponent({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[76px] w-full flex-col items-center justify-center gap-0.5 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-2 py-2 text-center text-primary transition hover:bg-primary/10"
    >
      <Plus className="size-4 shrink-0" aria-hidden />
      <span className="text-[11px] font-semibold leading-tight">{OUTLET_UI.create_outlet}</span>
    </button>
  );
}

CreateOutletCardComponent.displayName = "CreateOutletCard";

export const CreateOutletCard = memo(CreateOutletCardComponent);
