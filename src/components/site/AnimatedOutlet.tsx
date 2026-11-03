import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useRouterState } from "@tanstack/react-router";

/**
 * Route transitions: a quick fade and 12px slide (250ms) on navigation.
 * AnimatePresence with initial={false} keeps the first render (and SSR)
 * static; only actual route changes animate.
 */
export function AnimatedOutlet() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
