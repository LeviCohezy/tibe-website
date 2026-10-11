"use client";
import { useState } from "react";
import { asset } from "@/lib/data";

type Props = {
  base: string; // bv. /img/products/p01  →  p01-{600,1000,1600}.webp
  alt: string;
  sizes?: string;
  widths?: number[];
  priority?: boolean;
  className?: string;
  fallback?: string; // tekst op de placeholderkaart
  style?: React.CSSProperties;
};

// Responsieve WebP met srcset, lazy + async decode, en een zilveren placeholder als het beeld ontbreekt.
export default function Pic({ base, alt, sizes = "100vw", widths = [600, 1000, 1600], priority, className = "", fallback, style }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center gap-3 border border-white/10 bg-[radial-gradient(circle_at_50%_40%,#161616,#050505_70%)] ${className}`}>
        <span className="font-gothic chrome-text text-6xl">✝</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-silver/60">{fallback ?? "Beeld volgt"}</span>
      </div>
    );
  }
  const srcSet = widths.map((w) => `${asset(`${base}-${w}.webp`)} ${w}w`).join(", ");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`${base}-${widths[Math.min(1, widths.length - 1)]}.webp`)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setFailed(true)}
      className={className}
      style={style}
    />
  );
}
