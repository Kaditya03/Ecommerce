"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: any) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const MIN_QTY = product.minOrderQty || 50;
  const STEP = 10;

  const [qty, setQty] = useState(MIN_QTY);
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col"
    >
      {/* IMAGE SECTION */}
      <div className="relative h-55 overflow-hidden bg-[#F8F9FB]">
        <Link href={`/products/${product.slug}`}>
          <motion.img
            src={product.images?.[0]}
            alt={product.name}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover mix-blend-multiply"
          />
        </Link>

        {/* TOP BADGES (ONLY NEW NOW) */}
        <div className="absolute top-4 left-4">
          {product.isNew && (
            <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              New
            </span>
          )}
        </div>

        {/* WISHLIST BUTTON */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm hover:bg-white transition-colors group/heart"
        >
          <Heart
            size={18}
            className={`transition-all duration-300 ${
              isWishlisted(product._id)
                ? "fill-rose-500 text-rose-500 scale-110"
                : "text-slate-400 group-hover/heart:text-rose-400"
            }`}
          />
        </button>

        {/* QUICK VIEW OVERLAY */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-4 right-4 hidden md:block"
            >
              <Link
                href={`/products/${product.slug}`}
                className="w-full py-3 bg-white/90 backdrop-blur-xl text-slate-900 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-white transition-all"
              >
                View Details <ArrowRight size={14} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CONTENT SECTION */}
      <div className="px-2 py-4 flex flex-col flex-grow">

        <div className="mb-1">
          <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold">
            {product.category || "Collection"}
          </span>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-base font-semibold text-slate-800 leading-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* PRICE + MOQ (MOVED HERE ✅) */}
        <div className="flex items-end justify-between mt-2 mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-slate-900">
              ₹{product.price}
            </span>
            <span className="text-xs text-slate-400 font-medium">/unit</span>
          </div>

          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            MOQ {MIN_QTY}
          </span>
        </div>

        {/* INTERACTIVE ACTIONS */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-1.5 border border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty((q) => Math.max(MIN_QTY, q - STEP))}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:bg-slate-50 text-slate-600 transition-all active:scale-90"
              >
                <Minus size={14} />
              </button>

              <span className="w-10 text-center text-sm font-bold text-slate-700 font-mono">
                {qty}
              </span>

              <button
                onClick={() => setQty((q) => q + STEP)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:bg-slate-50 text-slate-600 transition-all active:scale-90"
              >
                <Plus size={14} />
              </button>
            </div>

            <span className="text-[10px] font-bold text-slate-400 pr-2 uppercase tracking-tighter">
              Step +{STEP}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            disabled={added}
            className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold tracking-wide transition-all duration-300 shadow-lg ${
              added
                ? "bg-emerald-500 shadow-emerald-200 text-white"
                : "bg-slate-900 shadow-slate-200 text-white hover:bg-indigo-600 hover:shadow-indigo-200"
            }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                    ✓
                  </div>
                  Added to Cart
                </motion.div>
              ) : (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
