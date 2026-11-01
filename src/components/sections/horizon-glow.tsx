"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** A light that rises from the bottom edge as the closing section arrives. */
export function HorizonGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["40%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.8, 1]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_top,#000,transparent_70%)]" />
      <m.div
        style={{ opacity, y, scale }}
        className="absolute -bottom-[55%] left-1/2 aspect-square w-[150%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.16),rgb(255_255_255/0.05)_45%,transparent)] sm:w-[110%]"
      />
      <m.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent"
      />
    </div>
  );
}
