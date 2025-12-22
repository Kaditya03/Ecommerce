"use client";
import React from "react";

const Categories = () => {
  const items = [
    { name: "Pottery", img: "/images/pottery.webp" },
    { name: "Handlooms", img: "/images/handloom.jpg" },
    { name: "Brass Art", img: "/images/brass.jpg" },
    { name: "Wood Craft", img: "/images/wood.webp" },
    { name: "Paintings", img: "/images/paintings.jpg" },
    { name: "Home Decor", img: "/images/decor.webp" },
  ];

  return (
    <div className="w-full py-7 bg-white">
        <h2 className="font-bold text-4xl text-center mb-8">Shop By Category</h2>
      
      {/* MOBILE SLIDER */}
      <div className="flex sm:hidden overflow-x-auto no-scrollbar gap-8 px-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-none">
            <div className="w-55 h-55 rounded-full overflow-hidden border-4 border-gray-300 shadow-md hover:scale-105 transition-all duration-300">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden sm:flex flex-row items-center justify-center gap-8 px-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-55 h-55 rounded-full overflow-hidden border-4 border-gray-300 shadow-md hover:scale-105 transition-all duration-300">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Categories;
