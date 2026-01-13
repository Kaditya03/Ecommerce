"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  slug: string;
  image: string;
  description?: string;
}

export default function CategoryCard({
  title,
  slug,
  image,
  description,
}: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="group relative rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-xl cursor-pointer"
      >
        {/* IMAGE */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* DARK GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="absolute bottom-0 w-full p-4 text-white">
          <h3 className="text-lg font-semibold tracking-wide capitalize">
            {title}
          </h3>

          {description && (
            <p className="text-xs text-gray-200 mt-1 line-clamp-2">
              {description}
            </p>
          )}

          <div className="mt-3 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
            Explore
            <ArrowRight size={16} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
