"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { totals, useCart } from "@/lib/cart";

const links: [string, string][] = [
  ["Verhaal", "/#verhaal"],
  ["Collectie", "/collectie/"],
  ["Lookbook", "/#lookbook"],
  ["Contact", "/#contact"],
];

export default function Nav() {
  const { count } = totals(useCart());
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    addEventListener("hashchange", close);
    return () => removeEventListener("hashchange", close);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
      <div className="flex items-center justify-between px-4 py-4 md:px-10 md:py-5">
        <Link href="/" className="font-gothic text-3xl text-white" onClick={() => setOpen(false)}>Tibe</Link>
        <nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.25em] text-white md:gap-9 md:text-xs">
          {links.map(([l, h]) => (
            <Link key={h} href={h} className="hidden transition-colors hover:text-blood md:inline">{l}</Link>
          ))}
          <Link href="/account/" className="hidden transition-colors hover:text-blood sm:inline">Account</Link>
          <Link href="/cart/" className="relative transition-colors hover:text-blood" aria-label={`Winkelmand, ${count} stuks`}>
            Mand <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-white/40 px-1 text-[10px] tabular-nums">{count}</span>
          </Link>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open}>{open ? "Sluit" : "Menu ✝"}</button>
        </nav>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-black px-4 pb-6 pt-2 md:hidden">
          {[...links, ["Account", "/account/"] as [string, string]].map(([l, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)} className="py-2 font-serif text-3xl text-white">{l}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
