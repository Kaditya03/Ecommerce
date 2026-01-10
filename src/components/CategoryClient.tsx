"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import { Inter, Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function CategoryClient({
  title,
  products = [],
}: {
  title: string;
  products: any[];
}) {
  const [price, setPrice] = useState(6000);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  // FILTER + SORT
  let filteredProducts = products
    .filter((p) => p.price <= price)
    .filter((p) => (size ? p.size === size : true));

  if (sort === "price-asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "price-desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <>
    <BackButton/>
    <section className={`${inter.className} bg-gray-50 min-h-screen`}>
      {/* HERO */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl`}
          >
            {title}
          </motion.h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover authentic handcrafted products made by skilled
            artisans. Perfect for bulk export and premium décor.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">
        {/* DESKTOP FILTERS */}
        <div className="hidden md:block sticky top-24 h-fit">
          <Filters
            price={price}
            setPrice={setPrice}
            size={size}
            setSize={setSize}
            sort={sort}
            setSort={setSort}
          />
        </div>

        {/* PRODUCTS */}
        <div>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">
              No products match your selection.
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
              {filteredProducts.map((product) => (
                <ProductCard
                key={product.id}
                  product={product}
                  />
                ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t p-3">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="w-full py-3 rounded-full bg-indigo-600 text-white font-medium"
          >
          Filter & Sort
        </button>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black z-40"
              />

            {/* PANEL */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl p-6"
              >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  Filters
                </h3>
                <button
                  onClick={() =>
                    setMobileFiltersOpen(false)
                  }
                  className="text-gray-500"
                  >
                  ✕
                </button>
              </div>

              <Filters
                price={price}
                setPrice={setPrice}
                size={size}
                setSize={setSize}
                sort={sort}
                setSort={setSort}
                />

              <button
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
                className="mt-6 w-full py-3 rounded-full bg-indigo-600 text-white"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
                </>
  );
}
