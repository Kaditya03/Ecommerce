"use client";

import { motion } from "framer-motion";
import DesktopFilters from "@/components/filters/DesktopFilters";
import MobileFilters from "@/components/filters/MobileFilters";
import ProductGrid from "./ProductGrid";
import { useState } from "react";
import BackButton from "@/components/ui/BackButton";


export default function CategoryLayout({
  category,
  products,
}: {
  category: string;
  products: any[];
}) {
  const [price, setPrice] = useState(100000);
  const [sections, setSections] = useState<string[]>([]);

  const filtered = products.filter((p) => {
    if (p.price > price) return false;
    if (sections.length && !sections.some((s) => p.sections?.includes(s)))
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
      <BackButton/>
      {/* HERO */}
      <div className="bg-white/70 backdrop-blur border-b">
        <div className="max-w-10xl mx-auto px-6 py-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-semibold capitalize text-gray-900"
          >
            {category.replace(/-/g, " ")}
          </motion.h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover authentic handcrafted products curated for quality,
            craftsmanship, and bulk sourcing.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <section className="max-w-[2000px] mx-auto px-3 py-12 flex gap-30">

        {/* DESKTOP FILTER */}
        <aside className="hidden lg:block w-70 sticky top-24">
          <DesktopFilters
            price={price}
            setPrice={setPrice}
            sections={sections}
            setSections={setSections}
          />
        </aside>

        {/* MOBILE FILTER */}
        <MobileFilters
          price={price}
          setPrice={setPrice}
          sections={sections}
          setSections={setSections}
        />

        {/* PRODUCTS */}
        <div className="flex-1">
          <ProductGrid products={filtered} />
        </div>
      </section>
    </div>
  );
}
