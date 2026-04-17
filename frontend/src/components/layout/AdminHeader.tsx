
// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import { CircleUser, LogOut, ChevronDown, User } from 'lucide-react';
// import { useAuth } from '@/features/auth/auth.hooks';

// export const AdminHeader = () => {
//   const [mounted, setMounted] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const { user, logout } = useAuth();

//   useEffect(() => {
//     setMounted(true);
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   if (!mounted) return null;

//   return (
//     // Đã đổi bg-white -> bg-slate-100 và border-slate-200 để khớp Sidebar
//     <header className="sticky top-0 z-40 w-full h-16 bg-slate-100 flex items-center justify-end px-8 border-b border-slate-200">

//       <div className="relative" ref={dropdownRef}>
//         <button 
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           // Khi hover hoặc mở menu sẽ hiện nền trắng giống mục Active của Sidebar
//           className={`flex items-center gap-3 p-1.5 pr-3 transition-all group rounded-2xl border border-transparent ${
//             isDropdownOpen 
//             ? "bg-white border-slate-200 shadow-sm" 
//             : "hover:bg-white hover:border-slate-200 hover:shadow-sm"
//           }`}
//         >
//           {/* Icon Avatar: Nền trắng, viền xám để nổi bật trên Header xám */}
//           <div className="w-9 h-9 bg-white text-indigo-600 rounded-xl  flex items-center justify-center border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
//             <CircleUser size={22} strokeWidth={2.5} />
//           </div>

//           <div className="text-right hidden sm:block">
//             <p className="text-[13px] font-black text-slate-900 leading-none uppercase tracking-tight">
//               {user?.name || "Quản trị viên"}
//             </p>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
//               Admin Account
//             </p>
//           </div>

//           <ChevronDown 
//             size={16} 
//             className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} 
//           />
//         </button>

//         {/* Dropdown Menu: Giữ nền trắng để "nổi" lên trên nền xám tổng thể */}
//         {isDropdownOpen && (
//           <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-2xl p-2 animate-in slide-in-from-top-2 duration-200">

//             <button className="w-full flex items-center gap-3 px-3 py-3 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl  transition-all group">
//               <User size={18} className="text-slate-400 group-hover:text-indigo-500" />
//               <span className="text-[13px] font-black uppercase tracking-tight">Tài khoản</span>
//             </button>

//             <div className="my-1 border-t border-slate-100"></div>

//             <button 
//               onClick={() => logout()}
//               className="w-full flex items-center gap-3 px-3 py-3 text-rose-500 hover:bg-rose-50 rounded-xl  transition-all group"
//             >
//               <LogOut size={18} strokeWidth={2.5} />
//               <span className="text-[13px] font-black uppercase tracking-tight">Đăng xuất</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// D:\webden\frontend\src\app\admin\components\AdminHeader.tsx

// D:\webden\frontend\src\app\admin\components\AdminHeader.tsx

"use client";
import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/features/auth/auth.hooks';

export const AdminHeader = () => {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-slate-100 flex items-center justify-end px-8 border-b border-slate-200">

      {/* NÚT ĐĂNG XUẤT CÓ ĐƯỜNG BAO CHUYÊN NGHIỆP */}
      <button
        onClick={() => logout()}
        className="flex items-center gap-3 p-1.5 pr-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-rose-200 hover:shadow-md transition-all group active:scale-95"
      >
        {/* Box Icon: Tạo điểm nhấn màu hồng đỏ */}
        <div className="w-9 h-9 bg-rose-50 text-rose-500 rounded-xl  flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all">
          <LogOut size={18} strokeWidth={2.5} />
        </div>

        {/* Chữ: In hoa, đen đậm, sát nhau */}
        <span className="text-[13px] font-black text-slate-800 uppercase tracking-tight">
          Đăng xuất
        </span>
      </button>

    </header>
  );
};