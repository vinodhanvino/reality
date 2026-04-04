/** Shared motion tokens — import instead of duplicating variants in each section. */
export const springSnappy = { type: "spring" as const, stiffness: 380, damping: 34 };
export const springSoft = { type: "spring" as const, stiffness: 120, damping: 26 };
export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

export const staggerContainer = (gap = 0.07) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: gap, delayChildren: 0.04 },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.01,
    y: -4,
    transition: springSnappy,
  },
};

export const viewportOnce = { once: true, margin: "-12% 0px" as const };
