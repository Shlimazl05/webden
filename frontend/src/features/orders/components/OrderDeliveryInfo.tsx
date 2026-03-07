import { MapPin, Phone, StickyNote } from "lucide-react";

export const OrderDeliveryInfo = ({ phone, address, note }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div className="space-y-4">
      <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
        <Phone size={18} className="text-emerald-500 mt-1" />
        <div><p className="text-[10px] font-bold text-slate-400 uppercase">Số điện thoại</p><p className="text-[16px] font-black text-slate-900">{phone}</p></div>
      </div>
      <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
        <MapPin size={18} className="text-rose-500 mt-1" />
        <div><p className="text-[10px] font-bold text-slate-400 uppercase">Địa chỉ</p><p className="text-[15px] font-bold text-slate-700 leading-snug">{address}</p></div>
      </div>
    </div>
    <div className="p-6 bg-amber-50/30 rounded-[2rem] border border-amber-100/50 relative flex items-start gap-3">
      <StickyNote size={20} className="text-amber-500 mt-0.5" />
      <p className="text-[14px] font-medium text-slate-600 italic">"{note || "Không có lời nhắn."}"</p>
    </div>
  </div>
);