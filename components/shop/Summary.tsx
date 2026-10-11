"use client";
import { type CartLine, totals } from "@/lib/cart";
import { bySlug, DELIVERY, type DeliveryKey, formatPrice } from "@/lib/data";
import Pic from "../Pic";

export function LineMini({ l }: { l: CartLine }) {
  const p = bySlug(l.slug);
  if (!p) return null;
  return (
    <li className="flex items-center gap-4 border-b border-white/10 py-4">
      <div className="spot relative h-16 w-16 shrink-0 border border-white/5">
        <Pic base={p.img} widths={[600]} sizes="64px" alt="" className="feather h-full w-full object-contain" />
      </div>
      <div className="flex-1">
        <div className="font-serif text-lg text-white">{p.name}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver">Maat {l.size} · {l.qty}×</div>
      </div>
      <div className="font-mono text-sm text-white">{formatPrice(p.price * l.qty)}</div>
    </li>
  );
}

export function Totals({ lines, levering }: { lines: CartLine[]; levering?: DeliveryKey }) {
  const t = totals(lines, levering ?? "standaard");
  const d = DELIVERY[levering ?? "standaard"];
  return (
    <dl className="space-y-3 font-mono text-xs uppercase tracking-[0.2em]">
      <div className="flex justify-between text-silver"><dt>Subtotaal</dt><dd className="text-white">{formatPrice(t.subtotal)}</dd></div>
      <div className="flex justify-between text-silver">
        <dt>Verzending{levering ? ` — ${d.label}` : ""}</dt>
        <dd className="text-white">{levering ? (t.shipping === 0 ? "Gratis" : formatPrice(t.shipping)) : "Volgende stap"}</dd>
      </div>
      <div className="flex justify-between border-t border-white/15 pt-4 text-sm text-white"><dt>Totaal</dt><dd>{formatPrice(levering ? t.total : t.subtotal)}</dd></div>
      <p className="pt-1 text-[10px] normal-case tracking-[0.1em] text-silver/70">Prijzen incl. 21% btw.</p>
    </dl>
  );
}
