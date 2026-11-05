import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

import { CaseStudyView } from "@/components/site/CaseStudyView";
import { caseStudy } from "@/config/site";

export const Route = createFileRoute("/work_/excel-packaging")({
  component: () => <CaseStudyView caseStudy={caseStudy} />,
  head: () =>
    seo({
      path: "/work/excel-packaging",
      title: "Excel Packaging and Taste Foods case study | Apex Pixels",
      description:
        "How Apex Pixels built a product catalogue, enquiry list and admin panel for Excel Packaging and Taste Foods, a Chennai packaging supplier.",
      type: "article",
    }),
});
