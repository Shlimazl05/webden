// "use client";

// import React from 'react';
// import Link from 'next/link';
// import { ShoppingBag } from 'lucide-react';

// export const EmptyCart = () => {
//   return (
//     <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
//       <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-400 mb-6">
//         <ShoppingBag size={48} strokeWidth={1.5} />
//       </div>
//       <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tighter">
//         Giỏ hàng của bạn đang trống
//       </h2>
//       <p className="text-sm text-slate-400 max-w-[300px] mb-8 leading-relaxed">
//         Có vẻ như bạn chưa chọn được ánh sáng ưng ý cho tổ ấm của mình.
//       </p>
//       <Link 
//         href="/" 
//         className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
//       >
//         KHÁM PHÁ NGAY
//       </Link>
//     </div>
//   );
// };


"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center animate-in fade-in duration-700">
      {/* Icon Container với hiệu ứng đổ bóng và gradient nhẹ */}
      <div className="relative mb-8">
        <div className="w-28 h-28 bg-indigo-50/50 rounded-xl flex items-center justify-center text-indigo-500 relative z-10 border border-indigo-100/50">
          <ShoppingBag size={42} strokeWidth={1.2} />
        </div>
        {/* Sparkles icon trang trí */}
        <Sparkles className="absolute -top-2 -right-2 text-amber-400 animate-pulse" size={24} />
      </div>

      {/* Heading - Thanh thoát, không in hoa */}
      <h2 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">
        Giỏ hàng của bạn đang trống
      </h2>

      {/* Subtext */}
      <p className="text-[15px] text-slate-400 max-w-[340px] mb-10 leading-relaxed font-medium">
        Có vẻ như bạn chưa chọn được ánh sáng ưng ý cho tổ ấm của mình. Đừng bỏ lỡ những mẫu đèn mới nhất nhé!
      </p>

      {/* Button - Đồng bộ style với nút Xác nhận đặt hàng */}
      <Link
        href="/"
        className="group flex items-center gap-2 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-[15px] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
      >
        Khám phá ngay
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>

    </div>
  );
};