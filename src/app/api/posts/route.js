import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Post from "@/models/Post";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const posts = await Post.find();
  return NextResponse.json(posts);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  if (!body?.title || !body?.content) {
    return NextResponse.json({ error: "title ve content zorunlu" }, { status: 400 });
  }

  const newPost = await Post.create(body);
  return NextResponse.json(newPost, { status: 201 });
}