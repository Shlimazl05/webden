

"use client";
import React, { useState } from "react";
import { Trash2, ChevronDown, Package, ArrowDownToLine, Receipt, Clock } from "lucide-react";

export const ImportOrderTable = ({ orders, loading, onDelete }: any) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden font-sans">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/80 border-b border-slate-100">
          <tr className="text-slate-700 font-black text-[13px] uppercase tracking-widest">
            <th className="p-6 w-16 text-center"></th>
            <th className="p-6">Mã phiếu</th>
            <th className="p-6">Nhà cung cấp</th>
            <th className="p-6">Ngày nhập</th>
            <th className="p-6 text-right">Tổng thanh toán</th>
            <th className="p-6 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {orders.length > 0 ? (
            orders.map((order: any) => {
              const isExpanded = expandedRow === order._id;
              return (
                <React.Fragment key={order._id}>
                  <tr
                    onClick={() => toggleRow(order._id)}
                    className={`hover:bg-slate-50/50 transition-all cursor-pointer group ${isExpanded ? 'bg-indigo-50/30' : ''}`}
                  >
                    <td className="p-6 text-center">
                      <div className={`p-1 rounded-lg transition-all ${isExpanded ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:text-indigo-600'}`}>
                        <ChevronDown size={18} strokeWidth={3} />
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1.5 bg-white border border-indigo-100 text-indigo-700 rounded-xl font-black text-xs shadow-sm uppercase tracking-wider">
                        #{order.importCode}
                      </span>
                    </td>
                    <td className="p-6 font-black text-slate-900 text-[15px]">
                      {order.supplierId?.name || "N/A"}
                    </td>
                    <td className="p-6 text-slate-500 font-bold text-[13px]">
                      {new Date(order.importDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="p-6 text-right">
                      <span className="text-[17px] font-black text-rose-600 tracking-tighter">
                        {order.totalAmount?.toLocaleString()}
                      </span>
                      <span className="text-[12px] font-bold text-rose-600 ml-1 underline">đ</span>
                    </td>
                    <td className="p-6 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onDelete(order._id)}
                        className="p-2.5 text-rose-400 bg-white border border-slate-100 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 rounded-xl transition-all active:scale-90 shadow-sm"
                      >
                        <Trash2 size={18} strokeWidth={2.5} />
                      </button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-slate-50/30">
                      <td colSpan={6} className="p-8 pt-0 pb-8">
                        <div className="bg-white rounded-[2.5rem] border border-indigo-100 shadow-xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
                          {/* HEADER CHI TIẾT: ĐÃ BỎ LƯU Ý THUẾ */}
                          <div className="bg-indigo-600 px-8 py-4 flex items-center gap-3 text-white">
                            <Receipt size={20} strokeWidth={2.5} />
                            <span className="text-[12px] font-black uppercase tracking-[0.2em]">Danh mục hàng nhập kho</span>
                          </div>

                          <div className="p-4">
                            <table className="w-full text-left">
                              <thead className="bg-slate-50 rounded-2xl">
                                <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                  <th className="p-5 pl-10">Sản phẩm </th>
                                  <th className="p-5 text-center">Số lượng</th>
                                  <th className="p-5 text-right">Giá nhập</th>
                                  <th className="p-5 text-right pr-10">Thành tiền</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {order.details?.map((item: any, idx: number) => (
                                  <tr key={idx} className="text-[14px] font-bold text-slate-700">
                                    <td className="p-5 pl-10">
                                      <p className="text-slate-800 font-bold leading-tight  tracking-tight">{(item.productId as any)?.productName}</p>
                                      <p className="text-[10px] text-indigo-500 font-bold mt-1 ">MÃ SP: {(item.productId as any)?.productCode}</p>
                                    </td>
                                    <td className="p-5 text-center">
                                      <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-black text-[15px]">{item.quantity}</span>
                                    </td>
                                    <td className="p-5 text-right text-slate-500 font-medium">{item.importPrice.toLocaleString()}đ</td>
                                    <td className="p-5 text-right pr-10 text-slate-950 font-black text-[15px]">{item.subTotal.toLocaleString()}đ</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {/* FOOTER CHI TIẾT: ĐÃ BỎ GHI CHÚ & THÊM THỜI GIAN TẠO */}
                            <div className="mt-4 p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center rounded-b-[2rem]">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg border border-slate-200 text-indigo-600">
                                  <Clock size={16} strokeWidth={3} />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Thời gian lập phiếu</p>
                                  <p className="text-sm text-slate-900 font-black">
                                    {new Date(order.createdAt || order.importDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {new Date(order.importDate).toLocaleDateString('vi-VN')}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổng hóa đơn</p>
                                <p className="text-2xl font-black text-indigo-600 tracking-tighter">{order.totalAmount?.toLocaleString()}đ</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <tr><td colSpan={6} className="p-24 text-center text-slate-300 font-black uppercase text-xs tracking-widest">Chưa có dữ liệu hóa đơn</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};