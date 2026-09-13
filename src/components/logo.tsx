// Cohorta's mark, redrawn for the "Ink & Blush" pass: the brand's own
// two-overlapping-circles device (two people/two communities — kept, per
// the brand reference, rather than replaced) as two off-register ink
// passes instead of one flat outline — a red plate and a black plate
// printed very slightly out of registration, the way a cheap two-colour
// print actually misses, then both roughed at the edge via feTurbulence +
// feDisplacementMap so neither circle is a clean vector ring. Two
// explicit strokes (var(--accent) / var(--ink)) rather than currentColor,
// since the point here is the two-colour misprint itself, not a mark
// that recolours with surrounding text.
function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <filter id="logoRough" x="-30%" y="-30%" width="160%" height="160%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.35 0.5"
          numOctaves={2}
          seed={4}
          result="n"
        />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={1.6} />
      </filter>
      <g filter="url(#logoRough)">
        <circle cx="16" cy="20" r="11" fill="none" stroke="var(--accent)" strokeWidth={3} />
        <circle cx="24.5" cy="19" r="11" fill="none" stroke="var(--ink)" strokeWidth={3} />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="logo-breathe h-[30px] w-[30px] shrink-0" />
      {/* Font-size deliberately not set here — inherited from whatever
          size the caller puts on Logo's own className (site-header's
          text-xl, the footer's text-lg), same as before this pass. */}
      <span className="font-heading font-semibold lowercase tracking-tight">
        cohorta<span className="text-accent">.</span>
      </span>
    </span>
  );
}
