// Site-wide copy: nav, footer, shared metadata.
//
// Voice: warm, honest, plain, a little cheeky. Never state the group-owner
// revenue share (not live yet — see project notes). Never ask a member to
// declare a dating motive anywhere public. Never name a group owner's
// category (e.g. "dating group") — lead with what they experience instead.

import { appUrl } from "@/lib/config";

export const nav = {
  primaryLinks: [
    { href: "/how-it-works", label: "How it works" },
    { href: "/trust", label: "Trust & privacy" },
    { href: "/faq", label: "FAQ" },
  ],
  // External: a visitor with a code should land straight in the product,
  // not another marketing page. Points at NEXT_PUBLIC_APP_URL.
  memberCta: { href: appUrl, label: "Got a code?", external: true },
  ownerLink: { href: "/for-communities", label: "For your community" },
};

export const footer = {
  tagline: "No strangers. And nobody watching.",
  columns: [
    {
      heading: "Cohorta",
      links: [
        { href: "/how-it-works", label: "How it works" },
        { href: "/trust", label: "Trust & privacy" },
        { href: "/faq", label: "FAQ" },
      ],
    },
    {
      heading: "For communities",
      links: [
        { href: "/for-communities", label: "Bring Cohorta to your group" },
        { href: "/for-communities/apply", label: "Talk to us" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ],
    },
  ],
  copyrightName: "Cohorta",
};

export const seo = {
  defaultTitle: "Cohorta — no strangers, and nobody watching",
  titleTemplate: "%s — Cohorta",
  description:
    "Cohorta turns the community you're already part of into somewhere you can actually meet people — for dating, friendship, and the next thing that's on. No strangers. Nobody watching.",
  // Broad, honest terms a searcher might actually type — not stuffed, and
  // nothing implying a live launch this site's own robots/sitemap gating
  // (see src/lib/config.ts) doesn't back up yet.
  keywords: [
    "Cohorta",
    "community dating app",
    "meet people in your group",
    "private dating app",
    "friendship app",
    "group dating",
  ],
  // Used by opengraph-image.tsx / twitter-image.tsx as the alt text for
  // the generated share-card image.
  ogImageAlt: "Cohorta — no strangers, and nobody watching",
  locale: "en_GB",
};
