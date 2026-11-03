import { createFileRoute } from "@tanstack/react-router";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    package: typeof search["package"] === "string" ? search["package"] : undefined,
    intent: typeof search["intent"] === "string" ? search["intent"] : undefined,
  }),
  component: () => (
    <PlaceholderPage
      title="Contact"
      description="Message on WhatsApp, book a 15-minute call, or send an enquiry. The full enquiry form is being built."
    />
  ),
  head: () => ({
    meta: [
      { title: "Contact — Apex Pixels" },
      {
        name: "description",
        content:
          "Start a conversation with Apex Pixels: message on WhatsApp, book a 15-minute call, or send an enquiry.",
      },
      { property: "og:title", content: "Contact — Apex Pixels" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});
