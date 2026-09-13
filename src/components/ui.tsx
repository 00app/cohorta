"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./motion";

const MotionLink = motion.create(Link);

export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  // The site's copy column caps at 3xl (768px) — good for reading, too
  // narrow for a nav bar with a logo, four links, and a CTA on one row.
  // The header opts into this instead of widening Container generally.
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${wide ? "max-w-6xl" : "max-w-3xl"} px-5 sm:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-sm font-extrabold tracking-[0.18em] text-accent-ink uppercase">
      {children}
    </p>
  );
}

// Shared by <Button> (links) and the apply form's native <button
// type="submit">, so every call to action on the site — nav, hero, form —
// looks and animates identically rather than drifting apart. Hover/tap
// motion lives on the element itself (Button, SubmitButton), not in these
// classes, since a plain <button> and a motion.create(Link) take it
// differently.
//
// "Ink & Blush" pass: pill+shadow replaced with the reviewed stamp
// treatment — a two-ring rubber-stamp shape (.stamp/.stamp::before in
// globals.css) that fills solid with its own ink colour on hover/press
// instead of stepping a shadow. Primary is brick red, secondary is ink
// black (per the "primary red, secondary black" direction) — both fill
// to --surface-toned text on press, which stays comfortably clear of
// WCAG AA since --accent and --ink are both dark enough for light text
// at this weight/size. No speckle/noise texture on these: tried in the
// mockup review and cut as too much against legibility.
export function buttonClasses(variant: "primary" | "secondary" = "primary") {
  const base =
    "stamp inline-flex h-10 items-center justify-center gap-2 px-5 text-sm tracking-wide uppercase font-black disabled:pointer-events-none disabled:opacity-60";
  const styles = variant === "primary" ? "stamp--primary" : "stamp--secondary";
  return `${base} ${styles}`;
}

// Exported so the apply form's native <button type="submit"> (a plain
// element, not a <Link>) can match this exactly via motion.button.
//
// A hook rather than a plain object: hover/tap transform is still motion
// a reduced-motion visitor didn't ask for (WCAG 2.3.3, animation triggered
// by interaction), so it needs useReducedMotion() to turn it off — which
// only works called from inside a component.
export function useButtonMotion() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return {};
  return {
    whileHover: { scale: 1.04, y: -3 },
    whileTap: { scale: 0.97, y: 0 },
    transition: { type: "spring" as const, stiffness: 420, damping: 24 },
  };
}

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}) {
  const classes = `${buttonClasses(variant)} ${className}`;
  const buttonMotion = useButtonMotion();

  // No glow wrapper any more (there used to be a blurred bg-accent span
  // behind primary buttons, shown on hover): the stamp already changes on
  // hover by filling solid with its own ink colour, and a soft blur glow
  // behind a flat-inked stamp read as an extra effect competing with that
  // press, not reinforcing it.
  return external ? (
    <motion.a
      href={href}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
      {...buttonMotion}
    >
      {children}
    </motion.a>
  ) : (
    <MotionLink href={href} className={classes} {...buttonMotion}>
      {children}
    </MotionLink>
  );
}

// "Postcard" treatment ("Ink & Blush" pass): the old shadow-lift (shadow-sm
// stepping to shadow-lg on hover) is gone, replaced by a dashed inset
// border — closer to a printed card than an app surface, and one less
// thing separating a card from the page's own flatter, less "elevated"
// language now. The border tints toward --accent on hover instead of the
// shadow deepening, done as a plain CSS colour transition (before:...)
// rather than through Framer, for the same reason the old shadow was:
// hover/press motion still goes through whileHover (a spring genuinely
// earns its keep there), but colour/shadow steps are native CSS so they
// can transition between two var()-based values, which Framer's JS
// interpolator can't resolve.
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`relative rounded-xl bg-surface p-8 before:pointer-events-none before:absolute before:inset-2 before:rounded-[10px] before:border before:border-dashed before:border-ink/20 before:transition-colors before:duration-300 before:content-[''] hover:before:border-accent/35 sm:p-9 ${className}`}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

// Every Section fades its content up into place on scroll (see
// components/motion.tsx). It's the one place this is wired in, so every
// page gets the same soft, fluid entrance without repeating it per-page.
export function Section({
  children,
  className = "",
  tint = false,
}: {
  children: ReactNode;
  className?: string;
  // Renders the bg-surface-2 tint as its own masked backdrop layer instead
  // of a plain background-color on the section itself. A flat color on the
  // section would cut off dead straight at its top/bottom edge — exactly
  // the hard-line look every other divider on this site was stripped of,
  // just made of a color change instead of a border (see .fade-edge-y in
  // globals.css). Kept off the section element itself so the fade-out
  // can't ever dim actual content near the edge, only the tint behind it.
  tint?: boolean;
}) {
  return (
    <section className={`relative py-20 sm:py-32 ${className}`}>
      {tint && (
        // -z-10, not just "no z-index": a position:absolute element with
        // z-index:auto still paints *above* any plain static sibling
        // regardless of DOM order (CSS stacking order puts positioned
        // z-auto content ahead of in-flow static content, full stop) — it
        // only looked fine here because Reveal's motion.div happens to
        // carry an active `transform`, which is treated as position:relative
        // for stacking purposes... except under prefers-reduced-motion,
        // where Reveal's `initial={false}` means no transform is ever set,
        // dropping this content back to plain static and right behind the
        // tint. -z-10 (paired with the section's own `relative`, so it
        // can't escape into some ancestor's stacking context) makes this
        // correct regardless of whether Reveal's content is transformed.
        <div aria-hidden="true" className="fade-edge-y absolute inset-0 -z-10 bg-surface-2" />
      )}
      <Reveal>{children}</Reveal>
    </section>
  );
}
