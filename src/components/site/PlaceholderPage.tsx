import { ButtonLink } from "./ButtonLink";
import { ContactTrio } from "./ContactTrio";
import { Stripes } from "./Stripes";

/**
 * Simple placeholder page used while later prompts build the inner pages, so
 * navigation keeps working.
 */
export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <main id="main" className="tone-light section-pad pt-36 md:pt-44">
      <div className="container-apx">
        <Stripes count={6} itemClassName="h-2.5 w-8" />
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="muted mt-4 max-w-2xl">{description}</p>
        <p className="muted mt-2 text-sm">This page is being built.</p>
        <div className="mt-8">
          <ButtonLink href="/" variant="outline-light" size="sm">
            Back to Home
          </ButtonLink>
        </div>

        <div className="mt-16">
          <ContactTrio tone="light" />
        </div>
      </div>
    </main>
  );
}
