"use client";

import { useCart } from "@/context/CartContext";
import { Poppins } from "next/font/google";
import CartItem from "@/components/CartItem";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function CartPage() {
  const { items } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <section
      className={`${poppins.className} max-w-6xl mx-auto px-4 py-12`}
    >
      <h1 className="text-3xl font-medium mb-8">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* SUMMARY */}
          <div className="border rounded-xl p-6 h-fit">
            <h2 className="text-xl font-medium mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Total Items</span>
              <span>{items.length}</span>
            </div>

            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-full">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
