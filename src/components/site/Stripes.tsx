import { cn } from "@/lib/utils";

/**
 * Signature motif "the stripe": narrow diagonal parallelogram stripes in navy
 * and orange, tilted about 15 degrees, echoing the lion's mane in the logo.
 */
export function Stripes({
  count = 6,
  className,
  itemClassName,
}: {
  count?: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "stripe-skew block h-2.5 w-8 rounded-[2px]",
            i % 2 === 0 ? "bg-navy" : "bg-orange",
            itemClassName,
          )}
        />
      ))}
    </div>
  );
}
