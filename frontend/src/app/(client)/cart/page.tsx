
"use client";

import React, { useState } from 'react';
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { EmptyCart } from "@/features/cart/components/EmptyCart";
import { Trash2 } from 'lucide-react';
import { ICartDetail } from '@/features/cart/cart.types';

export default function CartPage() {
  // SAU NÀY: Thay cái mảng items này bằng dữ liệu từ Backend
  const [items, setItems] = useState<ICartDetail[]>([
    { 
      _id: 'cd1', 
      quantity: 1, 
      unitPrice: 12500000, 
      selected: true,
      product: {
        _id: 'p1',
        productName: 'Đèn Chùm Pha Lê Hoàng Gia',
        imageUrl: '',
        specifications: { power: '60W', material: 'Pha lê', size: 'Ø80cm' },
        productCode: 'DEN-001',
        salePrice: 12500000,
        stockQuantity: 10,
        status: 'Active',
        basePrice: undefined,
        slug: undefined,
        categoryId: undefined
      }
    },
    { 
      _id: 'cd2', 
      quantity: 2, 
      unitPrice: 3200000, 
      selected: true,
      product: {
        _id: 'p2',
        productName: 'Đèn Treo Trần Scandinavian',
        imageUrl: '',
        specifications: { power: '25W', material: 'Gỗ sồi', size: 'Ø45cm' },
        productCode: 'DEN-002',
        salePrice: 3200000,
        stockQuantity: 5,
        status: 'Active',
        basePrice: undefined,
        slug: undefined,
        categoryId: undefined
      }
    },
  ]);

  // LOGIC XỬ LÝ TẠM THỜI
  const updateQty = (id: string, q: number) => 
    setItems(items.map(i => i._id === id ? { ...i, quantity: q } : i));

  const toggleSelect = (id: string) => 
    setItems(items.map(i => i._id === id ? { ...i, selected: !i.selected } : i));

  const remove = (id: string) => setItems(items.filter(i => i._id !== id));

  const toggleAll = () => {
    const allSelected = items.every(i => i.selected);
    setItems(items.map(i => ({ ...i, selected: !allSelected })));
  };

  // HÀM MỚI: Xóa tất cả những món đang được tick chọn
  const removeSelected = () => {
    setItems(items.filter(i => !i.selected));
  };

  // TÍNH TOÁN HIỂN THỊ
  const selectedItems = items.filter(i => i.selected);
  const subTotal = selectedItems.reduce((s, i) => s + (i.unitPrice * i.quantity), 0);
  
  // Logic phí ship: 0đ nếu tổng > 5tr hoặc chưa chọn món nào, ngược lại 150k
  const shippingFee = (subTotal >= 5000000 || selectedItems.length === 0) ? 0 : 150000;

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-[1300px] mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-4xl font-black text-indigo-900 mb-10 uppercase tracking-tighter">Giỏ Hàng</h1>

      <div className="bg-white/70 backdrop-blur-md rounded-[40px] border border-slate-200/50 p-8 lg:p-12 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="flex-1 w-full">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8 px-8 py-5 bg-slate-50/50 rounded-2xl border border-slate-100">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" 
                    checked={items.length > 0 && items.every(i => i.selected)}
                    onChange={toggleAll} 
                  />
                  <span className="text-[12px] font-black text-slate-500 uppercase tracking-widest">
                    Chọn tất cả ({items.length})
                  </span>
               </label>
               
               {/* Đã gán hàm xóa ở đây */}
               <button 
                onClick={removeSelected}
                className="flex items-center gap-2 text-[12px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
               >
                  <Trash2 size={16} /> Xóa mục đã chọn
               </button>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="space-y-4">
              {items.map(item => (
                <CartItem 
                  key={item._id} 
                  item={item} 
                  onUpdateQuantity={updateQty} 
                  onRemove={remove} 
                  onToggleSelect={toggleSelect}
                />
              ))}
            </div>
          </div>

          {/* Tổng đơn hàng */}
          <div className="w-full lg:w-[400px] sticky top-[110px]">
            <CartSummary 
                subTotal={subTotal} 
                selectedCount={selectedItems.length} 
                shippingFee={shippingFee} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}