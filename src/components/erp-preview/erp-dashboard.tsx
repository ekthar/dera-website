import {
  ArrowDownRight,
  ArrowUpRight,
  ChartColumn,
  Landmark,
  LayoutDashboard,
  Minus,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  channelSplit,
  dailySales,
  kpis,
  revenueMonths,
  revenueSeries,
  stockByCategory,
  stockItems,
  stockMovement,
  topItems,
  transactions,
  type ErpView,
  type Kpi,
} from "./erp-data";

const navItems: ReadonlyArray<{ label: string; icon: LucideIcon; view?: ErpView }> = [
  { label: "Overview", icon: LayoutDashboard, view: "overview" },
  { label: "Sales", icon: ShoppingCart, view: "sales" },
  { label: "Purchases", icon: Truck },
  { label: "Inventory", icon: Package, view: "inventory" },
  { label: "Accounts", icon: Landmark },
  { label: "Workflows", icon: Workflow },
  { label: "Reports", icon: ChartColumn },
];

const viewTitles: Record<ErpView, string> = {
  overview: "Overview",
  inventory: "Inventory",
  sales: "Sales",
};

function N1Glyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 20" fill="currentColor" className={className} aria-hidden>
      <path d="M0 0h5v20H0zM15 0h5v20h-5zM5 0h4.5L15 20h-4.5zM23 5 29 0v5l-6 5zM31 0h5v20h-5z" />
    </svg>
  );
}

function Panel({ title, meta, children, className }: { title: string; meta?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/[0.07]", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.75rem] font-medium text-white/85">{title}</p>
        {meta ? <p className="text-[0.6875rem] text-white/45">{meta}</p> : null}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  const TrendIcon = kpi.trend === "up" ? ArrowUpRight : kpi.trend === "down" ? ArrowDownRight : Minus;
  return (
    <div className="rounded-xl bg-white/[0.03] p-3.5 ring-1 ring-white/[0.07] @xl:p-4">
      <p className="text-[0.6875rem] text-white/50">{kpi.label}</p>
      <p className="mt-1.5 font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-white @xl:text-[1.25rem]">
        {kpi.value}
      </p>
      <p className="mt-1 inline-flex items-center gap-1 text-[0.6875rem] text-white/60">
        <TrendIcon className="size-3" strokeWidth={2} />
        {kpi.delta}
      </p>
    </div>
  );
}

/** Rounded so server and client print identical attribute values. */
const r2 = (value: number) => Math.round(value * 100) / 100;

function RevenueChart({ gradientId }: { gradientId: string }) {
  const width = 560;
  const height = 170;
  const min = 25;
  const max = 72;
  const points = revenueSeries.map((value, index) => {
    const x = (index / (revenueSeries.length - 1)) * width;
    const y = height - 10 - ((value - min) / (max - min)) * (height - 30);
    return [r2(x), r2(y)] as const;
  });
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const [lastX, lastY] = points[points.length - 1];

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-36 w-full @2xl:h-44" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.22" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line key={ratio} x1="0" x2={width} y1={height * ratio} y2={height * ratio} stroke="white" strokeOpacity="0.06" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke="white" strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <line x1={lastX} x2={lastX} y1={lastY} y2={height} stroke="white" strokeOpacity="0.25" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between text-[0.625rem] text-white/40">
        {revenueMonths.map((month, index) => (
          <span key={month} className={cn(index % 2 === 1 && "hidden @lg:inline")}>
            {month}
          </span>
        ))}
      </div>
    </div>
  );
}

