import { createFileRoute } from "@tanstack/react-router";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/about")({
  component: () => (
    <PlaceholderPage
      title="About"
      description="The story of Apex Pixels, told by founder Manish. S. The full about page is being built."
    />
  ),
  head: () => ({
    meta: [
      { title: "About — Apex Pixels" },
      {
        name: "description",
        content:
          "The story of Apex Pixels, a Chennai business that builds websites, web apps and business software. Founded by Manish. S.",
      },
      { property: "og:title", content: "About — Apex Pixels" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});
