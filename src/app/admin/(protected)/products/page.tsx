"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { motion } from "framer-motion";

export default function AdminProducts() {
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState<string[]>([]);

  const saveProduct = async () => {
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        images,
        category,
        sections,
        minOrderQty: 50,
      }),
    });

    setImages([]);
    setName("");
    setPrice("");
    setCategory("");
    setSections([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl space-y-10"
    >
      <h1 className="text-3xl font-semibold">
        Add Product
      </h1>

     <ImageUploader
  onUpload={(urls) =>
    setImages((prev) => [...prev, ...urls])
  }
/>

{images.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
    {images.map((img, index) => (
      <div
        key={index}
        className="relative h-40 rounded-xl overflow-hidden border shadow-sm bg-white"
      >
        <img
          src={img}
          alt="Product"
          className="w-full h-full object-cover"
        />

        {/* REMOVE BUTTON */}
        <button
          onClick={() =>
            setImages((prev) =>
              prev.filter((_, i) => i !== index)
            )
          }
          className="absolute top-2 right-2 bg-white/90 rounded-full w-7 h-7 flex items-center justify-center text-sm shadow hover:bg-red-500 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}


      <div className="grid md:grid-cols-2 gap-6">
        <input
          placeholder="Product Name"
          className="h-12 border rounded-xl px-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="h-12 border rounded-xl px-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="h-12 border rounded-xl px-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="pottery">Pottery</option>
          <option value="handlooms">Handlooms</option>
          <option value="brass-art">Brass Art</option>
          <option value="wood-craft">Wood Craft</option>
          <option value="paintings">Paintings</option>
          <option value="home-decor">Home Decor</option>
        </select>
      </div>

      {/* Sections */}
      <div className="flex gap-4 flex-wrap">
        {["best-sellers", "new-arrivals", "bulking"].map(
          (s) => (
            <button
              key={s}
              onClick={() =>
                setSections((prev) =>
                  prev.includes(s)
                    ? prev.filter((x) => x !== s)
                    : [...prev, s]
                )
              }
              className={`px-5 py-2 rounded-full border ${
                sections.includes(s)
                  ? "bg-indigo-600 text-white"
                  : "bg-white"
              }`}
            >
              {s.replace("-", " ")}
            </button>
          )
        )}
      </div>

      <button
        onClick={saveProduct}
        className="h-12 w-28 bg-indigo-600 text-white rounded-xl"
      >
        Save Product
      </button>
    </motion.div>
  );
}
