// Small abstract shapes for decorative use only (aria-hidden).
// "Ink & Blush" pass: redrawn in the same hand-carved linocut language as
// the hero LinocutIllustration — deliberately not the raster crosshatch
// pattern that illustration uses (that's built for an 824x1464 canvas and
// would turn to mud at a 24px viewBox), but the same idea taken down a
// size: slightly imperfect, hand-carved outlines instead of mechanically
// perfect circles/curves, plus one small secondary "ink" layer per icon
// (a fleck, a pool of overlap, a registration-offset echo) that's a
// genuinely separate SVG node — not just a different color within one
// fused path — so it can carry its own entrance animation independently
// of the shape it sits on. See the .ink-fleck / @keyframes ink-in rule in
// globals.css. Same currentColor contract as before, so every existing
// call site (text-accent, text-ink/15, etc.) keeps working unchanged.
//
// IconMenu/IconClose are left as plain geometry, on purpose — they're
// functional nav controls, not brand texture, and hand-carved wobble on a
// hit target people tap on mobile is the wrong place for it.

export function IconSparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.4Q12.2 9.64 12.87 11.13Q14.06 11.8 20.3 12Q14.07 12.2 12.9 12.9Q12.2 14.25 12 21.1Q11.77 14.28 10.98 13.02Q9.84 12.23 3.4 12Q9.85 11.78 11.03 11.03Q11.78 9.62 12 2.4Z"
        fill="currentColor"
      />
      <path
        className="ink-fleck"
        d="M18.6 5.4C19.3 5.1 19.9 5.5 19.7 6.2 19.5 6.8 18.7 6.9 18.4 6.4 18.2 6 18.2 5.6 18.6 5.4Z"
        fill="currentColor"
        opacity={0.65}
      />
    </svg>
  );
}

export function IconRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M20.25 12.3C20.28 13.11 19.39 16.66 18.92 17.33 18.45 17.99 15.38 20.1 14.6 20.3 13.82 20.5 10.34 20.01 9.59 19.73 8.84 19.45 6.12 17.56 5.61 16.94 5.1 16.32 3.45 13.06 3.48 12.3 3.5 11.54 5.38 8.52 5.88 7.85 6.37 7.18 8.66 4.55 9.38 4.25 10.11 3.95 13.85 4 14.61 4.27 15.37 4.55 18.07 6.88 18.54 7.55 19.01 8.22 20.22 11.49 20.25 12.3Z"
        stroke="currentColor"
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ink-pool where the carved stroke overlaps itself closing the
          loop — a linocut ring never closes perfectly clean. */}
      <path
        className="ink-fleck"
        d="M20.25 12.3C20.28 13.11 19.7 15.4 19.3 16.4"
        stroke="currentColor"
        strokeWidth={3.6}
        strokeLinecap="round"
        opacity={0.5}
      />
    </svg>
  );
}

export function IconBubble({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5.6 4.3C4.5 4.5 3.8 5.4 3.9 6.6L4.1 13.1C4.15 14.3 5 15.1 6.2 15.05L6.7 15 6.5 18.6 10.3 15 17.3 14.85C18.5 14.8 19.4 13.85 19.35 12.65L19.15 6.05C19.1 4.85 18.15 3.95 16.95 4.05Z"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        className="ink-fleck"
        d="M15.3 6.5c.5-.2 1 .1.9.7-.1.5-.7.6-1 .2-.2-.3-.2-.7.1-.9Z"
        fill="currentColor"
        opacity={0.55}
      />
    </svg>
  );
}

export function IconHeart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* Faint registration-offset echo, same trick as the hero
          illustration's heart-outline duplicate — a hair off true rather
          than perfectly re-inked. */}
      <path
        className="ink-fleck"
        d="M12.25 20.5C8.8 18.1 4.8 14.8 4.5 10.8 4.3 7.9 6.3 5.7 8.9 5.7 10.4 5.7 11.5 6.5 12.1 7.7 12.6 6.4 13.8 5.5 15.3 5.6 17.8 5.8 19.7 8.1 19.4 11 19 14.9 15.2 18.1 12.25 20.5Z"
        stroke="currentColor"
        strokeWidth={1.3}
        opacity={0.35}
      />
      <path
        d="M12.05 20.3C8.6 17.9 4.6 14.6 4.3 10.6 4.1 7.7 6.1 5.5 8.7 5.5 10.2 5.5 11.3 6.3 11.9 7.5 12.4 6.2 13.6 5.3 15.1 5.4 17.6 5.6 19.5 7.9 19.2 10.8 18.8 14.7 15 17.9 12.05 20.3Z"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Mobile nav toggle, open state. Plain geometry — see file note above.
export function IconMenu({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 6.5h18M3 12h18M3 17.5h18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Mobile nav toggle, closed/dismiss state. Plain geometry — see file note above.
export function IconClose({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconDots({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        className="ink-fleck"
        style={{ animationDelay: "0s" }}
        d="M8.08 16.3C8.11 16.71 7.84 17.93 7.53 18.22 7.22 18.51 5.82 18.92 5.43 18.8 5.04 18.67 4.37 17.56 4.21 17.16 4.06 16.76 3.97 15.82 4.11 15.39 4.24 14.96 4.99 13.56 5.36 13.48 5.72 13.4 6.94 14.39 7.26 14.72 7.58 15.05 8.05 15.89 8.08 16.3Z"
        fill="currentColor"
      />
      <path
        className="ink-fleck"
        style={{ animationDelay: "0.12s" }}
        d="M19.71 16.1C19.66 16.49 19.13 17.35 18.85 17.55 18.57 17.75 17.69 17.86 17.31 17.8 16.94 17.75 15.82 17.39 15.65 17.09 15.47 16.78 15.64 15.6 15.81 15.19 15.98 14.78 16.72 13.69 17.12 13.57 17.52 13.45 18.94 13.87 19.24 14.17 19.54 14.47 19.75 15.71 19.71 16.1Z"
        fill="currentColor"
      />
      <path
        className="ink-fleck"
        style={{ animationDelay: "0.24s" }}
        d="M14.24 6.2C14.22 6.65 13.81 7.74 13.47 8.05 13.14 8.36 11.78 8.96 11.4 8.85 11.01 8.74 10.34 7.51 10.16 7.09 9.98 6.66 9.69 5.51 9.85 5.16 10.01 4.82 11.09 4.22 11.52 4.11 11.96 3.99 13.28 3.95 13.6 4.2 13.91 4.44 14.25 5.75 14.24 6.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
