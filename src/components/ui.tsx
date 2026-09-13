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
// Contrast note, now that primary animates continuously between the two:
// white text clears WCAG AA against --accent-ink (5.9:1) but only reaches
// ~3.5:1 against the brighter --accent. That ratio needs "large text" (14pt
// bold, ~18.6px) to pass AA — true when this button ran text-xl, no longer
// true at the current fixed-height text-sm. Flagging rather than
// unilaterally narrowing the gradient's range (the two colors were
// specified explicitly) or changing the button height back (also
// specified explicitly) — this is a real, currently-live AA gap on the
// primary button's brighter phase, worth a deliberate call rather than a
// silent fix.
//
// Shadow (primary only) goes through Tailwind's shadow-md/shadow-lg
// classes, not Framer's whileHover, for the same reason as Card: a native
// CSS transition can animate between two var()-based box-shadow values,
// Framer's JS interpolator can't resolve the custom property to do the
// same. transition-[...] lists box-shadow and color explicitly — the only
// two properties either variant actually changes on hover — rather than
// transition-all/transition-colors, so it never adds a competing CSS
// transition on `transform`: Framer already drives that via
// useButtonMotion's inline style, and the two would otherwise fight.
// Primary's background is .btn-gradient (defined in globals.css): a slow
// animated linear-gradient between --accent-ink and --accent, which is why
// there's no hover:bg-* swap here any more — the gradient already cycles
// through both colors on its own, continuously, in every state including
// hover. useButtonMotion's scale/lift still runs on hover same as ever; this
// is a background running underneath it, not a replacement for it.
export function buttonClasses(variant: "primary" | "secondary" = "primary") {
  const base =
    "inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm tracking-wide uppercase font-black transition-[box-shadow,color] duration-300 ease-out disabled:pointer-events-none disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "btn-gradient text-white shadow-md hover:shadow-lg"
      : // Was an outline (border-2 border-ink) — sitewide border removal
        // meant deleting that outright would leave it invisible, since it
        // was the button's entire visual definition. Tried bg-white/70 +
        // backdrop-blur first; over the hero's own pale pink/white ambient
        // gradient it had almost no visible contrast and the pill shape
        // disappeared entirely, leaving what looked like bare text. --
        // surface-2 is a distinct enough blue tint against that background
        // to actually read as a button at rest, not just on hover.
        "bg-surface-2 text-ink hover:text-accent-ink";
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

  const link = external ? (
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

  if (variant !== "primary") return link;

  // Glow sits behind the link purely via DOM order (it's declared first,
  // no z-index) — same reasoning as AmbientBackground: a negative z-index
  // here risks landing behind an ancestor's own background in some
  // stacking contexts, where source order behind a plain z-index-less
  // sibling always works. group/group-hover picks up hovering the link
  // itself, since :hover on a child also matches every ancestor.
  return (
    <span className="group relative inline-block">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-full bg-accent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40"
      />
      {link}
    </span>
  );
}

// No border — shadow-sm at rest, stepping to shadow-lg on hover, is what
// now separates a card from the page, alongside the surface/surface-2
// background contrast between a card and its section. Box-shadow
// transitions via plain CSS (transition-shadow), not Framer's whileHover:
// motion's JS interpolator can't meaningfully tween a target expressed as
// var(--shadow-lg) — it doesn't resolve custom properties itself —
// whereas a native CSS transition animates between two var()-based values
// fine, because the browser resolves each to its computed value before
// interpolating. The lift stays on whileHover since a spring is genuinely
// worth it there.
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
      className={`rounded-2xl bg-surface p-8 shadow-sm transition-shadow duration-300 ease-out hover:shadow-lg sm:p-9 ${className}`}
      whileHover={reduceMotion ? undefined : { y: -6 }}
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
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-32 ${className}`}>
      <Reveal>{children}</Reveal>
    </section>
  );
}
