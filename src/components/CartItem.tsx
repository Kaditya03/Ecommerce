"use client";

import { useCart } from "@/context/CartContext";

export default function CartItem({ item }: any) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex gap-4 border rounded-xl p-4">
      <img
        src={item.image}
        className="w-24 h-24 object-cover rounded-lg"
        alt={item.name}
      />

      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-indigo-600">
          ₹{item.price}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() =>
              updateQty(item.id, item.qty - 10)
            }
            className="w-8 h-8 border rounded-full"
          >
            −
          </button>

          <span>{item.qty}</span>

          <button
            onClick={() =>
              updateQty(item.id, item.qty + 10)
            }
            className="w-8 h-8 border rounded-full"
          >
            +
          </button>

          <span className="text-xs text-gray-500 ml-2">
            Min {item.minOrderQty}
          </span>
        </div>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500"
      >
        ✕
      </button>
    </div>
  );
}
