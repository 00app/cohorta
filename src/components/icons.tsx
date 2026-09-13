// Small abstract line-art shapes for decorative use only (aria-hidden).
// Deliberately not photography or emoji: the brand doc rules out stock/AI
// imagery until real member photos exist, and these are just texture —
// they carry no meaning that would need translating or explaining.

export function IconSparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2c0 4.5 2.5 7 7 7-4.5 0-7 2.5-7 7 0-4.5-2.5-7-7-7 4.5 0 7-2.5 7-7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export function IconBubble({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4.5V16h-1A2.5 2.5 0 0 1 2 13.5v-6A2.5 2.5 0 0 1 4.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconHeart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20.5s-8-5.1-8-11.2C4 6 6.2 4 8.8 4c1.6 0 3 .8 3.2 2 .2-1.2 1.6-2 3.2-2C17.8 4 20 6 20 9.3 20 15.4 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Bold, filled — for the one big hero moment (site footer), where the
// thin outline IconHeart would read as too light to anchor the page.
export function IconHeartFilled({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 20.5s-8-5.1-8-11.2C4 6 6.2 4 8.8 4c1.6 0 3 .8 3.2 2 .2-1.2 1.6-2 3.2-2C17.8 4 20 6 20 9.3 20 15.4 12 20.5 12 20.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconDots({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="6" cy="16" r="2.5" fill="currentColor" />
      <circle cx="18" cy="16" r="2.5" fill="currentColor" />
      <circle cx="12" cy="6" r="2.5" fill="currentColor" />
    </svg>
  );
}
