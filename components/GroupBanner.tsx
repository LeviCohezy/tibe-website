import Pic from "./Pic";

// Volle-breedte groepsbeeld (Luka Machain-ritme: banner → titel → rij stukken).
export default function GroupBanner({ base, kicker, title, alt, position = "50% 35%" }: { base: string; kicker: string; title: React.ReactNode; alt: string; position?: string }) {
  return (
    <section className="relative h-[85svh] min-h-[520px] overflow-hidden bg-black">
      <div data-reveal="clip" className="absolute inset-0">
        <Pic base={base} alt={alt} sizes="100vw" fallback="Groepsshoot volgt" className="h-full w-full object-cover" style={{ objectPosition: position }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/50" />
      <div className="absolute inset-x-0 bottom-0 px-4 pb-10 md:px-10 md:pb-14">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-blood">{kicker}</p>
        <h2 className="mt-3 max-w-4xl font-gothic text-5xl leading-[0.95] text-white md:text-8xl">{title}</h2>
      </div>
    </section>
  );
}
