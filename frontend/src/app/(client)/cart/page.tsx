


// "use client";

// import React, { useMemo } from 'react';
// import { useCart } from "@/features/cart/hooks/cart";
// import { useShipping } from "@/features/shipping/useShipping"; // Hook lấy rules từ Admin
// import { CartItem } from "@/features/cart/components/CartItem";
// import { CartSummary } from "@/features/cart/components/CartSummary";
// import { EmptyCart } from "@/features/cart/components/EmptyCart";
// import { ShippingStepper } from "@/features/cart/components/ShippingStepper";
// import { Trash2 } from 'lucide-react';

// export default function CartPage() {
//   const {
//     items, isLoading, totals, isAllSelected,
//     updateQuantity, removeItem, toggleSelect, toggleAll, removeSelected
//   } = useCart();

//   // 1. LẤY CẤU HÌNH PHÍ SHIP THẬT TỪ ADMIN
//   const { rules, isLoading: loadingShipping } = useShipping();

//   // 2. TÍNH PHÍ SHIP ĐỘNG TỪ DATABASE RULES
//   const shippingFee = useMemo(() => {
//     if (totals.selectedCount === 0 || !rules || rules.length === 0) return 0;
    

//     const sortedRules = [...rules].sort((a: any, b: any) => b.minAmount - a.minAmount);
//     const matchedRule = sortedRules.find((rule: any) => totals.subTotal >= rule.minAmount);
    
//     if (matchedRule) return (matchedRule as any).fee;
//     return (rules[0] as any)?.fee || 0;
//   }, [totals.subTotal, rules, totals.selectedCount]);

//   if (isLoading) return <div className="min-h-screen flex items-center justify-center font-black text-indigo-900 animate-pulse uppercase">Đang tải giỏ hàng...</div>;
//   if (items.length === 0) return <EmptyCart />;

//   return (
//     <div className="max-w-[1300px] mx-auto px-6 py-12 min-h-screen">

//       {/* 3. HIỂN THỊ THANH PHÍ SHIP TRÊN CÙNG (DÙNG DATA THẬT) */}
//       {!loadingShipping && <ShippingStepper rules={rules} subTotal={totals.subTotal} />}

//       <h1 className="text-4xl font-black text-indigo-900 mb-10 uppercase tracking-tighter">Giỏ Hàng</h1>

//       <div className="bg-white/70 backdrop-blur-md rounded-[40px] border border-slate-200/50 p-8 lg:p-12 shadow-sm">
//         <div className="flex flex-col lg:flex-row gap-12 items-start">

//           <div className="flex-1 w-full">
//             <div className="flex items-center justify-between mb-8 px-8 py-5 bg-slate-50/50 rounded-2xl border border-slate-100">
//               <label className="flex items-center gap-3 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
//                   checked={isAllSelected}
//                   onChange={toggleAll}
//                 />
//                 <span className="text-[12px] font-black text-slate-500 uppercase tracking-widest">
//                   Chọn tất cả ({items.length})
//                 </span>
//               </label>

//               <button
//                 onClick={removeSelected}
//                 className="flex items-center gap-2 text-[12px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
//               >
//                 <Trash2 size={16} /> Xóa mục đã chọn
//               </button>
//             </div>

//             <div className="space-y-4">
//               {items.map(item => (
//                 <CartItem
//                   key={item._id}
//                   item={item}
//                   onUpdateQuantity={updateQuantity}
//                   onRemove={removeItem}
//                   onToggleSelect={toggleSelect}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="w-full lg:w-[400px] sticky top-[110px]">
//             <CartSummary
//               subTotal={totals.subTotal}
//               selectedCount={totals.selectedCount}
//               shippingFee={shippingFee}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useMemo } from 'react';
import { useCart } from "@/features/cart/hooks/cart";
import { useShipping } from "@/features/shipping/useShipping";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { EmptyCart } from "@/features/cart/components/EmptyCart";
import { ShippingStepper } from "@/features/cart/components/ShippingStepper";
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const {
    items, isLoading, totals, isAllSelected,
    updateQuantity, removeItem, toggleSelect, toggleAll, removeSelected
  } = useCart();

  const { rules, isLoading: loadingShipping } = useShipping();

  const shippingFee = useMemo(() => {
    if (totals.selectedCount === 0 || !rules || rules.length === 0) return 0;
    const sortedRules = [...rules].sort((a: any, b: any) => b.minAmount - a.minAmount);
    const matchedRule = sortedRules.find((rule: any) => totals.subTotal >= rule.minAmount);
    return matchedRule ? (matchedRule as any).fee : (rules[0] as any).fee;
  }, [totals.subTotal, rules, totals.selectedCount]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-black text-indigo-900 tracking-tighter uppercase">Đang tải giỏ hàng...</div>;
  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-[1350px] mx-auto px-6 py-12 min-h-screen">
      <div className="bg-white rounded-[48px] border border-slate-100 p-8 lg:p-14 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          <div className="flex-1 w-full">
            {/* 1. STEPPER ĐÃ ĐƯỢC ĐƯA VÀO ĐÂY, NGAY TRÊN THANH CHỌN TẤT CẢ */}
            {!loadingShipping && <ShippingStepper rules={rules} subTotal={totals.subTotal} />}

            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8 px-8 py-6 bg-[#F8FAFC] rounded-3xl border border-slate-50">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6 accent-[#5B4EFA] rounded-md cursor-pointer border-slate-300"
                    checked={isAllSelected}
                    onChange={toggleAll}
                  />
                </div>
                <span className="text-[13px] font-black text-slate-600 uppercase tracking-widest">
                  Chọn tất cả ({items.length})
                </span>
              </label>

              <button
                onClick={removeSelected}
                className="flex items-center gap-2 text-[12px] font-black text-rose-400 hover:text-rose-600 uppercase tracking-widest transition-colors"
              >
                <Trash2 size={18} /> Xóa mục đã chọn
              </button>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="space-y-5">
              {items.map(item => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onToggleSelect={toggleSelect}
                />
              ))}
            </div>
          </div>

          {/* Cột Tổng Đơn Hàng */}
          <div className="w-full lg:w-[420px]">
            <CartSummary
              subTotal={totals.subTotal}
              selectedCount={totals.selectedCount}
              shippingFee={shippingFee}
            />
          </div>
        </div>
      </div>
    </div>
  );
}