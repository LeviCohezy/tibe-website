import Link from "next/link";

const STEPS = [["Mand", "/cart/"], ["Gegevens", "/checkout/"], ["Overzicht", "/checkout/review/"], ["Betaling", "/checkout/pay/"]] as const;

export function Steps({ at }: { at: number }) {
  return (
    <ol className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em]">
      {STEPS.map(([l, h], i) => (
        <li key={h} className={i === at ? "text-white" : i < at ? "text-silver" : "text-white/25"}>
          {i < at ? <Link href={h} className="hover:text-blood">{String(i + 1).padStart(2, "0")} {l}</Link> : <span>{String(i + 1).padStart(2, "0")} {l}</span>}
        </li>
      ))}
    </ol>
  );
}

export function Shell({ step, title, children }: { step?: number; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <main className="min-h-[100svh] bg-black px-4 pb-24 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-6xl">
        {step !== undefined && <Steps at={step} />}
        <h1 className="mt-6 font-gothic text-6xl leading-none md:text-8xl"><span className="chrome-text">{title}</span></h1>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </main>
  );
}
