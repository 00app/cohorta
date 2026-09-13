// "Ink & Blush" background texture — the loose scribble loop and
// scattered splatter dots visible around the heart in the reference art,
// pulled out as their own decorative layer so any section can use it
// (currently just the hero) without redrawing it inline. Not a
// replacement for GrainOverlay's sitewide paper grain — that's a uniform
// full-page texture; this is a handful of specific, hand-placed marks,
// the same kind of thing a real print would have from a loaded brush
// shaking loose next to the block.
//
// Static: no motion here at all, so there's nothing to gate behind
// prefers-reduced-motion — the reduced-motion audit for this component is
// "it doesn't move, full stop."
export function InkWash({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Loose scribble loop, echoing the reference's sketch-pass-left-
          showing line around the heart. Open, not closed — a real loose
          scribble doesn't neatly meet its own start point. */}
      <path
        d="M120 80 C 60 140, 50 230, 110 280 C 190 340, 300 320, 340 250"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.3}
      />
      <path
        d="M640 380 C 700 420, 720 480, 670 520 C 610 560, 520 545, 490 490"
        fill="none"
        stroke="var(--ink)"
        strokeWidth={1.6}
        strokeLinecap="round"
        opacity={0.18}
      />

      {/* Ink splatter — the shared splatter.png, placed at a few small
          scales/positions rather than tiled, since a real splatter never
          repeats identically. */}
      <image href="/textures/splatter.png" x={40} y={260} width={70} height={70} opacity={0.5} />
      <image href="/textures/splatter.png" x={680} y={90} width={50} height={50} opacity={0.4} />
      <image href="/textures/splatter.png" x={560} y={440} width={90} height={90} opacity={0.35} />
      <image href="/textures/splatter.png" x={220} y={40} width={40} height={40} opacity={0.4} />
    </svg>
  );
}
