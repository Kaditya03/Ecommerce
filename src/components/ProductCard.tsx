"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }: any) {
  // ✅ Hook INSIDE component
  const { addToCart } = useCart();

  const MIN_QTY = product.minOrderQty || 50;
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, MIN_QTY);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div className="border rounded-xl bg-white flex flex-col">
      <Link href={`/products/${product.slug}`}>
        <img
          src={product.images[0]}
          className="h-52 w-full object-cover"
          alt={product.name}
        />
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-indigo-600">₹{product.price}</p>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full w-fit">
          Min Order: {MIN_QTY}
        </span>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className={`mt-auto py-3 rounded-full text-white ${
            added ? "bg-green-600" : "bg-indigo-600"
          }`}
        >
          {added ? "Added ✓" : `Add ${MIN_QTY} to Cart`}
        </motion.button>
      </div>
    </motion.div>
  );
}
