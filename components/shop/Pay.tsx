"use client";
import Link from "next/link";
import { useState } from "react";
import { type Order, useOrder } from "@/lib/cart";
import { bySlug, CONTACT_EMAIL, DELIVERY, formatPrice } from "@/lib/data";
import { Shell } from "./Shell";
import { LineMini, Totals } from "./Summary";

function mailto(o: Order) {
  const rows = o.lines.map((l) => {
    const p = bySlug(l.slug);
    return `- ${l.qty}× ${p?.name} (maat ${l.size}) — ${formatPrice((p?.price ?? 0) * l.qty)}`;
  });
  const i = o.info;
  const body = [
    `Nieuwe bestelling ${o.nr}`,
    `Datum: ${new Date(o.datum).toLocaleString("nl-BE")}`,
    "",
    ...rows,
    "",
    `Subtotaal: ${formatPrice(o.subtotal)}`,
    `Verzending (${DELIVERY[i.levering].label}): ${o.shipping ? formatPrice(o.shipping) : "gratis"}`,
    `Totaal: ${formatPrice(o.total)}`,
    "",
    "Klant:",
    i.naam, i.email, i.telefoon,
    i.straat, `${i.postcode} ${i.gemeente}`, i.land,
    i.opmerking ? `\nOpmerking: ${i.opmerking}` : "",
    "",
    "Status: betaling nog niet beschikbaar — bestelling vastgehouden (72 u).",
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Bestelling ${o.nr} — ${i.naam}`)}&body=${encodeURIComponent(body)}`;
}

export default function Pay() {
  const order = useOrder();
  const [sent, setSent] = useState(false);

  if (!order) {
    return (
      <Shell step={3} title="Betaling">
        <p className="font-serif text-2xl text-white/80">Er staat geen bestelling open.</p>
        <Link href="/collectie/" className="btn mt-8">Naar de collectie <span>→</span></Link>
      </Shell>
    );
  }

  return (
    <Shell step={3} title="Betaling">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="relative overflow-hidden border border-blood/60 p-8 md:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-blood" />
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood">✝ Status</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Betaling binnenkort beschikbaar — <em className="chrome-text">bestelling vastgehouden</em>.</h2>
            <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-white/75">
              Online betalen staat nog niet open. Je stukken liggen 72 uur apart onder bestelnummer <span className="font-mono text-base text-white">{order.nr}</span>. Stuur het overzicht naar Tibe en je krijgt persoonlijk een betaallink.
            </p>
            <a href={mailto(order)} onClick={() => setSent(true)} className="btn btn-solid mt-10">
              {sent ? "Opnieuw versturen" : "Stuur bestelling naar Tibe"} <span>✉</span>
            </a>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-silver" role="status">
              {sent ? "Je mailprogramma opent met het overzicht. Druk daar op verzenden." : "Opent je mailprogramma met het volledige overzicht."}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/collectie/" className="btn">Verder kijken <span>→</span></Link>
            <Link href="/account/" className="btn">Account <span>→</span></Link>
          </div>
        </div>
        <aside className="md:col-span-5">
          <div className="border border-white/10 p-6">
            <p className="label">Bestelling {order.nr}</p>
            <ul className="mt-2">{order.lines.map((l, i) => <LineMini key={i} l={l} />)}</ul>
            <div className="mt-6"><Totals lines={order.lines} levering={order.info.levering} /></div>
            <p className="mt-6 font-serif text-base leading-relaxed text-white/70">{order.info.naam} · {order.info.straat}, {order.info.postcode} {order.info.gemeente}</p>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
