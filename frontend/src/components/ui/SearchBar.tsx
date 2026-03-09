

"use client";
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {

  onSearch: (value: string) => void;
  placeholder?: string; 
}

export const SearchBar = ({ onSearch, placeholder = "Tìm kiếm..." }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-[400px] group">
      {/* Icon tìm kiếm - Chuyển sang màu vàng cam khi người dùng click vào ô nhập */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] transition-colors">
        <Search size={18} strokeWidth={2.5} />
      </div>

      <input
        type="text"

        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full h-11 pl-12 pr-6 bg-slate-50 border border-slate-100 rounded-full outline-none text-sm font-bold text-[#001529] placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-yellow-100 focus:border-yellow-200 transition-all shadow-sm"
      />
    </div>
  );
};