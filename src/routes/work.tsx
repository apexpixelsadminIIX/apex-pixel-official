import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

import { BrowserFrame } from "@/components/site/BrowserFrame";
import { ButtonLink } from "@/components/site/ButtonLink";
import { ContactTrio } from "@/components/site/ContactTrio";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { Stripes } from "@/components/site/Stripes";
import { workItems } from "@/config/site";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () =>
    seo({
      path: "/work",
      title: "Selected work | Apex Pixels",
      description:
        "Selected work by Apex Pixels: a product catalogue and enquiry website for Excel Packaging and Taste Foods, and a site for Hospitality Critic Solutions.",
    }),
});

function WorkPage() {
  return (
    <main id="main">
      <header className="tone-light section-pad pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="container-apx">
          <Reveal>
            <Stripes count={6} itemClassName="h-2.5 w-9" />
            <h1 className="mt-6">Selected work</h1>
            <p className="muted mt-4 max-w-2xl">
              A look at what has been built. More projects are added as case studies are written.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="tone-light no-orbs pb-20">
        <div className="container-apx">
          <Stagger className="grid gap-6 md:grid-cols-2">
            {workItems.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <article className="card-dark card-lift flex h-full flex-col p-6">
                  <BrowserFrame label={item.name} src={item.image} fallback="Screenshot coming soon" />
                  <h2 className="mt-5 font-display text-xl font-semibold">{item.name}</h2>
                  <p className="muted mt-2 text-sm">{item.text}</p>
                  <div className="mt-6 flex flex-1 flex-wrap items-end gap-3">
                    {item.status === "live-case-study" ? (
                      <>
                        <ButtonLink href={item.href} size="sm">
                          {item.buttonLabel}
                        </ButtonLink>
                        <ButtonLink href={item.liveUrl} variant="outline-dark" size="sm">
                          Visit the live site
                        </ButtonLink>
                      </>
                    ) : (
                      <>
                        <span className="rounded-full border border-green/40 bg-green/10 px-3 py-1 text-xs font-semibold text-green-ax">
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

      <section className="tone-light no-orbs pb-20">
        <div className="container-apx">
          <Reveal>
            <ContactTrio tone="light" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
