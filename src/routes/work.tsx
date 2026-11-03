import { createFileRoute } from "@tanstack/react-router";

import { BrowserFrame } from "@/components/site/BrowserFrame";
import { ButtonLink } from "@/components/site/ButtonLink";
import { ContactTrio } from "@/components/site/ContactTrio";
import { Stripes } from "@/components/site/Stripes";
import { workItems } from "@/config/site";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Work — Apex Pixels" },
      {
        name: "description",
        content:
          "Selected work by Apex Pixels: websites, web apps and business software built for businesses in Chennai and across India.",
      },
      { property: "og:title", content: "Work — Apex Pixels" },
      {
        property: "og:description",
        content: "Selected work by Apex Pixels: websites, web apps and business software.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
});

function WorkPage() {
  return (
    <main>
      <header className="tone-light section-pad pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="container-apx">
          <Stripes count={6} itemClassName="h-2.5 w-9" />
          <h1 className="mt-6">Selected work</h1>
          <p className="muted mt-4 max-w-2xl">
            A look at what has been built. More projects are added as case
            studies are written.
          </p>
        </div>
      </header>

      <section className="tone-light pb-20">
        <div className="container-apx grid gap-6 md:grid-cols-2">
          {workItems.map((item) => (
            <article key={item.id} className="card-dark flex flex-col p-6">
              <BrowserFrame label={item.name} />
              <h2 className="mt-5 font-display text-xl font-semibold">
                {item.name}
              </h2>
              <p className="muted mt-2 text-sm">{item.text}</p>
              <div className="mt-6 flex flex-1 flex-wrap items-end gap-3">
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
      </section>

      <section className="tone-light pb-20">
        <div className="container-apx">
          <ContactTrio tone="light" />
        </div>
      </section>
    </main>
  );
}
