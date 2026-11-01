import { cn } from "@/lib/utils";

const layers = [
  {
    name: "Interfaces",
    note: "Where people work",
    items: ["Office desktop", "Web browser", "Billing counter"],
  },
  {
    name: "Modules",
    note: "What the business does",
    items: ["Sales", "Purchasing", "Inventory", "Accounting", "Workflows", "Reports"],
  },
  {
    name: "Shared core",
    note: "What everything agrees on",
    items: ["Business records", "Business rules", "Reporting data"],
  },
] as const;

/**
 * A conceptual, layered view of how N1 ERP is intended to fit together.
 * It explains the idea; it is not a technical specification.
 */
export function ErpArchitecture({ className }: { className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <div className="relative space-y-3">
        {layers.map((layer, index) => (
          <div key={layer.name} className="relative">
            <div
              className={cn(
                "grid gap-5 rounded-[1.25rem] p-5 ring-1 sm:p-7 md:grid-cols-[13rem_1fr] md:items-center",
                index === 2 ? "bg-white text-black ring-white" : "bg-graphite text-white ring-white/10",
              )}
            >
              <div>
                <p className={cn("font-mono text-[0.6875rem] tracking-[0.16em] uppercase", index === 2 ? "text-black/55" : "text-white/50")}>
                  Layer 0{index + 1}
                </p>
                <p className="mt-2 font-display text-xl font-semibold tracking-[-0.02em]">{layer.name}</p>
                <p className={cn("mt-1 text-sm", index === 2 ? "text-black/60" : "text-white/55")}>{layer.note}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-sm ring-1",
                      index === 2 ? "bg-black/[0.04] ring-black/10" : "bg-white/[0.03] text-white/80 ring-white/12",
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {index < layers.length - 1 ? (
              <div aria-hidden className="flex justify-center py-1">
                <span className="flex flex-col items-center">
                  <span className="h-4 w-px bg-white/25" />
                  <span className="size-1.5 rounded-full bg-white/60" />
                  <span className="h-4 w-px bg-white/25" />
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <figcaption className="mt-6 text-center text-[0.8125rem] text-white/50">
        Conceptual architecture. Layers and modules show the intended direction, not a released product.
      </figcaption>
    </figure>
  );
}
