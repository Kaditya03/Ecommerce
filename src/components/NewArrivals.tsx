"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const NewArrivals = () => {
  const products = [
    {
      name: "ExclusiveLane 'Forest Canopy' Ceramic Dinner Plates (Set of 2, Microwave Safe, Hand Glazed)",
      img: "/images/n1.jpg",
      price: "Rs. 999",
      old: "Rs. 1,749",
      off: "43% Off",
    },
    {
      name: "Exclusive Brass Candle Holders (Set of 2) - Roses",
      img: "/images/n2.webp",
      price: "Rs. 1,599",
      old: "Rs. 3,499",
      off: "54% Off",
    },
    {
      name: "Exclusive Brass Curio/ Bowl - Roots (Large), Dia - 9.5",
      img: "/images/n3.jpg",
      price: "Rs. 899",
      old: "Rs. 1,375",
      off: "35% Off",
    },
    {
      name: 'Hand-rendered Stone Dust Painting - Mehr-e-Bagh (Framed 16" x 13")',
      img: "/images/n4.jpg",
      price: "Rs. 1,199",
      old: "Rs. 2,415",
      off: "50% Off",
    },
    {
      name: "Brass Candle Holder / Curio - Dancing Couple",
      img: "/images/n5.webp",
      price: "Rs. 949",
      old: "Rs. 1,750",
      off: "46% Off",
    },
  ];

  return (
    <div className="w-full py-12 px-6 md:px-12">
      
      {/* SECTION TITLE */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">New-Arrivals</h2>
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
            <img src={p.img} className="w-full h-85 object-cover " />

            <div className="p-4">
              <p className="font-medium text-gray-700 h-18">{p.name}</p>

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
                <img src={p.img} className="w-full h-85 object-cover rounded-t-lg" />

                <div className="p-4">
                  <p className="font-medium text-gray-700 h-18">{p.name}</p>

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

export default NewArrivals;
