"use client";
import Blogcard from "@/components/Blogcard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, IconButton } from "@mui/material";
import { getProducts } from "@/redux/productSlice";

const HomeContent = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const safeItems = Array.isArray(items) ? items : [];

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center text-red-500">Error fetching products</div>
    );

  return (
    <div>
      <h1 className="text-center text-7xl py-20 my-blog-title">My Blogs</h1>
      <div className="flex flex-wrap justify-center">
        {safeItems.map((product) => (
          <Blogcard key={product._id} product={product} />
        ))}
        {safeItems.length === 0 && (
          <div className="text-center text-gray-500">No products available</div>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
