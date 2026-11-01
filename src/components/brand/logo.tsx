import { cn } from "@/lib/utils";
import { monogramD, n1Paths, wordmarkPaths } from "./brand-paths";

type MarkProps = {
  className?: string;
  title?: string;
};

/** The DERA wordmark. Decorative by default; pass a title to expose it. */
export function DeraWordmark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 86 20"
      fill="currentColor"
      className={cn("block", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {wordmarkPaths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** The split-stem D monogram on a square field. "dark" sits on dark surfaces. */
export function DeraMonogram({ className, title, tone = "dark" }: MarkProps & { tone?: "dark" | "light" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("block", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="32" height="32" rx="8" className={tone === "dark" ? "fill-white" : "fill-black"} />
      <g transform="translate(6 6)" className={tone === "dark" ? "fill-black" : "fill-white"}>
        <path d={monogramD.stem} />
        <path d={monogramD.bowl} />
      </g>
    </svg>
  );
}

/** Wordmark + descriptor lockup used in navigation. */
export function DeraLockup({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <DeraWordmark className="h-[15px] w-auto" />
      <span aria-hidden className="h-4 w-px bg-white/25" />
      <span className="text-[9.5px] leading-[1.15] font-medium tracking-[0.22em] text-white/70">
        BUSINESS
        <br />
        SOLUTIONS
      </span>
    </span>
  );
}

/** N1 ERP product wordmark. */
export function N1Wordmark({ className, title, withErp = true }: MarkProps & { withErp?: boolean }) {
  return (
    <span
      className={cn("inline-flex items-center gap-[0.42em]", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <svg viewBox="0 0 36 20" fill="currentColor" className="block h-[1em] w-auto">
        {n1Paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
      {withErp ? (
        <span className="font-display text-[0.78em] leading-none font-semibold tracking-[0.06em]">ERP</span>
      ) : null}
    </span>
  );
}
