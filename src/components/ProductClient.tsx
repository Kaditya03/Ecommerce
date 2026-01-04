"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProductGallery from "@/components/ProductGallery";
import { useCart } from "@/context/CartContext";



export default function ProductClient({ product }: any) {
  const { addToCart } = useCart(); // ✅ OK

  const handleAddToCart = () => {
    addToCart(product);
  };

export default function ProductClient({ product }: any) {
  const MIN_QTY = product.minOrderQty || 50;

  const [qty, setQty] = useState(MIN_QTY);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setQty(MIN_QTY); // enforce MOQ
    setAdded(true);

    // later replace with CartContext
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* IMAGE GALLERY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProductGallery images={product.images} />
        </motion.div>

        {/* PRODUCT INFO */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl font-medium">
            {product.name}
          </h1>

          <p className="text-indigo-600 text-2xl">
            ₹{product.price}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* MOQ BADGE */}
          <span className="inline-block px-4 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
            Minimum Order Quantity: {MIN_QTY} units
          </span>

          {/* QUANTITY SELECTOR */}
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                qty > MIN_QTY && setQty(qty - 10)
              }
              className="w-10 h-10 border rounded-full flex items-center justify-center"
            >
              −
            </button>

            <span className="min-w-[50px] text-center text-lg">
              {qty}
            </span>

            <button
              onClick={() => setQty(qty + 10)}
              className="w-10 h-10 border rounded-full flex items-center justify-center"
            >
              +
            </button>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`px-8 py-4 rounded-full text-white transition ${
                added
                  ? "bg-green-600"
                  : "bg-indigo-600 hover:opacity-90"
              }`}
            >
              {added
                ? "Added ✓"
                : `Add ${MIN_QTY} to Cart`}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border rounded-full"
            >
              Buy Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
