"use client";

import { AnimatePresence, m } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/motion/variants";
import { ErpDashboard } from "./erp-dashboard";
import type { ErpView } from "./erp-data";

const tabs: ReadonlyArray<{ view: ErpView; label: string; caption: string }> = [
  { view: "overview", label: "Overview", caption: "Revenue, orders, stock and receivables on one screen." },
  { view: "inventory", label: "Inventory", caption: "Stock movement and the items that need attention." },
  { view: "sales", label: "Sales", caption: "Daily sales, top items and the latest invoices." },
];

/** Tabbed walk-through of the interface concept. Arrow keys move between tabs. */
export function ErpShowcase() {
  const [active, setActive] = useState<ErpView>("overview");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = tabs.find((tab) => tab.view === active) ?? tabs[0];

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.view === active);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActive(tabs[next].view);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-5">
        <div
          role="tablist"
          aria-label="Interface views"
          onKeyDown={onKeyDown}
          className="inline-flex rounded-full bg-white/[0.05] p-1 ring-1 ring-white/10"
        >
          {tabs.map((tab, index) => {
            const selected = tab.view === active;
            return (
              <button
                key={tab.view}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`erp-tab-${tab.view}`}
                aria-selected={selected}
                aria-controls="erp-tabpanel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.view)}
                className={cn(
                  "relative h-10 rounded-full px-5 text-sm font-medium transition-colors duration-300 sm:px-6",
                  selected ? "text-black" : "text-white/65 hover:text-white",
                )}
              >
                {selected ? (
                  <m.span
                    className="absolute inset-0 -z-0 rounded-full bg-white"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: easeOutExpo }}
                  />
                ) : null}
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="text-center text-[0.9375rem] text-white/60">
          {current.caption}
        </p>
      </div>

      <div
        id="erp-tabpanel"
        role="tabpanel"
        aria-labelledby={`erp-tab-${active}`}
        className="relative mt-10 sm:mt-12"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            <ErpDashboard view={active} idPrefix={`showcase-${active}`} className="shadow-[0_40px_100px_-40px_rgb(255_255_255/0.12)]" />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
