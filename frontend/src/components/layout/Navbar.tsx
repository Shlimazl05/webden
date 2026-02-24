
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { 
//   Home, 
//   ShoppingCart, 
//   User, 
//   LogOut, 
//   Search, 
//   Camera 
// } from "lucide-react";
// import Cookies from "js-cookie";

// export default function Navbar() {
//   const router = useRouter();
//   const [username, setUsername] = useState<string | null>(null);

//   useEffect(() => {
//     const userStr = localStorage.getItem("user");
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       setUsername(user.username);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");
//     Cookies.remove("user_role");
//     window.location.href = "/login";
//   };

//   return (
//     // 1. CHỈNH KHUNG: Thêm rounded-b-[40px] để bo góc cực mềm ở dưới
//     <nav className="w-full bg-gradient-to-r from-[#d1e9ff] via-[#f3e8ff] to-[#ffdce5] px-8 py-4 shadow-md rounded-b-[40px]">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
        
//         {/* LOGO TRÒN */}
//         <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full shadow-lg overflow-hidden border-2 border-white flex items-center justify-center">
//           <Link href="/">
//             <img 
//               src="/img/logo.jpg" 
//               alt="Logo" 
//               className="w-full h-full object-cover" 
//               onError={(e) => {
//                 e.currentTarget.src = "https://ui-avatars.com/api/?name=SL&background=random";
//               }}
//             />
//           </Link>
//         </div>

//         {/* PHẦN ĐIỀU HƯỚNG VÀ TÌM KIẾM */}
//         <div className="flex flex-col items-end gap-y-4">
          
//           {/* MENU TRÊN */}
//           <div className="flex items-center gap-x-6 text-gray-800 text-[14px] font-semibold">
//             {username && (
//               <span>
//                 Xin chào, <span className="text-black font-bold">{username}</span>
//               </span>
//             )}

//             <Link href="/" className="flex items-center gap-x-1 hover:text-blue-600 transition-all">
//               <Home size={18} strokeWidth={2.5} /> Trang chủ
//             </Link>

//             <Link href="/cart" className="flex items-center gap-x-1 hover:text-blue-600 transition-all">
//               <ShoppingCart size={18} strokeWidth={2.5} /> Giỏ hàng
//             </Link>

//             <Link href="/profile" className="flex items-center gap-x-1 hover:text-blue-600 transition-all">
//               <User size={18} strokeWidth={2.5} /> Tài khoản
//             </Link>

//             <button 
//               onClick={handleLogout}
//               className="flex items-center gap-x-1 text-red-600 hover:scale-105 transition-all font-bold"
//             >
//               <LogOut size={18} strokeWidth={2.5} /> Đăng xuất
//             </button>
//           </div>

//           {/* THANH TÌM KIẾM (SỬA LỖI MỜ) */}
//           <div className="relative w-[380px] group">
//             <input
//               type="text"
//               placeholder="Tìm kiếm sản phẩm..."
//               className="w-full bg-white/90 backdrop-blur-sm border border-white/50 rounded-full py-2.5 px-6 pr-20 
//                          outline-none text-[15px] shadow-inner
//                          text-gray-900 font-medium            {/* Chữ gõ vào: Đen đậm, rõ */}
//                          placeholder:text-gray-600            {/* Chữ placeholder: Rõ nét hơn */}
//                          focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all"
//             />
//             <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-x-3">
//               {/* Icon Search: Màu xám đậm (gray-700) để hết mờ */}
//               <Search size={20} className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors" strokeWidth={2.5} />
              
//               {/* Vạch ngăn cách */}
//               <div className="w-[1px] h-4 bg-gray-300"></div>
              
//               <Camera size={20} className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors" strokeWidth={2.5} />
//             </div>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/features/auth/auth.hooks';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  User,
  LogOut, 
  UserPlus, 
  Search, 
  Camera 
} from 'lucide-react';

const Navbar = () => {
  const { user, isLoggedIn, isLoaded, logout } = useAuth();

  // Nếu chưa load xong dữ liệu từ localStorage thì hiện tạm một khoảng trống hoặc loading mờ
  if (!isLoaded) return <nav className="w-full h-[100px] bg-gradient-to-r from-[#D6E4FF] to-[#FDE2FF] rounded-b-[20px] shadow-sm" />;

  return (
    <nav className="w-full h-[100px] px-[50px] py-[10px] bg-gradient-to-r from-[#D6E4FF] to-[#FDE2FF] rounded-b-[20px] flex items-center justify-between shadow-sm">
      
      {/* A. LOGO */}
      <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
        <div className="w-[60px] h-[60px] bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-inner overflow-hidden">
          <div className="text-[10px] font-extrabold text-center text-pink-500 leading-tight">
            STELLAR<br/>LIGHTS
          </div>
        </div>
      </Link>

      <div className="flex flex-col items-end gap-3">
        {/* DÒNG TRÊN: Menu điều hướng */}
        <div className="flex items-center gap-6 text-[#001529] font-bold text-[14px]">
          
          {isLoggedIn && user ? (
            <>
              {/* Lời chào với tên động */}
              <div className="mr-4 py-1 border-r border-slate-300 pr-6">
                <span className="font-extrabold text-[#001529]">Xin chào, </span>
                <span className="text-[#001529] font-extrabold">
                  {user.name || "Khách"} 
                </span>
              </div>

              <Link href="/" className="flex items-center gap-1.5 hover:text-blue-700">
                <Home size={18} strokeWidth={2.5} /> Trang chủ
              </Link>
              <Link href="/cart" className="flex items-center gap-1.5 hover:text-blue-700">
                <ShoppingCart size={18} strokeWidth={2.5} /> Giỏ hàng
              </Link>
              <Link href="/orders" className="flex items-center gap-1.5 hover:text-blue-700">
                <Package size={18} strokeWidth={2.5} /> Đơn hàng
              </Link>

              {/* THÊM TÀI KHOẢN SAU ĐƠN HÀNG */}
              <Link href="/profile" className="flex items-center gap-1.5 hover:text-blue-700">
                <User size={18} strokeWidth={2.5} /> Tài khoản
              </Link>

              <button onClick={logout} className="flex items-center gap-1.5 hover:text-red-600 ml-2">
                <LogOut size={18} strokeWidth={2.5} /> Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link href="/" className="flex items-center gap-2 hover:text-blue-700">
                <Home size={18} fill="currentColor" /> Trang chủ
              </Link>
              <div className="flex items-center gap-2">
                <UserPlus size={20} strokeWidth={2.5} />
                <Link href="/login" className="hover:text-blue-700">Đăng nhập</Link>
                <span className="text-gray-400 font-normal">/</span>
                <Link href="/register" className="hover:text-blue-700">Đăng ký</Link>
              </div>
            </>
          )}
        </div>

        {/* DÒNG DƯỚI: Thanh tìm kiếm */}
        <div className="relative w-[320px]">
          <input 
            type="text" 
           
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full h-[38px] pl-6 pr-16 rounded-full border-none outline-none bg-white text-sm text-[#001529] font-medium placeholder:text-slate-500 shadow-sm shadow-black/5 focus:ring-1 focus:ring-blue-200 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-[#001529]">
            <Search size={18} strokeWidth={2.5} />
            <Camera size={18} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

