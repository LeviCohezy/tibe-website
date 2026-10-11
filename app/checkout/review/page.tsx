import type { Metadata } from "next";
import Review from "@/components/shop/Review";

export const metadata: Metadata = { title: "Overzicht", robots: { index: false } };

export default function Page() {
  return <Review />;
}
