


// // D:\webden\frontend\src\features\cart\components\CartSummary.tsx
// "use client";
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export const CartSummary = ({ subTotal, selectedCount, shippingFee = 0 }: any) => {
//   const router = useRouter();
//   const total = subTotal + shippingFee;
//   const isDisabled = selectedCount === 0;

//   return (
//     <div className="ui-card !bg-[#F8FAFC] !p-10 border-none">
//       <h2 className="ui-section-title mb-10 uppercase text-[#2D2D8A]">Tổng Đơn Hàng</h2>

//       <div className="space-y-6 border-b border-slate-200 pb-8 mb-8">
//         {/* Tạm tính & Phí ship */}
//         <div className="flex justify-between items-center">
//           <span className="ui-label">Tạm tính</span>
//           <span className="ui-currency text-slate-900">{subTotal.toLocaleString()}đ</span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="ui-label">Phí vận chuyển</span>
//           <span className={`ui-currency ${shippingFee === 0 && selectedCount > 0 ? '!text-emerald-600' : 'text-slate-900'}`}>
//             {selectedCount === 0 ? "Chưa tính" : (shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`)}
//           </span>
//         </div>
//       </div>

//       <div className="flex justify-between items-end mb-10">
//         <span className="ui-label">Tổng cộng</span>
//         {/* CHỮ ĐEN CHO SỐ TIỀN TỔNG */}
//         <span className={`text-3xl font-black tracking-tighter tabular-nums ${isDisabled ? 'text-slate-300' : 'text-slate-900'}`}>
//           {total.toLocaleString()}<span className="text-sm ml-1 uppercase">đ</span>
//         </span>
//       </div>

//       {/* ĐỔI MÀU NÚT THANH TOÁN SANG INDIGO ĐẬM */}
//       <button
//         disabled={isDisabled}
//         onClick={() => router.push('/checkout')}
//         className={`w-full h-16 rounded-2xl font-extrabold text-[11px] uppercase tracking-[0.2em] ui-interactive
//           ${isDisabled
//             ? 'bg-slate-200 text-slate-400 '
//             : 'bg-[#1e1b4b] text-white shadow-xl shadow-blue-900/20 active:scale-95'
//           }`}
//       >
//         {isDisabled ? "Vui lòng chọn sản phẩm" : "Mua hàng"}
//       </button>

//       <Link href="/" className="w-full mt-6 ui-label flex justify-center ui-interactive hover:text-[#2D2D8A]">
//         ← Tiếp tục mua sắm
//       </Link>
//     </div>
//   );
// };

// D:\webden\frontend\src\features\cart\components\CartSummary.tsx
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReceiptText, Truck, CreditCard, ArrowLeft, ChevronRight } from 'lucide-react';

export const CartSummary = ({ subTotal, selectedCount, shippingFee = 0 }: any) => {
  const router = useRouter();
  const total = subTotal + shippingFee;
  const isDisabled = selectedCount === 0;

  return (
    <div className="ui-card !bg-white !p-10 border border-slate-100 shadow-xl shadow-slate-100/50">
      {/* Căn giữa tiêu đề và bỏ in hoa */}
      <h2 className="text-3xl font-bold text-[#1e1b4b] mb-10 text-center tracking-tight">
        Tổng đơn hàng
      </h2>

      <div className="space-y-6 border-b border-slate-100 pb-8 mb-8">
        {/* Tạm tính */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl  bg-blue-50 flex items-center justify-center text-blue-600">
              <ReceiptText size={18} />
            </div>
            <span className="text-slate-600 font-medium">Tạm tính</span>
          </div>
          <span className="font-bold text-slate-900 tabular-nums">
            {subTotal.toLocaleString()}đ
          </span>
        </div>

        {/* Phí vận chuyển */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl  bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Truck size={18} />
            </div>
            <span className="text-slate-600 font-medium">Phí vận chuyển</span>
          </div>
          <span className={`font-bold tabular-nums ${shippingFee === 0 && selectedCount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
            {selectedCount === 0 ? "Chưa tính" : (shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`)}
          </span>
        </div>
      </div>

      {/* Tổng cộng */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl  bg-[#1e1b4b] flex items-center justify-center text-[#facc15]">
            <CreditCard size={20} />
          </div>
          <span className="text-slate-900 font-bold text-lg">Tổng cộng</span>
        </div>
        <span className={`text-3xl font-black tracking-tighter tabular-nums ${isDisabled ? 'text-slate-300' : 'text-[#1e1b4b]'}`}>
          {total.toLocaleString()}<span className="text-sm ml-1 font-bold">đ</span>
        </span>
      </div>

      {/* Nút Mua hàng - Bỏ in hoa, chỉnh font dễ nhìn */}
      <button
        disabled={isDisabled}
        onClick={() => router.push('/checkout')}
        className={`w-full h-16 rounded-2xl font-bold text-[15px] transition-all flex items-center justify-center gap-2 cursor-pointer
          ${isDisabled
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-[#1e1b4b] text-white shadow-xl shadow-blue-900/20 hover:bg-[#0f172a] hover:-translate-y-1 active:scale-95'
          }`}
      >
        {isDisabled ? "Vui lòng chọn sản phẩm" : "Mua hàng ngay"}
        {!isDisabled && <ChevronRight size={18} />}
      </button>

      <Link
        href="/"
        className="w-full mt-6 text-slate-400 hover:text-[#1e1b4b] font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} /> Tiếp tục mua sắm
      </Link>
    </div>
  );
};