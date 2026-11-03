import { createFileRoute } from "@tanstack/react-router";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/work/excel-packaging")({
  component: () => (
    <PlaceholderPage
      title="Excel Packaging and Taste Foods"
      description="A product catalogue and enquiry website for a Chennai packaging supplier. The full case study is being built."
    />
  ),
  head: () => ({
    meta: [
      { title: "Excel Packaging and Taste Foods — Case study — Apex Pixels" },
      {
        name: "description",
        content:
          "A product catalogue and enquiry website built by Apex Pixels for a Chennai packaging supplier.",
      },
      { property: "og:title", content: "Excel Packaging and Taste Foods — Case study — Apex Pixels" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/work/excel-packaging" },
    ],
    links: [{ rel: "canonical", href: "/work/excel-packaging" }],
  }),
});
