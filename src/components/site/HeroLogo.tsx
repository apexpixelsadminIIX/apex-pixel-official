import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, type RefObject } from "react";

import { Stripes } from "./Stripes";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Home hero's logo: the mark with its two stripe bands, a slow float and a
 * soft follow-the-cursor parallax. `containerRef` is the section whose pointer
 * movement drives the parallax (desktop mouse only, never with reduced motion).
 */
export function HeroLogo({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const x = useSpring(parallaxX, { stiffness: 60, damping: 18 });
  const y = useSpring(parallaxY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      parallaxX.set(Math.max(-12, Math.min(12, nx * 24)));
      parallaxY.set(Math.max(-12, Math.min(12, ny * 24)));
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [containerRef, parallaxX, parallaxY]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
      style={{ x, y }}
      className="w-full max-w-xs"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Stripes
          count={7}
          itemClassName="h-3 w-12"
          className="absolute -top-8 -left-6 rotate-[18deg] opacity-80"
        />
        <Stripes
          count={5}
          itemClassName="h-2.5 w-10"
          className="absolute bottom-2 -right-4 -rotate-[14deg] opacity-80"
        />
        <img
          src="/logo-mark.webp"
          alt="The Apex Pixels mark: a lion inside a downward triangle"
          width={1472}
          height={698}
          className="relative z-10 w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        />
      </motion.div>
    </motion.div>
  );
}
