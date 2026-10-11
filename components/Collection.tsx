"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { products } from "@/lib/data";
import ProductImage from "./ProductImage";

gsap.registerPlugin(ScrollTrigger);

export default function Collection() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - innerWidth;
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (st) => gsap.set(".collection-progress", { scaleX: st.progress }),
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="collectie" ref={section} className="relative overflow-hidden bg-black py-24 md:flex md:h-screen md:flex-col md:justify-center md:py-0">
      <div className="mb-10 flex items-end justify-between px-4 md:mb-12 md:px-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-blood">✝ 02 — Collectie 01</p>
          <h2 className="mt-4 font-gothic text-6xl md:text-8xl"><span className="chrome-text">Relikwieën</span></h2>
        </div>
        <p className="hidden max-w-xs text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-silver md:block">
          Tien stuks. Zwart, zilver, leer. <br />Drop binnenkort.
        </p>
      </div>

      <div ref={track} className="grid grid-cols-2 gap-3 px-4 md:flex md:w-max md:gap-6 md:px-10">
        {products.map((p) => (
          <article key={p.id} data-hover className="group relative aspect-[3/4] overflow-hidden bg-ink md:h-[62vh] md:w-auto">
            <ProductImage p={p} className="transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/55" />
            <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.3em] text-silver md:left-5 md:top-5">{p.id}/10</span>
            <div className="absolute inset-x-0 bottom-0 translate-y-0 p-3 transition-transform duration-500 md:translate-y-full md:p-6 md:group-hover:translate-y-0">
              <h3 className="font-serif text-xl font-semibold text-white md:text-3xl">{p.name}</h3>
              <p className="mt-1 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-silver md:block">{p.type}</p>
              <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] md:mt-4 md:text-xs">
                <span className="text-white">{p.price}</span>
                <span className="text-blood"><span className="hidden md:inline">Binnenkort </span>✝</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-10 mt-10 hidden h-px bg-white/10 md:block">
        <div className="collection-progress h-px origin-left scale-x-0 bg-silver" />
      </div>
    </section>
  );
}
