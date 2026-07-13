import { memo, useState, type FormEvent } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OUTLET_UI } from "@/config/app-settings";

type Props = {
  open: boolean;
  pending: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void>;
};

function OutletCreateDialogComponent({ open, pending, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  if (!open) return null;

  async function submit(e: FormEvent) {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    await onCreate(n, description.trim());
    setName("");
    setDescription("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-xl">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold tracking-tight">{OUTLET_UI.create_dialog_title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{OUTLET_UI.create_dialog_hint}</p>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} disabled={pending}>
            <X className="size-4" />
          </Button>
        </div>
        <form className="grid gap-2.5" onSubmit={submit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={OUTLET_UI.create_name_placeholder}
            required
            className="h-9 text-sm"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={OUTLET_UI.create_desc_placeholder}
            className="h-9 text-sm"
          />
          <div className="mt-1 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={pending || !name.trim()}>
              {pending ? OUTLET_UI.create_submitting : OUTLET_UI.create_submit}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

OutletCreateDialogComponent.displayName = "OutletCreateDialog";

export const OutletCreateDialog = memo(OutletCreateDialogComponent);
