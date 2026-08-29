import Link from "next/link";
import { Container } from "./ui";
import { nav } from "@/content/site";

// Two tracks (members / group owners) exist on this site, but the brand's
// central promise is discretion — so this is deliberately not a loud
// "who are you?" toggle like a lot of two-sided-marketplace sites use.
// "For your community" sits quietly next to the primary nav; anyone who
// isn't a group owner never needs to notice it.
export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="text-lg font-black lowercase tracking-tight">
          cohorta<span className="text-clay">.</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {nav.primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.ownerLink.href}
            className="font-medium text-faint hover:text-ink"
          >
            {nav.ownerLink.label}
          </Link>
        </nav>

        {nav.memberCta.external ? (
          <a
            href={nav.memberCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ground hover:bg-ink-2"
          >
            {nav.memberCta.label}
          </a>
        ) : (
          <Link
            href={nav.memberCta.href}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ground hover:bg-ink-2"
          >
            {nav.memberCta.label}
          </Link>
        )}
      </Container>
    </header>
  );
}
