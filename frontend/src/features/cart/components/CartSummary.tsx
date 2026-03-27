
// "use client";
// import Link from 'next/link';
// import React from 'react';
// import { useRouter } from 'next/navigation';

// interface CartSummaryProps {
//   subTotal: number;
//   selectedCount: number; 
//   shippingFee?: number;
// }

// export const CartSummary = ({ subTotal, selectedCount, shippingFee = 0 }: CartSummaryProps) => {
//   const router = useRouter(); 
//   const total = subTotal + shippingFee;
//   // Nút thanh toán sẽ bị khóa nếu không có sản phẩm nào được chọn
//   const isDisabled = selectedCount === 0;
//   const handleCheckout = () => {
//     if (!isDisabled) {
//       // Chuyển hướng đến trang nhập thông tin giao hàng
//       router.push('/checkout');
//     }
//   };

//   return (
//     /* 1. Đổi rounded-xl thành rounded-[2.5rem] cho đồng bộ khung lớn */
//     /* 2. Đổi p-8 thành p-10 để nội dung thoáng hơn */
//     <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">

//       {/* whitespace-nowrap giúp tiêu đề không bị nhảy thành 2 dòng */}
//       <h2 className="text-xl font-black text-[#2D2D8A] mb-8 uppercase tracking-tight whitespace-nowrap">
//         Tổng Đơn Hàng
//       </h2>

//       <div className="space-y-5 border-b border-slate-50 pb-8 mb-8">
//         <div className="flex justify-between items-center text-[13px]">
//           <span className="text-slate-500 font-bold uppercase tracking-wider">Sản phẩm chọn</span>
//           <span className={`font-black ${selectedCount > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
//             {selectedCount} sản phẩm
//           </span>
//         </div>

//         <div className="flex justify-between items-center text-[13px]">
//           <span className="text-slate-500 font-bold uppercase tracking-wider">Tạm tính</span>
//           <span className="font-black text-slate-900">{subTotal.toLocaleString()}đ</span>
//         </div>

//         <div className="flex justify-between items-center text-[13px]">
//           <span className="text-slate-500 font-bold uppercase tracking-wider">Phí vận chuyển</span>
//           <span className={`font-black uppercase tracking-widest text-[10px] ${shippingFee === 0 && selectedCount > 0 ? 'text-emerald-500' : 'text-slate-400'}`}>
//             {selectedCount === 0 ? "Chưa tính" : (shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`)}
//           </span>
//         </div>
//       </div>

//       <div className="flex justify-between items-center mb-10">
//         <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Tổng cộng</span>
//         <span className={`text-3xl font-black leading-none tracking-tighter ${isDisabled ? 'text-slate-200' : 'text-[#2D2D8A]'}`}>
//           {total.toLocaleString()}đ
//         </span>
//       </div>

//       <button
//         disabled={isDisabled}
//         onClick={handleCheckout}
//         className={`w-full h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 group
//           ${isDisabled
//             ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'
//             : 'bg-indigo-600 hover:bg-[#2D2D8A] text-white shadow-xl shadow-indigo-100 active:scale-95'
//           }`}
//       >
//         {isDisabled ? "Vui lòng chọn sản phẩm" : "Thanh toán ngay"}
//         {!isDisabled && <span className="group-hover:translate-x-1 transition-transform">→</span>}
//       </button>

//       <Link
//         href="/"
//         className="w-full mt-6 py-2 text-slate-400 hover:text-indigo-600 text-[10px] font-black transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2"
//       >
//         ← Tiếp tục mua sắm
//       </Link>
//     </div>
//   );
// };


// // D:\webden\frontend\src\features\cart\components\CartSummary.tsx
// "use client";
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// interface CartSummaryProps {
//   subTotal: number;
//   selectedCount: number;
//   shippingFee?: number;
// }

// export const CartSummary = ({ subTotal, selectedCount, shippingFee = 0 }: CartSummaryProps) => {
//   const router = useRouter();
//   const total = subTotal + shippingFee;
//   const isDisabled = selectedCount === 0;

//   return (
//     <div className="ui-card !bg-[var(--bg-light)] !p-10 border-none">
//       <h2 className="ui-section-title mb-10 uppercase">Tổng Đơn Hàng</h2>

