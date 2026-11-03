import { createFileRoute } from "@tanstack/react-router";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/privacy")({
  component: () => (
    <PlaceholderPage
      title="Privacy"
      description="How Apex Pixels handles personal information. The full privacy policy is being built."
    />
  ),
  head: () => ({
    meta: [
      { title: "Privacy — Apex Pixels" },
      {
        name: "description",
        content: "How Apex Pixels handles personal information.",
      },
      { property: "og:title", content: "Privacy — Apex Pixels" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});
