import { nav, site, whatsappUrl } from "@/config/site";
import { SmartLink } from "./SmartLink";
import { Stripes } from "./Stripes";

/**
 * Footer (dark): logo inside a white rounded badge, tagline, nav links,
 * contact block, small links to Privacy and Terms, and the copyright line.
 */
export function Footer() {
  return (
    <footer className="tone-dark no-orbs border-t border-white/10">
      <div className="container-apx pb-10 pt-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="inline-flex items-center rounded-2xl bg-white px-4 py-2.5">
              <img src="/logo-full.webp" alt={site.name} className="h-9 w-auto" />
            </div>
            <p className="muted mt-4 text-sm">{site.tagline}</p>
            <Stripes count={6} className="mt-5" itemClassName="h-2 w-6" />
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-on-dark-muted">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    className="link-underline text-sm text-on-dark transition-colors hover:text-orange"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-on-dark-muted">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-on-dark transition-colors hover:text-orange"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-on-dark transition-colors hover:text-orange"
                >
                  {site.whatsappDisplay}
                </a>
              </li>
              <li className="text-on-dark-muted">{site.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{site.footerLine}</p>
          <div className="flex gap-5">
            <SmartLink
              href="/privacy"
              className="link-underline transition-colors hover:text-orange"
            >
              Privacy
            </SmartLink>
            <SmartLink
              href="/terms"
              className="link-underline transition-colors hover:text-orange"
            >
              Terms
            </SmartLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
