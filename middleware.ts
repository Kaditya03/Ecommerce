import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token =
    authHeader?.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  /* ================= PUBLIC ROUTES ================= */
  if (
    pathname.startsWith("/api/auth") ||
    pathname === "/admin/login"
  ) {
    return NextResponse.next();
  }

  /* ================= NO TOKEN ================= */
  if (!token) {
    // API → JSON
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Page → redirect
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    /* ================= ADMIN GUARD ================= */
    if (pathname.startsWith("/admin")) {
      if (decoded.role !== "admin") {
        return NextResponse.redirect(
          new URL("/", req.url)
        );
      }
    }

    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }
}

export const config = {
  matcher: [
    "/api/orders/:path*",
    "/api/products/:path*",
    "/admin/:path*",
  ],
};
