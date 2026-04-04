import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().default(""),
  VITE_AUTH_STORAGE_KEY: z.string().default("spirix_auth_token"),
  VITE_DEV_AUTH_BYPASS: z
    .string()
    .optional()
    .transform((v) => (v === "true" ? "true" : "false")),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "",
  VITE_AUTH_STORAGE_KEY: import.meta.env.VITE_AUTH_STORAGE_KEY ?? "",
  VITE_DEV_AUTH_BYPASS: import.meta.env.VITE_DEV_AUTH_BYPASS,
});

export const isDevAuthBypass =
  import.meta.env.DEV && env.VITE_DEV_AUTH_BYPASS === "true";
