"use client";
import Image from 'next/image';
import { Package } from 'lucide-react';
import { IOrderDetail } from '@/features/orders/order.types';

export const OrderItemList = ({ details }: { details: IOrderDetail[] }) => (
  <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
    <div className="px-6 py-4 bg-slate-50/30 border-b border-slate-50 flex items-center gap-2">
      <Package size={18} className="text-slate-400" />
      <h3 className="font-black text-sm text-indigo-900 uppercase tracking-tight">Sản phẩm trong đơn</h3>
    </div>
    
    <div className="divide-y divide-slate-50">
      {details.map((item) => (
        <div key={item._id} className="p-6 flex gap-4 hover:bg-slate-50/30 transition-colors">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
            <Image src={item.productId.imageUrl || "/placeholder-product.png"} alt={item.product.productName} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-800 truncate">{item.product.productName}</h4>
            <p className="text-[11px] text-slate-400 mt-1 uppercase font-medium">
                {item.productId.specifications?.power} | {item.product.specifications?.size}
            </p>
            <div className="flex justify-between items-end mt-2">
              <p className="text-xs text-slate-500 font-medium tracking-widest">x{item.quantity}</p>
              <p className="text-sm font-black text-indigo-600">{item.unitPrice.toLocaleString()}đ</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);