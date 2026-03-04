"use client";
import React from 'react';
import { OrderStatus } from '../order.types';

const statusMap: Record<OrderStatus, { label: string, color: string }> = {
  Pending: { label: 'Chờ xác nhận', color: 'bg-amber-50 text-amber-600 border-amber-200' },
  Processing: { label: 'Đang xử lý', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  Shipping: { label: 'Đang giao hàng', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  Completed: { label: 'Đã hoàn thành', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  Cancelled: { label: 'Đã hủy đơn', color: 'bg-rose-50 text-rose-600 border-rose-200' },
};

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const config = statusMap[status] || statusMap.Pending;
  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${config.color}`}>
      {config.label}
    </span>
  );
};