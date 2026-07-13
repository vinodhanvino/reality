import { memo, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  open: boolean;
  pending: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void>;
};

function ProjectCreateDialogComponent({ open, pending, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  if (!open) return null;

  async function submit(e: FormEvent) {
    e.preventDefault();
    const projectName = name.trim();
    if (!projectName) return;
    await onCreate(projectName, description.trim());
    setName("");
    setDescription("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-base font-semibold tracking-tight">Create workspace</p>
            <p className="mt-1 text-sm text-muted-foreground">Enter a name and short description.</p>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} disabled={pending}>
            <X className="size-4" />
          </Button>
        </div>
        <form className="grid gap-3.5" onSubmit={submit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workspace name"
            required
            className="h-10"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="h-10"
          />
          <div className="mt-1 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending || !name.trim()}>
              {pending ? "Creating..." : "Create workspace"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

ProjectCreateDialogComponent.displayName = "ProjectCreateDialog";

export const ProjectCreateDialog = memo(ProjectCreateDialogComponent);
