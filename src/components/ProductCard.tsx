"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }: any) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const MIN_QTY = product.minOrderQty || 50;
  const STEP = product.category === "pottery" ? 10 : 5;

  const [qty, setQty] = useState(MIN_QTY);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden"
    >
      {/* IMAGE + WISHLIST */}
      <div className="relative">
        <Link href={`/products/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-52 w-full object-cover"
          />
        </Link>

        {/* ❤️ Wishlist Icon */}
        <button
          onClick={() =>
            toggleWishlist({
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.images[0],
            })
          }
          className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
        >
          <span className="text-xl">
            {isWishlisted(product.id) ? "❤️" : "🤍"}
          </span>
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-indigo-600">₹{product.price}</p>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full w-fit">
          MOQ: {MIN_QTY}
        </span>

        {/* QUANTITY */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => qty > MIN_QTY && setQty(qty - STEP)}
            className="w-8 h-8 border rounded-full"
          >
            −
          </button>

          <span className="min-w-[32px] text-center">{qty}</span>

          <button
            onClick={() => setQty(qty + STEP)}
            className="w-8 h-8 border rounded-full"
          >
            +
          </button>
        </div>

        {/* ADD TO CART */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className={`mt-auto py-3 rounded-full text-white transition ${
            added
              ? "bg-green-600"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
}
