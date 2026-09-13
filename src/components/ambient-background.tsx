"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Promoted out of the hero: these two blurred glows used to live only in
// app/page.tsx's hero, placed via <Parallax> (which ties motion to that
// element's own position crossing the viewport — right for a decorative
// icon that enters once, wrong for something meant to feel like it's
// always there). This tracks whole-page scrollY instead, so it drifts
// continuously for as long as the user keeps scrolling, on every page.
//
// Fixed + full-viewport on purpose: the container never scrolls away, but
// each blob sits at a different point in that viewport and drifts at a
// different rate/direction as scrollY changes, so the mix keeps shifting
// rather than three shapes locked in place behind the content.
export function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Every blob transforms across the same broad scroll range but by
  // different amounts/directions — separation, not lockstep.
  const yA = useTransform(scrollY, [0, 4000], [0, -260]);
  const yB = useTransform(scrollY, [0, 4000], [0, 320]);
  const yC = useTransform(scrollY, [0, 4000], [0, -160]);

  const style = (y: typeof yA) => (reduceMotion ? undefined : { y });

  return (
    // No negative z-index: a fixed element with z-index < 0 can end up
    // painted behind body's own opaque background in some stacking
    // contexts (body isn't a stacking context by default, so its
    // background box and a negative-z-index child don't order the way
    // you'd expect). Mounted first in layout.tsx instead, so header/main/
    // footer — later in DOM order, normal stacking level — paint over it.
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <motion.div
        style={style(yA)}
        className="absolute -top-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-accent-soft blur-3xl"
      />
      <motion.div
        style={style(yB)}
        className="absolute top-[42vh] -left-40 h-[26rem] w-[26rem] rounded-full bg-surface-2 blur-3xl"
      />
      <motion.div
        style={style(yC)}
        className="absolute top-[82vh] right-[-6%] h-[22rem] w-[22rem] rounded-full bg-accent-soft/70 blur-3xl"
      />
    </div>
  );
}
