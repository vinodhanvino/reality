import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInApi, signUpApi } from "@/features/auth/api/auth-api";
import { LoginFormFields } from "@/features/auth/components/LoginFormFields";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/login-schema";
import { useAuthStore } from "@/store/auth-store";

export function LoginForm() {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    shouldUnregister: true,
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (mode === "sign-up" && data.password !== (data.confirm_password || "")) {
      toast.error("Password and confirm password must match");
      return;
    }
    try {
      const result =
        mode === "sign-up"
          ? await signUpApi(data.user_name?.trim() || "", data.email, data.password)
          : await signInApi(data.email, data.password);
      setSession(result.token, result.roles);
      navigate("/", { replace: true });
      toast.success(mode === "sign-up" ? "Account created" : "Signed in");
    } catch {
      toast.error(mode === "sign-up" ? "Sign up failed" : "Sign in failed");
    }
  });

  return (
    <>
      <CardHeader className="space-y-1 pb-2 text-center sm:text-left">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {mode === "sign-up" ? "Create account" : "Welcome back"}
        </CardTitle>
        <CardDescription className="text-base">
          {mode === "sign-up"
            ? "Enter your details to get started."
            : "Sign in with your work email."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/50 p-1">
          <Button
            type="button"
            variant={mode === "sign-in" ? "default" : "ghost"}
            className="w-full"
            onClick={() => setMode("sign-in")}
          >
            Sign in
          </Button>
          <Button
            type="button"
            variant={mode === "sign-up" ? "default" : "ghost"}
            className="w-full"
            onClick={() => setMode("sign-up")}
          >
            Sign up
          </Button>
        </div>
        <LoginFormFields
          mode={mode}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </CardContent>
    </>
  );
}
