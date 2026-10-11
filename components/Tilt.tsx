"use client";
import { useRef } from "react";

// 3D-kanteling die de cursor volgt, met glans en zwevende schaduw.
export default function Tilt({ children, max = 14, className = "" }: { children: React.ReactNode; max?: number; className?: string }) {
  const el = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = el.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    inner.current!.style.transform = `rotateY(${x * max * 2}deg) rotateX(${-y * max * 2}deg) translateZ(40px)`;
    glare.current!.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(233,235,239,.16), transparent 55%)`;
  };
  const leave = () => {
    inner.current!.style.transform = "";
    glare.current!.style.background = "transparent";
  };

  return (
    <div ref={el} onPointerMove={move} onPointerLeave={leave} className={`[perspective:1100px] ${className}`}>
      <div ref={inner} className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]">
        {children}
        <div ref={glare} className="pointer-events-none absolute inset-0 mix-blend-screen transition-[background] duration-300" />
      </div>
    </div>
  );
}
