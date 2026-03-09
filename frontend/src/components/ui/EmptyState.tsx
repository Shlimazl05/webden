"use client";
import React from 'react';
import { SearchX, ArrowLeft } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onBack?: () => void;
}

export const EmptyState = ({ 
  title = "Không có dữ liệu", 
  description = "Hiện tại không có thông tin nào để hiển thị trên trang này."
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-in fade-in zoom-in duration-500">
      {/* Icon minh họa với màu Cyan đồng bộ Sidebar */}
      <div className="w-24 h-24 bg-cyan-50 text-cyan-500 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-cyan-100">
        <SearchX size={48} strokeWidth={1.5} />
      </div>

      {/* Thông báo */}
      <h3 className="text-[#001529] font-black text-xl mb-2  tracking-tight">
        {title}
      </h3>
      <p className="text-slate-400 text-sm font-medium mb-8 text-center max-w-[300px]">
        {/* {description} */}
      </p>


    </div>
  );
};