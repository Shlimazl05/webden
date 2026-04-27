

import React from 'react';
import { Phone, MapPin, StickyNote } from 'lucide-react';

interface Props {
  phone: string;
  address: string;
  note?: string;
}

export const OrderDeliveryInfo = ({ phone, address, note }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
        <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
        <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest">Giao nhận & Liên hệ</h4>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
          <Phone size={18} strokeWidth={2.5} className="text-emerald-500 mt-1" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Số điện thoại</p>
            <p className="text-[16px] font-black text-slate-900 tracking-wide">{phone}</p>
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
          <MapPin size={18} strokeWidth={2.5} className="text-rose-500 mt-1" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Địa chỉ nhận hàng</p>
            <p className="text-[15px] font-bold text-slate-700 leading-snug">{address}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
        <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
        <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest">Ghi chú từ khách</h4>
      </div>
      <div className="p-6 bg-amber-50/30 rounded-xl border border-amber-100/50 min-h-[120px] relative flex items-start gap-3">
        <StickyNote size={20} strokeWidth={2.5} className="text-amber-500 mt-0.5" />
        <p className="text-[14px] font-bold text-slate-600 italic leading-relaxed">
          "{note || "Khách hàng không để lại lời nhắn."}"
        </p>
      </div>
    </div>
  </div>
);