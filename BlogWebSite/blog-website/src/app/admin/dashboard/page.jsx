"use client";
import AddBlogCardModal from "@/components/AddBlogCardModal";
import DashBoardBlogCard from "@/components/DashBoardBlogCard";
import React from "react";
import { useState } from "react";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full p-10 flex justify-center md:justify-end">
          <button onClick={() => setShowModal(true)} className="px-6 text-2xl">
            Blog Ekle
          </button>
        </div>
        <DashBoardBlogCard />
        <DashBoardBlogCard />
        <DashBoardBlogCard />
        <DashBoardBlogCard />
      </div>
      {showModal && <AddBlogCardModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Page;
