"use client";

import { motion } from "framer-motion";

export default function MediaGrid({
  images,
}: {
  images: { url: string }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {images.map((img) => (
        <motion.div
          key={img.url}
          whileHover={{ scale: 1.05 }}
          className="rounded-xl overflow-hidden shadow"
        >
          <img
            src={img.url}
            className="h-40 w-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}
