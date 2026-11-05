import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/site/ButtonLink";
import { HeroLogo } from "@/components/site/HeroLogo";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { Stripes } from "@/components/site/Stripes";
import { absoluteUrl } from "@/lib/seo";
import {
  bookingHref,
  principles,
  whatsappUrl,
  workItems,
} from "@/config/site";

const NAME_KEY = "apx-enquiry-name";

export const Route = createFileRoute("/thank-you")({
  component: ThankYouPage,
  head: () => ({
    meta: [
      { title: "Thank you | Apex Pixels" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/thank-you") }],
  }),
});

const nextSteps = [
  {
    number: "01",
    title: "Manish reads it",
    text: "Your enquiry goes straight to the founder. There is no sales team and no hand-offs.",
  },
  {
    number: "02",
    title: "You get a reply",
    text: "He replies on the WhatsApp number or email you gave, with questions if anything is unclear.",
  },
  {
    number: "03",
    title: "A short call, then a written plan",
    text: "A free 15-minute call, then a written scope, price and timeline. Nothing starts until you approve it.",
  },
];

function ThankYouPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(NAME_KEY);
      if (saved) setName(saved.trim().replace(/\s+/g, " ").slice(0, 40));
    } catch {
      /* storage can be blocked; the page works without it */
    }
  }, []);

  return (
    <main id="main">
      <section
        ref={heroRef}
        className="tone-dark section-pad overflow-hidden pb-20 pt-36 md:pb-24 md:pt-44"
      >
        <div className="container-apx grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <motion.svg
              viewBox="0 0 64 64"
              className="h-16 w-16"
              aria-hidden
              initial="hidden"
              animate="shown"
            >
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="rgb(252 100 28)"
                strokeWidth="4"
                variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <motion.path
                d="M20 33l8 8 16-17"
                fill="none"
                stroke="rgb(252 100 28)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              />
            </motion.svg>
            <Reveal>
              <div className="mt-6">
                <Stripes count={6} itemClassName="h-2.5 w-9" />
              </div>
              <h1 className="mt-6">{name ? `Thank you, ${name}.` : "Thank you."}</h1>
              <p className="muted mt-5 max-w-xl text-lg">
                Your enquiry has reached Apex Pixels. Whatever you are planning, a clear and
                honest conversation is the first step, and you have just started it.
              </p>
            </Reveal>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroLogo containerRef={heroRef} />
          </div>
        </div>
      </section>

      <section className="tone-light section-pad">
        <div className="container-apx">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">What happens next</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {nextSteps.map((step) => (
              <StaggerItem key={step.number} className="h-full">
                <div className="h-full glass-light rounded-2xl border border-ink/10 p-6">
                  <p className="font-display text-sm font-bold text-orange">{step.number}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="muted mt-2 text-sm">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <div className="mt-10 rounded-2xl border border-orange/30 bg-orange/5 p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold">Would you rather talk now?</h3>
              <p className="muted mt-2 max-w-2xl text-sm">
                Pick a time that suits you and we will go through your idea together, or message
                directly on WhatsApp.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href={bookingHref} size="md">
                  Book a 15-minute call
                </ButtonLink>
                <ButtonLink href={whatsappUrl} variant="outline-light" size="md">
                  Message on WhatsApp
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="tone-dark section-pad">
        <div className="container-apx">
          <Reveal>
            <h2>How we will work with you</h2>
            <p className="muted mt-4 max-w-2xl">
              Five promises we keep on every project, big or small.
            </p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((item) => (
              <StaggerItem key={item.title} className="h-full">
                <div className="card-dark h-full p-6">
                  <h3 className="font-display text-lg font-semibold text-orange">{item.title}</h3>
                  <p className="muted mt-2 text-sm">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <h2 className="mt-16 font-display text-2xl font-bold">While you wait, see our work</h2>
          </Reveal>
          <Stagger className="mt-6 grid gap-4 md:grid-cols-2">
            {workItems.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <article className="card-dark card-lift flex h-full flex-col p-6">
                  <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                  <p className="muted mt-2 text-sm">{item.text}</p>
                  <div className="mt-5">
                    <ButtonLink href={item.href} variant="outline-dark" size="sm">
                      {item.buttonLabel}
                    </ButtonLink>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/about" variant="outline-dark" size="sm">
                Meet Apex Pixels
              </ButtonLink>
              <ButtonLink href="/services" variant="outline-dark" size="sm">
                Explore services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
