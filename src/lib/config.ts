// Single source of truth for pre-launch / launch behaviour.
//
// Until Cohorta says go, this site should not be indexed and should not be
// discoverable by search engines, competitors, or the press. Flip
// NEXT_PUBLIC_LAUNCHED to "true" (in your host's env vars) when it's time to
// go live — that one flag controls robots.txt, sitemap.xml, and per-page
// <meta name="robots">.
export const isLaunched = process.env.NEXT_PUBLIC_LAUNCHED === "true";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cohorta.me";

export const siteName = "Cohorta";

// Where "get started" / "open the app" CTAs point. Cohorta is a PWA, not an
// app-store app — this should be the live cohorta.app URL once confirmed.
export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://cohorta.app";
