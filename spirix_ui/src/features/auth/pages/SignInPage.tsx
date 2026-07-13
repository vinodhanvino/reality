import { Navigate } from "react-router-dom";

import { ThemeToggle } from "@/components/common/ThemeToggle";
import { RouteFallback } from "@/components/common/RouteFallback";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { SignInShell } from "@/features/auth/components/SignInShell";
import { useAuthStoreHydrated } from "@/hooks/use-auth-store-hydrated";
import { useAuthStore } from "@/store/auth-store";

export function SignInPage() {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStoreHydrated();

  if (!hydrated) {
    return <RouteFallback />;
  }

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <SignInShell cornerSlot={<ThemeToggle />}>
      <SignInForm />
    </SignInShell>
  );
}

export default SignInPage;
