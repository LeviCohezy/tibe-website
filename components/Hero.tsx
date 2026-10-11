"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Pic from "./Pic";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(img.current, { yPercent: 18, scale: 1.08, ease: "none", scrollTrigger: st });
      gsap.to(".hero-left", { xPercent: -30, ease: "none", scrollTrigger: st });
      gsap.to(".hero-right", { xPercent: 30, ease: "none", scrollTrigger: st });
    }, root);

    // Vervorming enkel tijdens muisbeweging; bij stilstand gaat de (dure) SVG-filter er helemaal af.
    const el = root.current!;
    const target = img.current!;
    let last = { x: 0, y: 0 }, power = 0, raf = 0;
    const loop = () => {
      power *= 0.88;
      if (power < 0.4) { target.style.filter = ""; raf = 0; return; }
      disp.current?.setAttribute("scale", power.toFixed(1));
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      power = Math.min(50, power + Math.hypot(e.clientX - last.x, e.clientY - last.y) * 0.5);
      last = { x: e.clientX, y: e.clientY };
      if (!raf && power > 2) { target.style.filter = "url(#distort)"; raf = requestAnimationFrame(loop); }
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => { ctx.revert(); cancelAnimationFrame(raf); el.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <section id="top" ref={root} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black">
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id="distort">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="1" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div ref={img} className="absolute inset-x-0 top-0 mx-auto h-full w-full max-w-[720px] will-change-transform">
        <Pic base="/img/tibe-portrait" priority sizes="(min-width: 768px) 720px, 100vw" alt="Tibe, urban designer, in zwarte streetwear met zilveren sieraden" className="h-full w-full object-cover object-top grayscale-[35%] contrast-125" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-10 md:px-10 md:pb-14">
        <p className="hero-fade mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-silver md:text-xs">✝ Collectie 01 — Antwerpen / Gent</p>
        <h1 className="relative select-none font-gothic leading-[0.8]" aria-label="Tibe">
          <span className="flex overflow-hidden text-[38vw] md:text-[24vw]">
            <span className="hero-left flex">
              <span className="hero-char glitch chrome-text inline-block" data-text="T">T</span>
              <span className="hero-char glitch chrome-text inline-block" data-text="i">i</span>
            </span>
            <span className="hero-right flex">
              <span className="hero-char glitch chrome-text inline-block" data-text="b">b</span>
              <span className="hero-char glitch chrome-text inline-block" data-text="e">e</span>
            </span>
          </span>
        </h1>
        <div className="hero-fade mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white md:text-base">ADHD-fueled <span className="text-blood">urban</span> design</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver/70">Scroll ↓</p>
        </div>
      </div>
    </section>
  );
}
