// Intro met logo-flits, puur CSS. Een inline script slaat hem over als hij deze sessie al getoond werd.
export default function Loader() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('tibe-intro'))document.documentElement.classList.add('seen');else sessionStorage.setItem('tibe-intro','1')}catch(e){}`,
        }}
      />
      <div className="loader pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black" aria-hidden>
        <span className="loader-logo font-gothic chrome-text text-[28vw] leading-none md:text-[14vw]">Tibe</span>
        <span className="mt-6 font-mono text-xs tracking-[0.4em] text-silver">LADEN</span>
        <span className="loader-bar absolute bottom-0 left-0 h-[2px] w-full origin-left bg-blood" />
      </div>
    </>
  );
}
