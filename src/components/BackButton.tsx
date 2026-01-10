"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function BackButton() {
  const router = useRouter();

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const touchStartX = useRef<number | null>(null);

  /* ================= HIDE ON SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current + 10) {
        // scrolling down
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        // scrolling up
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= SWIPE TO GO BACK (MOBILE) ================= */
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;

      const diffX =
        e.changedTouches[0].clientX - touchStartX.current;

      // swipe right from left edge
      if (diffX > 80 && touchStartX.current < 80) {
        router.back();
      }

      touchStartX.current = null;
    };

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [router]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-xl hover:bg-gray-100 transition"
          aria-label="Go back"
        >
          ✕
        </motion.button>
      )}
    </AnimatePresence>
  );
}
