"use client";

export default function ImageUploader({
  onUpload,
}: {
  onUpload: (urls: string[]) => void;
}) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(e.target.files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("Upload failed");
        continue;
      }

      const data = await res.json();
      uploadedUrls.push(data.url); // ✅ Cloudinary URL
    }

    // 🔥 IMPORTANT: pass array of URLs
    onUpload(uploadedUrls);
  };

  return (
    <label className="flex h-48 border-2 border-dashed rounded-2xl cursor-pointer items-center justify-center bg-indigo-50 hover:bg-indigo-100 transition">
      <input
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={handleUpload}
      />
      <div className="text-center">
        <div className="text-4xl text-indigo-600 mb-2">+</div>
        <p className="text-sm font-medium text-indigo-700">
          Upload Images
        </p>
      </div>
    </label>
  );
}
