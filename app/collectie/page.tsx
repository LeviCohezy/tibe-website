import type { Metadata } from "next";
import Link from "next/link";
import Collection from "@/components/Collection";
import GroupBanner from "@/components/GroupBanner";
import Pic from "@/components/Pic";
import { formatPrice, products } from "@/lib/data";

export const metadata: Metadata = { title: "Collectie 01 — Relikwieën", description: "Tien stuks in zwart, zilver en leer. Collectie 01 van TIBE." };

export default function Page() {
  return (
    <main className="bg-black">
      <GroupBanner base="/img/groups/g3" kicker="✝ Collectie 01" title="Relikwieën" alt="Vier modellen in de volledige TIBE-collectie" />
      <Collection kicker="✝ Scroll door de collectie" title="Tien stuks" />
      <section className="px-4 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-4xl md:text-5xl">Alles in één <em className="chrome-text">blik</em></h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-5">
            {products.map((p) => (
              <Link key={p.slug} href={`/collectie/${p.slug}/`} className="tilt group block">
                <div className="tilt-inner spot relative aspect-[3/4] border border-white/5">
                  <Pic base={p.img} widths={[600]} sizes="(min-width: 768px) 20vw, 50vw" alt={p.name} className="feather absolute inset-[8%] h-[84%] w-[84%] object-contain" />
                </div>
                <div className="mt-3 flex justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-white">{p.name}</span>
                  <span className="text-silver">{formatPrice(p.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
