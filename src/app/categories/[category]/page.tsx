import { products } from "@/data/products";
import CategoryClient from "@/components/CategoryClient";
import { notFound } from "next/navigation";

const categoryTitles: Record<string, string> = {
  pottery: "Pottery Handicrafts",
  handlooms: "Handloom Textiles",
  "brass-art": "Brass Art Collection",
  "wood-craft": "Wooden Handicrafts",
  paintings: "Traditional Paintings",
  "home-decor": "Handcrafted Home Décor",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categoryProducts = products.filter(
    (p) => p.category === category
  );

  if (!categoryProducts.length) notFound();

  return (
    <CategoryClient
      title={categoryTitles[category]}
      products={categoryProducts}
    />
  );
}
