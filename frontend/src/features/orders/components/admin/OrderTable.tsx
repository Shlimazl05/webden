// src/features/orders/components/admin/OrderTable.tsx
import React, { useState } from "react";
import { ChevronDown, Trash2, User, Phone, MapPin, PackageCheck, CreditCard } from "lucide-react";
import { OrderStatusBadge } from "../OrderStatusBadge";

export const OrderTable = ({ orders, loading, onUpdateStatus, onDelete }: any) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem]" />;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/80 border-b border-slate-100 font-black text-[13px] text-slate-700 uppercase tracking-widest">
          <tr>
            <th className="p-6 w-16"></th>
            <th className="p-6">Mã Đơn</th>
            <th className="p-6">Khách Hàng</th>
            <th className="p-6">Thanh Toán</th>
            <th className="p-6 text-right">Tổng Tiền</th>
            <th className="p-6 text-center">Trạng Thái</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {orders.map((order: any) => {
            const isExpanded = expandedRow === order._id;
            return (
              <React.Fragment key={order._id}>
                <tr onClick={() => setExpandedRow(isExpanded ? null : order._id)} className="hover:bg-slate-50/50 cursor-pointer transition-all">
                  <td className="p-6 text-center">
                    <ChevronDown size={20} className={`transition-transform ${isExpanded ? "rotate-180 text-indigo-600" : "text-slate-300"}`} />
                  </td>
                  <td className="p-6 font-black text-indigo-600 uppercase">#{order.orderCode}</td>
                  <td className="p-6">
                    <p className="font-black text-slate-900 text-[15px]">{order.customerId?.username}</p>
                    <p className="text-[11px] text-slate-400 font-bold uppercase">{order.phone}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-[12px] font-black text-slate-600 uppercase">
                      <CreditCard size={14} className="text-indigo-500" /> {order.paymentMethod}
                    </div>
                  </td>
                  <td className="p-6 text-right font-black text-slate-900 text-[16px]">{order.finalAmount?.toLocaleString()}đ</td>
                  <td className="p-6 text-center"><OrderStatusBadge status={order.status} /></td>
                </tr>
                
                {/* CHI TIẾT ĐƠN HÀNG XỔ XUỐNG */}
                {isExpanded && (
                  <tr className="bg-slate-50/30">
                    <td colSpan={6} className="p-8 pt-0 pb-8">
                      <div className="bg-white rounded-[2rem] border border-indigo-100 shadow-xl overflow-hidden animate-in slide-in-from-top-2">
                        <div className="bg-indigo-600 px-8 py-3 text-white flex justify-between items-center font-black text-[11px] uppercase tracking-widest">
                          <span>Danh sách sản phẩm khách đặt</span>
                          <span className="opacity-70">Địa chỉ: {order.address}</span>
                        </div>
                        <table className="w-full">
                          <tbody className="divide-y divide-slate-50">
                            {order.orderDetails.map((item: any, idx: number) => (
                              <tr key={idx} className="text-sm font-bold text-slate-700">
                                <td className="p-4 pl-10">
                                  <p className="text-slate-950 font-black">{item.product?.productName}</p>
                                  <p className="text-[10px] text-indigo-500 uppercase">Mã SP: {item.product?.productCode}</p>
                                </td>
                                <td className="p-4 text-center">x{item.quantity}</td>
                                <td className="p-4 text-right pr-10 font-black text-slate-900">{item.unitPrice.toLocaleString()}đ</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        
                        {/* NÚT ĐIỀU KHIỂN TRẠNG THÁI CHO ADMIN */}
                        <div className="p-6 bg-slate-50 border-t flex justify-end gap-3">
                           {order.status === 'Pending' && (
                             <button onClick={() => onUpdateStatus(order._id, 'Processing')} className="px-6 h-10 bg-indigo-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-md hover:bg-indigo-700 transition-all">Xác nhận đơn</button>
                           )}
                           {order.status === 'Processing' && (
                             <button onClick={() => onUpdateStatus(order._id, 'Shipping')} className="px-6 h-10 bg-blue-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-md">Giao hàng</button>
                           )}
                           {order.status === 'Shipping' && (
                             <button onClick={() => onUpdateStatus(order._id, 'Completed')} className="px-6 h-10 bg-emerald-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-md">Hoàn thành</button>
                           )}
                           {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                             <button onClick={() => onUpdateStatus(order._id, 'Cancelled')} className="px-6 h-10 bg-white text-rose-500 border border-rose-100 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-rose-50">Hủy đơn</button>
                           )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};