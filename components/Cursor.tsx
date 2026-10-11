"use client";
import { useEffect, useRef } from "react";

// Custom cursor + vervormde zilveren trail op canvas.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      cv.width = innerWidth * dpr;
      cv.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...mouse };
    const pts: { x: number; y: number; life: number }[] = [];
    let hover = false;
    let t = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      pts.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (pts.length > 40) pts.shift();
      const el = e.target as HTMLElement;
      hover = !!el.closest("a, button, [data-hover], input, textarea");
    };
    addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      t += 0.05;
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%,-50%)`;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%) scale(${hover ? 2.2 : 1})`;
        ring.current.style.borderColor = hover ? "var(--blood)" : "rgba(233,235,239,.6)";
      }

      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const p of pts) p.life -= 0.025;
      while (pts.length && pts[0].life <= 0) pts.shift();
      if (pts.length > 2) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1], b = pts[i];
          // wobble = distortion op de trail
          const w = Math.sin(t * 3 + i * 0.6) * (1 - b.life) * 10;
          ctx.strokeStyle = `rgba(220,223,228,${b.life * 0.55})`;
          ctx.lineWidth = b.life * 6;
          ctx.beginPath();
          ctx.moveTo(a.x + w, a.y - w);
          ctx.lineTo(b.x - w, b.y + w);
          ctx.stroke();
          if (i % 6 === 0) {
            ctx.fillStyle = `rgba(179,7,15,${b.life * 0.5})`;
            ctx.fillRect(b.x + w * 2, b.y, 2, 2);
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full mix-blend-screen" />
      <div ref={ring} className="absolute left-0 top-0 h-9 w-9 rounded-full border transition-[border-color,scale] duration-200" />
      <div ref={dot} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white" />
    </div>
  );
}
