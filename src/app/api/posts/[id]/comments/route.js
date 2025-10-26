import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Comment from "@/models/Comment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  await dbConnect();
  const {id} = await params;
  const comments = await Comment.find({ postId: id });
  return NextResponse.json(comments);
}

export async function POST(req, context) {
  await dbConnect();
  const { id } = await context.params;
  const body = await req.json();

  if (!body?.name || !body?.content) {
    return NextResponse.json(
      { error: "name ve content zorunlu" },
      { status: 400 }
    );
  }
  const newComment = await Comment.create({ ...body, postId: id });
  return NextResponse.json(newComment, { status: 201 });
}
