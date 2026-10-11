"use client";
import { motion } from "framer-motion";
import { asset } from "@/lib/data";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
};

const stats = [
  ["10+", "ideeën per minuut"],
  ["1", "obsessie: het perfecte zwart"],
  ["925", "zilver, geen compromis"],
];

export default function About() {
  return (
    <section id="verhaal" className="relative bg-black px-4 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <motion.p {...reveal} className="font-mono text-xs uppercase tracking-[0.4em] text-blood">✝ 01 — Het verhaal</motion.p>
          <motion.div {...reveal} className="relative mt-10 hidden aspect-[3/4] overflow-hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/tibe-portrait.jpg")} alt="" className="h-full w-full scale-[1.6] origin-[50%_8%] object-cover object-top grayscale" />
            <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
          </motion.div>
        </div>

        <div className="md:col-span-8">
          <motion.h2 {...reveal} className="font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-8xl">
            Een hoofd dat <em className="chrome-text">nooit</em> stilstaat.
          </motion.h2>

          <div className="mt-14 grid gap-8 font-serif text-xl leading-relaxed text-white/80 md:mt-20 md:grid-cols-2 md:text-2xl">
            <motion.p {...reveal}>
              Tibe heeft <span className="text-white">ADHD</span>. Hij zegt het zonder omwegen, want het is geen voetnoot in zijn verhaal — het is de motor. Waar een ander één idee uitwerkt, zitten er bij Tibe tien tegelijk in zijn hoofd: een kruis op een mouw, een gesp die anders moet, een hoodie die zwaarder moet vallen.
            </motion.p>
            <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
              Die chaos is geen probleem. Het is zijn methode. Snel schetsen, snel weggooien, opnieuw beginnen. En dan, plots: <span className="text-white">hyperfocus</span>. Uren aan één stuk, tot elke naad, elke print en elk stuk zilver klopt. De wereld valt weg. Alleen het ontwerp blijft over.
            </motion.p>
          </div>

          <motion.blockquote {...reveal} className="mt-16 border-l-2 border-blood pl-6 md:mt-24 md:pl-10">
            <p className="font-gothic text-4xl leading-tight text-white md:text-6xl">
              Te veel gedacht. Te snel gevoeld. Toch afgewerkt.
            </p>
            <footer className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-silver">— het TIBE-manifest</footer>
          </motion.blockquote>

          <motion.p {...reveal} className="mt-16 max-w-2xl font-serif text-xl leading-relaxed text-white/80 md:text-2xl">
            TIBE is streetwear voor iedereen die niet in het kader past en daarom zijn eigen kader tekent. Zwart als basis, zilver als handtekening, en af en toe een druppel rood — omdat het echt is.
          </motion.p>

          <div className="mt-20 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            {stats.map(([n, l]) => (
              <div key={l} className="bg-black p-6 md:p-8" data-hover>
                <div className="chrome-text font-serif text-6xl font-semibold">{n}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-silver">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
