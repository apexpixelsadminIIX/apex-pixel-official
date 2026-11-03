import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ClipboardList, Grid2x2, Images, Lock, Smartphone, Sparkles } from "lucide-react";

import { BrowserFrame } from "@/components/site/BrowserFrame";
import { ButtonLink } from "@/components/site/ButtonLink";
import { ContactTrio } from "@/components/site/ContactTrio";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { Stripes } from "@/components/site/Stripes";
import { caseStudy } from "@/config/site";

export const Route = createFileRoute("/work_/excel-packaging")({
  component: ExcelPackagingCaseStudy,
  head: () =>
    seo({
      path: "/work/excel-packaging",
      title: "Excel Packaging and Taste Foods case study | Apex Pixels",
      description:
        "How Apex Pixels built a product catalogue, enquiry list and admin panel for Excel Packaging and Taste Foods, a Chennai packaging supplier.",
      type: "article",
    }),
});

const builtIcons: Record<string, typeof Grid2x2> = {
  grid: Grid2x2,
  images: Images,
  clipboard: ClipboardList,
  lock: Lock,
  sparkles: Sparkles,
  smartphone: Smartphone,
};

function SectionHeading({ children }: { children: string }) {
  return <h2 className="font-display text-2xl font-bold tracking-tight">{children}</h2>;
}

function ExcelPackagingCaseStudy() {
  return (
    <main id="main">
      <header className="tone-light section-pad pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="container-apx">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/15 px-3 py-1 text-xs font-semibold text-on-light-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-5">{caseStudy.title}</h1>
            <div className="mt-6">
              <ButtonLink href={caseStudy.liveUrl} size="sm">
                Visit the live site
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="tone-light space-y-16 pb-20">
        <section className="container-apx">
          <Reveal>
            <SectionHeading>The client</SectionHeading>
            <p className="muted mt-4 max-w-3xl">{caseStudy.client}</p>
          </Reveal>
        </section>

        <section className="container-apx">
          <Reveal>
            <SectionHeading>The brief</SectionHeading>
            <p className="muted mt-4 max-w-3xl">{caseStudy.brief}</p>
          </Reveal>
        </section>

        <section className="container-apx">
          <Reveal>
            <SectionHeading>What was built</SectionHeading>
          </Reveal>
          <Stagger className="mt-6 grid max-w-4xl gap-5">
            {caseStudy.built.map((item) => {
              const Icon = builtIcons[item.icon];
              return (
                <StaggerItem key={item.icon}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange/10 text-orange">
                      {Icon && <Icon className="h-5 w-5" aria-hidden />}
                    </span>
                    <span className="muted max-w-3xl text-sm">{item.text}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        <section className="container-apx">
          <Reveal>
            <SectionHeading>The look</SectionHeading>
            <p className="muted mt-4 max-w-3xl">{caseStudy.look}</p>
          </Reveal>
        </section>

        <section className="container-apx">
          <Reveal>
            <SectionHeading>Screenshots</SectionHeading>
          </Reveal>
          <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudy.screenshots.map((src, i) => (
              <StaggerItem key={src}>
                <BrowserFrame label={`${caseStudy.title} — ${i + 1}`} src={src} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section className="container-apx">
          <Reveal>
            <SectionHeading>Next project</SectionHeading>
            <article className="card-dark card-lift mt-6 flex max-w-2xl flex-col p-6">
              <span className="self-start rounded-full border border-green/40 bg-green/10 px-3 py-1 text-xs font-semibold text-green-ax">
                {caseStudy.nextProject.badge}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">
                {caseStudy.nextProject.name}
              </h3>
              <p className="muted mt-2 text-sm">
                A website for a Chennai hospitality training and consulting company.
              </p>
              <div className="mt-5">
                <ButtonLink href={caseStudy.nextProject.url} variant="outline-dark" size="sm">
                  Visit the site
                </ButtonLink>
              </div>
            </article>
          </Reveal>
        </section>

        <section className="container-apx">
          <Reveal>
            <ContactTrio tone="light" />
          </Reveal>
        </section>
      </div>

      <div className="container-apx pb-10">
        <Stripes count={6} itemClassName="h-2 w-6" />
      </div>
    </main>
  );
}
