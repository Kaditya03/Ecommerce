"use client";

import { useState } from "react";

export default function ProductTable({
  products,
  refresh,
}: any) {
  const toggleSection = async (
    product: any,
    section: string
  ) => {
    const updated = {
      sections: product.sections.includes(section)
        ? product.sections.filter((s: string) => s !== section)
        : [...product.sections, section],
    };

    await fetch(`/admin/api/products/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    refresh();
  };

  const deleteProduct = async (id: string) => {
    await fetch(`/admin/api/products/${id}`, {
      method: "DELETE",
    });
    refresh();
  };

  return (
    <div className="space-y-4">
      {products.map((p: any) => (
        <div
          key={p._id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-gray-500">
              ₹{p.price} • {p.category}
            </p>
          </div>

          <div className="flex gap-3">
            {["best-sellers", "new-arrivals", "bulking"].map(
              (s) => (
                <button
                  key={s}
                  onClick={() => toggleSection(p, s)}
                  className={`px-3 py-1 rounded-full text-xs ${
                    p.sections.includes(s)
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              )
            )}

            <button
              onClick={() => deleteProduct(p._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
