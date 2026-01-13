"use client";

import FilterSection from "./FilterSection";
import { Slider } from "@/components/ui/slider";

export default function DesktopFilters({
  price,
  setPrice,
  sections,
  setSections,
  sort,
  setSort,
}: any) {
  const toggleSection = (value: string) => {
    setSections((prev: string[]) =>
      prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="sticky top-24 w-72 bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">
        Filters
      </h2>

      {/* PRICE */}
      <FilterSection title="Price Range">
        <Slider
          value={[price]}
          max={100000}
          step={500}
          onValueChange={(v) => setPrice(v[0])}
        />
        <p className="text-sm text-gray-600">
          Up to ₹{price.toLocaleString()}
        </p>
      </FilterSection>

      {/* SECTIONS */}
      <FilterSection title="Collections">
        {[
          { label: "Best Sellers", value: "best-sellers" },
          { label: "New Arrivals", value: "new-arrivals" },
          { label: "Bulking Items", value: "bulking" },
        ].map((item) => (
          <label
            key={item.value}
            className="flex items-center gap-3 cursor-pointer text-sm"
          >
            <input
              type="checkbox"
              checked={sections.includes(item.value)}
              onChange={() => toggleSection(item.value)}
              className="accent-indigo-600"
            />
            {item.label}
          </label>
        ))}
      </FilterSection>

      {/* SORT */}
      <FilterSection title="Sort By">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full h-10 border rounded-lg px-3 text-sm"
        >
          <option value="latest">Latest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </FilterSection>

      {/* CLEAR */}
      <button
        onClick={() => {
          setPrice(100000);
          setSections([]);
          setSort("latest");
        }}
        className="w-full h-11 mt-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm"
      >
        Clear Filters
      </button>
    </div>
  );
}
