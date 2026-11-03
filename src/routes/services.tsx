import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { ButtonLink } from "@/components/site/ButtonLink";
import { ContactTrio } from "@/components/site/ContactTrio";
import { PackageCard } from "@/components/site/PricingGrid";
import { Stripes } from "@/components/site/Stripes";
import {
  discoveryNote,
  packages,
  serviceSections,
} from "@/config/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Apex Pixels" },
      {
        name: "description",
        content:
          "Websites, web apps and business software built by Apex Pixels, with care plans, extras and clear starting prices. Based in Chennai, building for businesses anywhere in India.",
      },
      { property: "og:title", content: "Services — Apex Pixels" },
      {
        property: "og:description",
        content:
          "Websites, web apps and business software, plus care plans, extras and clear starting prices.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

function ServicesPage() {
  return (
    <main>
      <Header />
      <WebsitesSection />
      <SoftwareSection />
      <ContentSection />
      <AfterLaunch />
      <ExtrasSection />
      <PricingSection />
      <FinalTrio />
    </main>
  );
}

function PageHeader({
  title,
  sub,
}: {
  title: string;
  sub?: string;
}) {
  return (
    <header className="tone-light section-pad pb-14 pt-36 md:pb-16 md:pt-44">
      <div className="container-apx">
        <Stripes count={6} itemClassName="h-2.5 w-9" />
        <h1 className="mt-6">{title}</h1>
        {sub && <p className="muted mt-4 max-w-2xl">{sub}</p>}
      </div>
    </header>
  );
}

function Header() {
  return (
    <PageHeader
      title="What Apex Pixels builds"
      sub="Websites, web apps and business software, plus a smaller content service."
    />
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
    <ul
      className={cn(
        "mt-6 grid gap-x-8 gap-y-2.5",
        columns === 2 && "md:grid-cols-2",
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm">
          <Check
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              tone === "dark" ? "text-orange" : "text-green",
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
      <span
        className={cn(
          "font-semibold",
          tone === "dark" ? "text-orange" : "text-on-light",
        )}
      >
        Good for:{" "}
      </span>
      <span className={tone === "dark" ? "text-on-dark-muted" : "text-on-light-muted"}>
        {text}
      </span>
    </p>
  );
}

/* #websites (light) */

function WebsitesSection() {
  const websites = serviceSections.find((s) => s.id === "websites");
  const websitePackages = packages.filter((p) =>
    ["launch", "business", "professional"].includes(p.id),
  );
  const professional = packages.find((p) => p.id === "professional");
  const optionA = professional?.features[0] ?? "";
  const optionB = professional?.features[1] ?? "";

  return (
    <section id="websites" className="tone-light section-pad scroll-mt-28">
      <div className="container-apx">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          {websites?.title}
        </h2>
        <p className="muted mt-4 max-w-2xl">{websites?.description}</p>
        <GoodFor text={websites?.goodFor ?? ""} tone="light" />
        <h3 className="mt-10 font-display text-lg font-semibold">
          Typical features
        </h3>
        <CheckList items={websites?.items ?? []} tone="light" />
        <div className="mt-8">
          <ButtonLink href="/contact" size="sm">
            Send an enquiry
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-orange">
              Option A
            </p>
            <p className="muted mt-2 text-sm">{optionA}</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-orange">
              Option B
            </p>
            <p className="muted mt-2 text-sm">{optionB}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {websitePackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} showFeatures />
          ))}
        </div>
      </div>
    </section>
  );
}

/* #software (dark) */

function SoftwareSection() {
  const software = serviceSections.find((s) => s.id === "software");
  const softwarePackages = packages.filter((p) =>
    ["webapp", "suite"].includes(p.id),
  );

  return (
    <section id="software" className="tone-dark section-pad scroll-mt-28">
      <div className="container-apx">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          {software?.title}
        </h2>
        <p className="muted mt-4 max-w-2xl">{software?.description}</p>
        <GoodFor text={software?.goodFor ?? ""} tone="dark" />
        <h3 className="mt-10 font-display text-lg font-semibold">
          Typical features
        </h3>
        <CheckList items={software?.items ?? []} tone="dark" />
        <div className="mt-8">
          <ButtonLink href="/contact" size="sm">
            Send an enquiry
          </ButtonLink>
        </div>

        <div className="card-dark mt-10 max-w-3xl border-orange/25 p-6">
          <h3 className="font-display text-lg font-semibold text-orange">
            How the paid discovery step works
          </h3>
          <p className="muted mt-3 text-sm">
            {discoveryNote.text} ({discoveryNote.amounts}.)
          </p>
          <p className="muted mt-2 text-sm">{discoveryNote.payment}</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {softwarePackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} showFeatures />
          ))}
        </div>
      </div>
    </section>
  );
}

/* #content (light, visibly smaller and lighter) */

function ContentSection() {
  const content = serviceSections.find((s) => s.id === "content");

  return (
    <section id="content" className="tone-light scroll-mt-28 py-16 md:py-20">
      <div className="container-apx">
        <div className="card-light max-w-2xl p-6 md:p-8">
          <span className="rounded-full border border-green/30 bg-green/10 px-3 py-1 text-xs font-semibold text-green">
            Also offered
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">
            {content?.title}
          </h2>
          <p className="muted mt-3 text-sm">{content?.description}</p>
          <CheckList items={content?.items ?? []} tone="light" columns={1} />
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-orange">
              {content?.note}
            </span>
            <ButtonLink href="/contact" variant="outline-light" size="sm">
              Ask about content
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* After launch (dark) */

function AfterLaunch() {
  return (
    <section className="tone-dark section-pad">
      <div className="container-apx">
        <h2>After launch</h2>
        <p className="muted mt-4 max-w-2xl">
          Every launch is followed by a period of free bug fixes. After that, a
          care plan keeps the site or app healthy.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {(
            [
              ["site-care", "₹1,000 per month"],
              ["store-care", "₹3,000 per month"],
              ["app-care", "15% of the build price per year"],
            ] as const
          ).map(([id]) => {
            const plan = {
              id: id,
              name: "",
              price: "",
              forWhom: "",
              text: "",
            };
            return plan;
          })}
        </div>
      </div>
    </section>
  );
}

/* Extras (light) */

function ExtrasSection() {
  return (
    <section className="tone-light section-pad">
      <div className="container-apx">
        <h2 className="font-display text-3xl font-bold tracking-tight">Extras</h2>
        <div className="mt-8 max-w-3xl overflow-hidden rounded-2xl border border-ink/10 bg-white">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-ink/10">
              {extras.map((extra) => (
                <tr key={extra.name}>
                  <td className="px-5 py-3.5 font-medium">{extra.name}</td>
                  <td className="px-5 py-3.5 text-right text-on-light-muted">
                    {extra.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* Pricing (dark) + final trio */

function PricingSection() {
  return (
    <section className="tone-dark section-pad">
      <div className="container-apx">
        <h2>Clear starting prices</h2>
        <PricingGrid showFeatures />
      </div>
    </section>
  );
}

function FinalTrio() {
  return (
    <section className="tone-dark pb-20">
      <div className="container-apx">
        <ContactTrio tone="dark" />
      </div>
    </section>
  );
}
