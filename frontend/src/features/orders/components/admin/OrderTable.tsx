

"use client";
import React, { useState } from "react";
import { ChevronDown, Trash2, CreditCard, ShoppingBag, MapPin, Receipt, Truck, Coins, Tag, Package } from "lucide-react";
import { OrderStatusBadge } from "../OrderStatusBadge";

export const OrderTable = ({ orders, loading, onUpdateStatus, onDelete }: any) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden font-sans">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/80 border-b border-slate-100">
          <tr className="text-slate-700 font-black text-[13px] uppercase tracking-widest">
            <th className="p-6 w-16 text-center"></th>
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
                {/* DÒNG TỔNG QUAN */}
                <tr 
                  onClick={() => setExpandedRow(isExpanded ? null : order._id)} 
                  className={`hover:bg-slate-50/50 transition-all cursor-pointer group ${isExpanded ? 'bg-indigo-50/30' : ''}`}
                >
                  <td className="p-6 text-center">
                    <div className={`p-1 rounded-lg transition-all ${isExpanded ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:text-indigo-600'}`}>
                      <ChevronDown size={18} strokeWidth={3} />
                    </div>
                  </td>
                  <td className="p-6 font-black text-indigo-600 uppercase">#{order.orderCode}</td>
                  <td className="p-6">
                    <p className="font-black text-slate-900 text-[15px]">{order.customerId?.username}</p>
                    <p className="text-[11px] text-slate-500 font-bold">{order.phone}</p>
                  </td>
                  <td className="p-6">
                    <span className="flex items-center gap-2 text-[11px] font-black text-slate-700 uppercase">
                      <CreditCard size={15} strokeWidth={2.5} className="text-indigo-500" /> {order.paymentMethod}
                    </span>
                  </td>
                  <td className="p-6 text-right font-black text-slate-950 text-[16px]">
                    {order.finalAmount?.toLocaleString()}đ
                  </td>
                  <td className="p-6 text-center">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
                
                {/* DÒNG CHI TIẾT XỔ XUỐNG */}
                {isExpanded && (
                  <tr className="bg-slate-50/30">
                    <td colSpan={6} className="p-8 pt-0 pb-8">
                      <div className="bg-white rounded-[2.5rem] border border-indigo-100 shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-300">
                        
                        {/* Thanh thông tin vận chuyển */}
                        <div className="bg-indigo-600 px-8 py-3.5 text-white flex justify-between items-center shadow-md">
                          <div className="flex items-center gap-2">
                             <MapPin size={16} strokeWidth={3} className="text-white" />
                             <span className="text-[11px] font-black uppercase tracking-widest">Địa chỉ: {order.address}</span>
                          </div>
                          <span className="text-[10px] font-black opacity-90 uppercase tracking-wider bg-white/20 px-3 py-1 rounded-lg">Người nhận: {order.recipientName}</span>
                        </div>

                        <div className="p-6">
                          {/* Bảng sản phẩm */}
                          <table className="w-full">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                <th className="p-4 pl-6 text-left">Sản phẩm khách đặt</th>
                                <th className="p-4 text-center">Số lượng</th>
                                <th className="p-4 text-right pr-6">Thành tiền</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {order.orderDetails?.map((item: any, idx: number) => (
                                <tr key={idx} className="group">
                                  <td className="p-4 pl-6 flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden bg-white flex-shrink-0 shadow-sm">
                                      <img src={item.productId?.imageUrl || "/img/placeholder.svg"} className="w-full h-full object-cover" alt="thumb" />
                                    </div>
                                    <div>
                                      <p className="text-slate-950 font-black text-[14px] uppercase tracking-tight leading-tight">{item.productId?.productName}</p>
                                      <p className="text-[10px] text-indigo-500 font-black mt-1 uppercase tracking-widest">MÃ SP: {item.productId?.productCode}</p>
                                    </div>
                                  </td>
                                  <td className="p-4 text-center">
                                    <span className="bg-slate-100 px-3 py-1 rounded-lg font-black text-slate-800 text-sm border border-slate-200">x{item.quantity}</span>
                                  </td>
                                  <td className="p-4 text-right pr-6 font-black text-slate-950 text-[15px]">
                                    {(item.unitPrice * item.quantity).toLocaleString()}đ
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          {/* PHẦN TỔNG KẾT TÀI CHÍNH CÓ MÀU ICON */}
                          <div className="mt-6 p-7 bg-slate-50/50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 shadow-inner">
                            
                            {/* Cột trái: Quản lý trạng thái */}
                            <div className="flex flex-col gap-3 w-full md:w-auto">
                               <div className="flex items-center gap-2 text-indigo-600">
                                  <ShoppingBag size={18} strokeWidth={3} />
                                  <p className="text-[12px] font-black uppercase tracking-widest">Thao tác trạng thái</p>
                               </div>
                               <div className="flex flex-wrap gap-2.5">
                                  {order.status === 'Pending' && (
                                    <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(order._id, 'Processing'); }} className="px-6 h-10 bg-indigo-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">Xác nhận đơn</button>
                                  )}
                                  {order.status === 'Processing' && (
                                    <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(order._id, 'Shipping'); }} className="px-6 h-10 bg-blue-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-100">Bắt đầu giao</button>
                                  )}
                                  {order.status === 'Shipping' && (
                                    <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(order._id, 'Completed'); }} className="px-6 h-10 bg-emerald-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-emerald-100">Hoàn thành</button>
                                  )}
                                  {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                                    <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(order._id, 'Cancelled'); }} className="px-6 h-10 bg-white text-rose-500 border border-rose-200 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-rose-50 transition-all">Hủy đơn</button>
                                  )}
                               </div>
                            </div>

                            {/* Cột phải: Dòng tiền với Icon có màu sắc */}
                            <div className="space-y-3 min-w-[280px] w-full md:w-auto">
                              <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                                  <Coins size={16} strokeWidth={2.5} className="text-amber-500" /> Tiền hàng:
                                </span>
                                <span className="font-black text-slate-800">{order.totalAmount?.toLocaleString()}đ</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                                  <Truck size={16} strokeWidth={2.5} className="text-sky-500" /> Phí vận chuyển:
                                </span>
                                <span className="font-black text-slate-800">{order.shippingFee?.toLocaleString()}đ</span>
                              </div>
                              <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-center">
                                <span className="flex items-center gap-2 text-[12px] font-black text-slate-950 uppercase tracking-[0.15em]">
                                  <Receipt size={20} strokeWidth={3} className="text-rose-600" /> Tổng cộng:
                                </span>
                                <span className="text-2xl font-black text-rose-600 tracking-tighter">
                                  {order.finalAmount?.toLocaleString()}đ
                                </span>
                              </div>
                            </div>
                          </div>

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
