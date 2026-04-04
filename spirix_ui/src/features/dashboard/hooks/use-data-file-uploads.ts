import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";

import { UPLOAD_SLOTS } from "@/config/upload-slots";
import {
  runNcUpload,
  runSalesUpload,
} from "@/features/dashboard/lib/nc-sales-upload-actions";

export function useDataFileUploads() {
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedSlotRef = useRef<string | null>(null);

  const setDone = (id: string) => setUploaded((s) => ({ ...s, [id]: true }));
  const setUploadingSlot = (id: string, v: boolean) =>
    setUploading((s) => ({ ...s, [id]: v }));

  const clearInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleNcUpload = async (file: File) => {
    setUploadingSlot("nc", true);
    await runNcUpload(
      file,
      () => {
        setUploadingSlot("nc", false);
        clearInput();
      },
      (name) => {
        setDone("nc");
        setFileNames((s) => ({ ...s, nc: name }));
      },
    );
  };

  const handleSalesUpload = async (file: File) => {
    setUploadingSlot("sales", true);
    await runSalesUpload(
      file,
      () => {
        setUploadingSlot("sales", false);
        clearInput();
      },
      (name) => {
        setDone("sales");
        setFileNames((s) => ({ ...s, sales: name }));
      },
    );
  };

  const onDrop = async (id: string, e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (id === "nc") {
      await handleNcUpload(file);
      return;
    }
    if (id === "sales") {
      await handleSalesUpload(file);
      return;
    }
    setFileNames((s) => ({ ...s, [id]: file.name }));
    setDone(id);
  };

  const remove = (id: string) => {
    setUploaded((s) => {
      const n = { ...s };
      delete n[id];
      return n;
    });
    setFileNames((s) => {
      const n = { ...s };
      delete n[id];
      return n;
    });
  };

  const onSlotClick = (id: string, done?: boolean) => {
    if (done) return;
    selectedSlotRef.current = id;
    const slot = UPLOAD_SLOTS.find((s) => s.id === id);
    if (fileInputRef.current && slot) {
      fileInputRef.current.accept = slot.inputAccept;
    }
    fileInputRef.current?.click();
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const slotId = selectedSlotRef.current;
    const file = e.target.files?.[0];
    if (!slotId || !file) return;
    if (slotId === "nc") {
      void handleNcUpload(file);
      return;
    }
    if (slotId === "sales") {
      void handleSalesUpload(file);
      return;
    }
    setFileNames((s) => ({ ...s, [slotId]: file.name }));
    setDone(slotId);
    e.currentTarget.value = "";
  };

  const count = Object.keys(uploaded).length;
  const total = UPLOAD_SLOTS.length;
  const pct = total ? Math.round((count / total) * 100) : 0;
  const dash = `${(count / total) * 125.6} 125.6`;

  return {
    uploaded,
    fileNames,
    uploading,
    fileInputRef,
    onDrop,
    remove,
    onSlotClick,
    onFileInputChange,
    count,
    total,
    pct,
    dash,
  };
}
