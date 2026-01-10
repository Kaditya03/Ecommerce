import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "aurindel", // 🔥 all images grouped
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      url: uploadResult.secure_url, // ✅ Cloudinary URL
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}
