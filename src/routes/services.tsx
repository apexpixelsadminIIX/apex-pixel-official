import { createFileRoute } from "@tanstack/react-router";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/services")({
  component: () => (
    <PlaceholderPage
      title="Services"
      description="Websites, web apps, business software, care plans and extra services. The full services page is being built."
    />
  ),
  head: () => ({
    meta: [
      { title: "Services — Apex Pixels" },
      {
        name: "description",
        content:
          "Websites, web apps and business software built by Apex Pixels, with care plans and extra services. Coming soon.",
      },
      { property: "og:title", content: "Services — Apex Pixels" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});
