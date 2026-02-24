
// "use client";
// import React, { useState, useEffect } from 'react';
// import { CircleUser, LogOut } from 'lucide-react';
// import { useAuth } from '@/features/auth/auth.hooks';

// export const AdminHeader = () => {
//   // 1. Thêm trạng thái để chống lỗi Hydration
//   const [mounted, setMounted] = useState(false);
//   const { logout } = useAuth();

//   // Đảm bảo code chỉ chạy sau khi đã tải xong ở trình duyệt
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleLogout = () => {
//     if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
//       logout();
//     }
//   };

//   return (
//     <header className="w-full h-16 bg-[#f0f2f5] flex items-center justify-end px-8 border-b border-slate-200">
//       <div className="flex items-center gap-3">
        
//         {/* Nút Thông tin tài khoản - Giữ nguyên CSS */}
//         <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-800 rounded-md text-slate-800 text-sm font-medium hover:bg-slate-50 transition-colors">
//           <CircleUser size={18} />
//           <span>Thông tin tài khoản</span> {/* Bọc span để tránh lỗi DOM */}
//         </button>

//         {/* Nút Đăng xuất - Giữ nguyên CSS */}
//         <button 
//           onClick={handleLogout}
//           disabled={!mounted} // Chỉ cho phép bấm khi đã load xong
//           className="flex items-center gap-2 px-4 py-2 bg-[#e13d45] text-white rounded-md text-sm font-medium hover:bg-[#c9353c] transition-colors"
//         >
//           {/* Thứ tự Icon và Chữ giữ theo thiết kế của bạn */}
//           <LogOut size={18} />
//           <span>Đăng xuất</span>
//         </button>
//       </div>
//     </header>
//   );
// };

"use client";
import React, { useState, useEffect } from 'react';
import { CircleUser, LogOut } from 'lucide-react';
import { useAuth } from '@/features/auth/auth.hooks';

export const AdminHeader = () => {
  // Trạng thái chống lỗi Hydration
  const [mounted, setMounted] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      logout();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#f0f2f5] flex items-center justify-end px-8 border-b border-slate-200 shadow-sm">
      <div className="flex items-center gap-3">
        
        {/* Nút Thông tin tài khoản - Giữ nguyên CSS */}
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-800 rounded-md text-slate-800 text-sm font-medium hover:bg-slate-50 transition-colors">
          <CircleUser size={18} strokeWidth={2.5} />
          <span>Thông tin tài khoản</span>
        </button>

        {/* Nút Đăng xuất - Giữ nguyên CSS */}
        <button 
          onClick={handleLogout}
          disabled={!mounted}
          className="flex items-center gap-2 px-4 py-2 bg-[#e13d45] text-white rounded-md text-sm font-medium hover:bg-[#c9353c] transition-colors shadow-sm"
        >
          <LogOut size={18} strokeWidth={2.5} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </header>
  );
};