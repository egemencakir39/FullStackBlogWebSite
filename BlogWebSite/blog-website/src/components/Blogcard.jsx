import React from "react";
import Link from "next/link";

const Blogcard = () => {
  return (
    <div className="w-sm border-2 p-4 m-4 rounded-lg hover:shadow-lg transition-shadow flex flex-col items-center gap-4">
      <img className="flex" src="/blogLogo.png" width={384} alt="" />
      <div className="">
        <h3 className="py-6 text-xl">Lorem Ipsum</h3>
        <div className="flex justify-between">
          <p className="text-green-800 font-bold">#Nature</p>
          <p className="text-right pb-2">01.01.2024</p>
        </div>

        <p className="pb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ipsum
          ratione, culpa commodi expedita placeat suscipit voluptatum cum sit.
          Pariatur?
        </p>
        <Link href={"/blog/1"}>
          <button className="text-xl px-4">Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default Blogcard;
