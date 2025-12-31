import { NextResponse } from "next/server";
import { sendResetEmail } from "@/lib/sendEmail";

export async function GET() {
  await sendResetEmail(
    "kadiyta03purnea@gmail.com",
    "kumaraditya93134@gmail.com"
  );

  return NextResponse.json({ message: "Test email sent" });
}
