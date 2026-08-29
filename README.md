# Cohorta marketing site

Next.js (App Router) + Tailwind v4. Two tracks off one codebase: a quiet,
community-led home for members, and an economics-forward (minus the
percentage) track for group owners at `/for-communities`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build locally
npm run lint
```

## Structure

```
src/
  app/                     routes (App Router)
    page.tsx               member home ("/")
    how-it-works/
    trust/
    faq/
    for-communities/       owner track home
      apply/                lead form (Server Action, see below)
    privacy/ terms/         legal stubs — placeholder copy, not real policy
    layout.tsx              fonts, header/footer, metadata, robots meta
    robots.ts sitemap.ts    driven by NEXT_PUBLIC_LAUNCHED (see below)
    globals.css             design tokens, typography
  components/
    site-header.tsx site-footer.tsx
    ui.tsx                  Container, Button, Card, Section, Eyebrow
  content/                  all page copy lives here, separate from markup —
    site.ts                 nav/footer/seo
    member.ts               home, how-it-works, trust, faq
    owner.ts                for-communities, apply
  lib/config.ts             isLaunched / siteUrl / appUrl — the three knobs
```

Copy is centralised in `src/content/*.ts` on purpose: swap headlines, add
real member quotes, or plug in a finished logo/photography without
touching component code.

## The three environment knobs

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_LAUNCHED` — stays `false` until Cohorta is ready to be
  public. While false: every page sends `noindex, nofollow`, and
  `robots.txt` disallows everything. Flip to `true` at launch — one switch,
  read by `layout.tsx`, `robots.ts`, and `sitemap.ts`.
- `NEXT_PUBLIC_SITE_URL` — the production domain (currently assumed to
  replace `cohorta.me`).
- `NEXT_PUBLIC_APP_URL` — where "got a code? get started" sends people
  (the live product, `cohorta.app`).

## Before this goes live

- **Fonts**: self-hosted via `@fontsource` (Roboto 900 for headings, Source
  Sans 3 for body) rather than `next/font/google` — this build environment's
  network policy blocked the Google Fonts fetch at build time, and
  self-hosting is the better call for a security-conscious site anyway (no
  third-party font requests at runtime). No action needed unless you'd
  rather switch to `next/font/local` with licensed font files instead.
- **Logo & photography**: there's no real logo asset yet — the wordmark is
  text (`cohorta.`). The brand doc is explicit that existing stock/AI
  photography actively undermines the pitch (see project notes) — real,
  consented member photos are needed before any imagery goes on this site,
  not before.
- **Apply form** (`/for-communities/apply`): the form and validation work,
  but `src/app/for-communities/apply/actions.ts` only logs submissions
  server-side right now — there's a `TODO` at the top of that file marking
  exactly where to wire in real delivery (email via Resend/Postmark, a
  Slack webhook, a CRM). Don't launch the owner track before this is
  connected to something a human actually sees.
- **Legal pages**: `/privacy` and `/terms` are placeholders, not real
  policy — replace before launch.
- **Content Security Policy** (`next.config.ts`): `style-src` currently
  allows `'unsafe-inline'` as a pragmatic default for a static site with no
  other third-party scripts. If a stricter policy is required, or any
  third-party script/analytics is added later, this needs a nonce-based
  CSP instead (see Next's CSP guide) — that forces dynamic rendering, so
  it's a deliberate trade-off, not a default to flip casually.
- **The revenue share**: deliberately not mentioned anywhere on this site.
  See project notes before adding it — timing changes what the same words
  mean.

## Security posture already in place

HTTPS/HSTS, a same-origin CSP (no third-party scripts or trackers — there
are none in this codebase to allow-list), `X-Frame-Options: DENY`,
`nosniff`, a restrictive `Permissions-Policy`, and full `noindex` +
`robots.txt` disallow until `NEXT_PUBLIC_LAUNCHED=true`.
