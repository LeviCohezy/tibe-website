"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatPrice, products } from "@/lib/data";
import Pic from "./Pic";

gsap.registerPlugin(ScrollTrigger);

// Eén gigantisch stuk: het kledingstuk zweeft in 3D naar voren tijdens het scrollen.
export default function Spotlight() {
  const root = useRef<HTMLElement>(null);
  const p = products[1];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".spot-piece", { scale: 0.6, rotateY: -25, opacity: 0.2 }, {
        scale: 1, rotateY: 0, opacity: 1, ease: "none", force3D: true,
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
    <section ref={root} data-anim className="spot relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24">
      <p className="relative z-10 text-center font-mono text-xs uppercase tracking-[0.4em] text-blood">✝ Uitgelicht — {p.id}/10</p>

      <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center font-gothic leading-[0.8] text-white/[0.04]">
        <span className="spot-word text-[34vw] md:text-[22vw]">Chrome</span>
        <span className="spot-word text-[34vw] md:text-[22vw]">Puffer</span>
      </div>

      <Link href={`/collectie/${p.slug}/`} className="tilt relative z-10 mt-8 block aspect-square w-[92vw] max-w-[760px] [perspective:1100px]">
        <div className="spot-piece tilt-inner absolute inset-0">
          <div className="float absolute inset-0">
            <Pic base={p.img} sizes="(min-width: 768px) 760px, 92vw" alt={`${p.name} in exploded view: kap en mouwen los van het lijf`} className="feather h-full w-full object-contain" />
          </div>
          <div className="float-shadow" />
        </div>
      </Link>

      <div className="relative z-10 mt-6 text-center">
        <h2 className="chrome-text font-serif text-5xl font-medium md:text-7xl">{p.name}</h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-silver">Vier delen. Eén jas. Kap en mouwen klikken los.</p>
        <Link href={`/collectie/${p.slug}/`} className="btn mt-8">{formatPrice(p.price)} — Bekijk het stuk <span>→</span></Link>
      </div>
    </section>
  );
}
