"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

// Smooths native scroll into the soft, floaty feel the rest of the site's
// motion aims for. Renders nothing — it just drives window.scrollTo on its
// own rAF loop, which is why AmbientBackground and Parallax (both read
// scroll position via Framer's useScroll, listening for native 'scroll'
// events) need no changes to work with it: Lenis fires those same events
// on every tick, it doesn't transform a wrapper div.
//
// Skipped entirely under reduced motion rather than just handed a duration
// of 0 — a user who's asked for less motion shouldn't have their scroll
// input intercepted and replayed at all, even smoothly.
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis();
    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
