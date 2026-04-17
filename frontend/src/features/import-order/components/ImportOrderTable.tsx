
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
        <div key={i} className="w-full h-24 bg-white rounded-3xl animate-pulse border border-slate-100" />
      ))}
    </div>
  );

  if (orders.length === 0) return (
    <div className="py-20 text-center bg-white rounded-xl border border-dashed border-slate-200">
      <Package className="mx-auto text-slate-200 mb-4" size={48} />
      <p className="ui-label text-center">Chưa có hóa đơn nào</p>
    </div>
  );

  return (
    <div className="space-y-4 font-sans">
      {orders.map((order: any) => {
        const isExpanded = expandedRow === order._id;
        return (
          <div
            key={order._id}
            className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* --- PHẦN THẺ CHÍNH (HEADER CARD) --- */}
            <div
              onClick={() => toggleRow(order._id)}
              className="p-5 sm:p-7 cursor-pointer flex flex-nowrap items-center gap-4 sm:gap-8"
            >
              {/* Mã phiếu */}
              <div className="flex items-center gap-4 min-w-[150px] shrink-0">
                <div className="p-3 rounded-2xl bg-[var(--color-primary)] text-white shadow-lg shadow-indigo-100 shrink-0">
                  <Package size={20} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="ui-label">Mã phiếu</span>
                  <span className="ui-value font-mono">#{order.importCode}</span>
                </div>
              </div>

              {/* Nhà cung cấp */}
              <div className="flex-1 min-w-[200px] flex flex-col">
                <span className="ui-label">Nhà cung cấp</span>
                <div className="flex items-center gap-2">
                  <Store size={14} className="text-emerald-500" />
                  <span className="ui-value truncate ">
                    {order.supplierId?.name || "N/A"}
                  </span>
                </div>
              </div>

              {/* Thời gian */}
              <div className="hidden lg:flex flex-col min-w-[180px] shrink-0">
                <span className="ui-label">Thời gian</span>
                <div className="flex items-center gap-2 ui-value text-[13px]">
                  <CalendarDays size={14} className="text-slate-400" />
                  {new Date(order.importDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {new Date(order.importDate).toLocaleDateString('vi-VN')}
                </div>
              </div>

              {/* Tổng thanh toán */}
              <div className="text-right min-w-[160px] shrink-0 flex flex-col items-end">
                <span className="ui-label">Tổng thanh toán</span>
                <div className="ui-price">
                  {order.totalAmount?.toLocaleString()}
                  <span className="text-[13px] ml-0.5 underline">đ</span>
                </div>
              </div>

              {/* Thao tác */}
              <div className="flex items-center gap-2 pl-4 border-l border-slate-100 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onDelete(order._id)}
                  className="p-2.5 hover:text-red-700 hover:bg-red-200 rounded-full bg-red-100 cursor-pointer text-red-600  transition-all"
                >
                  <Trash2 size={18} />
                </button>
                <div
                  onClick={() => toggleRow(order._id)}
                  className={`p-2.5 bg-indigo-50 rounded-full p-1 hover:bg-indigo-200 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-indigo-600' : 'text-indigo-400'}`}>
                  <ChevronDown size={18} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* --- PHẦN CHI TIẾT --- */}
            {isExpanded && (
              <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-[var(--bg-light)] rounded-xl p-5 border border-slate-50">

                  <div className="flex items-center gap-3 mb-5 px-4">
                    <div className="p-2 bg-indigo-50 text-[var(--color-primary)] rounded-xl  border border-indigo-100/50">
                      <ReceiptText size={18} strokeWidth={2.5} />
                    </div>
                    <span className="ui-section-title">
                      Danh mục sản phẩm nhập kho
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-4" /> {/* Đường kẻ mờ dần */}
                  </div>

                  <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          {/* B. Tiêu đề cột: Đã dùng ui-label đậm hơn */}
                          <th className="px-6 py-3 text-left ui-label">Sản phẩm</th>
                          <th className="px-6 py-3 text-center ui-label">Số lượng</th>
                          {/* A. Căn lề phải cho tiêu đề Giá vốn & Thành tiền */}
                          <th className="px-6 py-3 text-right ui-label">Giá vốn</th>
                          <th className="px-6 py-3 text-right pr-8 ui-label">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {order.details?.map((item: any, idx: number) => (
                          <tr
                            key={idx}
                            /* E. Hiệu ứng Hover nhẹ và Transition mượt mà */
                            className="hover:bg-slate-50/80 transition-colors duration-200 group"
                          >
                            {/* C. Khoảng cách dòng: Giảm py-8 xuống py-4 để gọn gàng hơn */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-18 h-18 bg-white rounded-lg border border-slate-100 overflow-hidden shrink-0 p-0.5 shadow-sm">
                                  <img
                                    src={item.productId?.imageUrl || "https://placehold.co/100x100"}
                                    className="w-full h-full object-cover rounded-md"
                                    alt="thumb"
                                  />
                                </div>
                                <div className="max-w-[500px]">
                                  <p className="ui-product-name !text-[14px] !font-medium text-slate-800">
                                    {item.productId?.productName}
                                  </p>
                                  <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                                    #{item.productId?.productCode}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center justify-center bg-slate-50 text-slate-700 px-2.5 py-1 rounded-md font-bold text-[12px] min-w-[32px] border border-slate-200/50">
                                {item.quantity}
                              </span>
                            </td>

                            {/* A & D. Căn lề phải và Định dạng tiền tệ */}
                            <td className="px-6 py-4 text-right ui-currency">
                              {item.importPrice?.toLocaleString()}
                              <span className="currency-symbol">đ</span>
                            </td>

                            <td className="px-6 py-4 text-right pr-8 ui-currency !font-bold !text-[15px]">
                              {item.subTotal?.toLocaleString()}
                              <span className="currency-symbol">đ</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Footer Tổng cộng */}
                    <div className="p-5 bg-slate-50/30 border-t border-slate-100 flex justify-end items-center">
                      <div className="text-right">
                        <p className="ui-label !text-[10px] mb-1 opacity-60">Tổng cộng hóa đơn</p>
                        <div className="ui-price !text-2xl !text-rose-500">
                          {order.totalAmount?.toLocaleString()}
                          <span className="text-sm ml-0.5 underline">đ</span>
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
