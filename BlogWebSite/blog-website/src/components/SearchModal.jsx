"use client";
import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/redux/productSlice";
import { useState, useEffect } from "react";
import Link from "next/link";

const SearchModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const safeItems = Array.isArray(items) ? items : [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = safeItems.filter((products) =>
    products.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div className="fixed inset-0  bg-black/80  z-50 flex items-center justify-center">
      <div className=" bg-white  p-6 rounded-lg w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Blog Ara</h2>
        <input
          type="text"
          placeholder="Başlığa göre ara..."
          className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Arama sonuçları */}
        <ul className="mt-4">
          {filteredItems.length === 0 ? (
            <p className="text-gray-500">Sonuç bulunamadı.</p>
          ) : (
            filteredItems.map((product) => (
              <Link
                onClick={onClose}
                href={`/blog/${product._id}`}
                key={product._id}
              >
                <li className="py-2 border-b cursor-pointer">
                  {product.title}
                </li>
              </Link>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchModal;
