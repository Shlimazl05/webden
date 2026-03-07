import { Coins, Receipt, Truck } from "lucide-react";

export const OrderPriceSummary = ({ total, shipping, final }: any) => (
  <div className="p-10 bg-slate-50/50 flex justify-end">
    <div className="w-full max-w-xs space-y-3">
      <div className="flex justify-between items-center text-[12px] font-bold text-slate-400 tracking-tight">
        <div className="flex items-center gap-2"><Coins size={14} className="text-amber-500" /><span>Tiền hàng</span></div>
        <span className="text-slate-700 font-black">{total?.toLocaleString()}đ</span>
      </div>
      <div className="flex justify-between items-center text-[12px] font-bold text-slate-400 tracking-tight">
        <div className="flex items-center gap-2"><Truck size={14} className="text-sky-500" /><span>Phí vận chuyển</span></div>
        <span className="text-slate-700 font-black">+{shipping?.toLocaleString()}đ</span>
      </div>
      <div className="h-[1px] bg-slate-200 my-4" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2"><Receipt size={18} className="text-rose-600" /><span className="text-[14px] font-black text-slate-900 uppercase">Tổng cộng</span></div>
        <span className="text-3xl font-black text-rose-600 tracking-tighter">{final?.toLocaleString()}đ</span>
      </div>
    </div>
  </div>
);