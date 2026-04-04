import type { FormEvent } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LoginFormValues } from "@/features/auth/login-schema";

type Props = {
  mode: "sign-in" | "sign-up";
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  isSubmitting: boolean;
  onSubmit: (e: FormEvent) => void;
};

export function LoginFormFields({
  mode,
  register,
  errors,
  isSubmitting,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "sign-up" ? (
        <div className="space-y-2">
          <label htmlFor="user_name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="user_name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.user_name)}
            {...register("user_name")}
          />
          {errors.user_name ? (
            <p className="text-sm text-destructive">{errors.user_name.message}</p>
          ) : null}
        </div>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        ) : null}
      </div>
      {mode === "sign-up" ? (
        <div className="space-y-2">
          <label htmlFor="confirm_password" className="text-sm font-medium">
            Confirm password
          </label>
          <Input
            id="confirm_password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.confirm_password)}
            {...register("confirm_password")}
          />
          {errors.confirm_password ? (
            <p className="text-sm text-destructive">
              {errors.confirm_password.message}
            </p>
          ) : null}
        </div>
      ) : null}
      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting
          ? mode === "sign-up"
            ? "Signing up…"
            : "Signing in…"
          : mode === "sign-up"
            ? "Create account"
            : "Sign in"}
      </Button>
    </form>
  );
}
