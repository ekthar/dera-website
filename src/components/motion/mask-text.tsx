"use client";

import { m } from "motion/react";
import { createElement } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo, revealViewport } from "./variants";

type MaskTextProps = {
  lines: ReadonlyArray<string>;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
};

/**
 * Headline whose lines rise out of a mask as it enters the viewport.
 * Screen readers get the sentence once, as plain text.
 */
export function MaskText({ lines, as = "h2", id, className, lineClassName, delay = 0, stagger = 0.09 }: MaskTextProps) {
  return createElement(
    as,
    { className, id },
    <>
      <span className="sr-only">{lines.join(" ")}</span>
      <m.span
        aria-hidden
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className={cn("line-mask", lineClassName)}>
            <m.span
              data-reveal=""
              className="block will-change-transform"
              variants={{
                hidden: { y: "108%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { duration: 1.05, ease: easeOutExpo } },
              }}
            >
              {line}
            </m.span>
          </span>
        ))}
      </m.span>
    </>,
  );
}
