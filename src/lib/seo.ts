import { site } from "@/config/site";

/** Absolute URL for a path, built from site.siteUrl so the domain can change in one place. */
export const absoluteUrl = (path: string) => new URL(path, site.siteUrl).toString();

type SeoInput = { path: string; title: string; description: string; type?: string };

/** Title, description, Open Graph, Twitter and canonical tags for one route. */
export function seo({ path, title, description, type = "website" }: SeoInput) {
  const url = absoluteUrl(path);
  const image = absoluteUrl("/og-image.png");
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
