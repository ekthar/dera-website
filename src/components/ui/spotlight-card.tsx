"use client";

import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  "aria-label"?: string;
};

/**
 * Linked card with a soft light that follows a mouse pointer. The light is
 * a CSS variable update, so no React render happens while the pointer moves.
 */
export function SpotlightCard({ href, children, className, tone = "dark", ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      aria-label={rest["aria-label"]}
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-[1.25rem] transition-[box-shadow,transform,background-color] duration-500 ease-out-quart",
        tone === "dark"
          ? "bg-graphite text-white ring-1 ring-white/[0.09] hover:ring-white/25 [--visual-contrast:#000]"
          : "surface-light bg-white text-black ring-1 ring-black/5 hover:ring-black/20 [--visual-contrast:#fff]",
        "hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_rgb(0_0_0/0.9)]",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          tone === "dark"
            ? "bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(255_255_255/0.07),transparent_60%)]"
            : "bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(0_0_0/0.05),transparent_60%)]",
        )}
      />
      {children}
    </Link>
  );
}
