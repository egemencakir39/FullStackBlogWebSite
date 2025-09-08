import React from "react";
import Link from "next/link";

const Blogcard = ({ product }) => {
  if (!product) {
    return null;
  }

  const {
    _id,
    title,
    content,
    coverImage,
    tags,
    authorName,
    publishedAt,
  } = product;

  return (
    <div className="w-sm border-2 p-4 m-4 rounded-lg hover:shadow-lg transition-shadow flex flex-col items-center gap-4">
      <img className="flex" src={coverImage} alt="yok" width={250}  />
      <div className="w-full">
        <h3 className="py-6 text-xl">{title}</h3>
        <div className="flex justify-between">
          <p className="text-green-800 font-bold">#{tags}</p>
          <p className="text-right pb-2">01.01.2024</p>
        </div>

        <p className="pb-6">
         {content.split(" ").slice(0, 20).join(" ")}
        </p>
        <Link href={`/blog/${_id}`}>
          <button className="text-xl px-4">Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default Blogcard;
