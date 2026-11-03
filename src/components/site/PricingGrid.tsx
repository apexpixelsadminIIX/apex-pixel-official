import { packageGroups, packages, priceNote, type Package } from "@/config/site";
import { ButtonLink } from "./ButtonLink";
import { Stagger, StaggerItem } from "./Reveal";

export function PackageCard({
  pkg,
  showFeatures,
}: {
  pkg: Package;
  showFeatures: boolean;
}) {
  return (
    <article className="card-dark card-lift flex h-full flex-col p-6 hover:border-orange/40">
      <p className="text-xs font-semibold uppercase tracking-widest text-on-dark-muted">
        {pkg.label}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold">{pkg.name}</h3>
      <p className="mt-3 font-display text-4xl font-bold text-orange">
        {pkg.price}
      </p>
      <p className="mt-2 text-sm text-on-dark-muted">{pkg.timeline}</p>
      <p className="muted mt-4 text-sm">{pkg.text}</p>

      {showFeatures && (
        <>
          {pkg.discovery && (
            <p className="mt-4 rounded-xl border border-orange/30 bg-orange/10 px-3 py-2 text-xs text-orange">
              {pkg.discovery}
            </p>
          )}
          <ul className="mt-4 space-y-2 text-sm text-on-dark-muted">
            {pkg.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
                  aria-hidden
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-6 flex-1" />
      <ButtonLink
        href={`/contact?package=${pkg.id}`}
        variant="outline-dark"
        size="sm"
        className="self-start"
      >
        Get this quote
      </ButtonLink>
    </article>
  );
}

/**
 * PricingGrid renders the packages from site.ts as cards. On Home the text
 * and timeline only; on the Services page also the full features list and the
 * discovery note.
 */
export function PricingGrid({
  showFeatures = false,
}: {
  showFeatures?: boolean;
}) {
  return (
    <div>
      {(
        ["small", "serious"] as const
      ).map((group) => (
        <div key={group} className="mt-10 first:mt-0">
          <h3 className="font-display text-lg font-semibold text-on-dark-muted">
            {packageGroups[group]}
          </h3>
          <Stagger className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {packages
              .filter((p) => p.group === group)
              .map((p) => (
                <StaggerItem key={p.id} className="h-full">
                  <PackageCard pkg={p} showFeatures={showFeatures} />
                </StaggerItem>
              ))}
          </Stagger>
        </div>
      ))}
      <p className="muted mt-10 max-w-3xl text-sm">{priceNote}</p>
    </div>
  );
}
