import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();

  const { token } = await req.json();

  const user = await User.findOne({
    emailVerificationToken: token,
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired verification link" },
      { status: 400 }
    );
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  await user.save();

  return NextResponse.json({
    message: "Email verified successfully",
  });
}