function ChannelDonut() {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const shades = [0.92, 0.5, 0.2];
  // Each segment starts where the previous ones end.
  const segments = channelSplit.map((segment, index) => {
    const before = channelSplit.slice(0, index).reduce((sum, item) => sum + item.value, 0);
    return { ...segment, length: (segment.value / 100) * circumference, offset: (before / 100) * circumference };
  });
  return (
    <div className="flex items-center gap-5 @2xl:flex-col @2xl:items-start @4xl:flex-row @4xl:items-center">
      <svg viewBox="0 0 100 100" className="size-24 shrink-0 -rotate-90 @2xl:size-28" aria-hidden>
        <circle cx="50" cy="50" r={radius} fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="11" />
        {segments.map((segment, index) => {
          const dash = `${r2(Math.max(segment.length - 2.5, 0))} ${r2(circumference)}`;
          return (
            <circle
              key={segment.label}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="white"
              strokeOpacity={shades[index]}
              strokeWidth="11"
              strokeDasharray={dash}
              strokeDashoffset={r2(-segment.offset)}
            />
          );
        })}
      </svg>
      <ul className="w-full space-y-2">
        {channelSplit.map((segment, index) => (
          <li key={segment.label} className="flex items-center justify-between gap-3 text-[0.6875rem]">
            <span className="flex items-center gap-2 text-white/65">
              <span className="size-2 rounded-full bg-white" style={{ opacity: shades[index] }} />
              {segment.label}
            </span>
            <span className="font-medium text-white/90 tabular-nums">{segment.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const strong = status === "Paid" || status === "Healthy";
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[0.625rem] font-medium",
        strong ? "bg-white/[0.1] text-white/85" : "text-white/70 ring-1 ring-white/20",
      )}
    >
      {status}
    </span>
  );
}

function TransactionsTable() {
  return (
    <table className="w-full text-left text-[0.6875rem]">
      <thead className="text-white/40">
        <tr>
          <th scope="col" className="pb-2 font-normal">Reference</th>
          <th scope="col" className="hidden pb-2 font-normal @lg:table-cell">Party</th>
          <th scope="col" className="hidden pb-2 font-normal @3xl:table-cell">Type</th>
          <th scope="col" className="pb-2 text-right font-normal">Amount</th>
          <th scope="col" className="pb-2 pl-3 text-right font-normal">Status</th>
        </tr>
      </thead>
      <tbody className="text-white/75">
        {transactions.map((row) => (
          <tr key={row.id} className="border-t border-white/[0.06]">
            <td className="py-2 font-mono text-[0.65rem] text-white/85">{row.id}</td>
            <td className="hidden py-2 @lg:table-cell">{row.party}</td>
            <td className="hidden py-2 @3xl:table-cell">{row.type}</td>
            <td className="py-2 text-right tabular-nums">{row.amount}</td>
            <td className="py-2 pl-3 text-right">
              <StatusPill status={row.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CategoryBars() {
  return (
    <ul className="space-y-3.5">
      {stockByCategory.map((category) => (
        <li key={category.label}>
          <div className="flex justify-between text-[0.6875rem]">
            <span className="text-white/65">{category.label}</span>
            <span className="text-white/90 tabular-nums">{category.value}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className={cn("h-full rounded-full", category.value < 40 ? "bg-white/40" : "bg-white/85")}
              style={{ width: `${category.value}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function MovementBars() {
  const max = 56;
  return (
    <div>
      <div className="flex h-36 items-end justify-between gap-2 @2xl:h-44">
        {stockMovement.map((day) => (
          <div key={day.day} className="flex h-full flex-1 items-end justify-center gap-1">
            <span className="w-full max-w-3 rounded-t-sm bg-white/85" style={{ height: `${(day.inbound / max) * 100}%` }} />
            <span className="w-full max-w-3 rounded-t-sm bg-white/25" style={{ height: `${(day.outbound / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[0.625rem] text-white/40">
        {stockMovement.map((day) => (
          <span key={day.day} className="flex-1 text-center">
            {day.day}
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-[0.625rem] text-white/55">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-white/85" /> Inbound
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-white/25" /> Outbound
        </span>
      </div>
    </div>
  );
}

function StockTable() {
  return (
    <table className="w-full text-left text-[0.6875rem]">
      <thead className="text-white/40">
        <tr>
          <th scope="col" className="pb-2 font-normal">Item</th>
          <th scope="col" className="hidden pb-2 font-normal @3xl:table-cell">SKU</th>
          <th scope="col" className="pb-2 text-right font-normal">On hand</th>
          <th scope="col" className="hidden pb-2 text-right font-normal @lg:table-cell">Reorder at</th>
          <th scope="col" className="pb-2 pl-3 text-right font-normal">State</th>
        </tr>
      </thead>
      <tbody className="text-white/75">
        {stockItems.map((item) => (
          <tr key={item.sku} className="border-t border-white/[0.06]">
            <td className="py-2 text-white/85">{item.name}</td>
            <td className="hidden py-2 font-mono text-[0.65rem] @3xl:table-cell">{item.sku}</td>
            <td className="py-2 text-right tabular-nums">{item.onHand}</td>
            <td className="hidden py-2 text-right tabular-nums @lg:table-cell">{item.reorder}</td>
            <td className="py-2 pl-3 text-right">
              <StatusPill status={item.state} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DailySalesBars() {
  const max = Math.max(...dailySales);
  return (
    <div className="flex h-36 items-end gap-1.5 @2xl:h-44">
      {dailySales.map((value, index) => (
        <span
          key={index}
          className={cn("flex-1 rounded-t-sm", index === dailySales.length - 2 ? "bg-white" : "bg-white/30")}
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

function TopItems() {
  return (
    <ol className="space-y-3">
      {topItems.map((item, index) => (
        <li key={item.name} className="flex items-center gap-3 text-[0.6875rem]">
          <span className="font-mono text-white/40">0{index + 1}</span>
          <span className="flex-1 text-white/75">{item.name}</span>
          <span className="text-white/90 tabular-nums">{item.share}%</span>
        </li>
      ))}
    </ol>
  );
}

function ViewBody({ view, idPrefix }: { view: ErpView; idPrefix: string }) {
  if (view === "inventory") {
    return (
      <>
        <div className="grid gap-3 @2xl:grid-cols-5">
          <Panel title="Stock movement" meta="This week" className="@2xl:col-span-3">
            <MovementBars />
          </Panel>
          <Panel title="Stock by category" meta="Capacity" className="@2xl:col-span-2">
            <CategoryBars />
          </Panel>
        </div>
        <Panel title="Items needing attention" meta="Sorted by state">
          <StockTable />
        </Panel>
      </>
    );
  }
  if (view === "sales") {
    return (
      <>
        <div className="grid gap-3 @2xl:grid-cols-5">
          <Panel title="Daily sales" meta="Last 14 days" className="@2xl:col-span-3">
            <DailySalesBars />
          </Panel>
          <Panel title="Top items" meta="Share of sales" className="@2xl:col-span-2">
            <TopItems />
          </Panel>
        </div>
        <Panel title="Recent invoices" meta="Today">
          <TransactionsTable />
        </Panel>
      </>
    );
  }
  return (
    <>
      <div className="grid gap-3 @2xl:grid-cols-3">
        <Panel title="Revenue" meta="Financial year" className="@2xl:col-span-2">
          <RevenueChart gradientId={`${idPrefix}-area`} />
        </Panel>
        <Panel title="Sales by channel" meta="This month">
          <ChannelDonut />
        </Panel>
      </div>
      <div className="grid gap-3 @2xl:grid-cols-5">
        <Panel title="Recent transactions" meta="Today" className="@2xl:col-span-3">
          <TransactionsTable />
        </Panel>
        <Panel title="Inventory overview" meta="Stock levels" className="@2xl:col-span-2">
          <CategoryBars />
        </Panel>
      </div>
    </>
  );
}

type ErpDashboardProps = {
  view?: ErpView;
  className?: string;
  /** Keeps SVG ids unique when more than one dashboard is on a page. */
  idPrefix?: string;
};

/**
 * A designed presentation of the N1 ERP interface concept.
 * It is a static visual, not a working application, and the data is illustrative.
 */
export function ErpDashboard({ view = "overview", className, idPrefix = "erp" }: ErpDashboardProps) {
  return (
    <div
      className={cn(
        "@container overflow-hidden rounded-[1rem] bg-ink text-white ring-1 ring-white/10 select-none sm:rounded-[1.25rem]",
        className,
      )}
    >
      {/* Window bar */}
      <div className="flex h-10 items-center gap-4 border-b border-white/[0.07] px-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-2.5 rounded-full bg-white/15" />
          ))}
        </div>
        <p className="flex-1 truncate text-center text-[0.6875rem] text-white/50">N1 ERP · {viewTitles[view]}</p>
        <span className="hidden rounded-full px-2 py-0.5 text-[0.625rem] text-white/55 ring-1 ring-white/15 @md:inline">
          Concept preview
        </span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-48 shrink-0 flex-col border-r border-white/[0.07] p-3 @3xl:flex">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-white text-black">
              <N1Glyph className="h-2.5 w-auto" />
            </span>
            <div>
              <p className="text-[0.75rem] font-semibold">N1 ERP</p>
              <p className="text-[0.625rem] text-white/45">Sample business</p>
            </div>
          </div>
          <ul className="mt-4 space-y-0.5">
            {navItems.map((item) => {
              const active = item.view === view;
              return (
                <li
                  key={item.label}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.75rem]",
                    active ? "bg-white/[0.08] text-white" : "text-white/50",
                  )}
                >
                  <item.icon className="size-3.5" strokeWidth={1.75} />
                  {item.label}
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.75rem] text-white/50">
            <Settings className="size-3.5" strokeWidth={1.75} />
            Settings
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 space-y-3 p-3.5 @xl:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.625rem] tracking-[0.12em] text-white/40 uppercase">Workspace</p>
              <p className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] @xl:text-[1.25rem]">
                {viewTitles[view]}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden h-8 items-center gap-2 rounded-lg bg-white/[0.04] px-3 text-[0.6875rem] text-white/40 ring-1 ring-white/[0.07] @2xl:flex @2xl:w-44">
                <Search className="size-3.5" strokeWidth={1.75} />
                Search records
              </span>
              <span className="flex h-8 items-center rounded-lg bg-white/[0.04] px-3 text-[0.6875rem] text-white/70 ring-1 ring-white/[0.07]">
                This month
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-[0.625rem] font-semibold">
                SB
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 @xl:grid-cols-4">
            {kpis[view].map((kpi) => (
              <KpiCard key={kpi.label} kpi={kpi} />
            ))}
          </div>

          <ViewBody view={view} idPrefix={idPrefix} />
        </div>
      </div>
    </div>
  );
}
