

"use client";
import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Logic tính toán dải số hiển thị (Ví dụ: 1, 2, ... 5, 6, 7)
  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('dots-1');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('dots-2');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  if (totalPages < 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-6 animate-in fade-in duration-700">
      {/* Nút Lùi */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-20 transition-all active:scale-90"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      {/* Dải số trang */}
      <div className="flex items-center gap-2">
        {getPages().map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span key={index} className="w-10 h-10 flex items-center justify-center text-slate-300">
                <MoreHorizontal size={18} />
              </span>
            );
          }
          const isActive = page === currentPage;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl font-black text-[14px] transition-all border ${
                isActive
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110"
                  : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Nút Tiến */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-20 transition-all active:scale-90"
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
};