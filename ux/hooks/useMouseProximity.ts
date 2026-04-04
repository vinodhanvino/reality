"use client";

import { useState, useEffect, useRef } from "react";

/** Normalized -1..1 from viewport center. isInside false when mouse leaves document (elastic snap). */
export function useMouseProximity() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [norm, setNorm] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(true);
  const raf = useRef<number>(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setIsInside(true);
      raf.current = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        setPos({ x: e.clientX, y: e.clientY });
        setNorm({ x: (x - 0.5) * 2, y: (y - 0.5) * 2 });
      });
    };
    const handleLeave = (e: MouseEvent) => {
      if (!e.relatedTarget || !document.contains(e.relatedTarget as Node))
        setIsInside(false);
    };
    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseout", handleLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  return { pos, norm, isInside };
}
