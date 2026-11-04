import { motion } from "framer-motion";

/**
 * The logo mark with the same slow hover (a gentle up-and-down float) as the
 * Home hero. Framer Motion's MotionConfig reducedMotion="user" in the root
 * layout turns the movement off for visitors who prefer reduced motion.
 */
export function FloatingMark({
  className,
  alt = "",
  loading = "lazy",
}: {
  className?: string;
  alt?: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={`relative ${className ?? ""}`}
    >
      <img
        src="/logo-mark.webp"
        alt={alt}
        {...(alt ? {} : { "aria-hidden": true })}
        width={1472}
        height={698}
        loading={loading}
        decoding="async"
        className="relative z-10 block w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      />
    </motion.div>
  );
}
