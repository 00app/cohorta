"use client";

import { useReducedMotion } from "motion/react";

// Fixed, full-viewport noise, multiplied over the entire page — z-50 puts
// it above the sticky header (z-10) too, deliberately: this is the page's
// paper texture, not a per-section decoration, so it should read the same
// over the nav as everywhere else. Tinted brick-red (see the feColorMatrix
// below) rather than neutral black/grey, so it reads as "grain in this
// palette" instead of generic photographic noise laid on top.
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
      className={`pointer-events-none fixed inset-0 z-50 opacity-[0.35] mix-blend-multiply ${
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
          {/* Forces the turbulence's varying alpha onto a fixed brick-red
              RGB (0.63, 0.2, 0.16 ≈ --accent) instead of the neutral grey
              feTurbulence produces by default. */}
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.63
                    0 0 0 0 0.2
                    0 0 0 0 0.16
                    0 0 0 0.8 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainNoise)" />
      </svg>
    </div>
  );
}
