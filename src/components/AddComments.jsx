"use client";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { createComment, getCommentsByPostId } from "@/redux/commentSlice";
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import { comment } from "postcss";
import { set } from "mongoose";


const AddComments = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.comments);
  const safeItems = Array.isArray(items) ? items : [];
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCommentsByPostId(id));
  }, []);

  const addComment = () => {
    if (!form.name || !form.content) return;
    dispatch(createComment({id,commentData: form}));
    setForm({ name: "", content: "" });
  };

  const [form, setForm] = useState({
    name: "",
    content: "",
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }
  if (error)
    return (
      <div className="text-center text-red-500">Error fetching comments</div>
    );
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  return (
    <div className="m-10 p-10">
      <div className="border-b-2 border-gray-300 my-10">
        <h1 className="text-center my-5 text-4xl">Comments</h1>
      </div>
      <div className="flex flex-col gap-4 max-w-240 mx-auto">
        <input
          value={form.name}
          onChange={onChange}
          name="name"
          type="text"
          placeholder="Name"
        />
        <textarea
          value={form.content}
          onChange={onChange}
          name="content"
          id=""
        ></textarea>
      </div>
      <div className="flex justify-end max-w-240 mx-auto mt-4">
        <button onClick={addComment}>Add Comment</button>
      </div>
      <div>
        {safeItems.map((comment) => (
          <Comments key={comment._id} comment={comment} />
        ))}
        {safeItems.length === 0 && (
          <div className="text-center text-gray-500">No comments available</div>
        )}
      </div>
    </div>
  );
};

export default AddComments;
