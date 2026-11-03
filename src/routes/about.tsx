import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { OptionalImage } from "@/components/site/OptionalImage";
import { ClipboardCheck, FileSignature, IndianRupee, MessageCircle, Repeat2 } from "lucide-react";

import { ButtonLink } from "@/components/site/ButtonLink";
import { ContactTrio } from "@/components/site/ContactTrio";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { Stripes } from "@/components/site/Stripes";
import { founder, lionStory, mapsUrl, principles, site } from "@/config/site";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    seo({
      path: "/about",
      title: "About Apex Pixels",
      description:
        "Apex Pixels is a Chennai business that builds websites, web apps and business software, founded by Manish. S. Read why the mark is a lion in a triangle.",
    }),
});

const principleIcons: Record<string, typeof FileSignature> = {
  scope: FileSignature,
  approval: ClipboardCheck,
  revisions: Repeat2,
  communication: MessageCircle,
  pricing: IndianRupee,
};

function AboutPage() {
  return (
    <main id="main">
      {/* 1. Header (light) */}
      <header className="tone-light section-pad pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="container-apx">
          <Reveal>
            <Stripes count={6} itemClassName="h-2.5 w-9" />
            <h1 className="mt-6">About Apex Pixels</h1>
            <p className="muted mt-4 max-w-2xl">
              Apex Pixels is a Chennai-based business that builds websites, web apps and business
              software, founded by {site.founder}.
            </p>
          </Reveal>
        </div>
      </header>

      {/* 2. The lion story (dark, anchor #lion) */}
      <section id="lion" className="tone-dark section-pad scroll-mt-28">
        <div className="container-apx">
          <div className="grid items-center gap-12 lg:grid-cols-[0.55fr_1fr]">
            <Reveal className="relative mx-auto w-full max-w-xs">
              <Stripes
                count={5}
                itemClassName="h-2.5 w-10"
                className="absolute -top-8 -left-4 rotate-[16deg] opacity-80"
              />
              <img
                src="/logo-mark.webp"
                alt=""
                aria-hidden
                width={1472}
                height={698}
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full"
              />
            </Reveal>
            <Reveal>
              <div>
                <h2>Why a lion in a triangle?</h2>
                <div className="mt-6 max-w-2xl space-y-4">
                  {lionStory.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. How work is done (light) */}
      <section className="tone-light section-pad">
        <div className="container-apx">
          <h2 className="font-display text-3xl font-bold tracking-tight">How work is done</h2>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principleIcons[principle.icon];
              return (
                <StaggerItem key={principle.title} className="h-full">
                  <article className="card-light card-lift h-full p-6 hover:border-orange/40">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-orange/10 text-orange">
                      {Icon && <Icon className="h-5 w-5" aria-hidden />}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold">{principle.title}</h3>
                    <p className="muted mt-2 text-sm">{principle.text}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* 4. The founder (light) */}
      <section className="tone-light pb-20">
        <div className="container-apx">
          <Reveal>
            <div className="card-light flex max-w-3xl flex-col items-start gap-6 p-6 sm:flex-row sm:items-center md:p-8">
              <OptionalImage
                src={founder.photo}
                alt={founder.name}
                className="h-28 w-28 shrink-0 rounded-full object-cover"
              />
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight">{founder.name}</h2>
                <p className="text-sm font-semibold uppercase tracking-widest text-orange">
                  {founder.title}
                </p>
                <p className="muted mt-3 text-sm">{founder.text}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Find Apex Pixels (dark) */}
      <section className="tone-dark section-pad">
        <div className="container-apx">
          <Reveal>
            <h2>Find Apex Pixels</h2>
            <p className="muted mt-4 max-w-xl">{site.address}</p>
            <p className="mt-3">
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-sm text-on-dark transition-colors hover:text-orange"
              >
                {site.email}
              </a>
            </p>
            <div className="mt-6">
              <ButtonLink href={mapsUrl} size="sm">
                View on Google Maps
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal className="mt-16">
            <ContactTrio tone="dark" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
