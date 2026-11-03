import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

import { BrowserFrame } from "@/components/site/BrowserFrame";
import { ButtonLink } from "@/components/site/ButtonLink";
import { ContactTrio } from "@/components/site/ContactTrio";
import { HeroGridCanvas } from "@/components/site/HeroGridCanvas";
import { PricingGrid } from "@/components/site/PricingGrid";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
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

const EASE = [0.22, 1, 0.36, 1] as const;

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

/* 1. HERO (dark, full viewport) — first-load sequence:
   stripes slide in, headline lines mask-reveal, sub + actions fade up,
   logo fades/scales in then floats (with pointer parallax on desktop),
   and a canvas grid lights up squares near the pointer. */

function HeadlineLine({
  children,
  delay,
  glow = false,
}: {
  children: ReactNode;
  delay: number;
  glow?: boolean;
}) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{
          y: "110%",
          ...(glow ? { textShadow: "0 0 22px rgba(252, 100, 28, 0.55)" } : {}),
        }}
        animate={{
          y: "0%",
          ...(glow ? { textShadow: "0 0 0px rgba(252, 100, 28, 0)" } : {}),
        }}
        transition={{
          y: { duration: 0.6, ease: EASE, delay },
          ...(glow
            ? { textShadow: { duration: 1.1, ease: "easeOut", delay } }
            : {}),
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const x = useSpring(parallaxX, { stiffness: 60, damping: 18 });
  const y = useSpring(parallaxY, { stiffness: 60, damping: 18 });

  const onPointerMove = (e: React.PointerEvent) => {
    // Desktop pointer parallax only; never on touch devices or when the
    // user prefers reduced motion.
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    parallaxX.set(Math.max(-12, Math.min(12, nx * 24)));
    parallaxY.set(Math.max(-12, Math.min(12, ny * 24)));
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={onPointerMove}
      className="tone-dark relative flex min-h-svh items-center overflow-hidden"
    >
      <HeroGridCanvas />
      <div className="container-apx section-pad relative w-full pt-36 md:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="order-2 lg:order-1">
            <Stripes count={6} itemClassName="h-2.5 w-9" animated />
            <h1 className="mt-6">
              <HeadlineLine delay={0.4}>Websites built.</HeadlineLine>
              <HeadlineLine delay={0.52}>Brands seen.</HeadlineLine>
              <HeadlineLine delay={0.64} glow>
                Growth measured.
              </HeadlineLine>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.95 }}
            >
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
                  className="link-underline px-2 text-sm font-medium text-on-dark-muted transition-colors hover:text-orange"
                >
                  Or send an enquiry
                </SmartLink>
              </div>
              <p className="muted mt-6 text-sm">
                Based in Chennai, Tamil Nadu. Building for businesses anywhere in
                India.
              </p>
            </motion.div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              style={{ x, y }}
              className="w-full max-w-xs"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
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
                  width={1472}
                  height={698}
                  className="relative z-10 w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. MARQUEE STRIP (light, thin) — slow continuous scroll, pauses on hover */

function MarqueeStrip() {
  const half = [...marqueeWords, ...marqueeWords, ...marqueeWords];
  return (
    <section className="tone-light overflow-hidden border-y border-ink/8 py-4">
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center gap-6 pr-6"
          >
            {half.map((word, i) => (
              <span key={i} className="flex items-center gap-6">
                <span className="font-display text-sm font-semibold uppercase tracking-widest text-on-light-muted">
                  {word}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden />
              </span>
            ))}
          </div>
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
        <Reveal>
          <h2>What Apex Pixels builds</h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {buildTopics.map((topic) => {
            const small = topic.id === "content";
            return (
              <StaggerItem key={topic.id} className="h-full">
                <article className="card-light card-lift flex h-full flex-col p-6 hover:border-orange/40">
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
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* 4. RECENT WORK (dark) */

function RecentWork() {
  return (
    <section className="tone-dark section-pad">
      <div className="container-apx">
        <Reveal>
          <h2>Recent work</h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
          {workItems.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <article className="card-dark card-lift flex h-full flex-col p-6">
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
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* 5. HOW A PROJECT WORKS (light) — the vertical line draws itself as the
   section scrolls into view, and each step number lights up when reached. */

function HowAProjectWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 85%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="tone-light section-pad">
      <div className="container-apx">
        <Reveal>
          <h2>How a project works</h2>
        </Reveal>
        <ol ref={listRef} className="relative mt-12 max-w-3xl space-y-10">
          <motion.span
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[27px] w-px origin-top bg-orange/25"
            aria-hidden
          />
          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className="relative flex gap-6"
            >
              <motion.span
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                  boxShadow: [
                    "0 0 0 0 rgba(252, 100, 28, 0)",
                    "0 0 24px 2px rgba(252, 100, 28, 0.5)",
                    "0 0 0 0 rgba(252, 100, 28, 0)",
                  ],
                }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  scale: { type: "spring", stiffness: 260, damping: 16 },
                  opacity: { duration: 0.35 },
                  boxShadow: { duration: 0.9, times: [0, 0.4, 1], delay: 0.15 },
                }}
                className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-orange bg-white font-display text-sm font-bold text-orange"
              >
                {step.number}
              </motion.span>
              <div className="pt-1.5">
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="muted mt-2 text-sm">{step.text}</p>
              </div>
            </motion.li>
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
        <Reveal>
          <h2>Clear starting prices</h2>
        </Reveal>
        <PricingGrid />
        <SmartLink
          href="/contact"
          className="link-underline mt-6 inline-flex text-sm font-medium text-on-dark-muted transition-colors hover:text-orange"
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
          <Reveal>
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
                className="link-underline mt-6 inline-flex text-sm font-medium text-orange"
              >
                Read the full story
              </SmartLink>
            </div>
          </Reveal>
          <Reveal>
            <img
              src="/logo-mark.png"
              alt=""
              aria-hidden
              width={1472}
              height={698}
              loading="lazy"
              decoding="async"
              className="mx-auto w-full max-w-xs opacity-90"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 8. QUESTIONS (light) — the accordion opens and closes with a smooth
   height animation provided by the accordion component itself. */

function Questions() {
  return (
    <section className="tone-light section-pad">
      <div className="container-apx">
        <Reveal>
          <h2>Questions</h2>
        </Reveal>
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
        <Reveal>
          <Stripes count={6} itemClassName="h-2.5 w-9" />
          <h2 className="mt-6">Start with a conversation.</h2>
          <p className="muted mt-4 max-w-xl">
            Message, write or book a short call. Whichever is easiest.
          </p>
          <div className="mt-10">
            <ContactTrio tone="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
