import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 h-190">
        <h2 className="p-5 text-4xl">Admin Login</h2>
        <input className="m-5" type="text" placeholder="Username" />
        <input className="mb-5" type="password" placeholder="Password" />
        <button className="px-5">Login</button>
    </div>
  );
};

export default page;
