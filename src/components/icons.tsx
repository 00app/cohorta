// Small abstract line-art shapes for decorative use only (aria-hidden).
// Deliberately not photography or emoji: the brand doc rules out stock/AI
// imagery until real member photos exist, and these are just texture —
// they carry no meaning that would need translating or explaining.
//
// "Ink & Blush" pass: every icon below (IconMenu/IconClose excepted —
// those are functional UI controls, not decoration, and need to read as
// crisp and unambiguous, not hand-worn) gets a second copy of its own
// shape painted with the shared lc-hatch-dark-sm/lc-hatch-light-sm
// patterns (components/texture-defs.tsx, mounted once in layout.tsx),
// blended over the plain currentColor base. The base layer is untouched
// on purpose: every call site across the codebase colours these via
// className (text-accent, text-ink/15, text-accent/40, ...), and that
// still has to keep working — the texture rides on top as a second pass,
// it doesn't replace the coloured fill/stroke.

export function IconSparkle({ className = "" }: { className?: string }) {
  const d = "M12 2c0 4.5 2.5 7 7 7-4.5 0-7 2.5-7 7 0-4.5-2.5-7-7-7 4.5 0 7-2.5 7-7Z";
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} fill="currentColor" />
      <path d={d} fill="url(#lc-hatch-dark-sm)" opacity={0.45} style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}

export function IconRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.5" />
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="url(#lc-hatch-dark-sm)"
        strokeWidth="2.5"
        opacity={0.5}
        style={{ mixBlendMode: "multiply" }}
      />
    </svg>
  );
}

export function IconBubble({ className = "" }: { className?: string }) {
  const d =
    "M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4.5V16h-1A2.5 2.5 0 0 1 2 13.5v-6A2.5 2.5 0 0 1 4.5 5";
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={d}
        stroke="url(#lc-hatch-dark-sm)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.5}
        style={{ mixBlendMode: "multiply" }}
      />
    </svg>
  );
}

export function IconHeart({ className = "" }: { className?: string }) {
  const d =
    "M12 20.5s-8-5.1-8-11.2C4 6 6.2 4 8.8 4c1.6 0 3 .8 3.2 2 .2-1.2 1.6-2 3.2-2C17.8 4 20 6 20 9.3 20 15.4 12 20.5 12 20.5Z";
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d={d}
        stroke="url(#lc-hatch-dark-sm)"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity={0.5}
        style={{ mixBlendMode: "multiply" }}
      />
    </svg>
  );
}

// Bold, filled — for the one big hero moment (site footer), where the
// thin outline IconHeart would read as too light to anchor the page.
export function IconHeartFilled({ className = "" }: { className?: string }) {
  const d =
    "M12 20.5s-8-5.1-8-11.2C4 6 6.2 4 8.8 4c1.6 0 3 .8 3.2 2 .2-1.2 1.6-2 3.2-2C17.8 4 20 6 20 9.3 20 15.4 12 20.5 12 20.5Z";
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d={d} fill="currentColor" />
      <path d={d} fill="url(#lc-hatch-dark-sm)" opacity={0.4} style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}

// Mobile nav toggle, open state. Functional control — no texture pass.
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

// Mobile nav toggle, closed/dismiss state. Functional control — no
// texture pass, same reasoning as IconMenu above.
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
      <g fill="currentColor">
        <circle cx="6" cy="16" r="2.5" />
        <circle cx="18" cy="16" r="2.5" />
        <circle cx="12" cy="6" r="2.5" />
      </g>
      <g fill="url(#lc-hatch-dark-sm)" opacity={0.45} style={{ mixBlendMode: "multiply" }}>
        <circle cx="6" cy="16" r="2.5" />
        <circle cx="18" cy="16" r="2.5" />
        <circle cx="12" cy="6" r="2.5" />
      </g>
    </svg>
  );
}
