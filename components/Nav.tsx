"use client";
const links = [
  ["Verhaal", "#verhaal"],
  ["Collectie", "#collectie"],
  ["Lookbook", "#lookbook"],
  ["Contact", "#contact"],
];
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 mix-blend-difference md:px-10 md:py-6">
      <a href="#top" className="font-gothic text-3xl text-white">Tibe</a>
      <nav className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white md:gap-10 md:text-xs">
        {links.map(([l, h]) => (
          <a key={h} href={h} className="hidden hover:text-blood sm:inline">{l}</a>
        ))}
        <a href="#contact" className="sm:hidden">Menu ✝</a>
      </nav>
    </header>
  );
}
