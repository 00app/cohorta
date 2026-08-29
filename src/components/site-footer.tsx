import Link from "next/link";
import { Container } from "./ui";
import { footer } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-base font-black lowercase">
              cohorta<span className="text-clay">.</span>
            </p>
            <p className="mt-2 text-sm text-muted">{footer.tagline}</p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-bold tracking-[0.13em] text-faint uppercase">
                {col.heading}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-faint">
          © {new Date().getFullYear()} {footer.copyrightName}. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}
