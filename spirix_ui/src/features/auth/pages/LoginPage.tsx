import { Card } from "@/components/ui/card";
import { APP_NAME, APP_TAGLINE, LOGIN_SUBTITLE } from "@/config/settings";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background lg:flex-row">
      <div className="relative hidden flex-1 flex-col justify-between bg-gradient-to-br from-primary/20 via-primary/5 to-background p-10 text-foreground lg:flex xl:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--primary) 0%, transparent 45%), radial-gradient(circle at 80% 60%, color-mix(in oklab, var(--primary) 40%, transparent) 0%, transparent 40%)",
          }}
        />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {APP_NAME}
          </p>
          <h1 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight xl:text-4xl">
            {APP_TAGLINE}
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {LOGIN_SUBTITLE}
          </p>
        </div>
        <p className="relative text-xs text-muted-foreground">
          Secure access to dashboards and file uploads.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md border-border/80 shadow-lg">
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}
