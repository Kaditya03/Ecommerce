"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "@/context/MenuContext";

// 👉 Slides Data
const slides = [
  {
    image: "/images/hero3.jpg",
    title: "New Arrivals",
    desc: "Discover handcrafted elegance made for you.",
  },
  {
    image: "/images/hero2.jpg",
    title: "Handmade With Love",
    desc: "Exclusive artisan creations crafted by skilled hands.",
  },
  {
    image: "/images/hero1.jpg",
    title: "Premium Craft Designs",
    desc: "Elevate your space with our limited-edition decor.",
  },
];

const Hero = () => {
  const [index, setIndex] = React.useState(0);
  const {menuOpen}=useMenu();

  // Auto Slide
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Manual Navigation
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full h-auto min-h-[500px] md:h-[600px] lg:h-[705px] flex flex-col md:flex-row overflow-hidden">

      {/* LEFT SECTION (Image) */}
      <div className="w-full md:w-3/5 h-[300px] md:h-full relative">

      {/* Navigation Arrows (Right Corner) */}
{!menuOpen && (
  <div className="absolute bottom-4 right-4 z-50 flex gap-2 pointer-events-auto">
    {/* PREV */}
    <button
      onClick={prevSlide}
      className="bg-white/70 hover:bg-white shadow-md p-2 rounded-full transition backdrop-blur-sm"
    >
      <svg width="18" height="18" stroke="#333" strokeWidth="2" fill="none">
        <path d="M12 4 L7 9 L12 14" />
      </svg>
    </button>

    {/* NEXT */}
    <button
      onClick={nextSlide}
      className="bg-white/70 hover:bg-white shadow-md p-2 rounded-full transition backdrop-blur-sm"
    >
      <svg width="18" height="18" stroke="#333" strokeWidth="2" fill="none">
        <path d="M7 4 L12 9 L7 14" />
      </svg>
    </button>
  </div>
)}



        <AnimatePresence>
          <motion.div
            key={slides[index].image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].image}
              alt="Handicraft"
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT SECTION (Content) */}
      <div className="w-full md:w-2/5 bg-gray-100 flex flex-col justify-center items-center p-8 sm:p-12 md:p-10">

        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="text-black text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
              {slides[index].title}
            </h3>

            <p className="text-gray-900 text-base sm:text-lg mb-6 leading-relaxed max-w-[300px]">
              {slides[index].desc}
            </p>

            <Button variant="default" className="px-6 py-4 sm:px-8 sm:py-6 font-bold">
              Shop Now
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default Hero;
