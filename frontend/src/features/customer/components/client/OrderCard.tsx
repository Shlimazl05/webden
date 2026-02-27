"use client";

import React from 'react';
import Image from 'next/image';
import { Package, ShoppingCart, Truck, Calendar } from 'lucide-react';
import { IOrder } from '@/features/orders/order.types';

interface OrderCardProps {
  order: IOrder;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  // Hàm hiển thị màu sắc theo trạng thái đơn hàng
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'shipping': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'cancelled': return 'text-red-500 bg-red-50 border-red-100';
      default: return 'text-indigo-600 bg-indigo-50 border-indigo-100';
    }
  };

  // Lấy sản phẩm đầu tiên để hiển thị đại diện
  const firstItem = order.orderDetails[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden mb-6 hover:shadow-lg transition-all duration-300">
      {/* 1. Header: Mã đơn & Trạng thái */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-50 bg-slate-50/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-slate-400" />
            <span className="text-sm font-black text-indigo-900 uppercase">#{order.orderCode}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            <Calendar size={14} />
            {new Date(order.orderDate).toLocaleDateString('vi-VN')}
          </div>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* 2. Body: Hiển thị sản phẩm (Populate từ Product) */}
      <div className="p-6">
        <div className="flex gap-5">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
            <Image 
              src={firstItem.product.imageUrl || '/placeholder-product.png'} 
              alt="product" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="text-sm font-bold text-slate-800 truncate">{firstItem.product.productName}</h3>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">
              Số lượng: <span className="text-slate-600">x{firstItem.quantity}</span>
            </p>
            <p className="text-sm font-black text-indigo-600 mt-2">
              {firstItem.unitPrice.toLocaleString()}đ
            </p>
          </div>
        </div>

        {/* Nếu có nhiều hơn 1 sản phẩm */}
        {order.orderDetails.length > 1 && (
          <div className="mt-4 pt-4 border-t border-dashed border-slate-100 flex justify-center">
            <button className="text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
              Xem thêm {order.orderDetails.length - 1} sản phẩm khác
            </button>
          </div>
        )}
      </div>

      {/* 3. Footer: Tổng tiền & Nút bấm */}
      <div className="px-6 py-5 bg-slate-50/20 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Truck size={14} />
            Phí vận chuyển: {order.shippingFee === 0 ? 'Miễn phí' : `${order.shippingFee.toLocaleString()}đ`}
          </div>
          <div className="text-sm">
            <span className="font-bold text-slate-500">Thành tiền: </span>
            <span className="text-xl font-black text-indigo-600 tracking-tight">
              {order.totalAmount.toLocaleString()}đ
            </span>
          </div>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white hover:border-indigo-400 transition-all">
            Xem chi tiết
          </button>
          <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2">
            <ShoppingCart size={14} /> Mua lại
          </button>
        </div>
      </div>
    </div>
  );
};