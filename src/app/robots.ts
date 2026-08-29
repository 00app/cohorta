import type { MetadataRoute } from "next";
import { isLaunched, siteUrl } from "@/lib/config";

// Mirrors the noindex meta tag in layout.tsx. Both are driven by the same
// NEXT_PUBLIC_LAUNCHED flag so there's one switch to flip, not two to
// remember.
export default function robots(): MetadataRoute.Robots {
  if (!isLaunched) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
