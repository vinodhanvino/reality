import { useCallback, useEffect, useRef, useState } from "react";

import { SIDEBAR_LAYOUT } from "@/config/app-settings";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/** Expands while pointer is over the rail; collapses shortly after leave (avoids flicker). */
export function useSidebarHoverExpand() {
  const [expanded, setExpanded] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }, []);

  const onEnter = useCallback(() => {
    clearLeaveTimer();
    setExpanded(true);
  }, [clearLeaveTimer]);

  const onLeave = useCallback(() => {
    clearLeaveTimer();
    const delay = reducedMotion ? 0 : SIDEBAR_LAYOUT.hoverCollapseDelayMs;
    leaveTimer.current = setTimeout(() => {
      setExpanded(false);
    }, delay);
  }, [clearLeaveTimer, reducedMotion]);

  useEffect(() => () => clearLeaveTimer(), [clearLeaveTimer]);

  return { expanded, onEnter, onLeave };
}
