"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cart, type CheckoutInfo, useCart, useCheckoutInfo } from "@/lib/cart";
import { bySlug, DELIVERY, type DeliveryKey, formatPrice } from "@/lib/data";
import { Shell } from "./Shell";
import { Totals } from "./Summary";

const EMPTY: CheckoutInfo = { naam: "", email: "", telefoon: "", straat: "", postcode: "", gemeente: "", land: "België", levering: "standaard", opmerking: "" };
const LANDEN = ["België", "Nederland", "Luxemburg"];

type Errors = Partial<Record<keyof CheckoutInfo | "maten", string>>;

function validate(v: CheckoutInfo, matenOk: boolean): Errors {
  const e: Errors = {};
  if (v.naam.trim().length < 2) e.naam = "Vul je volledige naam in.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Dit e-mailadres klopt niet.";
  if (v.telefoon.replace(/\D/g, "").length < 9) e.telefoon = "Minstens 9 cijfers, bv. +32 470 12 34 56.";
  if (!/\d/.test(v.straat) || v.straat.trim().length < 4) e.straat = "Straat én huisnummer, graag.";
  const pc = v.postcode.trim();
  if (v.land === "Nederland" ? !/^\d{4}\s?[A-Za-z]{2}$/.test(pc) : !/^\d{4}$/.test(pc))
    e.postcode = v.land === "Nederland" ? "Formaat 1234 AB." : "Vier cijfers, bv. 2000.";
  if (v.gemeente.trim().length < 2) e.gemeente = "Vul je gemeente in.";
  if (!matenOk) e.maten = "Bevestig dat je maten kloppen.";
  return e;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      <p id={`${id}-err`} className="mt-1 min-h-4 font-mono text-[10px] uppercase tracking-[0.15em] text-blood" aria-live="polite">{error ?? ""}</p>
    </div>
  );
}

