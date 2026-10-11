"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cart } from "@/lib/cart";
import { bySlug, formatPrice, type Product } from "@/lib/data";
import Blueprint from "./Blueprint";
import Pic from "./Pic";

type Slide = { base: string; alt: string; kind: "product" | "model" };

function Gallery({ p, models }: { p: Product; models: string[] }) {
  const slides: Slide[] = [
    { base: p.img, alt: `${p.name} — productfoto`, kind: "product" },
    ...models.map((m, i) => ({ base: m, alt: `${p.name} gedragen — look ${i + 1}`, kind: "model" as const })),
  ];
  const strip = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const root = strip.current!;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setIndex(Number((e.target as HTMLElement).dataset.i)); }),
      { root, threshold: 0.6 },
    );
    root.querySelectorAll("[data-i]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const n = (i + slides.length) % slides.length;
    strip.current!.scrollTo({ left: n * strip.current!.clientWidth, behavior: "smooth" });
  };

  return (
    <div>
      <div className="relative">
        <div ref={strip} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-roledescription="carrousel">
          {slides.map((s, i) => (
            <div key={s.base} data-i={i} className={`relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden ${s.kind === "product" ? "spot" : "bg-ink"}`} aria-label={`${i + 1} van ${slides.length}`}>
              <Pic
                base={s.base}
                priority={i === 0}
                sizes="(min-width: 768px) 58vw, 100vw"
                alt={s.alt}
                fallback="Modelshoot volgt"
                className={s.kind === "product" ? "feather h-full w-full object-contain p-[6%]" : "h-full w-full object-cover"}
              />
            </div>
          ))}
        </div>
        {slides.length > 1 && (
          <>
            <button onClick={() => go(index - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 border border-white/20 bg-black/60 px-3 py-2 font-mono text-xs text-white hover:border-blood" aria-label="Vorige foto">←</button>
            <button onClick={() => go(index + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 border border-white/20 bg-black/60 px-3 py-2 font-mono text-xs text-white hover:border-blood" aria-label="Volgende foto">→</button>
            <span className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.3em] text-silver">{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          </>
        )}
      </div>
      {slides.length > 1 && (
        <div className="mt-3 flex gap-2">
          {slides.map((s, i) => (
            <button key={s.base} onClick={() => go(i)} aria-label={`Toon foto ${i + 1}`} className={`relative aspect-square w-16 overflow-hidden border transition-colors md:w-20 ${i === index ? "border-silver" : "border-white/10 opacity-50 hover:opacity-100"} ${s.kind === "product" ? "spot" : ""}`}>
              <Pic base={s.base} widths={[600]} sizes="80px" alt="" className={s.kind === "product" ? "h-full w-full object-contain" : "h-full w-full object-cover"} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BuyBox({ p }: { p: Product }) {
  const single = p.sizes.length === 1;
  const [size, setSize] = useState<string | null>(single ? p.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState(false);
  const [added, setAdded] = useState(false);

  const add = () => {
    if (!size) { setWarn(true); return; }
    cart.add(p.slug, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 4000);
  };

  return (
    <div className="md:sticky md:top-28">
      <nav className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver">
        <Link href="/collectie/" className="hover:text-white">Collectie</Link> <span className="text-white/30">/</span> {p.id}/10
      </nav>
      <h1 className="mt-4 font-serif text-5xl font-medium leading-none md:text-7xl">{p.name}</h1>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-silver">{p.type}</p>
      <p className="mt-6 font-mono text-xl text-white">{formatPrice(p.price)}</p>
      <p className="mt-6 max-w-md font-serif text-xl leading-relaxed text-white/75">{p.blurb}</p>

      <fieldset className="mt-10">
        <legend className="label flex w-full justify-between">
          <span>Maat {size && <span className="text-white">— {size}</span>}</span>
          {warn && !size && <span className="text-blood">Kies eerst een maat</span>}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setSize(s); setWarn(false); }}
              aria-pressed={size === s}
              className={`min-w-14 border px-4 py-3 font-mono text-xs tracking-[0.15em] transition-colors ${size === s ? "border-white bg-white text-black" : "border-white/20 text-white hover:border-white/60"} ${warn && !size ? "border-blood/70" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex items-stretch gap-3">
        <div className="flex items-center border border-white/20">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 font-mono text-white hover:text-blood" aria-label="Eén minder">−</button>
          <span className="w-8 text-center font-mono text-sm tabular-nums" aria-live="polite">{qty}</span>
          <button type="button" onClick={() => setQty((q) => Math.min(9, q + 1))} className="px-4 py-3 font-mono text-white hover:text-blood" aria-label="Eén meer">+</button>
        </div>
        <button type="button" onClick={add} className="btn btn-solid flex-1">In mijn mand <span className="font-gothic text-xl">✝</span></button>
      </div>

      <div className={`mt-4 flex items-center justify-between border border-white/15 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 ${added ? "opacity-100" : "pointer-events-none opacity-0"}`} role="status">
        <span>Toegevoegd — {qty}× {size}</span>
        <Link href="/cart/" className="text-blood hover:text-white">Bekijk mand →</Link>
      </div>

      <ul className="mt-8 space-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-silver">
        <li>✝ Gratis standaardverzending vanaf € 250</li>
        <li>✝ Retour binnen 14 dagen</li>
        <li>✝ Elk stuk genummerd en verpakt in zwart</li>
      </ul>
    </div>
  );
}

function SpecSheet({ p }: { p: Product }) {
  return (
    <section className="border-t border-white/10 px-4 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-blood">✝ Technische fiche</p>
          <h2 className="mt-4 font-gothic text-5xl md:text-6xl"><span className="chrome-text">Materiaal</span></h2>
          <p className="mt-6 font-mono text-[10px] uppercase leading-loose tracking-[0.3em] text-silver">
            Ref. TIBE-C01-{p.id}<br />Collectie 01 — Relikwieën<br />Serie van 100, genummerd
          </p>
        </div>
        <dl className="md:col-span-5">
          {p.spec.map(([k, v], i) => (
            <div key={k} data-reveal style={{ transitionDelay: `${i * 60}ms` }} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-white/10 py-4 md:grid-cols-[9rem_1fr]">
              <dt className="label pt-1">{k}</dt>
              <dd className="font-serif text-lg text-white">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="md:col-span-3">
          <h3 className="label">Onderhoud</h3>
          <ul className="mt-4 space-y-3 font-serif text-lg text-white/80">
            {p.care.map((c) => <li key={c} className="flex gap-3"><span className="text-blood">✝</span>{c}</li>)}
          </ul>
          <div className="mt-10 border border-white/10 p-4 font-mono text-[10px] uppercase leading-loose tracking-[0.25em] text-silver">
            Ontworpen in Vlaanderen.<br />Gemaakt in kleine oplage.<br />Draag het tot het van jou is.
          </div>
        </div>
      </div>
    </section>
  );
}

function Related({ slugs }: { slugs: string[] }) {
  const items = slugs.map(bySlug).filter((x): x is Product => !!x);
  return (
    <section className="border-t border-white/10 px-4 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-4xl md:text-5xl">Draag het <em className="chrome-text">samen</em></h2>
          <Link href="/collectie/" className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver hover:text-white">Volledige collectie →</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {items.map((r) => (
            <Link key={r.slug} href={`/collectie/${r.slug}/`} className="tilt group block">
              <div className="tilt-inner spot relative aspect-[3/4] border border-white/5">
                <Pic base={r.img} widths={[600]} sizes="(min-width: 768px) 25vw, 50vw" alt={r.name} className="feather absolute inset-[8%] h-[84%] w-[84%] object-contain" />
              </div>
              <div className="mt-3 flex justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-white">{r.name}</span>
                <span className="text-silver">{formatPrice(r.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductDetail({ slug, models, related }: { slug: string; models: string[]; related: string[] }) {
  const p = bySlug(slug)!;
  return (
    <main className="bg-black pt-20 md:pt-24">
      <section className="px-4 pb-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7"><Gallery p={p} models={models} /></div>
          <div className="md:col-span-5"><BuyBox p={p} /></div>
        </div>
      </section>
      <Blueprint p={p} model={models[0]} />
      <SpecSheet p={p} />
      <Related slugs={related} />
    </main>
  );
}
