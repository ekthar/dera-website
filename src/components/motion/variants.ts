import type { Transition, Variants } from "motion/react";

/** Expo-out: fast start, long soft landing. The house curve for entrances. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

/** Critically damped spring for anything a pointer touches. */
export const springSoft: Transition = { type: "spring", bounce: 0, duration: 0.5 };
export const springSnappy: Transition = { type: "spring", bounce: 0, duration: 0.35 };

export const revealViewport = { once: true, margin: "0px 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: easeOutExpo } },
};

export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}
