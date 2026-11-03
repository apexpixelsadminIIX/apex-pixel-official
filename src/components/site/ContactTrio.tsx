import { bookingHref, whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ButtonLink";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * ContactTrio: three equal cards — WhatsApp, Book a 15-minute call, and Send
 * an enquiry. Reused at the end of every page.
 */
export function ContactTrio({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const cardClass = cn(
    "group flex flex-col items-start gap-3 p-6 transition-all duration-200 hover:-translate-y-0.5",
    tone === "dark"
      ? "card-dark hover:border-orange/40"
      : "card-light hover:border-orange/40",
  );
  const titleClass = "font-display text-lg font-semibold";
  const textClass = cn(
    "text-sm",
    tone === "dark" ? "text-on-dark-muted" : "text-on-light-muted",
  );

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-green text-white">
          <WhatsAppIcon className="h-5 w-5" />
        </span>
        <span className={titleClass}>Message on WhatsApp</span>
        <span className={textClass}>Opens a WhatsApp chat straight away.</span>
      </a>

      <ButtonLink href={bookingHref} variant="bare" className={cn(cardClass, "text-left")}>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-orange text-ink">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
            <path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
          </svg>
        </span>
        <span className={titleClass}>Book a 15-minute call</span>
        <span className={textClass}>A free call to talk through the project.</span>
      </ButtonLink>

      <ButtonLink href="/contact" variant="bare" className={cn(cardClass, "text-left")}>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
        </span>
        <span className={titleClass}>Send an enquiry</span>
        <span className={textClass}>Write about the project in a short form.</span>
      </ButtonLink>
    </div>
  );
}
