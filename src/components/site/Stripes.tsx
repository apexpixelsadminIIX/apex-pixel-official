import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Signature motif "the stripe": narrow diagonal parallelogram stripes in navy
 * and orange, tilted about 15 degrees, echoing the lion's mane in the logo.
 * With `animated`, the stripes slide in from the left one after another
 * (80ms apart, soft spring) — used by the Home hero on first load.
 */
export function Stripes({
  count = 6,
  className,
  itemClassName,
  animated = false,
}: {
  count?: number;
  className?: string;
  itemClassName?: string;
  animated?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-hidden>
      {Array.from({ length: count }).map((_, i) =>
        animated ? (
          <motion.span
            key={i}
            initial={{ x: -48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 14,
              delay: i * 0.08,
            }}
            className={cn(
              "stripe-skew block h-2.5 w-8 rounded-[2px]",
              i % 2 === 0 ? "bg-navy" : "bg-orange",
              itemClassName,
            )}
          />
        ) : (
          <span
            key={i}
            className={cn(
              "stripe-skew block h-2.5 w-8 rounded-[2px]",
              i % 2 === 0 ? "bg-navy" : "bg-orange",
              itemClassName,
            )}
          />
        ),
      )}
    </div>
  );
}
