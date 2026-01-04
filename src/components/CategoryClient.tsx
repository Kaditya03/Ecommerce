"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";

export default function CategoryClient({
  products = [],
}: {
  products: any[];
}) {
  const [price, setPrice] = useState(5000);
  const [size, setSize] = useState("");

  const filteredProducts = products
    .filter((p) => p.price <= price)
    .filter((p) => (size ? p.size === size : true));

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* FILTERS */}
      <div className="md:col-span-1 md:sticky top-24 h-fit">
        <Filters
          price={price}
          setPrice={setPrice}
          size={size}
          setSize={setSize}
        />
      </div>

      {/* PRODUCTS */}
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        )}
      </div>
    </div>
  );
}
