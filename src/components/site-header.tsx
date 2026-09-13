"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container, Button } from "./ui";
import { Logo } from "./logo";
import { IconMenu, IconClose } from "./icons";
import { nav } from "@/content/site";

// Same colour as the hero/footer strapline (Eyebrow's text-accent-ink) on
// every nav link, primary and "For your community" alike — one consistent
// nav voice rather than a muted/faint split. Hover moves to --ink instead
// of a shade of the same pink, so the interactive state actually reads as
// a change rather than a slightly-different pink.
const NAV_LINK_CLASSES =
  "font-heading font-bold text-accent-ink uppercase tracking-wide transition-colors hover:text-ink";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    // Permanent shadow-sm rather than a scroll-conditional one: it'd need
    // its own scroll listener just to toggle one class, where a resting
    // shadow-sm is already subtle enough not to read as "wrong" before any
    // scrolling happens.
    <header className="sticky top-0 z-10 bg-surface/90 shadow-sm backdrop-blur">
      <Container wide className="flex items-center justify-between gap-6 py-5">
        <Link href="/" className="shrink-0 text-xl" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* gap/size step up at lg: at md (768-1023px) three primary links,
            the owner link and the CTA button, at gap-x-7/text-base, ran
            wider than a tablet-width Container — the links crowded the CTA
            and could wrap. Tighter gap and smaller text through that band,
            opening back up once lg has the room. */}
        <nav className="hidden flex-1 items-center justify-end gap-x-4 text-sm md:flex lg:gap-x-7 lg:text-base">
          {nav.primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className={NAV_LINK_CLASSES}>
              {link.label}
            </Link>
          ))}
          <Link href={nav.ownerLink.href} className={NAV_LINK_CLASSES}>
            {nav.ownerLink.label}
          </Link>
        </nav>

        {/* Wrapped rather than passing "hidden" straight to Button: for the
            primary variant, Button's own className only reaches the inner
            link — the glow span it wraps that in stays visible (if empty)
            unless the wrapper itself is hidden too. */}
        <div className="hidden shrink-0 md:block">
          <Button href={nav.memberCta.href} external={nav.memberCta.external}>
            {nav.memberCta.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-ink md:hidden"
        >
          {open ? <IconClose className="h-7 w-7" /> : <IconMenu className="h-7 w-7" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden"
          >
            <Container wide className="flex flex-col items-start gap-6 pb-8">
              {nav.primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${NAV_LINK_CLASSES} text-lg`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={nav.ownerLink.href}
                className={`${NAV_LINK_CLASSES} text-lg`}
                onClick={() => setOpen(false)}
              >
                {nav.ownerLink.label}
              </Link>
              <Button
                href={nav.memberCta.href}
                external={nav.memberCta.external}
                className="w-full"
              >
                {nav.memberCta.label}
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
