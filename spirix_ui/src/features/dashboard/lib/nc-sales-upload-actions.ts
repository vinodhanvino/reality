import { toast } from "sonner";

import { uploadNcFile } from "@/features/dashboard/api/nc-upload";
import { uploadSalesFile } from "@/features/dashboard/api/sales-upload";

export async function runNcUpload(
  file: File,
  onFinally: () => void,
  onSuccess: (fileName: string) => void,
): Promise<void> {
  if (!file.name.toLowerCase().endsWith(".xlsx")) {
    toast.error("NC upload only supports .xlsx");
    onFinally();
    return;
  }
  try {
    const result = await uploadNcFile(file);
    onSuccess(file.name);
    toast.success(`NC uploaded: ${result.rows_inserted} rows inserted`);
  } catch {
    toast.error("NC upload failed");
  } finally {
    onFinally();
  }
}

export async function runSalesUpload(
  file: File,
  onFinally: () => void,
  onSuccess: (fileName: string) => void,
): Promise<void> {
  if (!file.name.toLowerCase().endsWith(".xlsx")) {
    toast.error("Sales upload only supports .xlsx");
    onFinally();
    return;
  }
  try {
    const result = await uploadSalesFile(file);
    onSuccess(file.name);
    toast.success(
      `Sales uploaded: ${result.categories_count} categories, ${result.items_count} items`,
    );
  } catch {
    toast.error("Sales upload failed");
  } finally {
    onFinally();
  }
}
