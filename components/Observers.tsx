"use client";
import { useEffect } from "react";

// Eén gedeelde IntersectionObserver voor de hele site:
//  [data-reveal]  krijgt .in zodra het in beeld komt (CSS-transitie, eenmalig)
//  [data-anim]    krijgt .off zolang het buiten beeld is → CSS-animaties pauzeren
export default function Observers() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    const anim = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("off", !e.isIntersecting)),
      { rootMargin: "100px" },
    );
    const scan = (root: ParentNode) => {
      root.querySelectorAll?.("[data-reveal]:not(.in)").forEach((el) => reveal.observe(el));
      root.querySelectorAll?.("[data-anim]").forEach((el) => anim.observe(el));
    };
    scan(document);
    const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => {
      if (n instanceof Element) { scan(n); if (n.matches("[data-reveal]")) reveal.observe(n); if (n.matches("[data-anim]")) anim.observe(n); }
    })));
    mo.observe(document.body, { childList: true, subtree: true });
    const vis = () => document.documentElement.classList.toggle("hidden-tab", document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => { reveal.disconnect(); anim.disconnect(); mo.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return null;
}
