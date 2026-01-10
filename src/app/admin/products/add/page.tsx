"use client";

import { useState } from "react";

export default function CreateProduct() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    setLoading(true);

    const formData = new FormData();
    Array.from(files).forEach((file) =>
      formData.append("files", file)
    );

    const res = await fetch("/api/upload/product-images", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImages(data.urls);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-20">
      <h2 className="text-xl font-medium mb-4">
        Upload Product Images
      </h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
      />

      {loading && <p className="mt-4">Uploading...</p>}

      <div className="grid grid-cols-3 gap-3 mt-4">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            className="w-full h-28 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
