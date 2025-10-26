"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginAdmin } from "@/redux/adminSlice";

const Page = () => {
  const router = useRouter();
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await dispatch(loginAdmin({ username, password })).unwrap();

      router.push("/admin/dashboard");
    } catch (error) {
      setErr(error?.message || "Giriş başarısız");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 border p-6 rounded-lg"
      >
        <h1 className="text-xl font-bold">Admin Girişi</h1>
        <input
          value={username}
          onChange={(e) => setU(e.target.value)}
          placeholder="Kullanıcı adı"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setP(e.target.value)}
          placeholder="Şifre"
          className="w-full border rounded px-3 py-2"
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button
          type="submit"
          className="w-full rounded px-4 py-2 bg-black text-white"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Page;
