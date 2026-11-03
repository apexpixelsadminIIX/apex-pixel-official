import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { lastUpdated, site } from "@/config/site";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms — Apex Pixels" },
      {
        name: "description",
        content:
          "The plain-words terms under which Apex Pixels publishes this website and works with clients.",
      },
      { property: "og:title", content: "Terms — Apex Pixels" },
      {
        property: "og:description",
        content:
          "The plain-words terms under which Apex Pixels publishes this website and works with clients.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function TermsPage() {
  return (
    <main className="tone-light section-pad pt-36 md:pt-44">
      <article className="container-apx max-w-3xl">
        <Reveal>
        <h1>Terms</h1>
        <p className="muted mt-2 text-sm">Last updated: {lastUpdated}</p>

        <div className="muted mt-8 space-y-5 text-sm">
          <div>
            <h2 className="font-display text-lg font-semibold text-on-light">
              About the information here
            </h2>
            <p className="mt-2">
              The information on this website is general. It describes how Apex
              Pixels works and what things usually cost; it is not a quote for a
              specific project.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-on-light">
              Prices
            </h2>
            <p className="mt-2">
              The prices shown are starting prices. The final quote for a
              project is confirmed in writing after a short call.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-on-light">
              Starting a project
            </h2>
            <p className="mt-2">
              Work begins only after a written agreement is signed and an
              advance is paid. The agreement sets out the scope, price and
              timeline.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-on-light">
              This website itself
            </h2>
            <p className="mt-2">
              The content and design of this website belong to Apex Pixels.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
