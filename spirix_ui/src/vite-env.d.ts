/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Empty in dev uses same-origin + Vite `/api` proxy. */
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AUTH_STORAGE_KEY: string;
  /** Vite dev only: backend origin for `/api` proxy. */
  readonly VITE_DEV_API_PROXY_TARGET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
