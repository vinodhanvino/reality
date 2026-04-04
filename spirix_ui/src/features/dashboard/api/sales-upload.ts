import { apiPostForm } from "@/services/api-client";

export type SalesUploadResponse = {
  source_file: string;
  categories_count: number;
  items_count: number;
};

export async function uploadSalesFile(file: File): Promise<SalesUploadResponse> {
  const form = new FormData();
  form.append("file", file);
  return apiPostForm<SalesUploadResponse>("/sales/upload", form);
}
