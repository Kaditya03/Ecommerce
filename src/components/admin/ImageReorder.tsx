"use client";

import { Reorder } from "framer-motion";

export default function ImageReorder({
  images,
  setImages,
}: {
  images: string[];
  setImages: (v: string[]) => void;
}) {
  return (
    <Reorder.Group
      axis="x"
      values={images}
      onReorder={setImages}
      className="flex gap-4 overflow-x-auto"
    >
      {images.map((img) => (
        <Reorder.Item
          key={img}
          value={img}
          className="cursor-grab"
        >
          <img
            src={img}
            className="h-24 w-24 rounded-xl object-cover"
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
