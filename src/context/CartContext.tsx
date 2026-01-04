"use client";

import { createContext, useContext, useState, useEffect } from "react";




type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
  minOrderQty: number;
};

type CartContextType = {
  items: CartItem[];
  cartCount: number; // ✅ ADD THIS
  addToCart: (product: any, qty?: number) => void;
  updateQty: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
};


const CartContext = createContext<CartContextType | null>(null);


export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
const cartCount = items.length; // ✅ unique products count

  /* 🔄 LOAD FROM LOCAL STORAGE */
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  /* 💾 SAVE TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  /* ➕ ADD TO CART */
  const addToCart = (product: any, qty = product.minOrderQty || 50) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, qty: p.qty + qty }
            : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          qty,
          minOrderQty: product.minOrderQty || 50,
        },
      ];
    });
  };

  /* 🔁 UPDATE QTY */
  const updateQty = (id: number, qty: number) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              qty: Math.max(p.minOrderQty, qty),
            }
          : p
      )
    );
  };

  /* ❌ REMOVE */
  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <CartContext.Provider
  value={{
    items,
    cartCount, // ✅ PASS HERE
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
