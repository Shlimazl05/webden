


"use client";
import React, { useState } from "react";
import { Trash2, ChevronDown, Package, Store, ReceiptText, CalendarDays, Hash } from "lucide-react";

export const ImportOrderTable = ({ orders, loading, onDelete }: any) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (loading) return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full h-24 bg-slate-100 animate-pulse rounded-3xl" />
      ))}
    </div>
  );

  if (orders.length === 0) return (
    <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-slate-200">
      <Package className="mx-auto text-slate-200 mb-4" size={48} />
      <p className="text-slate-900 font-black uppercase text-xs tracking-[0.2em]">Chưa có hóa đơn nào</p>
    </div>
  );

  return (
    <div className="space-y-5 font-sans">
      {orders.map((order: any) => {
        const isExpanded = expandedRow === order._id;
        return (
          <div
            key={order._id}
            className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* --- PHẦN THẺ CHÍNH (HEADER CARD) --- */}
            <div
              onClick={() => toggleRow(order._id)}
              // SỬA: items-start để tất cả các dòng tiêu đề bắt đầu từ cùng 1 cao độ
              className="p-5 sm:p-7 cursor-pointer flex flex-nowrap items-start gap-4 sm:gap-6 bg-white"
            >
              {/* Mã phiếu */}
              <div className="flex items-start gap-4 min-w-[140px] shrink-0">
                {/* self-center giúp icon tím luôn nằm giữa card dù chữ có dài hay ngắn */}
                <div className="p-3 rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-100 shrink-0 self-center">
                  <Package size={22} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider block mb-1.5 leading-none">Mã phiếu</span>
                  <span className="font-mono font-black text-slate-900 text-[15px] tracking-tight uppercase leading-none">#{order.importCode}</span>
                </div>
              </div>

              {/* Nhà cung cấp - Không còn bị nhảy nhờ items-start ở cha */}
              <div className="flex-1 min-w-[220px] flex flex-col">
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider block mb-1.5 leading-none">Nhà cung cấp</span>
                <div className="flex items-start gap-2">
                  <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0 mt-0.5">
                    <Store size={14} strokeWidth={3} />
                  </div>
                  <span className="font-black text-slate-900 text-[15px] leading-tight">
                    {order.supplierId?.name || "N/A"}
                  </span>
                </div>
              </div>

              {/* Thời gian */}
              <div className="hidden lg:flex flex-col min-w-[180px] shrink-0">
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider block mb-1.5 leading-none">Thời gian</span>
                <div className="flex items-center gap-2 text-slate-900 font-black text-[13px]">
                  <CalendarDays size={16} strokeWidth={2.5} className="text-slate-400" />
                  {new Date(order.importDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {new Date(order.importDate).toLocaleDateString('vi-VN')}
                </div>
              </div>

              {/* Tổng thanh toán */}
              <div className="text-right min-w-[160px] shrink-0 flex flex-col items-end">
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider block mb-1.5 leading-none">Tổng thanh toán</span>
                <span className="text-[19px] font-black text-rose-500 tracking-tighter leading-none">
                  {order.totalAmount?.toLocaleString()}
                  <span className="text-[13px] ml-0.5 underline">đ</span>
                </span>
              </div>

              {/* Thao tác - self-center để các nút này nằm giữa hàng */}
              <div className="flex items-center gap-2 pl-4 border-l-2 border-slate-50 shrink-0 self-center" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onDelete(order._id)}
                  className="p-3 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all active:scale-90"
                >
                  <Trash2 size={18} strokeWidth={2.5} />
                </button>
                <div className={`p-2 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-violet-600' : 'text-slate-300'}`}>
                  <ChevronDown size={24} strokeWidth={3} />
                </div>
              </div>
            </div>

            {/* --- PHẦN CHI TIẾT --- */}
            {isExpanded && (
              <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-slate-50/50 rounded-[2.5rem] p-4 border border-slate-100">

                  {/* Tiêu đề đơn giản: Chữ đen + Đường gạch ngang */}
                  <div className="mb-4 px-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ReceiptText size={16} className="text-violet-600" strokeWidth={3} />
                      <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em]">Danh mục sản phẩm nhập kho</span>
                    </div>
                    <div className="h-px bg-slate-200 w-full" />
                  </div>

                  <div className="bg-white rounded-[1.5rem] shadow-sm overflow-hidden border border-slate-100">
                    <table className="w-full">
                      <thead>
                        <tr className="text-[12px] font-black text-slate-900 uppercase trackingtext-rose-600 border-b border-slate-50">
                          <th className="px-6 py-4 text-left">Sản phẩm</th>
                          <th className="px-6 py-4 text-center">Số lượng</th>
                          <th className="px-6 py-4 text-right">Giá vốn</th>
                          <th className="px-6 py-4 text-right pr-8">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {order.details?.map((item: any, idx: number) => (
                          <tr key={idx}>
                            <td className="px-10 py-8">
                              <div className="flex items-center gap-6 text-left">
                                <div className="w-24 h-24 bg-white rounded-xl border border-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center p-0.5 shadow-sm">
                                  {item.productId?.imageUrl ? (
                                    <img
                                      // Dùng trực tiếp đường dẫn từ DB (Ví dụ: /uploads/den-ban.jpg)
                                      src={item.productId.imageUrl}
                                      alt="Product"
                                      className="w-full h-full object-cover rounded-lg"
                                      onError={(e: any) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/100x100?text=No+File";
                                      }}
                                    />
                                  ) : (
                                    <div className="opacity-20"><Package size={20} /></div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-slate-900 font-black text-[15px] leading-tight mb-1 tracking-tight">
                                    {item.productId?.productName}
                                  </p>
                                  <span className="inline-flex items-center gap-1 text-[10px]  font-black uppercase tracking-wider">
                                    <Hash size={10} strokeWidth={3} /> {item.productId?.productCode}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center justify-center bg-slate-50 text-slate-900 px-3 py-1 rounded-xl font-black text-[14px] min-w-[40px] border border-slate-200">
                                {item.quantity}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right text-slate-900 font-bold text-sm">
                              {item.importPrice?.toLocaleString()}đ
                            </td>
                            <td className="px-6 py-4 text-right pr-8">
                              <span className="text-slate-900 font-black text-[15px]">
                                {item.subTotal?.toLocaleString()}đ
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Footer chi tiết tối giản (Chỉ còn tổng tiền) */}
                    <div className="p-6 bg-slate-50/50 flex justify-end items-center">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-1">Tổng cộng hóa đơn</p>
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[26px] font-black text-rose-500 tracking-tighter leading-none">
                            {order.totalAmount?.toLocaleString()}
                          </span>
                          <span className="text-lg font-black text-rose-500 underline">đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

