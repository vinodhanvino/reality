import {
  AUTH_SIGN_IN_PATH,
  getApiBaseUrl,
} from "@/config/app-settings";

export type SignInSuccess = {
  message: string;
  token: string;
  expires_in_minutes: number;
  role: string | null;
};

export type SignInErrorBody = { error?: string };

export async function postSignIn(
  username: string,
  password: string,
): Promise<SignInSuccess> {
  const base = getApiBaseUrl();
  const url = `${base}${AUTH_SIGN_IN_PATH}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as SignInErrorBody).error === "string"
        ? (data as SignInErrorBody).error
        : "Sign in failed";
    throw new Error(msg);
  }
  const o = data as Partial<SignInSuccess>;
  if (
    typeof o.token !== "string" ||
    typeof o.expires_in_minutes !== "number"
  ) {
    throw new Error("Unexpected response");
  }
  return {
    message: typeof o.message === "string" ? o.message : "Login successful",
    token: o.token,
    expires_in_minutes: o.expires_in_minutes,
    role: typeof o.role === "string" ? o.role : null,
  };
}
