"use client";
import React from 'react';
import { IOrder } from '../order.types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { ShoppingBag, ChevronRight } from 'lucide-react';

interface Props {
  order: IOrder;
  onView: (order: IOrder) => void;
}

export const OrderCard = ({ order, onView }: Props) => {
  return (
    <div 
      onClick={() => onView(order)}
      className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center">
            <ShoppingBag size={20} />
          </div>
          <div>
            <p className="text-indigo-600 font-black text-sm uppercase tracking-wider">#{order.orderCode}</p>
            <p className="text-[11px] text-slate-400 font-bold">{new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="flex justify-between items-end pt-4 border-t border-slate-50">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổng thanh toán</p>
          <p className="text-xl font-black text-slate-900">{order.finalAmount.toLocaleString()}đ</p>
        </div>
        <div className="flex items-center gap-1 text-indigo-600 font-black text-[11px] uppercase tracking-widest group-hover:gap-2 transition-all">
          Chi tiết <ChevronRight size={14} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};