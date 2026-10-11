import { slogans } from "@/lib/data";

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const row = [...slogans, ...slogans];
  return (
    <div data-anim className="relative overflow-hidden border-y border-white/10 bg-black py-5">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {row.map((s, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6 font-mono text-sm uppercase tracking-[0.3em] text-silver md:text-lg">
            {s}
            <span className="ml-12 font-gothic text-2xl text-blood md:text-3xl">✝</span>
          </span>
        ))}
      </div>
    </div>
  );
}
