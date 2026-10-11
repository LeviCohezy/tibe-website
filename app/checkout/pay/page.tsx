import type { Metadata } from "next";
import Pay from "@/components/shop/Pay";

export const metadata: Metadata = { title: "Betaling", robots: { index: false } };

export default function Page() {
  return <Pay />;
}
