import { products } from "@/data/products";
import ProductClient from "@/components/ProductClient";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find(
    (p) => p.slug === params.slug
  );

  if (!product) return {};

  return {
    title: `${product.name} | Aurindel Handicrafts`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ UNWRAP PARAMS
  const { slug } = await params;

  const product = products.find(
    (p) => p.slug === slug
  );

  if (!product) notFound();

  return <ProductClient product={product} />;
}
