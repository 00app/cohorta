import type { ReactNode } from "react";

// Small floating speech-bubble tags — colour instead of a card, a tail
// instead of a border. Purely decorative texture (aria-hidden), not real
// chat content, so no dependency on the product's actual messaging UI.
const TONES = {
  pink: { bubble: "bg-accent text-white", tail: "fill-accent" },
  navy: { bubble: "bg-ink text-white", tail: "fill-ink" },
  soft: { bubble: "bg-white text-ink shadow-sm", tail: "fill-white" },
} as const;

export function ChatBubble({
  children,
  tone = "pink",
  tilt = "-4deg",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  tilt?: string;
  className?: string;
}) {
  const { bubble, tail } = TONES[tone];
  return (
    <div
      aria-hidden="true"
      className={`bob-bubble relative ${className}`}
      style={{ "--bubble-tilt": tilt } as React.CSSProperties}
    >
      <div
        className={`relative rounded-2xl px-4 py-2.5 text-sm font-bold whitespace-nowrap ${bubble}`}
      >
        {children}
        <svg
          className="absolute -bottom-[7px] left-6"
          width="16"
          height="8"
          viewBox="0 0 16 8"
        >
          <path d="M0 0 L16 0 L4 8 Z" className={tail} />
        </svg>
      </div>
    </div>
  );
}
