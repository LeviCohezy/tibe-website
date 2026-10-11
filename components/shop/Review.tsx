"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cart, totals, useCart, useCheckoutInfo } from "@/lib/cart";
import { DELIVERY } from "@/lib/data";
import { Shell } from "./Shell";
import { LineMini, Totals } from "./Summary";

const orderNr = () => {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `TIBE-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

export default function Review() {
  const lines = useCart();
  const info = useCheckoutInfo();
  const router = useRouter();

  if (lines.length === 0 || !info) {
    return (
      <Shell step={2} title="Overzicht">
        <p className="font-serif text-2xl text-white/80">{lines.length === 0 ? "Je mand is leeg." : "We missen nog je gegevens."}</p>
        <Link href={lines.length === 0 ? "/collectie/" : "/checkout/"} className="btn mt-8">{lines.length === 0 ? "Naar de collectie" : "Gegevens invullen"} <span>→</span></Link>
      </Shell>
    );
  }

  const confirm = () => {
    const t = totals(lines, info.levering);
    cart.saveOrder({ nr: orderNr(), datum: new Date().toISOString(), lines, info, subtotal: t.subtotal, shipping: t.shipping, total: t.total });
    cart.clear();
    router.push("/checkout/pay/");
  };

  const d = DELIVERY[info.levering];
  return (
    <Shell step={2} title="Overzicht">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="space-y-12 md:col-span-7">
          <section>
            <div className="flex items-end justify-between"><h2 className="font-serif text-3xl">Je stukken</h2><Link href="/cart/" className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver hover:text-blood">Wijzig</Link></div>
            <ul className="mt-4">{lines.map((l, i) => <LineMini key={i} l={l} />)}</ul>
          </section>
          <section className="grid gap-10 sm:grid-cols-2">
            <div>
              <div className="flex items-end justify-between"><h2 className="font-serif text-3xl">Levering aan</h2><Link href="/checkout/" className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver hover:text-blood">Wijzig</Link></div>
              <address className="mt-4 font-serif text-lg not-italic leading-relaxed text-white/80">
                {info.naam}<br />{info.straat}<br />{info.postcode} {info.gemeente}<br />{info.land}
              </address>
            </div>
            <div>
              <h2 className="font-serif text-3xl">Contact</h2>
              <p className="mt-4 font-serif text-lg leading-relaxed text-white/80">{info.email}<br />{info.telefoon}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-silver">{d.label} — {d.detail}</p>
            </div>
          </section>
          {info.opmerking && <p className="border-l-2 border-blood pl-4 font-serif text-lg italic text-white/70">“{info.opmerking}”</p>}
        </div>
        <aside className="md:col-span-5">
          <div className="border border-white/10 p-6 md:sticky md:top-28">
            <Totals lines={lines} levering={info.levering} />
            <button onClick={confirm} className="btn btn-solid mt-8 w-full">Bevestig & betaal <span>→</span></button>
            <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-silver/70">Door te bevestigen houden we je stukken 72 uur voor je vast.</p>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
