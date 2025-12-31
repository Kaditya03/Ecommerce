import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      emailVerificationToken: token,
      isEmailVerified: false,
    });

    const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email/${token}`;

    await sendVerificationEmail(user.email, verifyLink);

    return NextResponse.json({
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