export default function CheckoutForm() {
  const lines = useCart();
  const saved = useCheckoutInfo();
  const router = useRouter();
  const [draft, setDraft] = useState<CheckoutInfo | null>(null);
  const v = draft ?? saved ?? EMPTY;
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [matenOk, setMatenOk] = useState(false);

  const errors = validate(v, matenOk);
  const show = (k: keyof Errors) => (submitted || touched[k] ? errors[k] : undefined);
  const set = <K extends keyof CheckoutInfo>(k: K, val: CheckoutInfo[K]) => setDraft({ ...v, [k]: val });
  const bind = (k: keyof CheckoutInfo) => ({
    id: k, name: k, value: v[k] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set(k, e.target.value as never),
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    "aria-invalid": !!show(k),
    "aria-describedby": `${k}-err`,
    className: "field",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      document.querySelector<HTMLElement>("[aria-invalid='true'], #maten")?.focus();
      return;
    }
    cart.saveInfo(v);
    router.push("/checkout/review/");
  };

  if (lines.length === 0) {
    return (
      <Shell step={1} title="Gegevens">
        <p className="font-serif text-2xl text-white/80">Je mand is leeg.</p>
        <Link href="/collectie/" className="btn mt-8">Naar de collectie <span>→</span></Link>
      </Shell>
    );
  }

  return (
    <Shell step={1} title="Gegevens">
      <form onSubmit={submit} noValidate className="grid gap-14 md:grid-cols-12">
        <div className="space-y-12 md:col-span-7">
          <fieldset>
            <legend className="font-serif text-3xl">Wie ben je</legend>
            <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><Field id="naam" label="Naam" error={show("naam")}><input {...bind("naam")} autoComplete="name" placeholder="Voornaam Achternaam" /></Field></div>
              <Field id="email" label="E-mail" error={show("email")}><input {...bind("email")} type="email" autoComplete="email" placeholder="jij@voorbeeld.be" /></Field>
              <Field id="telefoon" label="Telefoon" error={show("telefoon")}><input {...bind("telefoon")} type="tel" autoComplete="tel" placeholder="+32 470 12 34 56" /></Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-serif text-3xl">Waar naartoe</legend>
            <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-6"><Field id="straat" label="Straat + nummer" error={show("straat")}><input {...bind("straat")} autoComplete="street-address" placeholder="Kloosterstraat 12" /></Field></div>
              <div className="sm:col-span-2"><Field id="postcode" label="Postcode" error={show("postcode")}><input {...bind("postcode")} autoComplete="postal-code" inputMode="text" placeholder={v.land === "Nederland" ? "1234 AB" : "2000"} /></Field></div>
              <div className="sm:col-span-2"><Field id="gemeente" label="Gemeente" error={show("gemeente")}><input {...bind("gemeente")} autoComplete="address-level2" placeholder="Antwerpen" /></Field></div>
              <div className="sm:col-span-2"><Field id="land" label="Land"><select {...bind("land")} autoComplete="country-name">{LANDEN.map((l) => <option key={l}>{l}</option>)}</select></Field></div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-serif text-3xl">Levering</legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(Object.keys(DELIVERY) as DeliveryKey[]).map((k) => {
                const d = DELIVERY[k];
                const sub = lines.reduce((s, l) => s + (bySlug(l.slug)?.price ?? 0) * l.qty, 0);
                const free = sub >= d.freeFrom;
                return (
                  <label key={k} className={`flex cursor-pointer items-start justify-between gap-4 border p-5 transition-colors ${v.levering === k ? "border-white" : "border-white/15 hover:border-white/40"}`}>
                    <span className="flex gap-3">
                      <input type="radio" name="levering" value={k} checked={v.levering === k} onChange={() => set("levering", k)} className="mt-1 accent-[#b3070f]" />
                      <span>
                        <span className="block font-serif text-xl text-white">{d.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver">{d.detail}</span>
                      </span>
                    </span>
                    <span className="font-mono text-xs text-white">{free ? "Gratis" : formatPrice(d.price)}</span>
                  </label>
                );
              })}
            </div>
            <div className="mt-6"><Field id="opmerking" label="Opmerking (optioneel)"><textarea {...bind("opmerking")} rows={2} placeholder="Bel aan bij de buren, graag." className="field resize-none" /></Field></div>
          </fieldset>
        </div>

        <aside className="md:col-span-5">
          <div className="border border-white/10 p-6 md:sticky md:top-28">
            <h2 className="label">Maten bevestigen</h2>
            <ul className="mt-2">
              {lines.map((l, i) => {
                const p = bySlug(l.slug);
                if (!p) return null;
                return (
                  <li key={`${l.slug}-${i}`} className="flex items-center justify-between gap-3 border-b border-white/10 py-3">
                    <span className="font-serif text-lg text-white">{l.qty}× {p.name}</span>
                    <select aria-label={`Maat voor ${p.name}`} value={l.size} onChange={(e) => { cart.setSize(i, e.target.value); setMatenOk(false); }} className="border border-white/20 bg-black px-2 py-1.5 font-mono text-xs text-white">
                      {p.sizes.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </li>
                );
              })}
            </ul>
            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input id="maten" type="checkbox" checked={matenOk} onChange={(e) => setMatenOk(e.target.checked)} className="mt-1 accent-[#b3070f]" aria-describedby="maten-err" />
              <span className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-white">Ik heb mijn maten nagekeken.</span>
            </label>
            <p id="maten-err" className="mt-1 min-h-4 font-mono text-[10px] uppercase tracking-[0.15em] text-blood">{submitted ? errors.maten ?? "" : ""}</p>

            <div className="mt-6 border-t border-white/10 pt-6">
              <Totals lines={lines} levering={v.levering} />
            </div>
            <button type="submit" className="btn btn-solid mt-8 w-full">Naar overzicht <span>→</span></button>
            {submitted && Object.keys(errors).length > 0 && (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-blood" role="alert">Nog {Object.keys(errors).length} veld(en) na te kijken.</p>
            )}
          </div>
        </aside>
      </form>
    </Shell>
  );
}
