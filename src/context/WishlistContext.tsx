"use client";

import { createContext, useContext, useEffect, useState } from "react";

type WishlistItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (id: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // Save wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) =>
      prev.some((p) => p.id === item.id)
        ? prev.filter((p) => p.id !== item.id)
        : [...prev, item]
    );
  };

  const isWishlisted = (id: number) =>
    wishlist.some((p) => p.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }
  return ctx;
};
