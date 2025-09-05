'use client'
import React from 'react'

const SearchModal = ({ onClose }) => {
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
        />

        {/* Arama sonuçları (dummy) */}
        <ul className="mt-4">
          <li className="py-1 border-b">Blog 1</li>
          <li className="py-1 border-b">Blog 2</li>
        </ul>
      </div>
    </div>
  )
}

export default SearchModal


