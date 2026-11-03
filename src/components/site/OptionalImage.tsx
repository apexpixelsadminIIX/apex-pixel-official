import { useEffect, useState } from "react";

/**
 * Renders `src` only after the browser confirms the file exists, so a missing
 * file never flashes a broken image. Shows the fallback until then.
 */
export function OptionalImage({
  src,
  alt,
  className,
  fallback = null,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}) {
  const [state, setState] = useState<"checking" | "ok" | "fail">("checking");

  useEffect(() => {
    let alive = true;
    const probe = new Image();
    probe.onload = () => {
      if (alive) setState("ok");
    };
    probe.onerror = () => {
      if (alive) setState("fail");
    };
    probe.src = src;
    return () => {
      alive = false;
    };
  }, [src]);

  if (state !== "ok") return <>{fallback}</>;
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}
