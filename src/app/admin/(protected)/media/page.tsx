import MediaUploader from "@/components/admin/MediaUploader";
import MediaGrid from "@/components/admin/MediaGrid";

export default async function AdminMedia() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/media`,
    { cache: "no-store" }
  );

  const images = await res.json();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold">Media Library</h1>
        <p className="text-gray-500 mt-1">
          Upload and manage Cloudinary images
        </p>
      </div>

      <MediaUploader />

      <MediaGrid images={images} />
    </div>
  );
}
