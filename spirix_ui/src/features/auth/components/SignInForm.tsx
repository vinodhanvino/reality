import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SIGN_IN_UX } from "@/config/app-settings";
import { postSignIn } from "@/features/auth/api/signin-api";
import { SignInCardIntro } from "@/features/auth/components/sign-in-card-intro";
import { SignInErrorAlert } from "@/features/auth/components/sign-in-error-alert";
import { SignInTrustFooter } from "@/features/auth/components/sign-in-trust-footer";
import { useAuthStore } from "@/store/auth-store";

type SignInLocationState = { from?: { pathname?: string } };

export function SignInForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((s) => s.setSession);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const out = await postSignIn(username.trim(), password);
      setSession(out.token, out.role, username.trim() || null);
      const state = location.state as SignInLocationState | null;
      const to =
        state?.from?.pathname && state.from.pathname !== "/signin"
          ? state.from.pathname
          : "/";
      navigate(to, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-lg ring-1 ring-black/[0.04] dark:bg-card/95 dark:ring-white/[0.06] sm:p-8">
      <SignInCardIntro />

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5"
        aria-busy={pending}
      >
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="si-user"
          >
            {SIGN_IN_UX.login_id_label}
          </label>
          <Input
            id="si-user"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={SIGN_IN_UX.login_id_helper}
            required
            className="h-11 px-3.5 text-base sm:text-sm"
            aria-describedby="si-user-hint"
          />
          <p id="si-user-hint" className="text-xs text-muted-foreground">
            {SIGN_IN_UX.login_id_helper}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="si-pass"
          >
            {SIGN_IN_UX.password_label}
          </label>
          <Input
            id="si-pass"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 px-3.5 text-base sm:text-sm"
          />
        </div>

        {error ? <SignInErrorAlert message={error} /> : null}

        <Button
          type="submit"
          className="mt-1 h-11 w-full text-sm font-semibold shadow-sm"
          size="lg"
          disabled={pending}
        >
          {pending ? SIGN_IN_UX.submitting : SIGN_IN_UX.submit}
        </Button>

        <SignInTrustFooter />
      </form>
    </div>
  );
}
