import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth-store";

/** True after Zustand persist has loaded from storage (avoids auth flash). */
export function useAuthStoreHydrated(): boolean {
  const [hydrated, setHydrated] = useState(() =>
    useAuthStore.persist.hasHydrated(),
  );

  useEffect(() => {
    return useAuthStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  return hydrated;
}
