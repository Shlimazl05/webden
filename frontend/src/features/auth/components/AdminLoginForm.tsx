"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Eye, EyeOff, Lock, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAdminLogin } from "../auth.hooks"; // Giả sử bạn tạo thêm hook này hoặc dùng useLogin có truyền type

export default function AdminLoginForm() {
  const [isClient, setIsClient] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Sử dụng hook đăng nhập dành riêng cho Admin (hoặc thêm logic redirect vào Dashboard)
  const { handleAdminAction, isLoading } = useAdminLogin();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      alert("Vui lòng nhập tài khoản quản trị");
      return;
    }
    handleAdminAction({ identifier, password });
  };

  if (!isClient) return null; // Tránh lỗi hydration hoàn toàn

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f5] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Header trang Login Admin - Trông nghiêm túc và bảo mật hơn */}
        <div className="bg-[#18181b] p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#27272a] rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-[#c9a24d]" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight uppercase">
            Hệ thống Quản trị
          </h1>
          <p className="text-gray-400 text-sm mt-2">Vui lòng đăng nhập để tiếp tục</p>
        </div>

        <div className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Input Tài khoản */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tài khoản quản trị</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Username / Email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:border-[#18181b] focus:ring-1 focus:ring-[#18181b] transition-all"
                />
                <ShieldCheck className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[#18181b]" />
              </div>
            </div>

            {/* Input Mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu bảo mật</label>
              <div className="relative group">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:border-[#18181b] focus:ring-1 focus:ring-[#18181b] transition-all"
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[#18181b]" />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-[#18181b]"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-[#18181b] hover:bg-black transition-all shadow-lg flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : (
                "XÁC THỰC ĐĂNG NHẬP"
              )}
            </button>
          </form>

          {/* Footer form Admin - Loại bỏ đăng ký tự do */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-500 hover:text-[#18181b] text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay về trang bán hàng
            </Link>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center">
              Internal Access Only • Secure Connection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}