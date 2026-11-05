import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { bookingHref, nav, site, whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ButtonLink";
import { SmartLink } from "./SmartLink";
import { Stripes } from "./Stripes";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Floating pill navbar: frosted glass, fully rounded, soft shadow, sticky near the
 * top with a small gap. Shrinks slightly on scroll. Mobile opens a
 * full-screen sheet with the links and the three contact actions.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Shrinks slightly after 40px of scroll with a smooth transition.
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.div
        animate={{ paddingTop: scrolled ? 8 : 16 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 top-0 z-[60] px-3 sm:px-4"
      >
        <motion.nav
          animate={{ maxWidth: 1200 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "mx-auto flex w-full items-center justify-between gap-3 glass-frost rounded-full border border-white/45 pl-7 pr-5 transition-all duration-300",
            scrolled ? "py-1.5" : "py-2",
          )}
          aria-label="Main navigation"
        >
          <SmartLink
            href="/"
            className="flex shrink-0 items-center"
            ariaLabel={site.name}
          >
            <img
              src="/logo-full.webp"
              alt={site.name}
              className={cn(
                "w-auto transition-all duration-300",
                scrolled ? "h-11" : "h-14",
              )}
            />
          </SmartLink>

          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((link) => (
              <SmartLink
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-white/50 hover:text-[#b8410a]"
                activeClassName="bg-white/65 text-[#b8410a]"
              >
                {link.label}
              </SmartLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={bookingHref}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Book a 15-min call
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-white/50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid-bg-dark fixed inset-0 z-[70] flex flex-col bg-ink/75 px-6 pb-10 pt-5 text-on-dark backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 glass-light rounded-2xl px-4 py-2">
                <img src="/logo-full.webp" alt={site.name} className="h-11 w-auto" />
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile navigation">
              {nav.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <SmartLink
                    href={link.href}
                    className="block border-b border-white/10 py-4 font-display text-3xl font-semibold tracking-tight hover:text-orange"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </SmartLink>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-10">
              <Stripes count={8} itemClassName="h-2 w-7" />
              <div className="grid gap-3 sm:grid-cols-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 btn-glass-solid btn-glass-green rounded-full px-4 py-3 text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <ButtonLink href={bookingHref} variant="primary" size="md" onClick={() => setOpen(false)}>
                  Book a 15-min call
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="outline-dark"
                  size="md"
                  onClick={() => setOpen(false)}
                >
                  Send an enquiry
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
