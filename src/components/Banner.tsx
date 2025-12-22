"use client";

import React, { useRef, useState, useEffect } from "react";
import { Cormorant_Garamond, Poppins } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

 // ⭐ COUNT UP HOOK
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16);

          const animate = () => {
            start += increment;
            if (start < end) {
              setCount(Math.floor(start));
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
  }, [end, duration]);

  return { count, ref };
};

const Banner = () => {
  const { count: stateCount, ref: stateRef } = useCountUp(21, 1500);
  const { count: artisanCount, ref: artisanRef } = useCountUp(2000, 2000);

  return (
    <div className="w-full bg-stone-100 py-16 md:py-24 relative overflow-hidden">

      {/* DESKTOP BG IMAGE */}
      <img
        src="/images/Banner.png"
        alt="plants"
        className="
          hidden md:block
          absolute right-0 top-0 
          w-[25%] h-full opacity-70 pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-10 lg:px-20 relative z-10">

        <div>
          <p className={`${poppins.className} text-sm text-gray-700 mb-3`}>
            Our Mission
          </p>

          <h1 className={`${cormorant.className} text-4xl md:text-6xl font-semibold  text-[#2D2D1F]`}>
            Every purchase <br /> has a purpose
          </h1>

          <p className={`${poppins.className} text-gray-700 text-lg mt-6 leading-relaxed max-w-xl`}>
            We have direct partnerships with over 320 Indian artisans and over
            2000 indirectly. As a social enterprise, our primary purpose is to support
            handicraft workers. With each purchase you make, you help make a difference.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-10">

          {/* MOBILE */}
          <div className="md:hidden flex items-center justify-between w-full">
            <div>
              <div className="mb-6">
                <h2 ref={stateRef} className={`${cormorant.className} text-4xl font-semibold text-[#2D2D1F]`}>
                  {stateCount}+
                </h2>
                <p className={`${poppins.className} text-sm tracking-widest mt-1 text-gray-700`}>
                  STATES
                </p>
              </div>

              <div>
                <h2 ref={artisanRef} className={`${cormorant.className} text-4xl font-semibold text-[#2D2D1F]`}>
                  {artisanCount}
                </h2>
                <p className={`${poppins.className} text-sm tracking-widest mt-1 text-gray-700`}>
                  INDIAN ARTISANS
                </p>
              </div>
            </div>

            <img
              src="/images/Banner.png"
              alt="mobile-img"
              className="w-[40%] h-auto object-contain opacity-80"
            />
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex flex-col justify-center items-center gap-10">
            <div className="text-center">
              <h2 ref={stateRef} className={`${cormorant.className} text-5xl font-semibold text-[#2D2D1F]`}>
                {stateCount}+
              </h2>
              <p className={`${poppins.className} text-sm tracking-widest mt-1 text-gray-700`}>
                STATES
              </p>
            </div>

            <div className="text-center">
              <h2 ref={artisanRef} className={`${cormorant.className} text-5xl font-semibold text-[#2D2D1F]`}>
                {artisanCount}
              </h2>
              <p className={`${poppins.className} text-sm tracking-widest mt-1 text-gray-700`}>
                INDIAN ARTISANS
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
