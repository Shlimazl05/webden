// // src/features/supplier/components/admin/SupplierTable.tsx
// import React from "react";
// import { Edit3, Trash2, Eye, EyeOff, Phone, Mail, MapPin, Building2 } from "lucide-react";
// import { ISupplier } from "../../supplier/supplier.types";

// interface Props {
//   suppliers: ISupplier[];
//   loading: boolean;
//   onEdit: (s: ISupplier) => void;
//   onDelete: (id: string) => void;
//   onToggle: (s: ISupplier) => Promise<void>;
// }

// export const SupplierTable = ({ suppliers, loading, onEdit, onDelete, onToggle }: Props) => {
//   if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem]" />;

//   return (
//     <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
//       <table className="w-full text-left border-collapse">
//         <thead className="bg-slate-50/80 border-b border-slate-100">
//           <tr className="text-slate-700 font-bold text-[14px] uppercase tracking-widest">
//             <th className="p-6">Nhà cung cấp</th>
//             <th className="p-6">Liên hệ</th>
//             <th className="p-6">Địa chỉ</th>
//             <th className="p-6 text-center">Trạng thái</th>
//             <th className="p-6 text-center">Thao tác</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-slate-50">
//           {suppliers.length > 0 ? suppliers.map((sup) => (
//             <tr key={sup._id} className="hover:bg-slate-50/50 transition-colors group">
//               <td className="p-6 font-black text-slate-900 text-[15px]">{sup.name}</td>
//               <td className="p-6">
//                 <div className="flex flex-col gap-1 text-sm font-bold text-slate-600">
//                   <span className="flex items-center gap-2"><Phone size={14} className="text-indigo-500" /> {sup.phone}</span>
//                   <span className="flex items-center gap-2 text-slate-400 text-xs"><Mail size={14} /> {sup.email}</span>
//                 </div>
//               </td>
//               <td className="p-6 text-xs font-bold text-slate-500 max-w-[200px] line-clamp-2">
//                  <div className="flex gap-2"><MapPin size={14} className="flex-shrink-0" /> {sup.address}</div>
//               </td>
//               <td className="p-6 text-center">
//                 <button onClick={() => onToggle(sup)} className={`px-4 py-2 rounded-xl font-bold text-[10px] uppercase border transition-all ${sup.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
//                   {sup.status === 'Active' ? 'Đang giao dịch' : 'Tạm ngừng'}
//                 </button>
//               </td>
//               <td className="p-6 text-center">
//                 <div className="flex justify-center gap-2">
//                   <button onClick={() => onEdit(sup)} className="p-2.5 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all"><Edit3 size={18} /></button>
//                   <button onClick={() => onDelete(sup._id)} className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
//                 </div>
//               </td>
//             </tr>
//           )) : (
//             <tr><td colSpan={5} className="p-20 text-center text-slate-300 font-bold uppercase text-xs tracking-widest">Chưa có dữ liệu</td></tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };
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
  if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />;

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
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden font-sans">
      <table className="w-full text-left border-collapse table-fixed"> {/* Thêm table-fixed để kiểm soát tỉ lệ tuyệt đối */}
        <thead className="bg-slate-50/80 border-b border-slate-100">
          <tr className="text-slate-700 font-bold text-[14px] uppercase tracking-widest">
            <th className="p-6 w-[25%]">Nhà cung cấp</th>
            <th className="p-6 w-[20%]">Liên hệ</th>
            <th className="p-6 w-[40%]">Địa chỉ</th> {/* Ưu tiên rộng nhất */}
            <th className="p-6 w-[15%] text-center">Thao tác</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-slate-50">
          {suppliers && suppliers.length > 0 ? (
            suppliers.map((sup) => (
              <tr key={sup._id} className="hover:bg-slate-50/50 transition-colors group">
                {/* 1. Tên */}
                <td className="p-6 font-black text-slate-900 text-[15px] truncate">
                  {sup.name}
                </td>
                
                {/* 2. Liên hệ */}
                <td className="p-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-600 text-sm font-bold">
                      <Phone size={14} className="text-indigo-500" /> {sup.phone}
                    </div>
                    {sup.email && (
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] font-semibold truncate">
                        <Mail size={13} /> {sup.email}
                      </div>
                    )}
                  </div>
                </td>

                {/* 3. Địa chỉ (Hiển thị rõ ràng, cho phép xuống dòng nếu quá dài) */}
                <td className="p-6">
                  <div className="flex items-start gap-2 text-slate-500 text-sm font-bold leading-relaxed">
                    <MapPin size={15} className="mt-0.5 flex-shrink-0 text-slate-400" />
                    <span className="break-words">{sup.address}</span>
                  </div>
                </td>
                
                {/* 4. Thao tác (Căn giữa hoàn hảo) */}
                <td className="p-6 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleQuickToggle(sup)}
                      className={`p-2 rounded-xl border transition-all active:scale-90 ${
                        sup.status === 'Active' 
                        ? "text-emerald-500 bg-white border-slate-100 hover:border-emerald-200 hover:bg-emerald-50" 
                        : "text-amber-500 bg-white border-slate-100 hover:border-amber-200 hover:bg-amber-50"
                      }`}
                      title="Trạng thái"
                    >
                      {sup.status === 'Active' ? <Eye size={17} strokeWidth={2.5} /> : <EyeOff size={17} strokeWidth={2.5} />}
                    </button>

                    <button 
                      onClick={() => onEdit(sup)}
                      className="p-2 text-indigo-500 bg-white border border-slate-100 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 rounded-xl transition-all active:scale-90"
                      title="Sửa"
                    >
                      <Edit3 size={17} strokeWidth={2.5} />
                    </button>

                    <button 
                      onClick={() => onDelete(sup._id)}
                      className="p-2 text-rose-500 bg-white border border-slate-100 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                      title="Xóa"
                    >
                      <Trash2 size={17} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-24 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="p-4 bg-slate-50 rounded-full text-slate-200">
                    <Building2 size={40} />
                  </div>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Trống dữ liệu</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};