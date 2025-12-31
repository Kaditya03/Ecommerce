import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function POST(req: Request) {
  await connectDB();

  const { name, price, category, images } = await req.json();

  if (!images || !images.length) {
    return NextResponse.json(
      { message: "Images required" },
      { status: 400 }
    );
  }

  const product = await Product.create({
    name,
    price,
    category,
    images,
  });

  return NextResponse.json(product);
}
