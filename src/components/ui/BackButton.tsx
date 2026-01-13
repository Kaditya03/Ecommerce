"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackButton() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  let lastScroll = 0;

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setVisible(current < lastScroll || current < 80);
      lastScroll = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      onClick={() => router.back()}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 left-4 z-40 flex items-center gap-2
                 bg-white/90 backdrop-blur px-4 py-2 rounded-full
                 shadow hover:shadow-lg hover:bg-indigo-600
                 hover:text-white transition"
    >
      <ArrowLeft size={18} />
      <span className="text-sm font-medium hidden sm:block">
        Back
      </span>
    </motion.button>
  );
}
