import Link from "next/link";
import { Container } from "./ui";
import { Logo } from "./logo";
import { Parallax } from "./motion";
import { ScribbleHeart } from "./scribble-heart";
import { footer } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto">
      {/* Own masked layer rather than a flat bg-surface-2 on <footer>
          itself — same reasoning as Section's `tint` prop (see ui.tsx):
          a plain background-color cuts off in a hard line right at the
          footer's top edge, exactly the divider look stripped out
          everywhere else. Top-only fade, not fade-edge-y — there's nothing
          below the footer for a bottom fade to blend into.
          -z-10 is load-bearing, not decoration: a position:absolute
          element with z-index:auto still paints *above* a plain static
          sibling regardless of DOM order (CSS stacking puts positioned
          z-auto content ahead of in-flow static content). The Logo/columns
          Container below has no transform or position of its own, so
          without -z-10 this div silently sat on top of it — the wordmark
          and every link past the fold rendered, in the DOM, with correct
          styles, and were still invisible because this was painted over
          them. -z-10 plus the footer's own `relative` keeps it behind
          everything here without escaping into some ancestor's stack. */}
      <div aria-hidden="true" className="fade-edge-top absolute inset-0 -z-10 bg-surface-2" />

      {/* The one big sign-off moment, echoing the brief's reference site:
          a large mascot-scale shape before the plain link footer. Heart
          reads naturally here — Cohorta is a dating-and-friendship app —
          without needing photography or a mascot character of our own. */}
      <div className="relative overflow-hidden py-16 text-center sm:py-20">
        <Parallax speed={0.06} className="pointer-events-none flex justify-center">
          <ScribbleHeart className="heart-pulse h-32 w-32 text-accent sm:h-44 sm:w-44" />
        </Parallax>
        {/* Heading font (Caacupe One), not body — this is the one big
            sign-off statement, so it should read like a heading. font-normal
            is deliberate: Caacupe One only ships weight 400, same reason
            h1-h4 pin font-weight there in globals.css — font-bold here would
            just be the browser faux-bolding a font that has no bold cut. */}
        <p className="mt-4 font-heading text-3xl font-normal text-accent-ink lowercase sm:text-5xl">
          {footer.tagline}
        </p>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo className="text-lg" />
          </div>

          {footer.columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs leading-[0.95] font-extrabold tracking-[0.15em] text-ink uppercase">
                {col.heading}
              </p>
              {/* leading-[0.85]/tracking-normal: this column's body
                  line-height (1.55, from the global body rule) and
                  tracking-wide (0.025em) read fine for prose but far too
                  loose for a short wrapped link like "Bring Cohorta to
                  your group" set in all caps — the letters were visibly
                  spread and the gap between wrapped lines wider than the
                  gap to the next link entirely. Tighter than the first
                  pass at leading-[0.95], which still read as too loose
                  once seen next to real wrapped copy, not just in
                  isolation. */}
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-heading font-bold leading-[0.55] tracking-normal text-muted lowercase transition-colors hover:text-accent-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm font-medium text-ink">
          © {new Date().getFullYear()} {footer.copyrightName}. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}
