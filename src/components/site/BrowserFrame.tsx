import { cn } from "@/lib/utils";

/**
 * Browser-frame image slot. Without `src` it renders a gradient placeholder
 * with the label; with `src` it shows the image and falls back to a tidy
 * placeholder if the file is missing.
 */
export function BrowserFrame({
  label,
  src,
  fallback = "Screenshot coming soon",
  className,
}: {
  label: string;
  src?: string;
  fallback?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("overflow-hidden rounded-xl border border-white/10", className)}
    >
      <div className="flex items-center gap-1.5 bg-ink-2 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden />
        <span className="ml-2 grid h-5 flex-1 place-items-center overflow-hidden rounded-full bg-white/5 px-3 text-left text-[10px] text-white/30">
          {label}
        </span>
      </div>
      {src ? (
        <ScreenshotSlot src={src} label={fallback} />
      ) : (
        <div className="grid aspect-video place-items-center bg-gradient-to-br from-navy/50 via-ink-2 to-ink">
          <span className="font-display text-sm font-semibold text-on-dark-muted">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

function ScreenshotSlot({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative grid aspect-video place-items-center bg-gradient-to-br from-navy/50 via-ink-2 to-ink">
      <img
        src={src}
        alt="Website screenshot"
        loading="lazy"
        className="h-full w-full object-cover"
        onError={(e) => {
          const img = e.currentTarget;
          img.style.display = "none";
          const next = img.nextElementSibling;
          if (next instanceof HTMLElement) next.style.display = "grid";
        }}
      />
      <span
        className="hidden place-items-center font-display text-sm font-semibold text-on-dark-muted"
      >
        {label}
      </span>
    </div>
  );
}
