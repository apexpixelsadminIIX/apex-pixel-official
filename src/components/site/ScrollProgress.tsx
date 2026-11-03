import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Scroll progress bar fixed at the top, built from alternating navy and
 * orange stripe segments.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="stripes-navy-orange fixed inset-x-0 top-0 z-[80] h-1 origin-left"
      aria-hidden
    />
  );
}
