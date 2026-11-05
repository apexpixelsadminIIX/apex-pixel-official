import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

import { CaseStudyView } from "@/components/site/CaseStudyView";
import { hcsCaseStudy } from "@/config/site";

export const Route = createFileRoute("/work_/hospitality-critic")({
  component: () => <CaseStudyView caseStudy={hcsCaseStudy} />,
  head: () =>
    seo({
      path: "/work/hospitality-critic",
      title: "Hospitality Critic Solutions case study | Apex Pixels",
      description:
        "How Apex Pixels built an eight-page website for Hospitality Critic Solutions, a Chennai hospitality training and consulting company.",
      type: "article",
    }),
});
