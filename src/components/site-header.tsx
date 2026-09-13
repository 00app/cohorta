import Link from "next/link";
import { Container, Button } from "./ui";
import { Logo } from "./logo";
import { nav } from "@/content/site";

// Two tracks (members / group owners) exist on this site, but the brand's
// central promise is discretion — so this is deliberately not a loud
// "who are you?" toggle like a lot of two-sided-marketplace sites use.
// "For your community" sits quietly next to the primary nav; anyone who
// isn't a group owner never needs to notice it.
export function SiteHeader() {
  return (
    // Permanent shadow-sm rather than a scroll-conditional one: it'd need
    // turning this into a client component with its own scroll listener
    // just to toggle one class, where a resting shadow-sm is already
    // subtle enough not to read as "wrong" before any scrolling happens.
    <header className="sticky top-0 z-10 bg-surface/90 shadow-sm backdrop-blur">
      <Container
        wide
        className="flex flex-wrap items-center justify-between gap-4 py-5 md:flex-nowrap md:gap-6"
      >
        <Link href="/" className="shrink-0 text-xl">
          <Logo />
        </Link>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-2 text-base md:flex-1 md:justify-end">
          {nav.primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-bold text-muted transition-colors hover:text-accent-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.ownerLink.href}
            className="font-bold text-faint transition-colors hover:text-accent-ink"
          >
            {nav.ownerLink.label}
          </Link>
        </nav>

        <Button
          href={nav.memberCta.href}
          external={nav.memberCta.external}
          className="shrink-0"
        >
          {nav.memberCta.label}
        </Button>
      </Container>
    </header>
  );
}
