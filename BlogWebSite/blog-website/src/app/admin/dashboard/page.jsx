"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/redux/productSlice";
import { useRouter } from "next/navigation";
import AddBlogCardModal from "@/components/AddBlogCardModal";
import DashBoardBlogCard from "@/components/DashBoardBlogCard";

const Page = () => {
  const router = useRouter();                 
  const dispatch = useDispatch();             
  const { items, loading } = useSelector((s) => s.products);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

 
  useEffect(() => {
    const hasSession = document.cookie.includes("admin_session=ok");
    if (!hasSession) router.replace("/admin/login");
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  const safeItems = Array.isArray(items) ? items : [];

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full p-10 flex justify-center md:justify-end gap-4">
          <button onClick={() => setShowModal(true)} className="px-6 text-2xl">Blog Ekle</button>
          <button onClick={logout} className="rounded px-4 py-2 border">Çıkış Yap</button>
        </div>

        {safeItems.map((p) => (
          <DashBoardBlogCard key={p._id} product={p} />
        ))}
        {safeItems.length === 0 && (
          <div className="text-center text-gray-500">No products available</div>
        )}
      </div>

      {showModal && <AddBlogCardModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Page;
