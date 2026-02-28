

"use client";
import { Edit3, Trash2 } from "lucide-react";
import { ICategory } from "../category.types";

interface CategoryTableProps {
  categories: ICategory[] | null;
  loading: boolean;
  onEdit: (category: ICategory) => void;
  onDelete: (id: string) => void;
}

export const CategoryTable = ({ categories, loading, onEdit, onDelete }: CategoryTableProps) => {
  if (loading) return <div className="w-full h-40 bg-slate-50 animate-pulse rounded-[2.5rem]" />;

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden font-sans">
      <table className="w-full text-left">
        {/* THAY ĐỔI TẠI ĐÂY: Tô nền xám rõ hơn và cho chữ đậm nét */}
        <thead className="bg-slate-100 border-b border-slate-200">
          <tr className="text-[#001529] font-black text-[15px] uppercase tracking-[0.1em]">
            <th className="p-6 whitespace-nowrap">Tên danh mục</th>
            <th className="p-6 text-center whitespace-nowrap">Số lượng đèn</th>
            <th className="p-6 text-center whitespace-nowrap">Thao tác</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-slate-50">
          {categories?.map((cat) => (
            <tr key={cat._id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="p-6 uppercase font-black text-[#001529] text-sm">
                {cat.name}
              </td>
              <td className="p-6 text-center">
                <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black">
                  {cat.productCount || 0} sản phẩm
                </span>
              </td>
              <td className="p-6 text-center">
                <div className="flex justify-center gap-3">
                  <button 
                    onClick={() => onEdit(cat)}
                    className="p-2.5 text-emerald-500 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all hover:scale-110"
                  >
                    <Edit3 size={18} strokeWidth={2.5} />
                  </button>
                  <button 
                    onClick={() => onDelete(cat._id)}
                    className="p-2.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all hover:scale-110"
                  >
                    <Trash2 size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};