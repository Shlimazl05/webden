

"use client";
import React from "react";
import { Edit3, Trash2, Eye, EyeOff, Folder } from "lucide-react";
import { ICategory } from "../../category.types";
import toast from "react-hot-toast";

interface CategoryTableProps {
  categories: ICategory[] | null;
  loading: boolean;
  onEdit: (category: ICategory) => void;
  onToggleStatus: (category: ICategory) => Promise<void>;
}

export const CategoryTable = ({ categories, loading, onEdit,  onToggleStatus }: CategoryTableProps) => {
  if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />;

  const handleQuickToggle = async (cat: ICategory) => {
    const promise = onToggleStatus(cat);
    
    toast.promise(promise, {
      loading: 'Đang cập nhật...',
      success: `Đã chuyển sang ${cat.status === 'Active' ? 'ẨN' : 'HIỂN THỊ'}`,
      error: 'Lỗi cập nhật trạng thái.',
    }, {
      style: {
        borderRadius: '12px',
        background: '#1e293b',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '13px'
      },
    });
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden font-sans">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-100 border-b border-slate-200">
          <tr className="text-[#001529] font-black text-[15px] ">
            <th className="p-6">Tên danh mục</th>
            <th className="p-6 text-center">Trạng thái</th>
            <th className="p-6 text-center">Số lượng</th>
            <th className="p-6 text-center">Thao tác</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-slate-50">
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-6 font-bold text-slate-800 text-[15px]">
                  {cat.name}
                </td>
                
                <td className="p-6 text-center">
                  <div
                    
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[12px]  transition-all shadow-sm ${
                      cat.status === 'Active' 
                      ? "bg-emerald-50 text-emerald-600  border border-emerald-100" 
                      : "bg-amber-50 text-amber-600  border border-amber-100"
                    }`}
                  >
                    {cat.status === 'Active' ? (
                      <><Eye size={14} strokeWidth={3} /> Hiển thị</>
                    ) : (
                      <><EyeOff size={14} strokeWidth={3} /> Đang ẩn</>
                    )}
                  </div>
                </td>

                <td className="p-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[12px]  bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
                    {cat.productCount || 0} sản phẩm
                  </div>
                </td>

                <td className="p-6 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleQuickToggle(cat)}
                      className={`p-2.5 bg-white border border-slate-100 rounded-xl transition-all active:scale-90 hover:shadow-md ${
                        cat.status === 'Active' 
                        ? "text-emerald-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50" 
                        : "text-amber-500 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50"
                      }`}
                      title={cat.status === 'Active' ? "Ẩn danh mục" : "Hiện danh mục"}
                    >
                      {cat.status === 'Active' ? (
                        <EyeOff size={18} strokeWidth={2.5} />
                      ) : (
                        <Eye size={18} strokeWidth={2.5} />
                      )}
                    </button>                                                   
                    {/* NÚT SỬA: Màu Indigo - Sắc nét */}
                    <button 
                      onClick={() => onEdit(cat)}
                      className="p-2.5 text-indigo-500 bg-white border border-slate-100 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md rounded-xl transition-all active:scale-90"
                      title="Chỉnh sửa"
                    >
                      <Edit3 size={18} strokeWidth={2.5} />
                    </button>
  
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-24 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                    <Folder size={40} strokeWidth={1.5} />
                  </div>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                    Chưa có danh mục nào
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};