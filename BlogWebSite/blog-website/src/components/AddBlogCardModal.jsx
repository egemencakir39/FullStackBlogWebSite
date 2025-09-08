import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "@/redux/productSlice";

const AddBlogCardModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const addBlog = async () => {
    await dispatch(createProduct(form));
    onClose();
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const [uploading, setUploading] = useState(false);

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data?.url && data?.publicId) {
        setForm((f) => ({
          ...f,
          coverImage: data.url,
          coverImagePublicId: data.publicId,
        }));
      } else {
        alert("Resim yüklenemedi.");
      }
    } catch (err) {
      console.error(err);
      alert("Upload hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };
  const [form, setForm] = useState({
    title: "",
    tags: "",
    content: "",
    coverImage: null,
    coverImagePublicId: null,
  });
  return (
    <div className="bg-black/80 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl shadow-xl relative">
        <div className="flex flex-col items-center gap-4">
          <button onClick={onClose} className="absolute top-6 right-2 ">
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          Başlık
          <input
            type="text"
            value={form.title}
            onChange={onChange}
            name="title"
            placeholder="Başlık"
          />
        </div>
        <div className="flex flex-col gap-4 mt-6">
          Etiket
          <input
            value={form.tags}
            onChange={onChange}
            name="tags"
            type="text"
            placeholder="Etiket"
          />
        </div>

        <div className="flex flex-col gap-4 mt-6">
          İçerik
          <textarea
            rows={10}
            value={form.content}
            onChange={onChange}
            name="content"
            placeholder="İçerik"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="bg-blue-500 text-white border p-2 rounded"
        />
        {uploading && <span>Yükleniyor…</span>}
        {form.coverImage && (
          <div className="mt-2">
            <img
              src={form.coverImage}
              alt="preview"
              className="max-h-48 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              {form.coverImagePublicId}
            </p>
          </div>
        )}
        <div className="flex justify-end mt-6">
          <button onClick={addBlog} className=" text-white rounded-md mx-4">Ekle</button>
        </div>
      </div>
    </div>
  );
};

export default AddBlogCardModal;
