import { create } from "zustand";
import { persist } from "zustand/middleware";

import { authStorageKey } from "@/config/app-settings";
import { useApiDataStore } from "@/store/api-data-store";

type AuthState = {
  token: string | null;
  role: string | null;
  /** Login id entered at sign-in (shown in profile). */
  loginId: string | null;
  setSession: (token: string | null, role?: string | null, loginId?: string | null) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      loginId: null,
      setSession: (token, role = null, loginId) =>
        set((state) => ({
          token,
          role: token ? role : null,
          loginId: token ? (loginId !== undefined ? loginId : state.loginId) : null,
        })),
      signOut: () => {
        useApiDataStore.getState().resetForAuth();
        set({ token: null, role: null, loginId: null });
      },
    }),
    { name: authStorageKey() },
  ),
);
