import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

/* ================= ADMIN DASHBOARD DATA ================= */

export async function GET(req: Request) {
  try {
    await connectDB();

    /* ---------- AUTH ---------- */
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
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    /* ---------- DATA ---------- */
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({
      status: "pending",
    });

    return NextResponse.json({
      totalProducts,
      totalOrders,
      pendingOrders,
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
