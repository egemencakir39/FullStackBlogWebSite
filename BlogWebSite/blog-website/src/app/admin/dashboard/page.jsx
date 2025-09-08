"use client";
import AddBlogCardModal from "@/components/AddBlogCardModal";
import DashBoardBlogCard from "@/components/DashBoardBlogCard";
import React, { useEffect } from "react";
import { useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/redux/productSlice";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const safeItems = Array.isArray(items) ? items : [];
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full p-10 flex justify-center md:justify-end">
          <button onClick={() => setShowModal(true)} className="px-6 text-2xl">
            Blog Ekle
          </button>
        </div>
        {safeItems.map((product) => (
          <DashBoardBlogCard key={product._id} product={product} />
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
