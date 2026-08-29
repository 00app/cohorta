import type { Metadata } from "next";
import "./globals.css";

// Self-hosted via @fontsource rather than next/font/google: this sandbox's
// egress policy blocks build-time fetches to fonts.googleapis.com, and
// self-hosting is the more secure choice for production anyway (no
// third-party font requests at runtime, nothing for a CSP to allow-list).
// Headings: Roboto Black 900, lowercased in CSS (Lomi Lomi standard).
import "@fontsource/roboto/900.css";
// Body/UI: Source Sans 3 — brand-locked, chosen in the Cohorta brand doc for
// an older, less digitally-confident audience. Don't swap this without
// checking with whoever owns the Cohorta brand sign-off.
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/source-sans-3/700.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { isLaunched, siteUrl, siteName } from "@/lib/config";
import { seo } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.description,
  applicationName: siteName,
  // Pre-launch stealth: nothing here should be indexed until isLaunched
  // flips to true (see src/lib/config.ts). robots.ts mirrors this for
  // robots.txt and sitemap.ts is suppressed the same way.
  robots: isLaunched
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-ground text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
