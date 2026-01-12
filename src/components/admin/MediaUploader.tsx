"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MediaUploader() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    // ✅ FORCE MEDIA PAGE REFRESH
    window.location.reload();
  };

  return (
    <motion.label
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer flex items-center justify-center h-44 rounded-2xl border-2 border-dashed border-indigo-400 bg-indigo-50 hover:bg-indigo-100 transition"
    >
      <input type="file" hidden onChange={handleUpload} />
      <span className="text-indigo-600 font-medium">
        {uploading ? "Uploading..." : "Click to Upload Image"}
      </span>
    </motion.label>
  );
}
