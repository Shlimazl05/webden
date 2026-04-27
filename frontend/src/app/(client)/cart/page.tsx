


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
          <div className="bg-[#facc15] p-3 rounded-2xl text-[#1e1b4b] shadow-lg shadow-yellow-100">
            <ShoppingCart size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#1e1b4b] tracking-tight uppercase">
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