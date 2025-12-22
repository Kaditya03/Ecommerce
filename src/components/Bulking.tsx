"use client";

import React from "react";
import { Cormorant_Garamond, Poppins } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const Bulking = () => {
  return (
    <div className="w-full bg-stone-50 py-16 md:py-24 relative overflow-hidden">

      <div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-15 
                      px-8 md:px-10 lg:px-20">

        {/* LEFT IMAGE (Desktop) */}
        <div className="hidden md:flex justify-start items-start">
          <img
            src="/images/bulking.png"
            alt="bulking"
            className="w-full h-auto object-contain opacity-75"
          />
        </div>

        {/* MOBILE IMAGE */}
        <div className="md:hidden flex justify-center">
          <img
            src="/images/bulking.png"
            alt="bulking mobile"
            className="w-[90%] h-auto object-contain opacity-75"
          />
        </div>

        {/* TEXT (right side on desktop) */}
        <div className="flex flex-col justify-center">
          <p className={`${poppins.className} text-sm text-gray-700 `}>
            For Large Orders
          </p>

          <h1
            className={`${cormorant.className} text-4xl md:text-6xl font-semibold  text-[#2D2D1F]`}
          >
            Place a bulk <br /> order with us
          </h1>

          <p
            className={`${poppins.className} text-gray-700 text-lg mt-3 leading-relaxed max-w-xl`}
          >
            Whether you want to place a large customised order for a single item or
            multiple craft products, we can sort it out for you! We have worked on
            custom orders for years—just drop us a note!
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex gap-4 flex-wrap">
            <button className="px-6 py-3 border border-gray-700 text-gray-700 hover:bg-gray-300 transition duration-300">
              Learn More
            </button>

            <button className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 transition duration-300">
              Get in Touch
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Bulking;
