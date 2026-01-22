"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
  qty: number;
  minOrderQty: number;
};

type CartContextType = {
  items: CartItem[];
  cartCount: number;
  addToCart: (product: any, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // ✅ Load cart
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  // ✅ Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ✅ ADD TO CART (FIXED)
  const addToCart = (product: any, qty = product.minOrderQty || 50) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          slug: product.slug,
          qty,
          minOrderQty: product.minOrderQty || 50,
        },
      ];
    });
  };

  // ✅ UPDATE QTY
  const updateQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: Math.max(item.minOrderQty, qty) }
          : item
      )
    );
  };

  // ✅ REMOVE ITEM
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount: items.length,
        addToCart,
        updateQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
