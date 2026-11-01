"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { m } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DeraLockup } from "@/components/brand/logo";
import { springSnappy } from "@/components/motion/variants";
import { contactNavItem, primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Indicator = { left: number; width: number; visible: boolean };

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0, visible: false });
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const activeHref = primaryNav.find((item) => isActivePath(pathname, item.href))?.href ?? null;
  const targetHref = hovered ?? activeHref;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const measure = useCallback(() => {
    const list = listRef.current;
    const link = targetHref ? linkRefs.current.get(targetHref) : undefined;
    if (!list || !link) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const listRect = list.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    setIndicator({ left: rect.left - listRect.left, width: rect.width, visible: true });
  }, [targetHref]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(list);
    return () => observer.disconnect();
  }, [measure]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 animate-fade-up [animation-delay:150ms]">
        <div className="mx-auto w-full max-w-[90rem] px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
          <nav
            aria-label="Primary"
            className="pointer-events-auto relative flex h-14 items-center justify-between rounded-full pr-2 pl-5 sm:pl-6"
          >
            {/* Surface fades in on scroll. Opacity only, so it stays on the compositor. */}
            <span
              aria-hidden
              className={cn(
                "glass-dark absolute inset-0 -z-10 rounded-full ring-1 ring-white/10 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.8)] transition-opacity duration-500 ease-out-quart",
                scrolled || menuOpen ? "opacity-100" : "opacity-0",
              )}
            />

            <Link
              href="/"
              className="relative z-10 -m-2 rounded-lg p-2"
              aria-label="Dera Business Solutions, home"
              onClick={closeMenu}
            >
              <DeraLockup />
            </Link>

            <ul
              ref={listRef}
              className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center md:flex"
              onPointerLeave={() => setHovered(null)}
            >
              <m.span
                aria-hidden
                className="absolute top-0 left-0 h-full rounded-full bg-white/[0.08] ring-1 ring-white/10"
                initial={false}
                animate={{ x: indicator.left, width: indicator.width, opacity: indicator.visible ? 1 : 0 }}
                transition={springSnappy}
              />
              {primaryNav.map((item) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      ref={(node) => {
                        if (node) linkRefs.current.set(item.href, node);
                        else linkRefs.current.delete(item.href);
                      }}
                      aria-current={active ? "page" : undefined}
                      onPointerEnter={() => setHovered(item.href)}
                      onFocus={() => setHovered(item.href)}
                      onBlur={() => setHovered(null)}
                      className={cn(
                        "relative z-10 block rounded-full px-4 py-2 text-sm font-medium tracking-[-0.01em] transition-colors duration-300",
                        active || hovered === item.href ? "text-white" : "text-white/65",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="relative z-10 flex items-center gap-2">
              <Link
                href={contactNavItem.href}
                aria-current={isActivePath(pathname, contactNavItem.href) ? "page" : undefined}
                className="group/contact hidden h-10 items-center gap-1.5 rounded-full bg-white pr-3.5 pl-4.5 text-sm font-medium tracking-[-0.01em] text-black transition-[background-color,transform] duration-300 ease-out-quart hover:bg-mist active:scale-[0.97] md:inline-flex"
              >
                {contactNavItem.label}
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-4 transition-transform duration-300 ease-out-quart group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5"
                />
              </Link>

              <button
                type="button"
                className="relative flex size-11 items-center justify-center rounded-full text-white md:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span aria-hidden className="relative block h-3 w-5">
                  <span
                    className={cn(
                      "absolute top-0 left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-out-expo",
                      menuOpen && "translate-y-[5.25px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-[10.5px] left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-out-expo",
                      menuOpen && "-translate-y-[5.25px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
