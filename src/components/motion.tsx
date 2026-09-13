"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import {
  motion,
  useAnimationControls,
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

// Bug fix (site-wide, was hiding content indefinitely — see git history
// for the full repro): Framer's whileInView relies on an
// IntersectionObserver it manages internally, and that observer's first
// callback wasn't firing for elements already in the viewport at mount
// once Lenis (components/smooth-scroll.tsx) was added — reproduced with
// Lenis on, gone with it disabled, so this is a real interaction between
// Lenis's own rAF-driven scroll loop and whichever internal frame Framer
// schedules the observer setup on, not a coincidence.
//
// Three attempts before this one, kept failing, worth recording why:
//   1. `animate` + `whileInView` on the same element, toggling `animate`
//      from undefined to a target once a synchronous
//      getBoundingClientRect check found the element already on screen.
//      Never animated in — whileInView's own state machine appears to
//      treat the element as already at/heading to its target and never
//      actually applies it, so the two props fighting over the same job
//      silently produced neither.
//   2. Dropping whileInView for `onViewportEnter` (a pure callback) plus
//      a one-rAF-deferred getBoundingClientRect check, both calling the
//      same controls.start(). Better, but still intermittent — passed on
//      some fresh loads and silently failed on others, in both `next dev`
//      and a real production build, ruling out React StrictMode's dev-
//      only double-effect-invocation as the explanation.
//   3. A hand-rolled IntersectionObserver instead of Framer's — the more
//      "correct" fix on paper (an observer's first callback is spec-
//      guaranteed to report current state right after observe()). Still
//      intermittent. Traced with logging far enough to find something
//      genuinely strange: adding console/array-push instrumentation
//      *inside* the effect made the failure stop reproducing — 8/8 clean
//      runs with logging present, roughly 50% failure without it. That
//      points to a real, narrow timing race somewhere below this file
//      (React's commit/effect scheduling, or Framer's own ref wiring for
//      this element) that a few microseconds of extra synchronous work
//      happens to avoid — not something fixable by finding "the" correct
//      spot to attach a single observer.
//
// Given that, this doesn't rely on any one mechanism firing at exactly
// the right moment. The IntersectionObserver is still the primary path
// (correct per spec, and the interaction that's actually broken here is
// with Framer's wrapper, not the browser's own API). A second, independent
// getBoundingClientRect check runs one animation frame later purely as a
// backstop: if the observer's callback hasn't already run by then, and
// the element is visibly on screen, it fires the same reveal itself. Two
// mechanisms that both have to fail for content to stay stuck hidden,
// instead of one.
function useReveal(
  ref: RefObject<Element | null>,
  reduceMotion: boolean | null,
  run: () => void,
) {
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    run();
  };

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { rootMargin: "-10% 0px" },
    );
    observer.observe(el);

    const raf = requestAnimationFrame(() => {
      if (started.current) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        start();
      }
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // Mount-only — run/ref/reduceMotion are all stable for a given
    // instance in practice, and re-subscribing on every render would
    // defeat the once-only `started` guard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);
}

// Fades content up into place the moment it scrolls into view, via
// useReveal (see that function's comment for why this is a hand-rolled
// IntersectionObserver and not Framer's own whileInView).
//
// Note on SSR: motion bakes the `initial` state into the server-rendered
// HTML, same as the reference site (a Framer export, 100% client-rendered).
// That means content sits at its hidden opacity until JS hydrates and the
// observer fires — a real dependency on JS running, not just a
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
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  useReveal(ref, reduceMotion, () =>
    controls.start({ opacity: 1, y: 0, transition: { ...FLOAT_SPRING, delay: delay / 1000 } }),
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      animate={controls}
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
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimationControls();
  useReveal(ref, reduceMotion, () => controls.start("show"));

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
    // The ref's element type is intentionally the general HTMLElement —
    // MotionTag varies by the `as` prop (h1/h2/h3/p/span), and TS can't
    // narrow a single ref to whichever specific one was picked at
    // runtime. getBoundingClientRect (all useAlreadyInView needs) exists
    // on every one of them, so the cast is safe.
    <MotionTag
      ref={ref as RefObject<HTMLHeadingElement>}
      className={className}
      initial="hidden"
      animate={controls}
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
          {/* break-words: a backstop for long words at these display sizes
              (e.g. "matchmaker" at text-7xl on a 390px viewport measured
              ~434px wide, wider than the whole column) — without it,
              inline-block refuses to break mid-word and the word silently
              overflows past the section's overflow-hidden edge instead of
              wrapping. */}
          <motion.span
            className={`inline-block max-w-full break-words ${w.accent ? "text-accent" : ""}`}
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
//
// Fade-in on top of the drift, added after a chat bubble on the homepage
// hero was visibly popping in at full opacity the instant it mounted —
// there was no entrance animation here at all, only the continuous
// scroll-linked position. Uses the same useReveal hook as Reveal/
// SplitReveal, so a decoration already on screen at load animates in
// immediately instead of needing a scroll to be noticed at all.
//
// Opacity is paired with scale (0.85 -> 1), not y: the scroll-linked `y`
// MotionValue in `style` already owns that property continuously, and
// having both `animate` and `style` drive the same transform value is
// exactly the kind of two-things-fighting-over-one-job bug this file
// already ran into once with whileInView+animate on Reveal. Originally
// this was opacity-only, on the theory that icons/illustrations (unlike
// chat bubbles) read fine without it — frame-by-frame instrumentation
// proved that wrong: the FLOAT_SPRING transition on opacity alone is
// genuinely smooth, it just reads as a flat on/off flip with nothing
// else moving, for every kind of decoration this wraps, not only
// bubbles. Scale gives the eye something to track settling into place,
// same reason Reveal's y-translate does that job for headings/text.
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
  const controls = useAnimationControls();
  useReveal(ref, reduceMotion, () =>
    controls.start({ opacity: 1, scale: 1, transition: FLOAT_SPRING }),
  );

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { y }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
      animate={controls}
      className={`z-10 ${className}`}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
