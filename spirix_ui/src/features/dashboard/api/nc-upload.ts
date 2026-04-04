import { apiPostForm } from "@/services/api-client";

export type NcUploadResponse = {
  source_file: string;
  rows_read: number;
  rows_inserted: number;
};

export async function uploadNcFile(file: File): Promise<NcUploadResponse> {
  const form = new FormData();
  form.append("file", file);
  return apiPostForm<NcUploadResponse>("/nc/upload", form);
}
