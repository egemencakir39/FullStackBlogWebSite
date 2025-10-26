import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  const publicPaths = ["/admin/login"];

  const token = req.cookies.get("token")?.value;

  const isPublic = publicPaths.some((p) => path.startsWith(p));

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      console.log("❌ Geçersiz token:", err.message);

      const response = NextResponse.redirect(new URL("/admin/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
