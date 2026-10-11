import type { Metadata } from "next";
import { UnifrakturMaguntia, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Observers from "@/components/Observers";
import "./globals.css";

const gothic = UnifrakturMaguntia({ variable: "--font-gothic", weight: "400", subsets: ["latin"] });
const serif = Cormorant_Garamond({ variable: "--font-serif", weight: ["400", "500", "600"], style: ["normal", "italic"], subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "TIBE — ADHD-fueled urban design", template: "%s — TIBE" },
  description: "TIBE: urban streetwear uit Vlaanderen. Zwart, zilver en een hoofd dat nooit stilstaat.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl-BE">
      <body className={`${gothic.variable} ${serif.variable} ${mono.variable} antialiased`}>
        <Observers />
        <Cursor />
        <div className="grain" aria-hidden />
        <div className="scanlines" aria-hidden />
        <Nav />
        {children}
      </body>
    </html>
  );
}
