import type { ErpModule } from "@/types";

/**
 * N1 ERP is in development. Every capability below is a planned theme, not a
 * shipped feature. Keep the status honest when this list changes.
 */
export const erpFeatureThemes: ReadonlyArray<ErpModule> = [
  {
    name: "Business Management",
    description: "A single view of the organisation, its branches, people and records.",
    status: "planned",
  },
  {
    name: "Accounting & Finance",
    description: "Ledgers, vouchers and financial reporting connected to daily operations.",
    status: "planned",
  },
  {
    name: "Inventory Management",
    description: "Stock levels, movements and item records kept in one place.",
    status: "planned",
  },
  {
    name: "Sales & Purchasing",
    description: "Quotations, orders, invoices and purchases that update everything else.",
    status: "planned",
  },
  {
    name: "Operational Workflows",
    description: "Approvals, handoffs and routine processes modelled as clear workflows.",
    status: "planned",
  },
  {
    name: "Business Intelligence",
    description: "Dashboards and reports drawn from the same connected data.",
    status: "planned",
  },
];

export const erpDevelopmentStages: ReadonlyArray<{ label: string; state: "done" | "current" | "next" }> = [
  { label: "Planning", state: "done" },
  { label: "Development", state: "current" },
  { label: "Testing", state: "next" },
  { label: "Release", state: "next" },
];

export const erpPrinciples: ReadonlyArray<{ title: string; text: string }> = [
  {
    title: "One record, many views",
    text: "Information is entered once and shared across sales, stock and accounts, so every team works from the same numbers.",
  },
  {
    title: "Built around real operations",
    text: "Screens and workflows are designed from how businesses actually run their day, not from a feature checklist.",
  },
  {
    title: "Clarity over complexity",
    text: "A calm, consistent interface that keeps the important information visible and the rest one step away.",
  },
];
