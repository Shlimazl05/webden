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
  description = "Hiện tại không có thông tin nào để hiển thị trên trang này.",
  onBack 
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-in fade-in zoom-in duration-500">
      {/* Icon minh họa với màu Cyan đồng bộ Sidebar */}
      <div className="w-24 h-24 bg-cyan-50 text-cyan-500 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-cyan-100">
        <SearchX size={48} strokeWidth={1.5} />
      </div>

      {/* Thông báo */}
      <h3 className="text-[#001529] font-black text-xl mb-2 uppercase tracking-tight">
        {title}
      </h3>
      <p className="text-slate-400 text-sm font-medium mb-8 text-center max-w-[300px]">
        {description}
      </p>

      {/* Nút quay lại trang 1 */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl font-black text-xs uppercase transition-all shadow-lg shadow-cyan-100 active:scale-95"
        >
          <ArrowLeft size={16} strokeWidth={3} />
          Quay lại trang trước
        </button>
      )}
    </div>
  );
};