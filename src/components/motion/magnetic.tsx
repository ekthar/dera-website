"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer offset the element follows. */
  strength?: number;
};

/**
 * Pulls its child gently toward a fine pointer. Touch and reduced-motion
 * visitors get a static element.
 */
export function Magnetic({ children, className, strength = 0.22 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.span
      ref={ref}
      className={className ?? "inline-flex"}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </m.span>
  );
}
