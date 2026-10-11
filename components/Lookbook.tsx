"use client";
import { motion } from "framer-motion";
import { asset, products } from "@/lib/data";
import ProductImage from "./ProductImage";

const clip = {
  initial: { clipPath: "inset(100% 0 0 0)" },
  whileInView: { clipPath: "inset(0% 0 0 0)" },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] as const },
};

function Caption({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-silver">
      <span>Look {n}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Lookbook() {
  const [a, b, c, d, e] = [products[1], products[4], products[0], products[5], products[3]];
  return (
    <section id="lookbook" className="relative bg-black px-4 py-28 md:py-40">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-blood">✝ 03 — Lookbook</p>
        <h2 className="mt-4 font-serif text-5xl italic md:text-8xl">Nachtwerk</h2>

        <motion.figure {...clip} className="mt-20 aspect-[2/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/img/tibe-portrait.jpg")} alt="Tibe in de volledige look" className="h-full w-full object-cover contrast-110" />
        </motion.figure>
        <Caption n="I">Tibe — Dagger Biker, Cargo, Pendant</Caption>

        <div className="mt-32 grid grid-cols-5 items-end gap-4">
          <motion.figure {...clip} className="col-span-3 aspect-square overflow-hidden"><ProductImage p={a} /></motion.figure>
          <motion.figure {...clip} transition={{ ...clip.transition, delay: 0.2 }} className="col-span-2 aspect-[3/4] overflow-hidden"><ProductImage p={b} /></motion.figure>
        </div>
        <Caption n="II">{a.name} / {b.name}</Caption>

        <p className="my-32 text-center font-gothic text-5xl leading-tight md:text-7xl">
          Chaos in het hoofd.<br /><span className="text-blood">Precisie</span> in de naad.
        </p>

        <motion.figure {...clip} className="aspect-square overflow-hidden"><ProductImage p={c} /></motion.figure>
        <Caption n="III">{c.name}</Caption>

        <div className="mt-32 grid grid-cols-2 gap-4">
          <motion.figure {...clip} className="aspect-[3/4] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/tibe-portrait.jpg")} alt="Detail: zilveren kruishanger" className="h-full w-full scale-[3] origin-[52%_25%] object-cover object-top grayscale" />
          </motion.figure>
          <motion.figure {...clip} transition={{ ...clip.transition, delay: 0.2 }} className="mt-24 aspect-[3/4] overflow-hidden"><ProductImage p={d} /></motion.figure>
        </div>
        <Caption n="IV">Detail / {d.name}</Caption>

        <motion.figure {...clip} className="mt-32 aspect-[4/5] overflow-hidden"><ProductImage p={e} /></motion.figure>
        <Caption n="V">{e.name}</Caption>
      </div>
    </section>
  );
}
