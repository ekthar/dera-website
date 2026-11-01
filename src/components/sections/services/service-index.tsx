"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { slug: string; number: string; title: string };

/**
 * In-page index for the services page. Highlights the section currently
 * in the reading band; anchors still work without JavaScript.
 */
export function ServiceIndex({ items }: { items: ReadonlyArray<Item> }) {
  const [active, setActive] = useState(items[0]?.slug ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.slug))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Services on this page">
      {/* Mobile and tablet: a scrollable row of pills. */}
      <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden">
        {items.map((item) => (
          <li key={item.slug} className="shrink-0">
            <a
              href={`#${item.slug}`}
              aria-current={active === item.slug ? "true" : undefined}
              className={cn(
                "flex h-10 items-center gap-2 rounded-full px-4 text-sm whitespace-nowrap ring-1 transition-colors duration-300",
                active === item.slug ? "bg-white text-black ring-white" : "text-white/70 ring-white/15",
              )}
            >
              <span className="font-mono text-[0.6875rem] opacity-60">{item.number}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop: a vertical list with a moving marker. */}
      <ol className="hidden space-y-1 lg:block">
        {items.map((item) => {
          const isActive = active === item.slug;
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group flex items-center gap-4 rounded-lg py-2.5 text-[0.9375rem] transition-colors duration-300",
                  isActive ? "text-white" : "text-white/50 hover:text-white/80",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-px bg-white transition-[width,opacity] duration-500 ease-out-expo",
                    isActive ? "w-8 opacity-100" : "w-3 opacity-30 group-hover:w-5",
                  )}
                />
                <span className="font-mono text-[0.6875rem] opacity-70">{item.number}</span>
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
