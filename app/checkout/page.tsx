import type { Metadata } from "next";
import CheckoutForm from "@/components/shop/CheckoutForm";

export const metadata: Metadata = { title: "Afrekenen", robots: { index: false } };

export default function Page() {
  return <CheckoutForm />;
}
