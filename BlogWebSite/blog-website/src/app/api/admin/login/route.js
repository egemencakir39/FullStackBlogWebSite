import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    cookies().set("admin_session", "ok", {
      httpOnly: false,          
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",                
      
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Geçersiz bilgiler" }, { status: 401 });
}
