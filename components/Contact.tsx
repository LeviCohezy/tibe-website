"use client";
import { CONTACT_EMAIL } from "@/lib/data";

export default function Contact() {
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const subject = `TIBE — bericht van ${f.get("naam")}`;
    const body = `${f.get("bericht")}\n\n— ${f.get("naam")} (${f.get("email")})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const field = "w-full border-0 border-b border-white/20 bg-transparent py-4 font-serif text-2xl text-white placeholder:text-white/25 focus:border-blood focus:outline-none md:text-3xl";
  return (
    <section id="contact" className="relative bg-black px-4 pb-20 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-blood">✝ 04 — Contact</p>
          <h2 className="mt-6 font-serif text-5xl font-medium leading-[0.95] md:text-8xl">
            Stuur iets <em className="chrome-text">luid</em>.
          </h2>
          <p className="mt-8 max-w-md font-serif text-xl text-white/70">
            Samenwerking, custom stuk, of gewoon zeggen dat je de drop niet wil missen. Tibe leest alles — meestal om drie uur &apos;s nachts.
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <label className="sr-only" htmlFor="naam">Naam</label>
          <input id="naam" name="naam" required placeholder="Naam" className={field} />
          <label className="sr-only" htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" required placeholder="E-mail" className={field} />
          <label className="sr-only" htmlFor="bericht">Bericht</label>
          <textarea id="bericht" name="bericht" required rows={4} placeholder="Bericht" className={`${field} resize-none`} />
          <button type="submit" className="group mt-6 flex items-center justify-between border border-white/30 px-6 py-5 font-mono text-xs uppercase tracking-[0.35em] text-white transition-colors hover:border-blood hover:bg-blood">
            Verzenden <span className="font-gothic text-2xl transition-transform group-hover:rotate-180">✝</span>
          </button>
        </form>
      </div>

      <footer className="mx-auto mt-32 flex max-w-7xl flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 md:flex-row md:items-end">
        <span className="font-gothic chrome-text text-[22vw] leading-[0.75] md:text-[12vw]">Tibe</span>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver md:text-right">
          <p>ADHD-fueled urban design</p>
          <p className="mt-2">© {new Date().getFullYear()} TIBE — Vlaanderen</p>
        </div>
      </footer>
    </section>
  );
}
