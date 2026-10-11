import type { Metadata } from "next";
import Account from "@/components/shop/Account";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default function Page() {
  return <Account />;
}
