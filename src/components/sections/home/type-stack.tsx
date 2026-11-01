"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const rows = [
  { word: "DERA", style: "text-white", drift: [0, 8] },
  { word: "BUSINESS", style: "text-outline", drift: [6, -6] },
  { word: "SOLUTIONS", style: "text-white/25", drift: [-3, 5] },
] as const;

/** Large stacked type that drifts sideways, each row at its own pace. */
export function TypeStack({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} aria-hidden className={cn("select-none", className)}>
      {rows.map((row, index) => (
        <Row key={row.word} index={index} word={row.word} style={row.style} drift={row.drift} progress={scrollYProgress} reduce={!!reduce} />
      ))}
    </div>
  );
}

function Row({
  word,
  style,
  drift,
  progress,
  reduce,
  index,
}: {
  word: string;
  style: string;
  drift: readonly [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
  index: number;
}) {
  const x = useTransform(progress, [0, 1], reduce ? ["0%", "0%"] : [`${drift[0]}%`, `${drift[1]}%`]);
  return (
    <div className="overflow-hidden border-t border-white/10 py-[0.04em] last:border-b">
      <m.p
        className={cn(
          "font-display text-[clamp(3rem,0.5rem+7vw,7.5rem)] leading-[0.95] font-bold tracking-[-0.05em] whitespace-nowrap",
          style,
          index === 1 && "pl-[10%]",
          index === 2 && "pl-[4%]",
        )}
        style={{ x }}
      >
        {word}
      </m.p>
    </div>
  );
}
