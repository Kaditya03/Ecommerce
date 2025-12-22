"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BestSellers = () => {
  const products = [
    {
      name: "Spice Box With Spoon In Sheesham Wood",
      img: "/images/p1.jpg",
      price: "Rs. 999",
      old: "Rs. 1,749",
      off: "43% Off",
    },
    {
      name: "Moroccan Flame Hand-etched Lamp",
      img: "/images/p2.webp",
      price: "Rs. 1,599",
      old: "Rs. 3,499",
      off: "54% Off",
    },
    {
      name: "Mughal Roots Floral Planter Pots",
      img: "/images/p3.webp",
      price: "Rs. 899",
      old: "Rs. 1,375",
      off: "35% Off",
    },
    {
      name: "Pyramid Table Lamp in Sheesham Wood",
      img: "/images/p4.webp",
      price: "Rs. 1,199",
      old: "Rs. 2,415",
      off: "50% Off",
    },
    {
      name: "Mughal Cylindrical Duo Jars",
      img: "/images/p5.jpg",
      price: "Rs. 949",
      old: "Rs. 1,750",
      off: "46% Off",
    },
  ];

  return (
    <div className="w-full py-12 px-6 md:px-12">
      
      {/* SECTION TITLE */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Best-Sellers</h2>
        <Link
          href="/best-sellers"
          className="px-4 py-2 text-blue-700 font-medium   
             hover:bg-green-600 hover:text-white transition-all duration-300"
        >
          View All
        </Link>
      </div>

      {/* DESKTOP GRID (hidden on mobile) */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className="border rounded-lg shadow hover:shadow-lg transition duration-300 bg-white"
          >
            <img src={p.img} className="w-full h-70 object-cover " />

            <div className="p-4">
              <p className="font-medium text-gray-700 h-16">{p.name}</p>

              <div className="mt-3">
                <span className="text-lg font-bold">{p.price}</span>
                <span className="text-gray-500 ml-2 line-through">{p.old}</span>
                <span className="text-green-600 ml-2">{p.off}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3  hover:bg-blue-700 transition">
              + Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* MOBILE SLIDER */}
      <div className="md:hidden">
        <Swiper spaceBetween={15} slidesPerView={1.3}>
          {products.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="border rounded-lg shadow bg-white">
                <img src={p.img} className="w-full h-70 object-cover rounded-t-lg" />

                <div className="p-4">
                  <p className="font-medium text-gray-700 h-16">{p.name}</p>

                  <div className="mt-3">
                    <span className="text-lg font-bold">{p.price}</span>
                    <span className="text-gray-500 ml-2 line-through">{p.old}</span>
                    <span className="text-green-600 ml-2">{p.off}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-b-lg">
                  + Add to cart
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};

export default BestSellers;
