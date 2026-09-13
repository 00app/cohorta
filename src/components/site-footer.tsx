import Link from "next/link";
import { Container } from "./ui";
import { Logo } from "./logo";
import { Parallax } from "./motion";
import { IconHeartFilled } from "./icons";
import { footer } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-surface-2">
      {/* The one big sign-off moment, echoing the brief's reference site:
          a large mascot-scale shape before the plain link footer. Heart
          reads naturally here — Cohorta is a dating-and-friendship app —
          without needing photography or a mascot character of our own. */}
      <div className="relative overflow-hidden py-16 text-center sm:py-20">
        <Parallax speed={0.06} className="pointer-events-none flex justify-center">
          <IconHeartFilled className="floaty-a h-32 w-32 text-accent sm:h-44 sm:w-44" />
        </Parallax>
        <p className="mt-4 text-lg font-bold text-accent-ink sm:text-xl">
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
              <p className="text-xs font-extrabold tracking-[0.15em] text-faint uppercase">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-bold text-muted uppercase tracking-wide transition-colors hover:text-accent-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm font-medium text-faint">
          © {new Date().getFullYear()} {footer.copyrightName}. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}
