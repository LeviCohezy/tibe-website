"use client";
import { useState } from "react";
import { asset, type Product } from "@/lib/data";

export default function ProductImage({ p, className = "", fit = "cover" }: { p: Product; className?: string; fit?: "cover" | "contain" }) {
  const [failed, setFailed] = useState(false);
  if (!p.img || failed) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center gap-4 border border-white/10 bg-[radial-gradient(circle_at_50%_40%,#1a1a1a,#050505_70%)] ${className}`}>
        <span className="font-gothic chrome-text text-7xl">✝</span>
        <span className="chrome-text font-serif text-2xl">{p.name}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-silver/60">Beeld volgt</span>
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(p.img)} alt={`${p.name} — ${p.type}`} loading="lazy" onError={() => setFailed(true)} className={`h-full w-full ${fit === "contain" ? "object-contain feather" : "object-cover"} ${className}`} />;
}
