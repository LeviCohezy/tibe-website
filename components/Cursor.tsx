"use client";
import { useEffect, useRef } from "react";

// Custom cursor + korte zilveren trail. De RAF-lus draait enkel terwijl de muis beweegt
// of de trail nog uitdooft; daarna stopt hij volledig.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const resize = () => { cv.width = innerWidth; cv.height = innerHeight; };
    resize();
    addEventListener("resize", resize);

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const pts: { x: number; y: number; life: number }[] = [];
    let hover = false, raf = 0, running = false, t = 0;

    const loop = () => {
      t += 0.05;
      ringPos.x += (mouse.x - ringPos.x) * 0.2;
      ringPos.y += (mouse.y - ringPos.y) * 0.2;
      ring.current!.style.transform = `translate3d(${ringPos.x}px,${ringPos.y}px,0) translate(-50%,-50%) scale(${hover ? 2.2 : 1})`;

      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const p of pts) p.life -= 0.05;
      while (pts.length && pts[0].life <= 0) pts.shift();
      ctx.lineCap = "round";
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        const w = Math.sin(t * 3 + i * 0.6) * (1 - b.life) * 8;
        ctx.strokeStyle = `rgba(220,223,228,${b.life * 0.5})`;
        ctx.lineWidth = b.life * 5;
        ctx.beginPath(); ctx.moveTo(a.x + w, a.y - w); ctx.lineTo(b.x - w, b.y + w); ctx.stroke();
      }
      const settled = Math.abs(mouse.x - ringPos.x) < 0.5 && Math.abs(mouse.y - ringPos.y) < 0.5;
      if (pts.length === 0 && settled) { running = false; return; }
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX; mouse.y = e.clientY;
      dot.current!.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0) translate(-50%,-50%)`;
      pts.push({ x: mouse.x, y: mouse.y, life: 1 });
      if (pts.length > 18) pts.shift();
      hover = !!(e.target as HTMLElement).closest?.("a, button, [data-hover], input, textarea, select, label");
      if (!running) { running = true; raf = requestAnimationFrame(loop); }
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", onMove); removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block" aria-hidden>
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <div ref={ring} className="absolute left-0 top-0 h-9 w-9 rounded-full border border-white/60 will-change-transform" />
      <div ref={dot} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white will-change-transform" />
    </div>
  );
}
