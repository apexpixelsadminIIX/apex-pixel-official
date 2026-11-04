import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Check } from "lucide-react";

import { ButtonLink } from "@/components/site/ButtonLink";
import { ContactTrio } from "@/components/site/ContactTrio";
import { PackageCard } from "@/components/site/PricingGrid";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { SmartLink } from "@/components/site/SmartLink";
import { Stripes } from "@/components/site/Stripes";
import {
  carePlans,
  discoveryNote,
  extras,
  packages,
  priceNote,
  serviceSections,
  steps,
} from "@/config/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () =>
    seo({
      path: "/services",
      title: "Services and prices | Apex Pixels",
      description:
        "Websites from ₹12,000, web apps from ₹1,50,000 and business software from ₹4,50,000, with clear scope, timelines and care plans from Apex Pixels.",
    }),
});

function ServicesPage() {
  return (
    <main id="main">
      <Overview />
      <WebsitesSection />
      <AppsSection />
      <SupportSection />
      <ProcessSection />
      <FinalTrio />
    </main>
  );
}

/* Header + at-a-glance overview (light) */

function Overview() {
  return (
    <header className="tone-light section-pad pb-14 pt-36 md:pb-16 md:pt-44">
      <div className="container-apx">
        <Reveal>
          <Stripes count={6} itemClassName="h-2.5 w-9" />
          <h1 className="mt-6">What Apex Pixels builds</h1>
          <p className="muted mt-4 max-w-2xl">
            Websites, web apps and business software, plus a smaller content service. Pick the
            package closest to your project and jump straight to it.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {packages.map((pkg) => (
            <StaggerItem key={pkg.id} className="h-full">
              <a
                href={pkg.group === "small" ? "#websites" : "#apps"}
                className="card-lift block h-full rounded-2xl border border-ink/10 bg-white p-4 hover:border-orange/40"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-on-light-muted">
                  {pkg.name}
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-orange">{pkg.price}</p>
                <p className="mt-1 text-xs text-on-light-muted">{pkg.timeline}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="muted mt-5 text-xs">{priceNote}</p>
      </div>
    </header>
  );
}

function CheckList({
  items,
  tone,
  columns = 2,
}: {
  items: string[];
  tone: "dark" | "light";
  columns?: 1 | 2;
}) {
  return (
    <ul className={cn("mt-6 grid gap-x-8 gap-y-2.5", columns === 2 && "md:grid-cols-2")}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm">
          <Check
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              tone === "dark" ? "text-orange" : "text-green-ax",
            )}
            strokeWidth={3}
            aria-hidden
          />
          <span className={tone === "dark" ? "text-on-dark-muted" : "text-on-light-muted"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function GoodFor({ text, tone }: { text: string; tone: "dark" | "light" }) {
  return (
    <p className="mt-6 max-w-2xl text-sm">
      <span className={cn("font-semibold", tone === "dark" ? "text-orange" : "text-on-light")}>
        Good for:{" "}
      </span>
      <span className={tone === "dark" ? "text-on-dark-muted" : "text-on-light-muted"}>{text}</span>
    </p>
  );
}

/* Websites tier (dark) */

function WebsitesSection() {
  const websites = serviceSections.find((s) => s.id === "websites");
  const list = packages.filter((p) => ["launch", "business", "professional"].includes(p.id));

  return (
    <section id="websites" className="tone-dark section-pad scroll-mt-28">
      <div className="container-apx">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight">{websites?.title}</h2>
          <p className="muted mt-4 max-w-2xl">{websites?.description}</p>
          <GoodFor text={websites?.goodFor ?? ""} tone="dark" />
        </Reveal>
        <Stagger className="mt-10 grid gap-4 lg:grid-cols-3">
          {list.map((pkg) => (
            <StaggerItem key={pkg.id} className="h-full">
              <PackageCard pkg={pkg} showFeatures />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* Apps and software tier (light) */

function AppsSection() {
  const software = serviceSections.find((s) => s.id === "software");
  const list = packages.filter((p) => ["webapp", "suite"].includes(p.id));

  return (
    <section id="apps" className="tone-light section-pad scroll-mt-28">
      <div className="container-apx">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight">{software?.title}</h2>
          <p className="muted mt-4 max-w-2xl">{software?.description}</p>
          <GoodFor text={software?.goodFor ?? ""} tone="light" />
        </Reveal>
        <Reveal>
          <div className="mt-8 max-w-3xl rounded-2xl border border-orange/30 bg-orange/5 p-6">
            <h3 className="font-display text-lg font-semibold text-orange">
              How the paid discovery step works
            </h3>
            <p className="muted mt-3 text-sm">
              {discoveryNote.text} ({discoveryNote.amounts}.)
            </p>
            <p className="muted mt-2 text-sm">{discoveryNote.payment}</p>
          </div>
        </Reveal>
        <Stagger className="mt-6 grid gap-4 md:grid-cols-2">
          {list.map((pkg) => (
            <StaggerItem key={pkg.id} className="h-full">
              <PackageCard pkg={pkg} showFeatures />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* Support, extras and content (dark) */

function SupportSection() {
  const content = serviceSections.find((s) => s.id === "content");

  return (
    <section id="content" className="tone-dark section-pad scroll-mt-28">
      <div className="container-apx">
        <Reveal>
          <h2>Support and add-ons</h2>
          <p className="muted mt-4 max-w-2xl">
            Every launch is followed by a period of free bug fixes. After that, a care plan keeps
            the site or app healthy.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {carePlans.map((plan) => (
            <StaggerItem key={plan.id} className="h-full">
              <article className="card-dark card-lift flex h-full flex-col p-6">
                <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-on-dark-muted">
                  {plan.forWhom}
                </p>
                <p className="mt-3 font-display text-lg font-bold text-orange">{plan.price}</p>
                <p className="muted mt-3 text-sm">{plan.text}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="card-dark h-full p-6">
              <h3 className="font-display text-xl font-semibold">Extras</h3>
              <table className="mt-4 w-full text-sm">
                <tbody className="divide-y divide-white/10">
                  {extras.map((extra) => (
                    <tr key={extra.name}>
                      <td className="py-3 pr-4 font-medium">{extra.name}</td>
                      <td className="py-3 text-right text-on-dark-muted">{extra.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal>
            <div className="card-dark h-full p-6">
              <span className="rounded-full border border-green/30 bg-green/10 px-3 py-1 text-xs font-semibold text-green-ax">
                Also offered
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold">{content?.title}</h3>
              <p className="muted mt-3 text-sm">{content?.description}</p>
              <CheckList items={content?.items ?? []} tone="dark" columns={1} />
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <span className="text-sm font-semibold text-orange">{content?.note}</span>
                <ButtonLink href="/contact" variant="outline-dark" size="sm">
                  Ask about content
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* How a project runs (light) */

function ProcessSection() {
  return (
    <section className="tone-light section-pad">
      <div className="container-apx">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight">How a project runs</h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StaggerItem key={step.number} className="h-full">
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-6">
                <p className="font-display text-sm font-bold text-orange">{step.number}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
                <p className="muted mt-2 text-sm">{step.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FinalTrio() {
  return (
    <section className="tone-dark no-orbs pb-20 pt-16">
      <div className="container-apx">
        <Reveal>
          <ContactTrio tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}
