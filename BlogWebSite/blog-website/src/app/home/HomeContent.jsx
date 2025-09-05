import Blogcard from "@/components/Blogcard";
import React from "react";

const HomeContent = () => {
  return (
    <div>
      <h1 className="text-center text-7xl py-20 my-blog-title">My Blogs</h1>
      <div className="flex flex-wrap justify-center">
        <Blogcard />
        <Blogcard />
        <Blogcard />
        <Blogcard />
      </div>
    </div>
  );
};

export default HomeContent;
