import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";

/* ================= ADMIN DASHBOARD DATA ================= */

export async function GET() {
  try {
    await connectDB();

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });

    // (Optional) revenue example
    const revenueAgg = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const revenue = revenueAgg[0]?.total || 0;

    return NextResponse.json({
      products: totalProducts,
      orders: totalOrders,
      pendingOrders,
      revenue,
      chart: [], // we’ll plug real charts next
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
