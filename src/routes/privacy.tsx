import { createFileRoute } from "@tanstack/react-router";

import { site } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy — Apex Pixels" },
      {
        name: "description",
        content: "How Apex Pixels handles the personal information sent through the enquiry form.",
      },
      { property: "og:title", content: "Privacy — Apex Pixels" },
      {
        property: "og:description",
        content: "How Apex Pixels handles the personal information sent through the enquiry form.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function PrivacyPage() {
  return (
    <main className="tone-light section-pad pt-36 md:pt-44">
      <article className="container-apx max-w-3xl">
        <h1>Privacy</h1>
        <p className="muted mt-2 text-sm">Last updated: {site.lastUpdated ?? ""}</p>

        <div className="muted mt-8 space-y-5 text-sm">
          <p>
            This page explains, in plain words, what happens to the information
            sent to Apex Pixels through this website.
          </p>
          <div>
            <h2 className="font-display text-lg font-semibold text-on-light">
              What is collected
            </h2>
            <p className="mt-2">
              The enquiry form collects a name, business name, phone or WhatsApp
              number, email address and message. Nothing else is collected.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-on-light">
              How it is used
            </h2>
            <p className="mt-2">
              The information is used only to reply to the enquiry. It is not
              sold and it is not shared for advertising.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-on-light">
              Where it goes
            </h2>
            <p className="mt-2">
              Enquiries are received by email at {site.email}. No mailing lists
              and no advertising tools are involved.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-on-light">
              Removing information
            </h2>
            <p className="mt-2">
              To have personal information deleted, ask by email at{" "}
              {site.email} and it will be deleted.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
