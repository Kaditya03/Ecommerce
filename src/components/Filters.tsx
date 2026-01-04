"use client";

export default function Filters({
  price,
  setPrice,
  size,
  setSize,
}: any) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-2">
          Price Range
        </h4>
        <input
          type="range"
          min={500}
          max={5000}
          step={100}
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
          className="w-full"
        />
        <p className="text-sm mt-1">
          Up to ₹{price}
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-2">
          Size
        </h4>
        <select
          value={size}
          onChange={(e) =>
            setSize(e.target.value)
          }
          className="w-full border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
    </div>
  );
}
