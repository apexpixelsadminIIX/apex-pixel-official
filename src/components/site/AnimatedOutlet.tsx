import { motion } from "framer-motion";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/**
 * Route transitions: the new page fades in with a small slide-up (250ms).
 * There is deliberately no exit animation. An exiting wrapper re-renders the
 * router's current Outlet, which made the old page flash (or reload) before
 * the new one appeared. The first render (and SSR) stays static.
 */
export function AnimatedOutlet() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = useRef(false);
  useEffect(() => {
    hydrated.current = true;
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={hydrated.current ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Outlet />
    </motion.div>
  );
}
