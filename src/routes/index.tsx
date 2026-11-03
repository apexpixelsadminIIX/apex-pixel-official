import { createFileRoute } from "@tanstack/react-router";

import { ButtonLink } from "@/components/site/ButtonLink";
import { ContactTrio } from "@/components/site/ContactTrio";
import { PricingGrid } from "@/components/site/PricingGrid";
import { SmartLink } from "@/components/site/SmartLink";
import { Stripes } from "@/components/site/Stripes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  buildTopics,
  faqs,
  marqueeWords,
  site,
  steps,
  whatsappUrl,
  workItems,
} from "@/config/site";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: `${site.name} — ${site.tagline}` },
      {
        name: "description",
        content:
          "Apex Pixels designs and builds websites, web apps and business software, and sets up the tools that show how they are doing. Based in Chennai, building for businesses anywhere in India.",
      },
      { property: "og:title", content: `${site.name} — ${site.tagline}` },
      {
        property: "og:description",
        content:
          "Websites, web apps and business software, built from Chennai for businesses anywhere in India. Clear starting prices and three ways to start a conversation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <WhatApexBuilds />
      <RecentWork />
      <HowAProjectWorks />
      <StartingPrices />
      <WhyLion />
      <Questions />
      <FinalCta />
    </main>
  );
}

/* 1. HERO (dark, full viewport) */

