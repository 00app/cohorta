"use client";

import { useReducedMotion } from "motion/react";

// Fixed, full-viewport noise over the entire page — z-50 puts it above
// the sticky header (z-10) too, deliberately: this is the page's paper
// texture, not a per-section decoration, so it should read the same over
// the nav as everywhere else.
//
// Tinted warm-white (see the feColorMatrix below) and screen-blended,
// not multiplied: the brick-red multiply version this replaced read as a
// colour wash over the page rather than paper grain. Screen only ever
// lightens, so this instead reads as a fine white fibre texture sitting
// on top of the page's own pink/cream ground — closer to a scan of
// actual uncoated paper, and it nudges the whole page a touch whiter in
// the process, which was the point.
//
// One layer, animated opacity only: the "Ink & Blush" mockup review tried
// a second coarse fibre layer plus grain baked directly into the hero
// artwork, and both got cut as too much — fighting the accent colour and
// hurting legibility. This stays deliberately quiet.
export function GrainOverlay() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 opacity-[0.22] mix-blend-screen ${
        reduceMotion ? "" : "grain-flicker"
      }`}
    >
      <svg className="h-full w-full">
        <filter id="grainNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
            result="noise"
          />
          {/* Forces the turbulence's varying alpha onto a fixed warm-white
              RGB (0.98, 0.96, 0.93 ≈ --surface) instead of the neutral
              grey feTurbulence produces by default, or the brick-red this
              used before. */}
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.98
                    0 0 0 0 0.96
                    0 0 0 0 0.93
                    0 0 0 0.5 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainNoise)" />
      </svg>
    </div>
  );
}
