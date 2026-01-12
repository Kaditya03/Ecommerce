import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";

/* ================= CREATE PRODUCT (ADMIN ONLY) ================= */

export async function POST(req: Request) {
  try {
    await connectDB();

    /* ---------- AUTH CHECK ---------- */
    const auth = req.headers.get("authorization");
    if (!auth) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = auth.replace("Bearer ", "");
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );
    }

    /* ---------- BODY ---------- */
    const {
      name,
      price,
      description,
      category,
      sections = [],
      images,
      minOrderQty = 50,
    } = await req.json();

    if (!name || !price || !category) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!images || !images.length) {
      return NextResponse.json(
        { message: "At least one image required" },
        { status: 400 }
      );
    }

    /* ---------- SEO SLUG ---------- */
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    /* ---------- CREATE ---------- */
    const product = await Product.create({
      name,
      slug,
      price,
      description,
      category,
      sections,        // ✅ best-sellers, new-arrivals, bulking
      images,          // ✅ Cloudinary URLs
      minOrderQty,     // ✅ MOQ
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("ADMIN PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
