import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { whatsappUrl } from "@/config/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Floating WhatsApp button, bottom right on every page. Green circle with a
 * white WhatsApp glyph; on desktop it expands to "Chat on WhatsApp" on hover.
 * One gentle attention pulse 6 seconds after the page loads, then still.
 */
export function WhatsAppFab() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setPulse(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      animate={pulse ? { scale: [1, 1.12, 1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      onAnimationComplete={() => setPulse(false)}
      className="group fixed bottom-5 right-5 z-[65] flex h-13 items-center overflow-hidden rounded-full bg-green text-white shadow-pill transition-all duration-300 hover:pr-5"
    >
      <span className="grid h-13 w-13 shrink-0 place-items-center">
        <WhatsAppIcon className="h-6 w-6" />
      </span>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-44 group-hover:pl-1 md:inline-block">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
