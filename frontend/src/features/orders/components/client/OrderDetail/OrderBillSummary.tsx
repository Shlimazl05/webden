// "use client";
// export const OrderBillSummary = ({ subtotal, shippingFee, total }: any) => (
//   <div className="p-8 bg-slate-50/20 border-t border-slate-50">
//     <div className="max-w-[300px] ml-auto space-y-4">
//       <div className="flex justify-between text-sm">
//         <span className="text-slate-400 font-medium">Tạm tính:</span>
//         <span className="font-bold text-slate-700">{subtotal.toLocaleString()}đ</span>
//       </div>
//       <div className="flex justify-between text-sm">
//         <span className="text-slate-400 font-medium">Phí vận chuyển:</span>
//         <span className="font-bold text-emerald-500 uppercase text-[11px]">
//           {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`}
//         </span>
//       </div>
//       <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
//         <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Tổng cộng:</span>
//         <span className="text-2xl font-black text-indigo-600 leading-none">
//           {total.toLocaleString()}đ
//         </span>
//       </div>
//     </div>
//   </div>
// );

"use client";

import React from 'react';

interface OrderBillSummaryProps {
  subtotal: number;
  shippingFee: number;
  total: number;
}

/**
 * Hiển thị tóm tắt chi phí đơn hàng
 * Sử dụng border-t phẳng để tạo đường ngăn cách rõ ràng
 */
export const OrderBillSummary = ({ subtotal, shippingFee, total }: OrderBillSummaryProps) => (
  <div className="bg-slate-50/20 border-t border-slate-100 p-8">
    <div className="max-w-[320px] ml-auto space-y-4">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400 font-medium">Tạm tính:</span>
        <span className="font-bold text-slate-700">{subtotal.toLocaleString()}đ</span>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400 font-medium">Phí vận chuyển:</span>
        <span className="font-bold text-emerald-500 uppercase text-[11px] tracking-wider">
          {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`}
        </span>
      </div>

      <div className="pt-5 border-t border-slate-200/60 flex justify-between items-end">
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Tổng cộng:</span>
        <span className="text-2xl font-black text-indigo-600 leading-none tracking-tight">
          {total.toLocaleString()}đ
        </span>
      </div>
    </div>
  </div>
);