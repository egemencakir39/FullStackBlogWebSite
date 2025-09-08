"use client";
import { deleteProduct } from "@/redux/productSlice";
import React, { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "@/redux/productSlice";

const UpdateModal = ({ onClose, product }) => {
  const dispatch = useDispatch();
  if (!product) {
    return null;
  }

  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    tags: "",
    content: "",
    coverImage: null,
    coverImagePublicId: null,
  });
  useEffect(() => {
    setForm({
      title: product.title ?? "",
      tags: product.tags ?? "",
      content: product.content ?? "",
      coverImage: product.coverImage ?? null,
      coverImagePublicId: product.coverImagePublicId ?? null,
    });
  }, [product]);
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
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
        console.log("Cloudinary uploader:", cloudinary.uploader);
      }
    } catch (err) {
      console.error(err);
      alert("Upload hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };
  const onRemove = async () => {
    const ok = confirm("Postu silmek istediğinize emin misiniz?");
    if (!ok) return;
    await dispatch(deleteProduct(product._id));
    onClose();
  };
  const onSave = async () => {
    const ok = confirm("Güncellemek istediğinize emin misiniz?");
    if (!ok) return;
    await dispatch(updateProduct({ id: product._id, updatedData: form }));
    onClose();
  };
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
            name="title"
            type="text"
            placeholder="Başlık"
            onChange={onChange}
            value={form.title}
          />
        </div>
        <div className="flex flex-col gap-4 mt-6">
          Etiket
          <input
            name="tags"
            type="text"
            placeholder="Etiket"
            onChange={onChange}
            value={form.tags}
          />
        </div>
        <div className="flex flex-col gap-4 mt-6">
          İçerik
          <textarea
          name="content"
            rows={10}
            placeholder="İçerik"
            onChange={onChange}
            value={form.content}
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
          <button onClick={onSave} className=" text-white rounded-md mx-4">
            Güncelle
          </button>
          <button
            onClick={onRemove}
            className="text-white rounded-md mx-4 px-4 bg-red-600 hover:bg-red-300 hover:text-red-700"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
