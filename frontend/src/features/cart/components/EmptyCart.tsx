"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-400 mb-6">
        <ShoppingBag size={48} strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tighter">
        Giỏ hàng của bạn đang trống
      </h2>
      <p className="text-sm text-slate-400 max-w-[300px] mb-8 leading-relaxed">
        Có vẻ như bạn chưa chọn được ánh sáng ưng ý cho tổ ấm của mình.
      </p>
      <Link 
        href="/" 
        className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
      >
        KHÁM PHÁ NGAY
      </Link>
    </div>
  );
};