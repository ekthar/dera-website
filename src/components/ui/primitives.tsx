import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  index?: string;
};

/** Small label above a headline. Mixed case reads better than shouting. */
export function Eyebrow({ children, className, tone = "dark", index }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[0.6875rem] font-medium tracking-[0.16em] uppercase",
        tone === "dark" ? "text-white/60" : "text-black/60",
        className,
      )}
    >
      {index ? (
        <span className={tone === "dark" ? "text-white" : "text-black"}>{index}</span>
      ) : null}
      <span aria-hidden className={cn("h-px w-6", tone === "dark" ? "bg-white/30" : "bg-black/30")} />
      <span>{children}</span>
    </p>
  );
}

type StatusBadgeProps = {
  children: ReactNode;
  tone?: "dark" | "light";
  pulse?: boolean;
  className?: string;
};

/** Pill that states a status plainly, with an optional live dot. */
export function StatusBadge({ children, tone = "dark", pulse = false, className }: StatusBadgeProps) {
  const dot = tone === "dark" ? "bg-white" : "bg-black";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-[-0.005em]",
        tone === "dark" ? "bg-white/[0.06] text-white/80 ring-1 ring-white/12" : "bg-black/[0.04] text-black/75 ring-1 ring-black/10",
        className,
      )}
    >
      <span aria-hidden className="relative flex size-1.5">
        {pulse ? <span className={cn("absolute inset-0 rounded-full animate-pulse-dot", dot)} /> : null}
        <span className={cn("relative size-1.5 rounded-full", dot)} />
      </span>
      {children}
    </span>
  );
}

/** Corner registration marks, used to frame technical visuals. */
export function CornerMarks({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "border-white/30" : "border-black/30";
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn("absolute top-0 left-0 size-2.5 border-t border-l", color)} />
      <span className={cn("absolute top-0 right-0 size-2.5 border-t border-r", color)} />
      <span className={cn("absolute bottom-0 left-0 size-2.5 border-b border-l", color)} />
      <span className={cn("absolute right-0 bottom-0 size-2.5 border-r border-b", color)} />
    </span>
  );
}
