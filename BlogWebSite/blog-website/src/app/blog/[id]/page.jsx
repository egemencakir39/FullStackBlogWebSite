"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductsById } from "@/redux/productSlice";
import React, { use } from "react";
import { useParams } from "next/navigation";
import { CircularProgress, IconButton } from "@mui/material";
import { AddComment } from "@mui/icons-material";
import AddComments from "@/components/AddComments";

const page = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const { id } = useParams();

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

  useEffect(() => {
    dispatch(getProductsById(id));
    console.log(items);
  }, [dispatch]);

  const {
    _id,
    title,
    content,
    coverImage,
    tags,
    authorName,
    publishedAt,
  } = items;

  return (
    <div>
      <div className="w-full flex justify-center p-10">
        <img className="mx-auto" width={800} src={coverImage} alt="" />
      </div>
      <div className="">
        <h1 className="text-4xl text-center mt-30">{title}</h1>
        <p className=" font-bold pt-10 min-h-54">{content}</p>
        <div className="flex justify-between mt-10">
          <p className="text-black font-bold">Yazar: {authorName}</p>
          <p className="">{publishedAt}</p>
        </div>
        <AddComments/>
      </div>
    </div>
  );
};

export default page;
