


// "use client";

// import React from 'react';

// /**
//  * Định nghĩa Props cho bảng tổng đơn
//  * @param subTotal - Tổng tiền hàng của các món đã chọn
//  * @param selectedCount - Số lượng dòng sản phẩm đang được tích chọn
//  * @param shippingFee - Phí vận chuyển (mặc định là 0 - Miễn phí)
//  */
// interface CartSummaryProps {
//   subTotal: number;
//   selectedCount: number; 
//   shippingFee?: number;
// }

// export const CartSummary = ({ subTotal, selectedCount, shippingFee = 0 }: CartSummaryProps) => {
//   const total = subTotal + shippingFee;

//   return (
//     <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-28">
//       <h2 className="text-xl font-black text-indigo-900 mb-6 uppercase tracking-tight">
//         Tổng Đơn Hàng
//       </h2>
      
//       <div className="space-y-4 border-b border-slate-50 pb-6 mb-6">
//         {/* Dòng mới: Hiển thị số lượng sản phẩm đang chọn */}
//         <div className="flex justify-between items-center text-sm">
//           <span className="text-slate-500 font-medium">Sản phẩm chọn</span>
//           <span className="font-bold text-indigo-600">
//             {selectedCount} sản phẩm
//           </span>
//         </div>

//         <div className="flex justify-between items-center text-sm">
//           <span className="text-slate-500 font-medium">Tạm tính</span>
//           <span className="font-bold text-slate-800">{subTotal.toLocaleString()}đ</span>
//         </div>

//         <div className="flex justify-between items-center text-sm">
//           <span className="text-slate-500 font-medium">Phí vận chuyển</span>
//           <span className="font-bold text-emerald-500 uppercase tracking-wider text-[11px]">
//             {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`}
//           </span>
//         </div>
//       </div>

//       <div className="flex justify-between items-end mb-8">
//         <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tổng cộng</span>
//         <span className="text-2xl font-black text-indigo-600 leading-none">
//           {total.toLocaleString()}đ
//         </span>
//       </div>

//       <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 group">
//         TIẾN HÀNH THANH TOÁN
//         <span className="group-hover:translate-x-1 transition-transform">→</span>
//       </button>

//       <button className="w-full mt-4 py-3 text-slate-400 hover:text-indigo-600 text-[11px] font-bold transition-colors uppercase tracking-widest">
//         ← Tiếp tục mua sắm
//       </button>
//     </div>
//   );
// };

"use client";
import Link from 'next/link';
import React from 'react';

interface CartSummaryProps {
  subTotal: number;
  selectedCount: number; 
  shippingFee?: number;
}

export const CartSummary = ({ subTotal, selectedCount, shippingFee = 0 }: CartSummaryProps) => {
  const total = subTotal + shippingFee;
  // Nút thanh toán sẽ bị khóa nếu không có sản phẩm nào được chọn
  const isDisabled = selectedCount === 0;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-[110px]">
      <h2 className="text-xl font-black text-indigo-900 mb-6 uppercase tracking-tight">
        Tổng Đơn Hàng
      </h2>
      
      <div className="space-y-4 border-b border-slate-50 pb-6 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Sản phẩm chọn</span>
          <span className={`font-bold ${selectedCount > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
            {selectedCount} sản phẩm
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Tạm tính</span>
          <span className="font-bold text-slate-800">{subTotal.toLocaleString()}đ</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Phí vận chuyển</span>
          <span className={`font-bold uppercase tracking-wider text-[11px] ${shippingFee === 0 && selectedCount > 0 ? 'text-emerald-500' : 'text-slate-400'}`}>
            {selectedCount === 0 ? "Chưa tính" : (shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-end mb-8">
        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tổng cộng</span>
        <span className={`text-2xl font-black leading-none ${isDisabled ? 'text-slate-300' : 'text-indigo-600'}`}>
          {total.toLocaleString()}đ
        </span>
      </div>

      <button 
        disabled={isDisabled}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 group
          ${isDisabled 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100'
          }`}
      >
        {isDisabled ? "VUI LÒNG CHỌN SẢN PHẨM" : "TIẾN HÀNH THANH TOÁN"}
        {!isDisabled && <span className="group-hover:translate-x-1 transition-transform">→</span>}
      </button>

      {/* Thay button bằng Link để có thể nhấn được */}
        <Link 
            href="/" // Điều hướng về trang chủ hoặc trang sản phẩm của ní
            className="w-full mt-4 py-3 text-slate-400 hover:text-indigo-600 text-[11px] font-bold transition-colors uppercase tracking-widest flex items-center justify-center cursor-pointer"
            >
            ← Tiếp tục mua sắm
        </Link>
    </div>
  );
};