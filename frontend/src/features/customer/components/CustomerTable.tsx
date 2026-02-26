"use client";
import React from 'react';
import { UserX, UserCheck, Mail, Phone } from 'lucide-react';
import { ICustomer } from '../customer.types';

interface Props {
  customers: ICustomer[] | null;
  loading: boolean;
  onStatusChange: (id: string) => void;
}

export const CustomerTable = ({ customers, loading, onStatusChange }: Props) => {
  if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2.5rem]" />;

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        {/* HEADER TÔ NỀN XÁM, CHỮ ĐẬM SẮC NÉT */}
        <thead className="bg-slate-100 border-b border-slate-200">
          <tr className="text-[#001529] font-black text-[15px] uppercase tracking-[0.15em]">
            <th className="p-6">Thông tin khách hàng</th>
            <th className="p-6">Liên hệ</th>
            <th className="p-6 text-center">Đơn hàng</th>
            <th className="p-6">Tổng chi tiêu</th>
            <th className="p-6">Trạng thái</th>
            <th className="p-6 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 font-sans">
          {customers?.map((item) => (
            <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
              <td className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FBF7EE] text-[#C5A059] rounded-full flex items-center justify-center font-black text-lg border border-[#EFE7D3]">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-[#001529] text-sm uppercase">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">ID: {item._id}</p>
                  </div>
                </div>
              </td>
              <td className="p-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Mail size={14} className="text-[#C5A059]" /> {item.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Phone size={14} className="text-[#C5A059]" /> {item.phone}
                  </div>
                </div>
              </td>
              <td className="p-6 text-center">
                <span className="text-sm font-black text-[#001529] bg-slate-100 px-3 py-1 rounded-lg">
                  {item.orderCount}
                </span>
              </td>
              <td className="p-6">
                <p className="text-sm font-black text-emerald-600">
                  {item.totalSpent.toLocaleString('vi-VN')}đ
                </p>
              </td>
              <td className="p-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  item.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}>
                  {item.status === 'Active' ? 'Hoạt động' : 'Đã khóa'}
                </span>
              </td>
              <td className="p-6 text-center">
                <button 
                  onClick={() => onStatusChange(item._id)}
                  className={`p-2.5 rounded-xl transition-all hover:scale-110 shadow-sm ${
                    item.status === 'Active' ? "text-red-500 bg-red-50" : "text-emerald-500 bg-emerald-50"
                  }`}
                >
                  {item.status === 'Active' ? <UserX size={18} strokeWidth={2.5} /> : <UserCheck size={18} strokeWidth={2.5} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};