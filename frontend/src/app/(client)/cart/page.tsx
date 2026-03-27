


// "use client";
// import React, { useMemo } from 'react';
// import { useCart } from "@/features/cart/hooks/cart";
// import { useShipping } from "@/features/shipping/useShipping";
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

//   const { rules, isLoading: loadingShipping } = useShipping();

//   const shippingFee = useMemo(() => {
//     if (totals.selectedCount === 0 || !rules || rules.length === 0) return 0;
//     const sortedRules = [...rules].sort((a: any, b: any) => b.minAmount - a.minAmount);
//     const matchedRule = sortedRules.find((rule: any) => totals.subTotal >= rule.minAmount);
//     return matchedRule ? (matchedRule as any).fee : (rules[0] as any).fee;
//   }, [totals.subTotal, rules, totals.selectedCount]);

//   if (isLoading) return <div className="min-h-screen flex items-center justify-center font-black text-indigo-900 tracking-tighter uppercase">Đang tải giỏ hàng...</div>;
//   if (items.length === 0) return <EmptyCart />;

//   return (
//     <div className="max-w-[1350px] mx-auto px-6 py-12 min-h-screen">
//       {/* 1. Khung trắng lớn bao ngoài */}
//       <div className="bg-white rounded-[48px] border border-slate-100 p-8 lg:p-14 shadow-sm relative">

//         {/* 
//           2. FLEX CHA: Quan trọng nhất là BỎ 'items-start'. 
//           Mặc định nó sẽ là 'stretch', giúp cột phải dài bằng cột trái, 
//           tạo ra "đường ray" cho thanh tổng tiền trượt.
//       */}
//         <div className="flex flex-col lg:flex-row gap-12">

//           {/* Cột trái: Danh sách sản phẩm */}
//           <div className="flex-1 w-full">
//             {!loadingShipping && <ShippingStepper rules={rules} subTotal={totals.subTotal} />}

//             {/* Action Bar */}
//             <div className="flex items-center justify-between mb-8 px-8 py-6 bg-[#F8FAFC] rounded-3xl border border-slate-50">
//               <label className="flex items-center gap-4 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   className="w-6 h-6 accent-[#5B4EFA] rounded-md cursor-pointer border-slate-300"
//                   checked={isAllSelected}
//                   onChange={toggleAll}
//                 />
//                 <span className="text-[13px] font-black text-slate-600 uppercase tracking-widest">
//                   Chọn tất cả ({items.length})
//                 </span>
//               </label>

//               <button
//                 onClick={removeSelected}
//                 className="flex items-center gap-2 text-[12px] font-black text-rose-400 hover:text-rose-600 uppercase tracking-widest transition-colors"
//               >
//                 <Trash2 size={18} /> Xóa mục đã chọn
//               </button>
//             </div>

//             <div className="space-y-5">
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

//           {/* 
//             3. CỘT PHẢI: Đã sửa lại cấu trúc 
//             Bỏ 'lg:sticky' và 'self-start' ở đây, chuyển vào thẻ div bên trong.
//         */}
//           <div className="w-full lg:w-[400px] lg:shrink-0 relative">
//             <div className="lg:sticky lg:top-[160px] h-fit">
//               <CartSummary
//                 subTotal={totals.subTotal}
//                 selectedCount={totals.selectedCount}
//                 shippingFee={shippingFee}
//               />
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



// D:\webden\frontend\src\app\(client)\cart\page.tsx

// "use client";
// import React, { useMemo } from 'react';
// import { useCart } from "@/features/cart/hooks/cart";
// import { useShipping } from "@/features/shipping/useShipping";
// import { CartItem } from "@/features/cart/components/CartItem";
// import { CartSummary } from "@/features/cart/components/CartSummary";
// import { EmptyCart } from "@/features/cart/components/EmptyCart";
// import { ShippingStepper } from "@/features/cart/components/ShippingStepper";
// import { Trash2 } from 'lucide-react';

// export default function CartPage() {
//   const { items, isLoading, totals, isAllSelected, updateQuantity, removeItem, toggleSelect, toggleAll, removeSelected } = useCart();
//   const { rules, isLoading: loadingShipping } = useShipping();

//   const shippingFee = useMemo(() => {
//     if (totals.selectedCount === 0 || !rules || rules.length === 0) return 0;
//     const sortedRules = [...rules].sort((a: any, b: any) => b.minAmount - a.minAmount);
//     const matchedRule = sortedRules.find((rule: any) => totals.subTotal >= rule.minAmount);
//     return matchedRule ? (matchedRule as any).fee : (rules[0] as any).fee;
//   }, [totals.subTotal, rules, totals.selectedCount]);