//       <div className="space-y-6 border-b border-slate-200 pb-8 mb-8">
//         <div className="flex justify-between items-center">
//           <span className="ui-label">Sản phẩm chọn</span>
//           <span className={`ui-value ${selectedCount > 0 ? '!text-[var(--color-primary)]' : 'text-slate-400'}`}>
//             {selectedCount} sản phẩm
//           </span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="ui-label">Tạm tính</span>
//           <span className="ui-currency">{subTotal.toLocaleString()}<span className="currency-symbol">đ</span></span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="ui-label">Phí vận chuyển</span>
//           <span className={`ui-currency ${shippingFee === 0 && selectedCount > 0 ? '!text-[var(--color-success)]' : ''}`}>
//             {selectedCount === 0 ? "Chưa tính" : (shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`)}
//           </span>
//         </div>
//       </div>

//       <div className="flex justify-between items-end mb-10">
//         <span className="ui-label">Tổng cộng</span>
//         <span className={`text-3xl font-extrabold tracking-tighter tabular-nums ${isDisabled ? 'text-slate-300' : 'text-[var(--color-primary)]'}`}>
//           {total.toLocaleString()}<span className="text-sm ml-1 uppercase">đ</span>
//         </span>
//       </div>

//       <button
//         disabled={isDisabled}
//         onClick={() => router.push('/checkout')}
//         className={`w-full h-16 rounded-2xl font-extrabold text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2
//           ${isDisabled
//             ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
//             : 'bg-[var(--color-primary)] text-white shadow-lg shadow-indigo-100 hover:-translate-y-1 active:scale-95'
//           }`}
//       >
//         {isDisabled ? "Vui lòng chọn sản phẩm" : "Thanh toán ngay →"}
//       </button>

//       <Link href="/" className="w-full mt-6 ui-label flex justify-center hover:text-[var(--color-primary)] transition-colors">
//         ← Tiếp tục mua sắm
//       </Link>
//     </div>
//   );
// };


// D:\webden\frontend\src\features\cart\components\CartSummary.tsx
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const CartSummary = ({ subTotal, selectedCount, shippingFee = 0 }: any) => {
  const router = useRouter();
  const total = subTotal + shippingFee;
  const isDisabled = selectedCount === 0;

  return (
    <div className="ui-card !bg-[#F8FAFC] !p-10 border-none">
      <h2 className="ui-section-title mb-10 uppercase text-[#2D2D8A]">Tổng Đơn Hàng</h2>

      <div className="space-y-6 border-b border-slate-200 pb-8 mb-8">
        {/* Tạm tính & Phí ship */}
        <div className="flex justify-between items-center">
          <span className="ui-label">Tạm tính</span>
          <span className="ui-currency text-slate-900">{subTotal.toLocaleString()}đ</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="ui-label">Phí vận chuyển</span>
          <span className={`ui-currency ${shippingFee === 0 && selectedCount > 0 ? '!text-emerald-600' : 'text-slate-900'}`}>
            {selectedCount === 0 ? "Chưa tính" : (shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-end mb-10">
        <span className="ui-label">Tổng cộng</span>
        {/* CHỮ ĐEN CHO SỐ TIỀN TỔNG */}
        <span className={`text-3xl font-black tracking-tighter tabular-nums ${isDisabled ? 'text-slate-300' : 'text-slate-900'}`}>
          {total.toLocaleString()}<span className="text-sm ml-1 uppercase">đ</span>
        </span>
      </div>

      {/* ĐỔI MÀU NÚT THANH TOÁN SANG INDIGO ĐẬM */}
      <button
        disabled={isDisabled}
        onClick={() => router.push('/checkout')}
        className={`w-full h-16 rounded-2xl font-extrabold text-[11px] uppercase tracking-[0.2em] ui-interactive
          ${isDisabled
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-[#2D2D8A] text-white shadow-xl shadow-indigo-100 '
          }`}
      >
        {isDisabled ? "Vui lòng chọn sản phẩm" : "Thanh toán ngay →"}
      </button>

      <Link href="/" className="w-full mt-6 ui-label flex justify-center ui-interactive hover:text-[#2D2D8A]">
        ← Tiếp tục mua sắm
      </Link>
    </div>
  );
};