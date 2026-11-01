"use client";

import { useEffect, type ReactNode } from "react";

let hasMountedOnce = false;

/**
 * Fades each new page in after a client-side navigation. The first page
 * load is left alone so the hero paints immediately.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const animate = hasMountedOnce;

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  return <div className={animate ? "animate-page-enter" : undefined}>{children}</div>;
}
