"use client";
import Link from "next/link";
import { cart, useCart } from "@/lib/cart";
import { bySlug, formatPrice } from "@/lib/data";
import Pic from "../Pic";
import { Shell } from "./Shell";
import { Totals } from "./Summary";

export default function Cart() {
  const lines = useCart();
  return (
    <Shell step={0} title="Je mand">
      {lines.length === 0 ? (
        <div className="border border-white/10 p-10 text-center md:p-20">
          <p className="font-serif text-3xl text-white/80">Nog niets in je mand.</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-silver">De relikwieën wachten.</p>
          <Link href="/collectie/" className="btn mt-10">Naar de collectie <span>→</span></Link>
        </div>
      ) : (
        <div className="grid gap-14 md:grid-cols-12">
          <ul className="md:col-span-8">
            {lines.map((l, i) => {
              const p = bySlug(l.slug);
              if (!p) return null;
              return (
                <li key={`${l.slug}-${l.size}`} className="flex gap-4 border-b border-white/10 py-6 md:gap-6">
                  <Link href={`/collectie/${p.slug}/`} className="spot relative aspect-square w-24 shrink-0 border border-white/5 md:w-32">
                    <Pic base={p.img} widths={[600]} sizes="128px" alt={p.name} className="feather h-full w-full object-contain" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link href={`/collectie/${p.slug}/`} className="font-serif text-2xl text-white hover:text-silver">{p.name}</Link>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver">{p.type}</p>
                      </div>
                      <p className="font-mono text-sm text-white">{formatPrice(p.price * l.qty)}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <label className="flex items-center gap-2">
                        <span className="label">Maat</span>
                        <select value={l.size} onChange={(e) => cart.setSize(i, e.target.value)} className="border border-white/20 bg-black px-2 py-2 font-mono text-xs text-white">
                          {p.sizes.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </label>
                      <div className="flex items-center border border-white/20">
                        <button onClick={() => cart.setQty(i, l.qty - 1)} className="px-3 py-2 font-mono text-white hover:text-blood" aria-label={`Eén ${p.name} minder`}>−</button>
                        <span className="w-7 text-center font-mono text-xs tabular-nums">{l.qty}</span>
                        <button onClick={() => cart.setQty(i, l.qty + 1)} className="px-3 py-2 font-mono text-white hover:text-blood" aria-label={`Eén ${p.name} meer`}>+</button>
                      </div>
                      <button onClick={() => cart.remove(i)} className="font-mono text-[10px] uppercase tracking-[0.25em] text-silver underline-offset-4 hover:text-blood hover:underline">Verwijder</button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <aside className="md:col-span-4">
            <div className="border border-white/10 p-6 md:sticky md:top-28">
              <Totals lines={lines} />
              <Link href="/checkout/" className="btn btn-solid mt-8 w-full">Afrekenen <span>→</span></Link>
              <Link href="/collectie/" className="mt-4 block text-center font-mono text-[10px] uppercase tracking-[0.3em] text-silver hover:text-white">Verder winkelen</Link>
            </div>
          </aside>
        </div>
      )}
    </Shell>
  );
}
