import Link from "next/link";
import { Shell } from "./Shell";

export default function Account() {
  return (
    <Shell title="Account">
      <div className="grid gap-14 md:grid-cols-12">
        <form className="md:col-span-6" aria-describedby="account-soon">
          <p id="account-soon" className="inline-block border border-blood/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-blood">Binnenkort</p>
          <fieldset disabled className="mt-8 space-y-6 opacity-50">
            <div><label htmlFor="acc-email" className="label">E-mail</label><input id="acc-email" type="email" className="field" placeholder="jij@voorbeeld.be" /></div>
            <div><label htmlFor="acc-pw" className="label">Wachtwoord</label><input id="acc-pw" type="password" className="field" placeholder="••••••••" /></div>
            <button type="button" className="btn btn-solid w-full">Inloggen <span>→</span></button>
          </fieldset>
        </form>
        <div className="md:col-span-5 md:col-start-8">
          <h2 className="font-serif text-4xl">Nog even geduld.</h2>
          <p className="mt-4 font-serif text-xl leading-relaxed text-white/75">
            Accounts komen er samen met online betalen: je bestellingen, je maten en vroege toegang tot de volgende drop. Tot dan onthoudt deze browser je mand.
          </p>
          <Link href="/collectie/" className="btn mt-10">Naar de collectie <span>→</span></Link>
        </div>
      </div>
    </Shell>
  );
}
