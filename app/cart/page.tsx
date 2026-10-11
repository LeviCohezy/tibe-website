import type { Metadata } from "next";
import Cart from "@/components/shop/Cart";

export const metadata: Metadata = { title: "Winkelmand", robots: { index: false } };

export default function Page() {
  return <Cart />;
}
