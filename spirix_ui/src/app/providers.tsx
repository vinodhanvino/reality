import { useEffect, type ReactNode } from "react";

import { useThemeStore } from "@/store/theme-store";

function ThemeSync() {
  const theme = useThemeStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeSync />
      {children}
    </>
  );
}
