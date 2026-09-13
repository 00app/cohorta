import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Generates a fresh per-request nonce and puts it in the CSP header so
// Next.js's own inline hydration/bootstrap scripts satisfy `script-src`
// without 'unsafe-inline'. Next detects the nonce in this header and
// attaches it to its own scripts automatically — see the CSP guide at
// node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md.
//
// This is the fix for a bug that predates this file: without a nonce (or
// 'unsafe-inline'), the CSP in next.config.ts blocks Next's own hydration
// script outright, so no Client Component ever mounts — forms don't
// submit, scroll animations never fire, content bound to whileInView stays
// invisible. Confirmed on the original commit, not something later work
// introduced. Nonces require dynamic rendering (see `dynamic = "force-
// dynamic"` in app/layout.tsx) — this site trades static generation/CDN
// caching for working client-side JS.
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
