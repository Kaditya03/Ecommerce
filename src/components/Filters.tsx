"use client";

import { motion } from "framer-motion";

export default function Filters({
  price,
  setPrice,
  size,
  setSize,
  sort,
  setSort,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md p-6 space-y-6"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Filters
        </h3>

        <button
          onClick={() => {
            setPrice(6000);
            setSize("");
            setSort("");
          }}
          className="text-xs text-indigo-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* PRICE FILTER */}
      <div>
        <label className="text-sm text-gray-600">
          Max Price
        </label>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span>₹1000</span>
          <span className="font-medium text-indigo-600">
            ₹{price}
          </span>
        </div>

        <input
          type="range"
          min="1000"
          max="6000"
          step="500"
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
          className="w-full mt-3 accent-indigo-600"
        />
      </div>

      {/* DIVIDER */}
      <div className="border-t" />

      {/* SIZE FILTER */}
      <div>
        <label className="text-sm text-gray-600">
          Product Size
        </label>

        <select
          value={size}
          onChange={(e) =>
            setSize(e.target.value)
          }
          className="w-full mt-2 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Sizes</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      {/* DIVIDER */}
      <div className="border-t" />

      {/* SORT FILTER */}
      <div>
        <label className="text-sm text-gray-600">
          Sort By
        </label>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="w-full mt-2 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Default</option>
          <option value="price-asc">
            Price: Low to High
          </option>
          <option value="price-desc">
            Price: High to Low
          </option>
        </select>
      </div>

      {/* INFO */}
      <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600">
        <p>
          ℹ️ Minimum order quantity applies to all
          products.
        </p>
      </div>
    </motion.div>
  );
}
