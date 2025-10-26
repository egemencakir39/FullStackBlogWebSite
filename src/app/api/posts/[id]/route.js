import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Post from "@/models/Post";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary"; 

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bad = (msg, status = 400) => NextResponse.json({ error: msg }, { status });
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);


export async function GET(_req, { params }) {
  await dbConnect();
  const { id } = await params;
  if (!isValidId(id)) return bad("Geçersiz id");
  const doc = await Post.findById(id);
  if (!doc) return bad("Post bulunamadı", 404);
  return NextResponse.json(doc);
}


export async function PATCH(req, { params }) {
  await dbConnect();
  const { id } = await params;
  if (!isValidId(id)) return bad("Geçersiz id");

  const body = await req.json();
  const allowed = [
    "title",
    "content",
    "coverImage",
    "coverImagePublicId",
    "tags",
    "authorName",
    "category",
    "publishedAt",
  ];
  const update = Object.fromEntries(
    Object.entries(body).filter(([k, v]) => allowed.includes(k) && v !== undefined)
  );
  if (Object.keys(update).length === 0) return bad("Güncellenecek alan yok");

  const doc = await Post.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
  if (!doc) return bad("Post bulunamadı", 404);
  return NextResponse.json(doc);
}


export async function DELETE(_req, { params }) {
  await dbConnect();
  const { id } = await params;
  if (!isValidId(id)) return bad("Geçersiz id");

  const doc = await Post.findById(id);
  if (!doc) return bad("Post bulunamadı", 404);


  if (doc.coverImagePublicId && cloudinary?.uploader) {
    try {
      await cloudinary.uploader.destroy(doc.coverImagePublicId);
    } catch (e) {
      console.warn("Cloudinary silme hatası:", e?.message || e);
    }
  }

  await Post.findByIdAndDelete(id);
  return NextResponse.json({ ok: true, id });
}