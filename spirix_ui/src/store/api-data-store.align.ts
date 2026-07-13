import type { ApiDataActions, ApiDataState } from "@/store/api-data-store.types";
import { emptyApiDataState } from "@/store/api-data-store.types";

type Get = () => ApiDataState & ApiDataActions;
type Set = (p: Partial<ApiDataState>) => void;

/** Drops cached API data when the auth token changes. */
export function alignApiDataToken(get: Get, set: Set, token: string): void {
  if (get().cacheToken === token) return;
  set({ ...emptyApiDataState(), cacheToken: token });
}
