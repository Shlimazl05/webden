
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