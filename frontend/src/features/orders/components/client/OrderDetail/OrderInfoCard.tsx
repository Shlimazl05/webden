"use client";
import { MapPin, CreditCard } from 'lucide-react';
import { IOrder } from '@/features/orders/order.types';

export const OrderInfoCard = ({ order }: { order: IOrder }) => (
  <div className="space-y-6">
    {/* Khối địa chỉ */}
    <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
      <div className="flex items-center gap-3 mb-4 text-indigo-900">
        <MapPin size={20} />
        <h3 className="font-black text-sm uppercase tracking-tight">Địa chỉ nhận hàng</h3>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-slate-800">{order.address}</p>
        <p className="text-xs text-slate-500">{order.phone}</p>
      </div>
    </div>

    {/* Khối thanh toán */}
    <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
      <div className="flex items-center gap-3 mb-4 text-indigo-900">
        <CreditCard size={20} />
        <h3 className="font-black text-sm uppercase tracking-tight">Thanh toán</h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-medium">Phương thức:</span>
          <span className="font-bold text-slate-700">{order.paymentMethod}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-medium">Trạng thái:</span>
          <span className="font-black text-emerald-600 uppercase tracking-widest">Thành công</span>
        </div>
      </div>
    </div>
  </div>
);