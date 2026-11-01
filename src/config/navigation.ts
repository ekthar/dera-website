import type { NavItem } from "@/types";

export const primaryNav: ReadonlyArray<NavItem> = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "N1 ERP", href: "/n1-erp" },
  { label: "About", href: "/about" },
];

export const contactNavItem: NavItem = { label: "Contact Us", href: "/contact" };

export const footerNav: ReadonlyArray<{ title: string; items: ReadonlyArray<NavItem> }> = [
  {
    title: "Explore",
    items: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "N1 ERP", href: "/n1-erp" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Software Development", href: "/services#software-development" },
      { label: "ERP Solutions", href: "/services#enterprise-erp" },
      { label: "Hardware Sales", href: "/services#hardware" },
      { label: "Networking", href: "/services#networking" },
      { label: "IT Services", href: "/services#it-services" },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

/** Routes listed in the sitemap, with their relative priority. */
export const siteRoutes: ReadonlyArray<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/n1-erp", priority: 0.9 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];
