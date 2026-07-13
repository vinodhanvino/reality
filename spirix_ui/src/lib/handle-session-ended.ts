import { router } from "@/app/router";
import { useAuthStore } from "@/store/auth-store";

let handling = false;

/** Clears auth and shows login when the API reports an ended session (e.g. 401). */
export function handleSessionEnded(): void {
  if (handling) return;
  handling = true;
  try {
    useAuthStore.getState().signOut();
    router.navigate("/signin", { replace: true });
  } finally {
    queueMicrotask(() => {
      handling = false;
    });
  }
}
