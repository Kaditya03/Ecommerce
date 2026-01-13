import CategoryLayout from "@/components/category/CategoryLayout";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products?category=${category}`,
    { cache: "no-store" }
  );

  const products = await res.json();

  return (
    <CategoryLayout
      category={category}
      products={products}
    />
  );
}
