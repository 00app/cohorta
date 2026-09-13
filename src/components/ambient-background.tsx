"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

// Cursor-following glow, replacing the old scroll-tied static blobs —
// ported from the cursor-glow effect on 00-00.online (a fixed, blurred,
// pointer-events-none radial gradient that trails the mouse). Two
// differences from that reference, both because it's a dark-background
// site and this one isn't:
//   1. It uses mix-blend-mode: screen, which only ever lightens — reads
//      fine against a dark page, would vanish entirely against our white
//      ground. Dropped in favour of a plain low-opacity gradient, same
//      technique the old scroll-tied blobs already used here.
//   2. Its glow snaps to the cursor via a CSS transition. This uses a
//      spring (same FLOAT_SPRING family as components/motion.tsx) instead,
//      for the same soft/floaty settle rather than a linear catch-up.
//
// Two blobs, not one: each on its own spring (different stiffness/mass),
// so they drift apart slightly as the cursor moves rather than tracking
// in lockstep — "layered", just cursor-driven now instead of scroll-driven.
export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const bigX = useSpring(x, { stiffness: 55, damping: 20, mass: 0.8 });
  const bigY = useSpring(y, { stiffness: 55, damping: 20, mass: 0.8 });
  const smallX = useSpring(x, { stiffness: 90, damping: 18, mass: 0.5 });
  const smallY = useSpring(y, { stiffness: 90, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (reduceMotion) return;
    // Centers each blob on the pointer directly in the values that feed
    // the spring, rather than fighting a static translate(-50%) alongside
    // motion's own x/y transform.
    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [reduceMotion, x, y]);

  // Purely decorative pointer-following motion a reduced-motion visitor
  // didn't ask for — hidden outright rather than shown static, since a
  // motionless copy adds nothing without the cursor-follow that's the
  // entire point of it.
  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <motion.div
        style={{
          x: bigX,
          y: bigY,
          marginLeft: "-16rem",
          marginTop: "-16rem",
          backgroundImage:
            "radial-gradient(circle, var(--accent-soft) 0%, var(--accent-soft) 45%, transparent 75%)",
        }}
        className="absolute h-[32rem] w-[32rem] rounded-full opacity-70 blur-3xl"
      />
      <motion.div
        style={{
          x: smallX,
          y: smallY,
          marginLeft: "-9rem",
          marginTop: "-9rem",
          backgroundImage:
            "radial-gradient(circle, var(--accent) 0%, var(--accent) 45%, transparent 75%)",
        }}
        className="absolute h-[18rem] w-[18rem] rounded-full opacity-30 blur-3xl"
      />
    </div>
  );
}
