import type { MetadataRoute } from "next";
import { siteRoutes } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/** Update when page content changes materially. */
const CONTENT_UPDATED = "2026-11-01";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified: CONTENT_UPDATED,
    changeFrequency: route.priority >= 0.8 ? "monthly" : "yearly",
    priority: route.priority,
  }));
}
