import type { Metadata, Viewport } from "next";
import { Fraunces, Libre_Franklin } from "next/font/google";
import "./globals.css";

// Both self-hosted via next/font/google: fetched and served from this
// origin at build time, so there's no third-party font request at runtime
// and nothing extra for the CSP to allow-list (font-src 'self' in
// src/proxy.ts already covers this — same as it did for the previous
// Caacupe One/Roboto pair, just no longer via next/font/local).
// Headings: Fraunces, a variable optical-size family — opsz gives it real
// display-weight character at heading sizes without a separate cut.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-heading",
  display: "swap",
});
// Body/UI/CTAs/labels: Libre Franklin — a humanist grotesk, same
// large-friendly reasoning as the brand's Source Sans 3 pick, just paired
// to Fraunces for this marketing site rather than reusing the app's own
// body face verbatim.
const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-body",
  display: "swap",
});

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AmbientBackground } from "@/components/ambient-background";
import { GrainOverlay } from "@/components/grain-overlay";
import { SmoothScroll } from "@/components/smooth-scroll";
import { TextureDefs } from "@/components/texture-defs";
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
      className={`${fraunces.variable} ${libreFranklin.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ground text-ink">
        <TextureDefs />
        <SmoothScroll />
        <AmbientBackground />
        <GrainOverlay />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
