"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Total travel in pixels across the element's pass through the viewport. */
  distance?: number;
  axis?: "x" | "y";
};

/** Moves its content against the scroll by a small, fixed distance. */
export function Parallax({ children, className, distance = 80, axis = "y" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const offset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance / 2, -distance / 2]);

  return (
    <m.div ref={ref} className={className} style={axis === "y" ? { y: offset } : { x: offset }}>
      {children}
    </m.div>
  );
}
