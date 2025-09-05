"use client";
import React from "react";
import { useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <header className="flex justify-around sticky top-0 py-8 bg-gradient-to-r from-emerald-400 to-lime-400bg-gradient-to-r from-emerald-400 to-lime-400" >
      <div>
        <Image
          src="/blogLogo.png"
          alt="logo"
          width={96}
          height={50}
          className="object-contain"
        />
      </div>
      <nav className="hidden md:flex gap-x-6 text-xl font-medium items-center text-gray-800 font-['Plus_Jakarta_Sans']">
        <a
          href="#"
          className="relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-white hover:text-white after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
        >
          Anasayfa
        </a>
        <a
          href="#"
          className="relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-white hover:text-white after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
        >
          Blog
        </a>
        <a
          href="#"
          className="relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-white hover:text-white after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
        >
          Hakkımda
        </a>
        <button
          onClick={() => setShowModal(true)}
          className=" hover:text-green-600 after:transition-all "
        >
          <FaSearch />
        </button>
      </nav>
      <button>
        <p className="mx-3 font-medium">Yönetici Girişi</p>
        <AdminPanelSettingsIcon />
      </button>
      {showModal && <SearchModal onClose={() => setShowModal(false)} />}
    </header>
  );
};

export default Header;
