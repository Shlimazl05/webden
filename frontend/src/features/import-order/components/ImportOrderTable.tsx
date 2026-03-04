"use client";
import React, { useState } from "react";
import { Trash2, ChevronDown, ChevronUp, Package, Calendar, User, ShoppingCart, ArrowDownToLine } from "lucide-react";

export const ImportOrderTable = ({ orders, loading, onDelete }: any) => {
  // State quản lý dòng nào đang được mở rộng
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden font-sans">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/80 border-b border-slate-100">
          <tr className="text-slate-700 font-bold text-[13px] uppercase tracking-widest">
            <th className="p-6 w-12 text-center">#</th>
            <th className="p-6">Mã Phiếu</th>
            <th className="p-6">Nhà Cung Cấp</th>
            <th className="p-6">Ngày Nhập</th>
            <th className="p-6 text-right">Tổng Tiền</th>
            <th className="p-6 text-center">Thao Tác</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-slate-50">
          {orders.length > 0 ? orders.map((order: any) => {
            const isExpanded = expandedRow === order._id;
            return (
              <React.Fragment key={order._id}>
                {/* DÒNG CHÍNH */}
                <tr 
                  onClick={() => toggleRow(order._id)}
                  className={`hover:bg-slate-50/50 transition-all group cursor-pointer ${isExpanded ? 'bg-indigo-50/20' : ''}`}
                >
                  <td className="p-6 text-center">
                    {isExpanded ? <ChevronUp size={20} className="text-indigo-600" /> : <ChevronDown size={20} className="text-slate-300 group-hover:text-indigo-500" />}
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1.5 bg-white border border-indigo-100 text-indigo-600 rounded-lg font-black text-xs shadow-sm">
                      #{order.importCode}
                    </span>
                  </td>
                  <td className="p-6 font-black text-slate-950 text-[15px]">{order.supplierId?.name || "N/A"}</td>
                  <td className="p-6 text-slate-500 font-bold text-[13px]">
                    {new Date(order.importDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="p-6 text-right font-black text-rose-600 text-[16px]">
                    {order.totalAmount?.toLocaleString()} <span className="text-[11px] underline">đ</span>
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

                {/* DÒNG CHI TIẾT (Xổ ra khi bấm) */}
                {isExpanded && (
                  <tr className="bg-slate-50/50 animate-in slide-in-from-top-2 duration-300">
                    <td colSpan={6} className="p-8 pt-2 pb-10">
                      <div className="bg-white rounded-[2rem] border border-indigo-100 shadow-xl overflow-hidden">
                        <div className="bg-indigo-600 px-6 py-3 flex items-center gap-2">
                          <ArrowDownToLine size={16} className="text-white" strokeWidth={3} />
                          <span className="text-[11px] font-black text-white uppercase tracking-widest">Danh mục hàng hóa nhập kho</span>
                        </div>
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-100">
                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <th className="p-4 pl-8">Sản phẩm</th>
                              <th className="p-4 text-center">Số lượng</th>
                              <th className="p-4 text-right">Giá nhập</th>
                              <th className="p-4 text-right pr-8">Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {order.details?.map((item: any, idx: number) => (
                              <tr key={idx} className="text-sm font-bold text-slate-700">
                                <td className="p-4 pl-8">
                                  <p className="text-slate-950 font-black">{(item.productId as any)?.productName}</p>
                                  <p className="text-[10px] text-indigo-500 font-bold uppercase">{(item.productId as any)?.productCode}</p>
                                </td>
                                <td className="p-4 text-center text-indigo-600 font-black text-[15px]">{item.quantity}</td>
                                <td className="p-4 text-right text-slate-500 font-medium">{item.importPrice.toLocaleString()}đ</td>
                                <td className="p-4 text-right pr-8 text-slate-950 font-black">{item.subTotal.toLocaleString()}đ</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {/* Ghi chú nếu có */}
                        {order.note && (
                          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-start gap-2">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ghi chú:</span>
                             <p className="text-sm text-slate-600 italic font-bold">"{order.note}"</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          }) : (
            <tr><td colSpan={6} className="p-24 text-center text-slate-300 font-black uppercase text-xs">Chưa có hóa đơn nào</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};