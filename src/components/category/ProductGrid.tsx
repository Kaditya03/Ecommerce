"use client";

import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products }: any) {
  if (!products.length) {
    return (
      <p className="text-gray-500 text-center mt-20">
        No products found.
      </p>
    );
  }

  return (
 <div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-3
  xl:grid-cols-3
  gap-4
">

      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
