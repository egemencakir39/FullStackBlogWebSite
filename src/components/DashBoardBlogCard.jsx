"use client";
import React from "react";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

const DashBoardBlogCard = ({product}) => {
   if (!product) { return null; }

     const {
    _id,
    title,
    content,
    coverImage,
    tags,
    authorName,
    publishedAt,
  } = product;
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="w-sm border-2 p-4 m-4 rounded-lg hover:shadow-lg transition-shadow flex flex-col items-center gap-4">
        <img className="flex" src={coverImage} width={384} alt="" />
        <div className="w-full">
          <h3 className="py-6 text-xl">{title}</h3>
          <div className="flex justify-between">
            <p className="text-green-800 font-bold">#{tags}</p>
            <p className="text-right pb-2">{publishedAt.split(" ").slice(0, 1).join(" ")}</p>
          </div>

          <p className=" pb-6">
            {content.split(" ").slice(0, 20).join(" ")}
          </p>
          <button onClick={() => setShowModal(true)} className="text-xl px-4">
            Düzenle
          </button>
        </div>
      </div>
      {showModal && <UpdateModal product={product} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default DashBoardBlogCard;
