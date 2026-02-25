
"use client"; 
// Khai báo đây là Client Component (vì dùng useState, useEffect, sự kiện)

import React, { useState, useEffect } from "react";
// Import React và các hook quản lý state & lifecycle

import { User, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
// Import icon dùng cho giao diện

import Link from "next/link";
// Link điều hướng của Next.js (client-side navigation)

import { useLogin } from "../auth.hooks";
import toast from "react-hot-toast";
// Custom hook xử lý logic đăng nhập (gọi API, loading, ...)

export default function LoginForm() {

  // State đánh dấu component đã render ở client
  // Dùng để tránh lỗi hydration khi render nội dung động
  const [isClient, setIsClient] = useState(false);

  // State bật / tắt hiển thị mật khẩu
  const [showPass, setShowPass] = useState(false);

  // State lưu tài khoản (username / phone)
  const [identifier, setIdentifier] = useState("");

  // State lưu mật khẩu
  const [password, setPassword] = useState("");

  // Lấy hàm đăng nhập và trạng thái loading từ hook
  const { handleLoginAction, isLoading } = useLogin();

  // Chạy 1 lần khi component đã mount trên trình duyệt
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hàm xử lý submit form đăng nhập
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn reload trang khi submit form

    // Kiểm tra dữ liệu nhập
    if (!identifier || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    // Gọi logic đăng nhập trong hook
    handleLoginAction({ identifier, password });
  };

  return (
    // Wrapper căn giữa form + nền gradient toàn màn hình
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6ee] via-[#f8f1e7] to-[#efe5d8] px-4">

      {/* Khung form đăng nhập */}
      <div className="w-full max-w-md bg-[#fffaf3] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10">

        {/* Tiêu đề form */}
        <h1 className="text-3xl font-serif text-center text-[#3b2f2f] tracking-widest mb-10 uppercase font-black">
          Đăng nhập
        </h1>

        {/* Form đăng nhập */}
        <form className="space-y-8" onSubmit={handleLogin}>

          {/* Input tài khoản */}
          <div className="relative border-b border-[#c9b8a5] focus-within:border-[#c9a24d] transition-all">
            <input
              type="text"
              placeholder="Tên đăng nhập hoặc số điện thoại"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full py-2 bg-transparent outline-none pr-10 text-[#3b2f2f] placeholder-[#9b8b7a]"
            />
            {/* Icon user */}
            <User className="absolute right-0 top-2 w-5 h-5 text-[#9b8b7a]" />
          </div>

          {/* Input mật khẩu */}
          <div className="relative border-b border-[#c9b8a5] focus-within:border-[#c9a24d] transition-all">
            <input
              type={showPass ? "text" : "password"} // Đổi kiểu input khi hiện/ẩn mật khẩu
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 bg-transparent outline-none pr-10 text-[#3b2f2f] placeholder-[#9b8b7a]"
            />

            {/* Nút bật / tắt hiển thị mật khẩu */}
            <button
              type="button" // Không submit form
              className="absolute right-0 top-2 cursor-pointer text-[#9b8b7a] hover:text-[#c9a24d]"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Nút đăng nhập */}
          <button 
            type="submit"
            disabled={!isClient || isLoading} 
            // Disable khi chưa mount client hoặc đang login
            suppressHydrationWarning 
            // Tắt cảnh báo hydration nếu render khác nhau nhẹ
            className="w-full mt-6 py-3 rounded-xl font-semibold text-white tracking-wide
                       bg-gradient-to-r from-[#c9a24d] to-[#e6c77b]
                       hover:from-[#b8943f] hover:to-[#d9b865]
                       transition-all duration-300 shadow-lg flex justify-center items-center"
          >
            {/* Hiển thị icon loading sau khi client mount */}
            {isClient && isLoading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        {/* Khu vực link phụ */}
        <div className="mt-8 text-center space-y-4">

          {/* Link đăng ký */}
          <p className="text-[#7a6a5d] text-sm">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="font-semibold text-[#3b2f2f] hover:underline">
              Đăng ký ngay
            </Link>
          </p>

          {/* Link quay lại trang chủ */}
          <Link 
            href="/" 
            className="inline-flex items-center justify-center text-[#7a6a5d] hover:text-[#3b2f2f] text-sm pt-4 border-t border-[#e0d7cd] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang chủ
          </Link>

        </div>
      </div>
    </div>
  );
}
