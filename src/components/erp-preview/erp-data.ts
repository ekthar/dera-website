/**
 * Illustrative figures for the N1 ERP interface concept.
 * None of these numbers describe a real business or real usage.
 */

export type ErpView = "overview" | "inventory" | "sales";

export type Kpi = { label: string; value: string; delta: string; trend: "up" | "down" | "flat" };

export const kpis: Record<ErpView, ReadonlyArray<Kpi>> = {
  overview: [
    { label: "Revenue", value: "₹4,82,300", delta: "+8.2%", trend: "up" },
    { label: "Orders", value: "1,284", delta: "+3.1%", trend: "up" },
    { label: "Stock value", value: "₹12.6L", delta: "−1.4%", trend: "down" },
    { label: "Receivables", value: "₹1,92,400", delta: "12 open", trend: "flat" },
  ],
  inventory: [
    { label: "Active items", value: "1,240", delta: "+26", trend: "up" },
    { label: "Low stock", value: "18", delta: "−4", trend: "down" },
    { label: "Stock value", value: "₹12.6L", delta: "−1.4%", trend: "down" },
    { label: "Movements today", value: "64", delta: "+9", trend: "up" },
  ],
  sales: [
    { label: "Net sales", value: "₹4,82,300", delta: "+8.2%", trend: "up" },
    { label: "Invoices", value: "386", delta: "+22", trend: "up" },
    { label: "Average bill", value: "₹1,249", delta: "+2.6%", trend: "up" },
    { label: "Returns", value: "4", delta: "−2", trend: "down" },
  ],
};

export const revenueSeries = [32, 38, 35, 44, 41, 49, 46, 55, 52, 61, 58, 68] as const;
export const revenueMonths = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"] as const;

export const channelSplit = [
  { label: "Retail counter", value: 46 },
  { label: "Wholesale", value: 34 },
  { label: "Services", value: 20 },
] as const;

export const stockByCategory = [
  { label: "Computers", value: 72 },
  { label: "Networking", value: 58 },
  { label: "Peripherals", value: 84 },
  { label: "Accessories", value: 36 },
] as const;

export const transactions = [
  { id: "INV-2041", party: "Walk-in customer", type: "Sale", amount: "₹18,450", status: "Paid" },
  { id: "PO-0388", party: "Supplier order", type: "Purchase", amount: "₹72,000", status: "Pending" },
  { id: "INV-2040", party: "Retail account", type: "Sale", amount: "₹6,320", status: "Paid" },
  { id: "SRV-0117", party: "Network install", type: "Service", amount: "₹24,000", status: "Invoiced" },
  { id: "INV-2039", party: "Walk-in customer", type: "Sale", amount: "₹2,180", status: "Paid" },
] as const;

export const stockItems = [
  { sku: "LAP-14I5", name: "Laptop 14-inch", onHand: 24, reorder: 10, state: "Healthy" },
  { sku: "CAB-C6-305", name: "Cat6 cable, 305 m", onHand: 6, reorder: 8, state: "Low" },
  { sku: "RTR-AX18", name: "Wireless router", onHand: 31, reorder: 12, state: "Healthy" },
  { sku: "PRN-TH80", name: "Thermal printer", onHand: 4, reorder: 5, state: "Low" },
  { sku: "KBD-USB", name: "USB keyboard", onHand: 58, reorder: 20, state: "Healthy" },
] as const;

export const stockMovement = [
  { day: "Mon", inbound: 42, outbound: 30 },
  { day: "Tue", inbound: 18, outbound: 36 },
  { day: "Wed", inbound: 26, outbound: 28 },
  { day: "Thu", inbound: 50, outbound: 34 },
  { day: "Fri", inbound: 22, outbound: 44 },
  { day: "Sat", inbound: 30, outbound: 52 },
] as const;

export const dailySales = [14, 22, 18, 26, 31, 24, 29, 35, 27, 33, 38, 30, 41, 36] as const;

export const topItems = [
  { name: "Laptop 14-inch", share: 28 },
  { name: "Wireless router", share: 19 },
  { name: "Network installation", share: 16 },
  { name: "Thermal printer", share: 11 },
] as const;
