import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json(
        { message: "No files uploaded" },
        { status: 400 }
      );
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise<string>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "aurindel/products" },
              (err, result) => {
                if (err || !result) reject(err);
                else resolve(result.secure_url);
              }
            )
            .end(buffer);
        });
      })
    );

    return NextResponse.json({ urls: uploads });
  } catch (err) {
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}
