import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { env } from "@/env";
import type { Role } from "@/types";

interface AuthState {
  token: string | null;
  roles: Role[];
  setSession: (token: string | null, roles?: Role[]) => void;
  clearSession: () => void;
  hasRole: (role: Role) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      roles: [],
      setSession: (token, roles = []) => set({ token, roles }),
      clearSession: () => set({ token: null, roles: [] }),
      hasRole: (role) => get().roles.includes(role),
    }),
    {
      name: env.VITE_AUTH_STORAGE_KEY,
      partialize: (s) => ({ token: s.token, roles: s.roles }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
