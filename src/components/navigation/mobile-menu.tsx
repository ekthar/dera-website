"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef } from "react";
import { easeOutExpo } from "@/components/motion/variants";
import { contactNavItem, primaryNav } from "@/config/navigation";
import { addressLines } from "@/config/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const items = [...primaryNav, contactNavItem];

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock page scroll, trap focus, and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const toggle = document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]');
    const focusFirst = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 60);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        toggle?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [
        ...(toggle ? [toggle] : []),
        ...Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)),
      ];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      } else if (!nodes.includes(current as HTMLElement)) {
        event.preventDefault();
        first.focus();
      }
    }

    function onResize() {
      if (window.matchMedia("(min-width: 768px)").matches) onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(focusFirst);
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          key="mobile-menu"
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-black md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: easeOutExpo, delay: 0.1 } }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
        >
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-40 mask-fade-b" />

          <nav aria-label="Mobile" className="relative flex flex-1 flex-col px-5 pt-28 pb-10 sm:px-8">
            <ul className="flex flex-col">
              {items.map((item, index) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <m.li
                    key={item.href}
                    className="border-b border-white/10"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.08 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-baseline justify-between gap-4 py-4"
                    >
                      <span
                        className={cn(
                          "font-display text-[2.6rem] leading-none font-semibold tracking-[-0.045em] transition-colors",
                          active ? "text-white" : "text-white/70 group-active:text-white",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-white/50">0{index + 1}</span>
                    </Link>
                  </m.li>
                );
              })}
            </ul>

            <m.div
              className="mt-auto pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.35 }}
            >
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/50 uppercase">Visit</p>
              <address className="mt-3 text-sm leading-relaxed text-white/70 not-italic">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <Link
                href="/contact"
                onClick={onClose}
                className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-base font-medium text-black active:scale-[0.98]"
              >
                Start a conversation
                <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
              </Link>
            </m.div>
          </nav>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
