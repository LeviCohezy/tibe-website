import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { hasImage } from "@/lib/assets";
import { bySlug, products } from "@/lib/data";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return p ? { title: p.name, description: p.blurb } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  const models = p.models.filter(hasImage);
  const i = products.indexOf(p);
  const related = [1, 2, 3, 4].map((k) => products[(i + k) % products.length].slug);
  return <ProductDetail slug={p.slug} models={models} related={related} />;
}
