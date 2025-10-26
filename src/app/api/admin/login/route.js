import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { username, password } = body;

    if ((!username, !password)) {
      return NextResponse.json(
        { error: "Username ve şifre zorunludur." },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      NextResponse.json(
        { error: "Böyle bir yönetici bulunamadı." },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      NextResponse.json({ error: "Hatalı Şifre." }, { status: 401 });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const res = NextResponse.json({
      message: "Giriş Başarılı",
      admin: {
        username: admin.username,
        password: admin.password,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return res;
  } catch (error) {
    console.error("Login Hatası", error);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
