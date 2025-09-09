import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("admin_session", { path: "/" });
  return NextResponse.json({ ok: true });
}
