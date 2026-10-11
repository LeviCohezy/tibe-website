"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatPrice, products } from "@/lib/data";
import Pic from "./Pic";

gsap.registerPlugin(ScrollTrigger);

// Gepinde rail: verticaal scrollen schuift de stukken horizontaal voorbij.
// Desktop ± 2,5 stukken in beeld, mobiel één stuk per scherm.
export default function Collection({ kicker = "✝ 02 — Collectie 01", title = "Relikwieën" }: { kicker?: string; title?: string }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = track.current!;
      const distance = () => el.scrollWidth - innerWidth;
      const rail = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => gsap.set(".rail-progress", { scaleX: st.progress }),
        },
      });
      // elk stuk draait in, staat recht in het midden, en draait weer weg
      gsap.utils.toArray<HTMLElement>(".rail-card").forEach((card) => {
        const piece = card.querySelector(".rail-piece");
        gsap.timeline({ scrollTrigger: { trigger: card, containerAnimation: rail, start: "left right", end: "right left", scrub: true } })
          .fromTo(piece, { rotateY: -32, scale: 0.78, yPercent: 6 }, { rotateY: 0, scale: 1, yPercent: 0, ease: "none", force3D: true })
          .to(piece, { rotateY: 32, scale: 0.78, yPercent: -6, ease: "none", force3D: true });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="collectie" ref={section} className="relative flex h-[100svh] flex-col justify-center overflow-hidden bg-black">
      <div className="mb-4 flex items-end justify-between px-4 pt-16 md:mb-8 md:px-10 md:pt-0">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-blood">{kicker}</p>
          <h2 className="mt-3 font-gothic text-5xl md:text-8xl"><span className="chrome-text">{title}</span></h2>
        </div>
        <p className="hidden max-w-xs text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-silver md:block">
          Tien stuks. Zwart, zilver, leer. <br />Scroll en ze schuiven voorbij.
        </p>
      </div>

      <div ref={track} className="flex w-max will-change-transform">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/collectie/${p.slug}/`}
            data-anim
            className="rail-card group relative block h-[64svh] w-screen shrink-0 px-6 [perspective:1200px] md:h-[64vh] md:w-[40vw] md:px-4"
          >
            <div className="rail-piece spot relative h-full w-full border border-white/5">
              <div className="tilt absolute inset-[8%] bottom-[18%]">
                <div className="tilt-inner relative h-full w-full">
                  <div className="float absolute inset-0" style={{ animationDelay: `${-Number(p.id) * 0.7}s` }}>
                    <Pic base={p.img} widths={[600, 1000]} sizes="(min-width: 768px) 36vw, 88vw" alt={`${p.name} — ${p.type}`} className="feather h-full w-full object-contain" />
                  </div>
                </div>
              </div>
              <div className="float-shadow" style={{ bottom: "17%", animationDelay: `${-Number(p.id) * 0.7}s` }} />
              <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.3em] text-silver">{p.id}/10</span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-6">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-white md:text-3xl">{p.name}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-silver">{p.type}</p>
                </div>
                <div className="shrink-0 text-right font-mono text-xs uppercase tracking-[0.2em]">
                  <div className="text-white">{formatPrice(p.price)}</div>
                  <div className="mt-1 text-blood transition-transform duration-300 group-hover:translate-x-1">Bekijk →</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <div className="w-[10vw] shrink-0 md:w-[20vw]" aria-hidden />
      </div>

      <div className="mx-4 mt-6 h-px bg-white/10 md:mx-10 md:mt-8">
        <div className="rail-progress h-px origin-left scale-x-0 bg-silver" />
      </div>
    </section>
  );
}
