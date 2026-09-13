import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Both self-hosted via next/font: fetched and served from this origin at
// build time, so there's no third-party font request at runtime and nothing
// extra for the CSP to allow-list.
// Headings: Caacupe One. Not in next/font/google's bundled catalog, so it's
// pulled in as a local file (fetched once from Google Fonts' CDN, itself
// OFL-licensed) rather than a googleapis.com <link>.
const caacupeOne = localFont({
  src: "./fonts/CaacupeOne-Regular.woff2",
  variable: "--font-heading",
  display: "swap",
});
// Body/UI/CTAs/labels: Roboto.
const roboto = Roboto({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-body",
  display: "swap",
});

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AmbientBackground } from "@/components/ambient-background";
import { SmoothScroll } from "@/components/smooth-scroll";
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

// Light mode only, by design brief: pin color-scheme so browser chrome
// (scrollbars, native form controls) doesn't apply its own dark styling
// under a dark OS theme.
export const viewport: Viewport = {
  colorScheme: "light",
};

// Required by the nonce-based CSP in src/proxy.ts: nonces are only
// meaningful per-request, so every route here renders dynamically rather
// than being cached as static HTML at build time. Trades static
// generation/CDN caching for client-side JS actually working — see the
// comment in proxy.ts for why that trade is necessary here.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${caacupeOne.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ground text-ink">
        <SmoothScroll />
        <AmbientBackground />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
