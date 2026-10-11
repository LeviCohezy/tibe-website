"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { Product } from "@/lib/data";
import Pic from "./Pic";

gsap.registerPlugin(ScrollTrigger);

const short = (v: string) => v.split(/[,—(]/)[0].trim();

// Gepinde reeks: technische tekening → echte productfoto (scanlijn) → gedragen door een model (cirkelmasker).
export default function Blueprint({ p, model }: { p: Product; model?: string }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.5 },
      });
      tl.fromTo(".bp-draw", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.18, stagger: 0.01 }, 0)
        .fromTo(".bp-label", { opacity: 0 }, { opacity: 1, duration: 0.08, stagger: 0.02 }, 0.08)
        .fromTo(".bp-photo", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.34 }, 0.24)
        .fromTo(".bp-scan", { top: "0%", opacity: 1 }, { top: "100%", duration: 0.34 }, 0.24)
        .to(".bp-scan", { opacity: 0, duration: 0.03 }, 0.58)
        .to(".bp-notes", { opacity: 0.18, duration: 0.1 }, 0.5)
        .to(".bp-cap-0", { opacity: 0.25, duration: 0.05 }, 0.24)
        .fromTo(".bp-cap-1", { opacity: 0.25 }, { opacity: 1, duration: 0.05 }, 0.3);
      if (model) {
        tl.fromTo(".bp-model", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", duration: 0.3 }, 0.64)
          .to(".bp-notes", { opacity: 0, duration: 0.05 }, 0.64)
          .to(".bp-cap-1", { opacity: 0.25, duration: 0.05 }, 0.66)
          .fromTo(".bp-cap-2", { opacity: 0.25 }, { opacity: 1, duration: 0.05 }, 0.7)
          .to({}, { duration: 0.06 });
      } else {
        tl.to({}, { duration: 0.12 });
      }
    }, root);
    return () => ctx.revert();
  }, [model]);

  const steps = ["Tekening", "Stuk", ...(model ? ["Gedragen"] : [])];
  const a = p.spec[0], b = p.spec[Math.min(3, p.spec.length - 1)];

  return (
    <section ref={root} className="relative border-t border-white/10 bg-black" style={{ height: model ? "340vh" : "240vh" }}>
      <div data-anim className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-4">
        <div className="mb-5 flex w-full max-w-[min(78svh,92vw)] items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-blood">✝ Van tekening tot stuk</p>
            <ol className="mt-3 flex gap-5 font-mono text-[10px] uppercase tracking-[0.3em]">
              {steps.map((s, i) => (
                <li key={s} className={`bp-cap-${i} text-white`} style={{ opacity: i === 0 ? 1 : 0.25 }}>
                  {String(i + 1).padStart(2, "0")} {s}
                </li>
              ))}
            </ol>
          </div>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-silver sm:block">Scroll ↓</p>
        </div>

        <div className="relative aspect-square w-[min(78svh,92vw)] overflow-hidden border border-blueprint/20 bg-[#03050a]">
          {/* raster */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(176,200,230,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(176,200,230,.09) 1px, transparent 1px), linear-gradient(rgba(176,200,230,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(176,200,230,.04) 1px, transparent 1px)",
              backgroundSize: "10% 10%, 10% 10%, 2% 2%, 2% 2%",
            }}
          />
          <Pic base={`/img/blueprints/${p.img.split("/").pop()}`} widths={[600, 1000]} sizes="(min-width: 768px) 78vh, 92vw" alt={`Technische tekening van de ${p.name}`} className="absolute inset-0 h-full w-full object-contain mix-blend-screen" />

          {/* annotaties */}
          <svg className="bp-notes pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" fill="none" stroke="#b0c8e6" strokeWidth="1.5" aria-hidden>
            <g>
              <path pathLength={1} className="bp-draw" strokeDasharray="1" d="M90 70 H910 M90 58 V82 M910 58 V82" />
              <path pathLength={1} className="bp-draw" strokeDasharray="1" d="M940 110 V890 M928 110 H952 M928 890 H952" />
              <path pathLength={1} className="bp-draw" strokeDasharray="1" d="M370 380 L190 250 H60" />
              <circle pathLength={1} className="bp-draw" strokeDasharray="1" cx="370" cy="380" r="9" />
              <path pathLength={1} className="bp-draw" strokeDasharray="1" d="M640 650 L800 790 H950" />
              <circle pathLength={1} className="bp-draw" strokeDasharray="1" cx="640" cy="650" r="9" />
            </g>
            <g fill="#b0c8e6" stroke="none" fontFamily="var(--font-mono), monospace" fontSize="17" letterSpacing="3">
              <text className="bp-label" x="500" y="52" textAnchor="middle">B — BREEDTE</text>
              <text className="bp-label" x="965" y="500" transform="rotate(90 965 500)" textAnchor="middle">H — HOOGTE</text>
              <text className="bp-label" x="60" y="238">A — {short(a[1]).toUpperCase()}</text>
              <text className="bp-label" x="950" y="778" textAnchor="end">C — {short(b[1]).toUpperCase()}</text>
            </g>
            <g className="bp-label" stroke="#b0c8e6" strokeWidth="1">
              <rect x="660" y="860" width="290" height="110" />
              <path d="M660 895 H950 M660 930 H950 M805 930 V970" />
              <g fill="#b0c8e6" stroke="none" fontFamily="var(--font-mono), monospace" fontSize="15" letterSpacing="2.5">
                <text x="672" y="884">TIBE — {p.name.toUpperCase()}</text>
                <text x="672" y="919">REF TIBE-C01-{p.id}</text>
                <text x="672" y="956">SCHAAL 1:4</text>
                <text x="817" y="956">BLAD 1/1</text>
              </g>
            </g>
          </svg>

          {/* echte foto, onthuld door een scanlijn */}
          <div className="bp-photo absolute inset-0" style={{ clipPath: "inset(0% 0% 100% 0%)" }}>
            <Pic base={p.img} widths={[600, 1000]} sizes="(min-width: 768px) 78vh, 92vw" alt={`${p.name} — productfoto`} className="h-full w-full object-contain" />
          </div>
          <div className="bp-scan pointer-events-none absolute inset-x-0 h-px bg-blueprint shadow-[0_0_18px_4px_rgba(176,200,230,.55)]" style={{ top: 0 }} />

          {/* gedragen */}
          {model && (
            <div className="bp-model absolute inset-0" style={{ clipPath: "circle(0% at 50% 50%)" }}>
              <Pic base={model} widths={[600, 1000]} sizes="(min-width: 768px) 78vh, 92vw" alt={`${p.name} gedragen door een model`} className="h-full w-full object-cover object-top" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
