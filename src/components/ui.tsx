import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-3xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-bold tracking-[0.16em] text-clay-ink uppercase">
      {children}
    </p>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
} & Omit<React.ComponentProps<typeof Link>, "href">) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-ink text-ground hover:bg-ink-2"
      : "border border-line bg-surface text-ink hover:border-clay";

  if (external) {
    return (
      <a
        href={href}
        className={`${base} ${styles}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles}`} {...rest}>
      {children}
    </Link>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-surface p-6 shadow-[var(--shadow)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}
