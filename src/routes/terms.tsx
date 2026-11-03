import { createFileRoute } from "@tanstack/react-router";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/terms")({
  component: () => (
    <PlaceholderPage
      title="Terms"
      description="The terms under which Apex Pixels works with clients. The full terms page is being built."
    />
  ),
  head: () => ({
    meta: [
      { title: "Terms — Apex Pixels" },
      {
        name: "description",
        content: "The terms under which Apex Pixels works with clients.",
      },
      { property: "og:title", content: "Terms — Apex Pixels" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});
