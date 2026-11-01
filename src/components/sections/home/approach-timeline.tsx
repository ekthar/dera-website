"use client";

import { m, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export type ApproachStep = { number: string; title: string; text: string };

function Step({ step, last }: { step: ApproachStep; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  // A step lights up once it reaches the middle band of the viewport.
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const passed = useInView(ref, { margin: "0px 0px -50% 0px" });
  const lit = active || passed;

  return (
    <li ref={ref} className={cn("relative grid grid-cols-[3rem_1fr] gap-x-6 sm:grid-cols-[4.5rem_1fr] sm:gap-x-10", !last && "pb-20 sm:pb-28")}>
      <div className="relative flex justify-center">
        <span
          className={cn(
            "relative z-10 flex size-11 items-center justify-center rounded-full font-mono text-xs ring-1 transition-[background-color,color,box-shadow] duration-500 ease-out-quart sm:size-14",
            lit ? "bg-white text-black ring-white shadow-[0_0_0_6px_rgb(0_0_0),0_0_40px_rgb(255_255_255/0.25)]" : "bg-black text-white/60 ring-white/20 shadow-[0_0_0_6px_rgb(0_0_0)]",
          )}
        >
          {step.number}
        </span>
      </div>
      <div className="pt-1.5 sm:pt-3">
        <h3
          className={cn(
            "font-display text-display-md font-semibold transition-colors duration-500",
            lit ? "text-white" : "text-white/35",
          )}
        >
          {step.title}
        </h3>
        <p
          className={cn(
            "mt-4 max-w-md text-lead transition-colors duration-500",
            lit ? "text-white/70" : "text-white/40",
          )}
        >
          {step.text}
        </p>
      </div>
    </li>
  );
}

/** Vertical process with a progress line that follows the scroll. */
export function ApproachTimeline({ steps }: { steps: ReadonlyArray<ApproachStep> }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 55%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      {/* Track and fill sit behind the step markers. */}
      <span aria-hidden className="absolute top-2 bottom-2 left-6 w-px bg-white/12 sm:left-9" />
      <m.span
        aria-hidden
        className="absolute top-2 bottom-2 left-6 w-px origin-top bg-white sm:left-9"
        style={{ scaleY: reduce ? scrollYProgress : progress }}
      />
      {steps.map((step, index) => (
        <Step key={step.number} step={step} last={index === steps.length - 1} />
      ))}
    </ol>
  );
}
