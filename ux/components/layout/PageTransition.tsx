"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { theme } from "@/lib/settings";

const duration = theme.pageTransitionMs / 1000;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
