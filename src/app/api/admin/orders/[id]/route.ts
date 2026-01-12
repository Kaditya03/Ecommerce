import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { status } = await req.json();

  await Order.findByIdAndUpdate(params.id, { status });
  return NextResponse.json({ success: true });
}
