"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { products } from "@/lib/data";
import ProductImage from "./ProductImage";
import Tilt from "./Tilt";

gsap.registerPlugin(ScrollTrigger);

// Eén gigantisch stuk per scroll: het kledingstuk zweeft in 3D naar voren.
export default function Spotlight() {
  const root = useRef<HTMLElement>(null);
  const p = products[1];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".spot-piece", { scale: 0.6, rotateY: -25, opacity: 0.2 }, {
        scale: 1, rotateY: 0, opacity: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true },
      });
      gsap.fromTo(".spot-word", { xPercent: (i) => (i ? 40 : -40) }, {
        xPercent: (i) => (i ? -10 : 10), ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="spot relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24">
      <p className="relative z-10 text-center font-mono text-xs uppercase tracking-[0.4em] text-blood">✝ Uitgelicht — {p.id}/10</p>

      <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center font-gothic leading-[0.8] text-white/[0.04]">
        <span className="spot-word text-[34vw] md:text-[22vw]">Chrome</span>
        <span className="spot-word text-[34vw] md:text-[22vw]">Puffer</span>
      </div>

      <Tilt max={10} className="relative z-10 mt-8 aspect-square w-[92vw] max-w-[760px]">
        <div className="spot-piece absolute inset-0 [transform:translateZ(80px)]">
          <div className="float absolute inset-0"><ProductImage p={p} fit="contain" /></div>
          <div className="float-shadow" />
        </div>
      </Tilt>

      <div className="relative z-10 mt-6 text-center">
        <h2 className="chrome-text font-serif text-5xl font-medium md:text-7xl">{p.name}</h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-silver">Vier delen. Eén jas. Kap en mouwen klikken los.</p>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-white">{p.price} — <span className="text-blood">Binnenkort</span></p>
      </div>
    </section>
  );
}
