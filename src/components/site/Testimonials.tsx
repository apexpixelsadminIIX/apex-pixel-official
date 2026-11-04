import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { testimonials } from "@/config/site";
import { Reveal } from "./Reveal";

const VISIBLE = 4;

export function Testimonials() {
  const scroller = useRef<HTMLUListElement>(null);
  const carousel = testimonials.length > VISIBLE;
  const placeholders = carousel ? 0 : VISIBLE - testimonials.length;

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth / 2), behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="tone-light section-pad">
      <div className="container-apx">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold tracking-tight">What clients say</h2>
            {carousel && (
              <div className="flex gap-2">
                {([-1, 1] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => scrollBy(dir)}
                    aria-label={dir === -1 ? "Previous testimonials" : "Next testimonials"}
                    className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-white transition-colors hover:border-orange hover:text-orange"
                  >
                    {dir === -1 ? (
                      <ChevronLeft className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <ul
          ref={scroller}
          className={
            carousel
              ? "mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]"
              : "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          }
          aria-label="Client testimonials"
          tabIndex={carousel ? 0 : undefined}
        >
          {testimonials.map((t) => (
            <li
              key={t.name + t.quote.slice(0, 12)}
              className={
                carousel
                  ? "w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
                  : ""
              }
            >
              <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6">
                <Quote className="h-6 w-6 text-orange" aria-hidden />
                <blockquote className="muted mt-4 flex-1 text-sm">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="text-on-light-muted">{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
          {Array.from({ length: placeholders }).map((_, i) => (
            <li key={`soon-${i}`}>
              <div className="flex h-full min-h-44 flex-col justify-between rounded-2xl border border-dashed border-ink/15 p-6">
                <Quote className="h-6 w-6 text-ink/20" aria-hidden />
                <p className="text-sm text-on-light-muted">Client feedback will appear here.</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
