import { products } from "@/lib/data";
import Pic from "./Pic";

function Caption({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-silver">
      <span>Look {n}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Lookbook() {
  const [a, b, c, d] = [products[1], products[4], products[0], products[5]];
  return (
    <section id="lookbook" className="relative bg-black px-4 py-28 md:py-40">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-blood">✝ 03 — Lookbook</p>
        <h2 className="mt-4 font-serif text-5xl italic md:text-8xl">Nachtwerk</h2>

        <figure data-reveal="clip" className="mt-20 aspect-[2/3] overflow-hidden">
          <Pic base="/img/tibe-portrait" sizes="(min-width: 768px) 768px, 100vw" alt="Tibe in de volledige look" className="h-full w-full object-cover contrast-110" />
        </figure>
        <Caption n="I">Tibe — leren jas, cargo, Hyperfocus Pendant</Caption>

        <div className="mt-32 grid grid-cols-5 items-end gap-4">
          <figure data-reveal="clip" className="col-span-3 aspect-[4/5] overflow-hidden">
            <Pic base={a.models[0]} sizes="(min-width: 768px) 460px, 60vw" alt={`Model in de ${a.name}`} fallback="Modelshoot volgt" className="h-full w-full object-cover" />
          </figure>
          <figure data-reveal="clip" data-reveal-delay="1" className="col-span-2 aspect-[3/4] overflow-hidden">
            <Pic base={b.models[0]} sizes="(min-width: 768px) 300px, 40vw" alt={`Model met de ${b.name}`} fallback="Modelshoot volgt" className="h-full w-full object-cover" />
          </figure>
        </div>
        <Caption n="II">{a.name} / {b.name}</Caption>

        <p data-reveal className="my-32 text-center font-gothic text-5xl leading-tight md:text-7xl">
          Chaos in het hoofd.<br /><span className="text-blood">Precisie</span> in de naad.
        </p>

        <figure data-reveal="clip" className="aspect-[4/3] overflow-hidden md:-mx-24">
          <Pic base="/img/groups/g2" sizes="(min-width: 768px) 960px, 100vw" alt="Drie modellen in TIBE, 's nachts in een steegje" fallback="Groepsshoot volgt" className="h-full w-full object-cover" />
        </figure>
        <Caption n="III">De crew — volledige collectie</Caption>

        <div className="mt-32 grid grid-cols-2 gap-4">
          <figure data-reveal="clip" className="aspect-[3/4] overflow-hidden">
            <Pic base={c.models[0]} sizes="(min-width: 768px) 380px, 50vw" alt={`Model in de ${c.name}`} fallback="Modelshoot volgt" className="h-full w-full object-cover" />
          </figure>
          <figure data-reveal="clip" data-reveal-delay="1" className="mt-24 aspect-[3/4] overflow-hidden">
            <Pic base={d.models[0]} sizes="(min-width: 768px) 380px, 50vw" alt={`Close-up van de ${d.name}`} fallback="Modelshoot volgt" className="h-full w-full object-cover" />
          </figure>
        </div>
        <Caption n="IV">{c.name} / {d.name}</Caption>
      </div>
    </section>
  );
}