function Hero() {
  return (
    <section className="tone-dark grid-bg-dark relative flex min-h-svh items-center overflow-hidden">
      <div className="container-apx section-pad w-full pt-36 md:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="order-2 lg:order-1">
            <Stripes count={6} itemClassName="h-2.5 w-9" />
            <h1 className="mt-6">
              <span className="block">Websites built.</span>
              <span className="block">Brands seen.</span>
              <span className="block text-orange">Growth measured.</span>
            </h1>
            <p className="muted mt-6 max-w-xl">
              Apex Pixels designs and builds websites, web apps and business
              software, and sets up the tools that show you how they are doing.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={whatsappUrl} size="lg">
                Message on WhatsApp
              </ButtonLink>
              <ButtonLink href="/contact?intent=call" variant="outline-dark" size="lg">
                Book a 15-minute call
              </ButtonLink>
              <SmartLink
                href="/contact"
                className="px-2 text-sm font-medium text-on-dark-muted underline-offset-4 transition-colors hover:text-orange hover:underline"
              >
                Or send an enquiry
              </SmartLink>
            </div>
            <p className="muted mt-6 text-sm">
              Based in Chennai, Tamil Nadu. Building for businesses anywhere in
              India.
            </p>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative w-full max-w-xs">
              <Stripes
                count={7}
                itemClassName="h-3 w-12"
                className="absolute -top-8 -left-6 rotate-[18deg] opacity-80"
              />
              <Stripes
                count={5}
                itemClassName="h-2.5 w-10"
                className="absolute bottom-2 -right-4 -rotate-[14deg] opacity-80"
              />
              <img
                src="/logo-mark.png"
                alt="The Apex Pixels mark: a lion inside a downward triangle"
                className="relative z-10 w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. MARQUEE STRIP (light, thin) — static for now */

function MarqueeStrip() {
  const sequence = [...marqueeWords, ...marqueeWords, ...marqueeWords];
  return (
    <section className="tone-light overflow-hidden border-y border-ink/8 py-4">
      <div className="container-apx flex items-center justify-center gap-6 whitespace-nowrap">
        {sequence.map((word, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-on-light-muted">
              {word}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}

/* 3. WHAT APEX PIXELS BUILDS (light) */

function WhatApexBuilds() {
  return (
    <section className="tone-light section-pad">
      <div className="container-apx">
        <h2>What Apex Pixels builds</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {buildTopics.map((topic) => {
            const small = topic.id === "content";
            return (
              <article
                key={topic.id}
                className="card-light flex flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange/40"
              >
                {small && (
                  <span className="mb-3 self-start rounded-full border border-green/30 bg-green/10 px-3 py-1 text-xs font-semibold text-green">
                    {topic.tag}
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold">{topic.title}</h3>
                <p className="muted mt-3 text-sm">{topic.text}</p>
                <div className="mt-6 flex-1" />
                <SmartLink
                  href={topic.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange transition-transform hover:translate-x-0.5"
                >
                  See services
                  <span aria-hidden>→</span>
                </SmartLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 4. RECENT WORK (dark) */

function BrowserFrame({ label }: { label: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="flex items-center gap-1.5 bg-ink-2 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden />
        <span className="ml-2 grid h-5 flex-1 place-items-center overflow-hidden rounded-full bg-white/5 px-3 text-left text-[10px] text-white/30">
          {label}
        </span>
      </div>
      <div className="grid aspect-video place-items-center bg-gradient-to-br from-navy/50 via-ink-2 to-ink">
        <span className="font-display text-sm font-semibold text-on-dark-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

function RecentWork() {
  return (
    <section className="tone-dark section-pad">
      <div className="container-apx">
        <h2>Recent work</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {workItems.map((item) => (
            <article key={item.id} className="card-dark flex flex-col p-6">
              <BrowserFrame label={item.name} />
              <h3 className="mt-5 font-display text-xl font-semibold">{item.name}</h3>
              <p className="muted mt-2 text-sm">{item.text}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {item.status === "live-case-study" ? (
                  <ButtonLink href={item.href} size="sm">
                    {item.buttonLabel}
                  </ButtonLink>
                ) : (
                  <>
                    <span className="rounded-full border border-green/40 bg-green/10 px-3 py-1 text-xs font-semibold text-green">
                      Case study coming soon
                    </span>
                    <ButtonLink href={item.href} variant="outline-dark" size="sm">
                      {item.buttonLabel}
                    </ButtonLink>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5. HOW A PROJECT WORKS (light) */

function HowAProjectWorks() {
  return (
    <section className="tone-light section-pad">
      <div className="container-apx">
        <h2>How a project works</h2>
        <ol className="relative mt-12 max-w-3xl space-y-10">
          <span
            className="absolute top-2 bottom-2 left-[27px] w-px bg-orange/25"
            aria-hidden
          />
          {steps.map((step) => (
            <li key={step.number} className="relative flex gap-6">
              <span className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-orange bg-white font-display text-sm font-bold text-orange">
                {step.number}
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="muted mt-2 text-sm">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 6. STARTING PRICES (dark) */

function StartingPrices() {
  return (
    <section className="tone-dark section-pad">
      <div className="container-apx">
        <h2>Clear starting prices</h2>
        <PricingGrid />
        <SmartLink
          href="/contact"
          className="mt-6 inline-flex text-sm font-medium text-on-dark-muted underline-offset-4 transition-colors hover:text-orange hover:underline"
        >
          Not sure which package fits? Describe your project
        </SmartLink>
      </div>
    </section>
  );
}

/* 7. WHY A LION IN A TRIANGLE (dark, with the large mark) */

function WhyLion() {
  return (
    <section className="tone-dark section-pad">
      <div className="container-apx">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.6fr]">
          <div>
            <h2>Why a lion in a triangle?</h2>
            <p className="muted mt-6 max-w-2xl">
              Every business starts as small pieces: a product, a promise, a few
              good people. Apex Pixels exists to arrange those pieces until
              something unmistakable looks back at the world.
            </p>
            <p className="muted mt-4 max-w-2xl">
              Strength is quiet, and presence is built one careful detail at a
              time.
            </p>
            <SmartLink
              href="/about#lion"
              className="mt-6 inline-flex text-sm font-medium text-orange underline-offset-4 transition-colors hover:underline"
            >
              Read the full story
            </SmartLink>
          </div>
          <img
            src="/logo-mark.png"
            alt=""
            aria-hidden
            className="mx-auto w-full max-w-xs opacity-90"
          />
        </div>
      </div>
    </section>
  );
}

/* 8. QUESTIONS (light) */

function Questions() {
  return (
    <section className="tone-light section-pad">
      <div className="container-apx">
        <h2>Questions</h2>
        <Accordion
          type="single"
          collapsible
          className="mt-10 max-w-3xl border-t border-ink/10"
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="border-b border-ink/10"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base font-semibold hover:no-underline hover:text-orange">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="muted pb-5 text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* 9. FINAL CALL TO ACTION (dark) */

function FinalCta() {
  return (
    <section className="tone-dark section-pad">
      <div className="container-apx">
        <Stripes count={6} itemClassName="h-2.5 w-9" />
        <h2 className="mt-6">Start with a conversation.</h2>
        <p className="muted mt-4 max-w-xl">
          Message, write or book a short call. Whichever is easiest.
        </p>
        <div className="mt-10">
          <ContactTrio tone="dark" />
        </div>
      </div>
    </section>
  );
}
