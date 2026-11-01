"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check, Package } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { ErpDashboard } from "./erp-dashboard";

/**
 * Presents the dashboard concept on a tilted plane that settles flat as it
 * scrolls into view, with two floating detail panels moving at their own pace.
 */
export function ErpStage({ className, idPrefix = "erp-stage" }: { className?: string; idPrefix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, 0]);
  const panelA = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, 0]);
  const panelB = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [180, 0]);

  return (
    <div ref={ref} className={cn("relative [perspective:1800px]", className)}>
      <m.div
        style={{ rotateX, scale, y, transformOrigin: "50% 100%" }}
        className="relative shadow-[0_60px_120px_-40px_rgb(0_0_0/0.55),0_30px_60px_-30px_rgb(0_0_0/0.4)] rounded-[1rem] sm:rounded-[1.25rem]"
      >
        <ErpDashboard idPrefix={idPrefix} />
      </m.div>

      <m.div
        aria-hidden
        style={{ y: panelA }}
        className="absolute -top-6 -right-2 hidden w-64 rounded-2xl bg-white/90 p-4 text-black shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)] ring-1 ring-black/5 backdrop-blur-xl md:block lg:-right-8"
      >
        <div className="flex items-start gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
            <Package className="size-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[0.75rem] font-semibold">Low stock</p>
            <p className="mt-0.5 text-[0.6875rem] text-black/60">Accessories are below reorder level.</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-black/10">
              <div className="h-full w-[36%] rounded-full bg-black" />
            </div>
          </div>
        </div>
      </m.div>

      <m.div
        aria-hidden
        style={{ y: panelB }}
        className="absolute -bottom-8 -left-2 hidden items-center gap-3 rounded-2xl bg-white/90 p-4 pr-6 text-black shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)] ring-1 ring-black/5 backdrop-blur-xl md:flex lg:-left-8"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-black text-white">
          <Check className="size-4" strokeWidth={2} />
        </span>
        <div>
          <p className="text-[0.75rem] font-semibold">Invoice paid</p>
          <p className="mt-0.5 font-mono text-[0.6875rem] text-black/60">INV-2041 · ₹18,450</p>
        </div>
      </m.div>
    </div>
  );
}
