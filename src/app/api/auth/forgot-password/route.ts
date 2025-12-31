import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/sendEmail";




export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    //  Security: don't reveal user existence
    if (!user) {
      return NextResponse.json({
        message: "If the email exists, a reset link was sent",
      });
    }



    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpiry = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;

    // TEMP: log link (email later)
    console.log("RESET PASSWORD LINK:", resetLink);

    // after creating resetLink

await sendResetEmail(user.email, resetLink);



    return NextResponse.json({
      message: "Password reset link sent",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

