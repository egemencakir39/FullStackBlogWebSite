import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },

    coverImage: { type: String, default: null },
    coverImagePublicId: { type: String, default: null },

    tags: { type: String, default: null },
    authorName: { type: String, default: "Admin" },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
