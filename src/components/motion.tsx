"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

// One shared motion language, used by both Reveal and SplitReveal, for the
// "soft, floaty, airy" feel asked for site-wide: a spring rather than a
// fixed-duration easing curve. Low stiffness + high-ish damping settles
// without any bounce/overshoot — it just drifts up and comes gently to
// rest, like something settling in air rather than snapping into place.
const FLOAT_SPRING = { type: "spring" as const, stiffness: 80, damping: 16, mass: 0.8 };

// Fades content up into place the moment it scrolls into view, via Framer
// Motion's whileInView (replaces a hand-rolled IntersectionObserver).
//
// Note on SSR: motion bakes the `initial` state into the server-rendered
// HTML, same as the reference site (a Framer export, 100% client-rendered).
// That means content sits at its hidden opacity until JS hydrates and
// whileInView fires — a real dependency on JS running, not just a
// progressive enhancement. Flagged separately re: this project's CSP.
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  // Milliseconds, to line up with how call sites already stagger grids
  // (index * 90/110/120ms) — converted to seconds for motion's transition.
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ ...FLOAT_SPRING, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

const MOTION_TAG = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

// Word-level version of Reveal, for headings: each word rises into place
// on its own via Framer's staggerChildren, instead of the whole heading
// fading up as one block. Word, not line — line breaks depend on
// responsive width and aren't knowable at markup time without a
// layout-measuring library, but for headings this short, word-stagger
// already reads as "line by line".
//
// Also does the *word* → accent-colored-span parsing content files use
// for emphasis (this replaces ui.tsx's old standalone Highlight component
// — folded in here rather than kept as a separate step, since a phrase
// like "*you're already in*" has to stay grouped for color before it's
// split into individual animated words).
//
// Same SSR caveat as Reveal: the hidden initial state is server-rendered,
// so this depends on JS actually hydrating, not just progressively
// enhancing it.
export function SplitReveal({
  text,
  as = "span",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: keyof typeof MOTION_TAG;
  className?: string;
  // Milliseconds before the first word starts — this instance's offset
  // within its section, same idea as Reveal's delay, layered underneath
  // the per-word stagger rather than replacing it.
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = MOTION_TAG[as];

  const words: { text: string; accent: boolean }[] = [];
  for (const chunk of text.split(/(\*[^*]+\*)/g)) {
    if (!chunk) continue;
    const accent = chunk.startsWith("*") && chunk.endsWith("*");
    const clean = accent ? chunk.slice(1, -1) : chunk;
    clean.split(" ").forEach((w) => {
      if (w !== "") words.push({ text: w, accent });
    });
  }

  if (reduceMotion) {
    return (
      <MotionTag className={className}>
        {words.map((w, i) => (
          <span key={i}>
            <span className={w.accent ? "text-accent" : undefined}>
              {w.text}
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        // 0.05, up from a tighter 0.035: slow enough that each word visibly
        // rises on its own beat rather than reading as one ripple.
        show: { transition: { staggerChildren: 0.05, delayChildren: delay / 1000 } },
      }}
    >
      {words.map((w, i) => (
        // The space between words is a plain text node, a sibling of the
        // animated span, not baked inside it — an inline-block box (needed
        // so `y`/`scale` transforms the word as a unit) can have trailing
        // whitespace collapsed by the browser, which would silently glue
        // words together.
        <span key={i}>
          <motion.span
            className={`inline-block ${w.accent ? "text-accent" : ""}`}
            variants={{
              hidden: { opacity: 0, y: 28, scale: 0.92 },
              show: { opacity: 1, y: 0, scale: 1, transition: FLOAT_SPRING },
            }}
          >
            {w.text}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </MotionTag>
  );
}

// A soft, slow drift tied to scroll position, driven by motion's useScroll
// (replaces a hand-rolled requestAnimationFrame loop) — for decorative
// background shapes only.
//
// z-10 is baked in here rather than left to each call site: every caller
// positions these absolutely, over a Container that comes later in the
// DOM. With z-index left at auto, painting order falls back to DOM order,
// so the Container's own text — later in the markup, same stacking level —
// painted on top and swallowed any bubble/icon whose box overlapped it
// (e.g. the hero's "it's a match" bubble sitting behind its lede
// paragraph). A fixed z-10 makes every floating decoration win that
// paint order regardless of where it's placed on the page, which is the
// point of "floating" in front of the content.
export function Parallax({
  children,
  speed = 0.15,
  className = "",
}: {
  children?: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = 320 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { y }}
      className={`z-10 ${className}`}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
