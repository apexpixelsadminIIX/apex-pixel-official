import { createFileRoute } from "@tanstack/react-router";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/work")({
  component: () => (
    <PlaceholderPage
      title="Work"
      description="Recent projects and case studies from Apex Pixels. The full work page is being built."
    />
  ),
  head: () => ({
    meta: [
      { title: "Work — Apex Pixels" },
      {
        name: "description",
        content: "Recent projects and case studies from Apex Pixels. Coming soon.",
      },
      { property: "og:title", content: "Work — Apex Pixels" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
});
