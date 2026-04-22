

"use client";
import React from "react";
import { Edit3, Trash2, Eye, EyeOff, Phone, Mail, MapPin, Building2 } from "lucide-react";
import { ISupplier } from "../../supplier/supplier.types";
import toast from "react-hot-toast";

interface Props {
  suppliers: ISupplier[] | null;
  loading: boolean;
  onEdit: (s: ISupplier) => void;
  onDelete: (id: string) => void;
  onToggle: (s: ISupplier) => Promise<void>;
}

export const SupplierTable = ({ suppliers, loading, onEdit, onDelete, onToggle }: Props) => {
  if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-xl border border-slate-100" />;

  const handleQuickToggle = async (sup: ISupplier) => {
    const promise = onToggle(sup);
    toast.promise(promise, {
      loading: 'Đang cập nhật...',
      success: `Đã chuyển sang ${sup.status === 'Active' ? 'TẠM NGỪNG' : 'GIAO DỊCH'}`,
      error: 'Lỗi cập nhật trạng thái.',
    }, {
      style: { borderRadius: '12px', background: '#1e293b', color: '#fff', fontWeight: 'bold', fontSize: '13px' },
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden font-sans">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-100 border-b border-slate-200">
          <tr className="text-slate-700 font-bold text-[13px] uppercase tracking-widest">
            <th className="p-6 w-[28%]">Nhà cung cấp</th>
            <th className="p-6 w-[22%]">Liên hệ</th>
            <th className="p-6 w-[35%]">Địa chỉ</th>
            <th className="p-6 w-[15%] text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {suppliers && suppliers.length > 0 ? (
            suppliers.map((sup) => (
              <tr key={sup._id} className="hover:bg-slate-50/50 transition-colors group">
                {/* 1. Tên NCC: Bỏ truncate để hiện đầy đủ */}
                <td className="p-6 font-bold text-slate-800 text-[15px]  max-w-[150px]">
                  {sup.name}
                </td>

                {/* 2. Liên hệ: Icon Mail có màu, chữ đậm hơn */}
                <td className="p-6">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
                      <Phone size={14} className="text-indigo-500" strokeWidth={2.5} />
                      {sup.phone}
                    </div>
                    {sup.email && (
                      <div className="flex items-center gap-2 text-slate-600 text-[12px] font-bold">
                        <Mail size={14} className="text-sky-500" strokeWidth={2.5} />
                        {sup.email}
                      </div>
                    )}
                  </div>
                </td>

                {/* 3. Địa chỉ: Icon có màu, chữ đậm rõ nét */}
                <td className="p-6">
                  <div className="flex items-start gap-2 text-slate-700 text-[13px] font-bold leading-relaxed">
                    <MapPin size={15} className="mt-0.5 flex-shrink-0 text-rose-500" strokeWidth={2.5} />
                    <span>{sup.address}</span>
                  </div>
                </td>

                {/* 4. Thao tác */}
                <td className="p-6 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleQuickToggle(sup)}
                      className={`p-2.5 rounded-xl  border transition-all active:scale-90 ${sup.status === 'Active'
                        ? "text-emerald-500 bg-white border-slate-100 hover:border-emerald-200 hover:bg-emerald-50"
                        : "text-amber-500 bg-white border-slate-100 hover:border-amber-200 hover:bg-amber-50"
                        }`}
                    >
                      {sup.status === 'Active' ? <Eye size={17} strokeWidth={2.5} /> : <EyeOff size={17} strokeWidth={2.5} />}
                    </button>

                    <button
                      onClick={() => onEdit(sup)}
                      className="p-2.5 text-indigo-500 bg-white border border-slate-100 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 rounded-xl  transition-all active:scale-90"
                    >
                      <Edit3 size={17} strokeWidth={2.5} />
                    </button>

                    <button
                      onClick={() => onDelete(sup._id)}
                      className="p-2.5 text-rose-500 bg-white border border-slate-100 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 rounded-xl  transition-all active:scale-90"
                    >
                      <Trash2 size={17} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={4} className="p-24 text-center text-slate-400 font-bold uppercase text-xs">Trống dữ liệu</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};