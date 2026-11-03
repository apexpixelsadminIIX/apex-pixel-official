import { useEffect, useRef } from "react";

/**
 * Hero background: a faint 24px square grid drawn on canvas. Squares within
 * 120px of the pointer light up in navy or orange at ~12% opacity and fade
 * out over 600ms. Uses requestAnimationFrame, caps the device pixel ratio
 * at 2, pauses when the tab is hidden or the hero is off-screen, and is
 * disabled entirely on touch devices and for prefers-reduced-motion.
 */
const CELL = 24;
const RADIUS = 120;
const FADE_MS = 600;
const MAX_ALPHA = 0.12;
const NAVY = "0, 0, 128";
const ORANGE = "252, 100, 28";

type LitCell = { cx: number; cy: number; start: number; color: string };

export function HeroGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    let pointer: { x: number; y: number } | null = null;
    const lit = new Map<string, LitCell>();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? visible;
      if (visible) start();
    });
    io.observe(canvas);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer =
        x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
          ? { x, y }
          : null;
      start();
    };
    const onPointerLeave = () => {
      pointer = null;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    const draw = (t: number) => {
      raf = 0;
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();

      if (pointer) {
        const c0x = Math.floor((pointer.x - RADIUS) / CELL);
        const c1x = Math.floor((pointer.x + RADIUS) / CELL);
        const c0y = Math.floor((pointer.y - RADIUS) / CELL);
        const c1y = Math.floor((pointer.y + RADIUS) / CELL);
        for (let cy = c0y; cy <= c1y; cy++) {
          for (let cx = c0x; cx <= c1x; cx++) {
            const centerX = cx * CELL + CELL / 2;
            const centerY = cy * CELL + CELL / 2;
            const dx = centerX - pointer.x;
            const dy = centerY - pointer.y;
            if (dx * dx + dy * dy > RADIUS * RADIUS) continue;
            const key = `${cx}:${cy}`;
            const existing = lit.get(key);
            if (existing) {
              // Keep the square lit while the pointer stays on it; it then
              // fades out over FADE_MS after the pointer moves away.
              existing.start = now;
            } else {
              lit.set(key, {
                cx,
                cy,
                start: now,
                color: (cx + cy) % 2 === 0 ? NAVY : ORANGE,
              });
            }
          }
        }
      }

      for (const [key, cell] of lit) {
        const age = now - cell.start;
        if (age >= FADE_MS) {
          lit.delete(key);
          continue;
        }
        const alpha = MAX_ALPHA * (1 - age / FADE_MS);
        ctx.fillStyle = `rgba(${cell.color}, ${alpha.toFixed(3)})`;
        ctx.fillRect(cell.cx * CELL, cell.cy * CELL, CELL, CELL);
      }

      if (lit.size > 0 || pointer) start();
    };

    const start = () => {
      if (raf === 0 && visible && pageVisible) raf = requestAnimationFrame(draw);
    };
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
