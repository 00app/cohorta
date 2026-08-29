import type { MetadataRoute } from "next";
import { isLaunched, siteUrl } from "@/lib/config";

const routes = [
  "",
  "/how-it-works",
  "/trust",
  "/faq",
  "/for-communities",
  "/for-communities/apply",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Don't hand search engines a map of the site before launch — robots.ts
  // already disallows everything, this is belt-and-braces.
  if (!isLaunched) return [];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
