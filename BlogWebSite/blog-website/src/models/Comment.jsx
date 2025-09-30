import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        content: {type: String, required: true},
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    },
    {timestamps: true}
);
export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
