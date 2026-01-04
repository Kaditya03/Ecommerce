import { products } from "@/data/products";
import { notFound } from "next/navigation";
import ProductClient from "@/components/ProductClient";

/* ================= SEO ================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} | Aurindel Handicrafts`,
    description: product.description,
  };
}

/* ================= PAGE ================= */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  return <ProductClient product={product} />;
}
