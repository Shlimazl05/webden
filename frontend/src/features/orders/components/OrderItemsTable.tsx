
import React from 'react';
import { Package } from 'lucide-react';

export const OrderItemsTable = ({ details }: { details: any[] }) => (
  <div className="space-y-6 pt-10 border-t border-slate-50">
    <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-4">
      <Package size={20} strokeWidth={2.5} className="text-indigo-600" /> Kiện hàng ({details?.length || 0})
    </h4>
    <div className="border border-slate-100 rounded-xl  overflow-hidden bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <th className="px-8 py-5">Sản phẩm</th>
            <th className="px-8 py-5 text-center">Số lượng</th>
            <th className="px-8 py-5 text-right">Đơn giá</th>
            <th className="px-8 py-5 text-right">Tổng</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {details?.map((item: any, idx: number) => (
            <tr key={idx} className="hover:bg-indigo-50/20 transition-colors group/row">
              <td className="px-8 py-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 p-1">
                    <img src={item.productId?.imageUrl} className="w-full h-full object-cover rounded-xl " alt="product" />
                  </div>
                  <div>
                    <p className="text-[14px] font-black text-slate-900 line-clamp-1">{item.productId?.productName}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">SKU: {item.productId?.productCode || "N/A"}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6 text-center text-slate-700 font-black">x{item.quantity}</td>
              <td className="px-8 py-6 text-right font-bold text-slate-500">{item.unitPrice?.toLocaleString()}đ</td>
              <td className="px-8 py-6 text-right font-black text-slate-900">{(item.quantity * item.unitPrice)?.toLocaleString()}đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);