"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function CartItem({ item }: any) {
  const { updateQty, removeItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm p-5 flex gap-5"
    >
      {/* IMAGE */}
      <img
        src={item.images?.[0]}
        alt={item.name}
        className="w-24 h-24 rounded-xl object-cover"
      />

      {/* INFO */}
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">
          {item.name}
        </h3>

        <p className="text-indigo-600 mt-1">
          ₹{item.price}
        </p>

        {/* QUANTITY */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() =>
              updateQty(item._id, item.qty - 5)
            }
            className="w-8 h-8 border rounded-full"
          >
            −
          </button>

          <span className="min-w-[36px] text-center">
            {item.qty}
          </span>

          <button
            onClick={() =>
              updateQty(item._id, item.qty + 5)
            }
            className="w-8 h-8 border rounded-full"
          >
            +
          </button>

          <span className="text-xs text-gray-400 ml-2">
            Min {item.minOrderQty}
          </span>
        </div>
      </div>

      {/* REMOVE */}
      <button
        onClick={() => removeItem(item._id)}
        className="text-gray-400 hover:text-red-500 transition"
      >
        ✕
      </button>
    </motion.div>
  );
}
