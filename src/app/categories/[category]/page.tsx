import { products } from "@/data/products";
import CategoryClient from "@/components/CategoryClient";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categoryProducts = products.filter(
    (p) => p.category === category
  );

  if (!categoryProducts) notFound();

  return (
    <CategoryClient products={categoryProducts} />
  );
}