//   if (isLoading) return <div className="min-h-screen flex items-center justify-center ui-label">Đang tải giỏ hàng...</div>;
//   if (items.length === 0) return <EmptyCart />;

//   return (
//     <div className="max-w-[1400px] mx-auto px-4 py-12 min-h-screen">
//       {/* KHUNG TRẮNG LỚN */}
//       <div className="ui-card !p-8 lg:!p-14 shadow-sm overflow-hidden">

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

//           {/* CỘT TRÁI */}
//           <div className="lg:col-span-8 w-full min-w-0">
//             {!loadingShipping && <ShippingStepper rules={rules} subTotal={totals.subTotal} />}

//             {/* Action Bar */}
//             <div className="flex items-center justify-between mb-8 px-8 py-6 bg-[var(--bg-light)] rounded-3xl border border-slate-50">
//               <label className="flex items-center gap-4 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   className="w-5 h-5 accent-[var(--color-primary)] rounded-md cursor-pointer" // Thêm cursor-pointer
//                   checked={isAllSelected}
//                   onChange={toggleAll}
//                 />
//                 <span className="ui-label text-slate-600">
//                   Chọn tất cả ({items.length})
//                 </span>
//               </label>

//               <button
//                 onClick={removeSelected}
//                 className="flex items-center gap-2 ui-label !text-[var(--color-danger)] hover:opacity-80 transition-opacity cursor-pointer" // Thêm cursor-pointer
//               >
//                 <Trash2 size={16} /> Xóa mục đã chọn
//               </button>
//             </div>

//             <div className="space-y-4">
//               {items.map(item => (
//                 <CartItem key={item._id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} onToggleSelect={toggleSelect} />
//               ))}
//             </div>
//           </div>

//           {/* CỘT PHẢI (Sticky) */}
//           <div className="lg:col-span-4 w-full lg:sticky lg:top-10">
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


// D:\webden\frontend\src\app\(client)\cart\page.tsx
"use client";
import React, { useMemo } from 'react';
import { useCart } from "@/features/cart/hooks/cart";
import { useShipping } from "@/features/shipping/useShipping";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { EmptyCart } from "@/features/cart/components/EmptyCart";
import { ShippingStepper } from "@/features/cart/components/ShippingStepper";
import { Trash2, ShoppingCart } from 'lucide-react'; // 1. Thêm ShoppingCart icon

export default function CartPage() {
  const { items, isLoading, totals, isAllSelected, updateQuantity, removeItem, toggleSelect, toggleAll, removeSelected } = useCart();
  const { rules, isLoading: loadingShipping } = useShipping();

  const shippingFee = useMemo(() => {
    if (totals.selectedCount === 0 || !rules || rules.length === 0) return 0;
    const sortedRules = [...rules].sort((a: any, b: any) => b.minAmount - a.minAmount);
    const matchedRule = sortedRules.find((rule: any) => totals.subTotal >= rule.minAmount);
    return matchedRule ? (matchedRule as any).fee : (rules[0] as any).fee;
  }, [totals.subTotal, rules, totals.selectedCount]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center ui-label">Đang tải giỏ hàng...</div>;
  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12 min-h-screen">
      {/* KHUNG TRẮNG LỚN */}
      <div className="ui-card !p-8 lg:!p-14 shadow-sm overflow-hidden">

        {/* 2. TIÊU ĐỀ GIỎ HÀNG TRÊN CÙNG */}
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-[var(--color-primary)] p-3 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <ShoppingCart size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Giỏ hàng
            </h1>
            <p className="text-[14px] font-bold text-slate-400  tracking-widest mt-1">
              Bạn đang có {items.length} sản phẩm trong danh sách
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* CỘT TRÁI */}
          <div className="lg:col-span-8 w-full min-w-0">
            {!loadingShipping && <ShippingStepper rules={rules} subTotal={totals.subTotal} />}

            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8 px-8 py-6 bg-[var(--bg-light)] rounded-3xl border border-slate-50">
              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[var(--color-primary)] rounded-md cursor-pointer"
                  checked={isAllSelected}
                  onChange={toggleAll}
                />
                <span className="ui-label text-slate-600">
                  Chọn tất cả ({items.length})
                </span>
              </label>

              <button
                onClick={removeSelected}
                className="flex items-center gap-2 ui-label !text-[var(--color-danger)] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <Trash2 size={16} /> Xóa mục đã chọn
              </button>
            </div>

            <div className="space-y-4">
              {items.map(item => (
                <CartItem key={item._id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} onToggleSelect={toggleSelect} />
              ))}
            </div>
          </div>

          {/* CỘT PHẢI (Sticky) */}
          <div className="lg:col-span-4 w-full lg:sticky lg:top-10">
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