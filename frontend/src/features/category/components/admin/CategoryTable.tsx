

// "use client";
// import React from "react";
// import { Edit3, Trash2, Eye, EyeOff, Folder } from "lucide-react";
// import { ICategory } from "../../category.types";
// import toast from "react-hot-toast";

// interface CategoryTableProps {
//   categories: ICategory[] | null;
//   loading: boolean;
//   onEdit: (category: ICategory) => void;
//   onToggleStatus: (category: ICategory) => Promise<void>;
// }

// export const CategoryTable = ({ categories, loading, onEdit, onToggleStatus }: CategoryTableProps) => {
//   if (loading) return <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />;

//   const handleQuickToggle = async (cat: ICategory) => {
//     const promise = onToggleStatus(cat);
//     const [selectedImg, setSelectedImg] = React.useState<string | null>(null);

//     toast.promise(promise, {
//       loading: 'Đang cập nhật...',
//       success: `Đã chuyển sang ${cat.status === 'Active' ? 'ẨN' : 'HIỂN THỊ'}`,
//       error: 'Lỗi cập nhật trạng thái.',
//     }, {
//       style: {
//         borderRadius: '12px',
//         background: '#1e293b',
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: '13px'
//       },
//     });
//   };

//   function setSelectedImg(image: string | undefined): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden font-sans">
//       <table className="w-full text-left border-collapse">
//         <thead className="bg-slate-100 border-b border-slate-200">
//           <tr className="text-[#001529] font-black text-[15px] ">
//             <th className="p-6  ">Ảnh</th>
//             <th className="p-6">Tên danh mục</th>
//             <th className="p-6 text-center">Trạng thái</th>
//             <th className="p-6 text-center">Số lượng</th>
//             <th className="p-6 text-center">Thao tác</th>
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-slate-50">
//           {categories && categories.length > 0 ? (
//             categories.map((cat) => (
//               <tr key={cat._id} className="hover:bg-slate-50/50 transition-colors group">
//                 <td className="p-6 text-center">
//                   <div
//                     className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 cursor-zoom-in hover:scale-110 transition-transform"
//                     onClick={() => setSelectedImg(cat.image)}
//                   >
//                     {cat.image ? (
//                       <img src={cat.image} alt="" className="w-full h-full object-cover" />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-slate-300"><Layers size={16} /></div>
//                     )}
//                   </div>
//                 </td>

//                 <td className="p-6 font-bold text-slate-800 text-[15px]">
//                   {cat.name}
//                 </td>

//                 <td className="p-6 text-center">
//                   <div

//                     className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[12px]  transition-all shadow-sm ${cat.status === 'Active'
//                       ? "bg-emerald-50 text-emerald-600  border border-emerald-100"
//                       : "bg-amber-50 text-amber-600  border border-amber-100"
//                       }`}
//                   >
//                     {cat.status === 'Active' ? (
//                       <><Eye size={14} strokeWidth={3} /> Hiển thị</>
//                     ) : (
//                       <><EyeOff size={14} strokeWidth={3} /> Đang ẩn</>
//                     )}
//                   </div>
//                 </td>

//                 <td className="p-6 text-center">
//                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[12px]  bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
//                     {cat.productCount || 0} sản phẩm
//                   </div>
//                 </td>

//                 <td className="p-6 text-center">
//                   <div className="flex justify-center gap-3">
//                     <button
//                       onClick={() => handleQuickToggle(cat)}
//                       title={cat.status === 'Active' ? "Tạm ẩn danh mục này" : "Hiện danh mục này"}
//                       className={`p-2.5 bg-white border border-slate-100 rounded-xl transition-all active:scale-90 hover:shadow-md ${cat.status === 'Active'
//                         ? "text-emerald-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50"
//                         : "text-amber-500 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50"
//                         }`}
//                       title={cat.status === 'Active' ? "Ẩn danh mục" : "Hiện danh mục"}
//                     >
//                       {cat.status === 'Active' ? (
//                         <EyeOff size={18} strokeWidth={2.5} />
//                       ) : (
//                         <Eye size={18} strokeWidth={2.5} />
//                       )}
//                     </button>
//                     {/* NÚT SỬA: Màu Indigo - Sắc nét */}
//                     <button
//                       onClick={() => onEdit(cat)}
//                       title="Chỉnh sửa thông tin"
//                       className="p-2.5 text-indigo-500 bg-white border border-slate-100 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md rounded-xl transition-all active:scale-90"

//                     >
//                       <Edit3 size={18} strokeWidth={2.5} />
//                     </button>

//                   </div>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="p-24 text-center">
//                 <div className="flex flex-col items-center justify-center gap-3">
//                   <div className="p-4 bg-slate-50 rounded-full text-slate-300">
//                     <Folder size={40} strokeWidth={1.5} />
//                   </div>
//                   <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
//                     Chưa có danh mục nào
//                   </p>
//                 </div>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {setSelectedImg && (
//         <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-10 animate-in fade-in duration-200" onClick={() => setSelectedImg(null)}>
//           <img src={setSelectedImg} className="max-w-full max-h-full rounded-3xl shadow-2xl animate-in zoom-in-95" alt="Large" />
//           <p className="absolute bottom-10 text-white font-bold bg-white/10 px-6 py-2 rounded-full backdrop-blur-md">Click bất kỳ đâu để đóng</p>
//         </div>
//     </div>
//   );
// };


"use client";
import React, { useState } from "react"; // 1. Import useState đúng cách
import { Edit3, Eye, EyeOff, Folder, Layers, X } from "lucide-react"; // 2. Thêm Layers và X
import { ICategory } from "../../category.types";
import toast from "react-hot-toast";

interface CategoryTableProps {
  categories: ICategory[] | null;
  loading: boolean;
  onEdit: (category: ICategory) => void;
  onToggleStatus: (category: ICategory) => Promise<void>;
}

export const CategoryTable = ({ categories, loading, onEdit, onToggleStatus }: CategoryTableProps) => {
  // 3. Khai báo state ở cấp cao nhất của Component
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

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
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden font-sans relative">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-100 border-b border-slate-200">
          <tr className="text-[#001529] font-black text-[15px] ">
            <th className="p-6 text-center w-24">Ảnh</th>
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
                {/* Visual Thumbnail Column */}
                <td className="p-6 text-center">
                  <div
                    className="w-12 h-12 mx-auto rounded-xl bg-slate-100 overflow-hidden border border-slate-200 cursor-zoom-in hover:scale-110 transition-transform shadow-sm"
                    onClick={() => cat.image && setSelectedImg(cat.image)}
                  >
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Layers size={18} />
                      </div>
                    )}
                  </div>
                </td>

                <td className="p-6 font-bold text-slate-800 text-[15px]">
                  {cat.name}
                </td>

                <td className="p-6 text-center">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[12px] transition-all shadow-sm ${cat.status === 'Active'
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-amber-50 text-amber-600 border border-amber-100"
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
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[12px] bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
                    {cat.productCount || 0} sản phẩm
                  </div>
                </td>

                <td className="p-6 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleQuickToggle(cat)}
                      // TOOLTIP ở đây
                      title={cat.status === 'Active' ? "Tạm ẩn danh mục này" : "Hiện danh mục này"}
                      className={`p-2.5 bg-white border border-slate-100 rounded-xl transition-all active:scale-90 hover:shadow-md ${cat.status === 'Active'
                          ? "text-emerald-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50"
                          : "text-amber-500 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50"
                        }`}
                    >
                      {cat.status === 'Active' ? (
                        <EyeOff size={18} strokeWidth={2.5} />
                      ) : (
                        <Eye size={18} strokeWidth={2.5} />
                      )}
                    </button>

                    <button
                      onClick={() => onEdit(cat)}
                      // TOOLTIP ở đây
                      title="Chỉnh sửa thông tin"
                      className="p-2.5 text-indigo-500 bg-white border border-slate-100 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md rounded-xl transition-all active:scale-90"
                    >
                      <Edit3 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* colSpan đổi thành 5 vì ta có thêm cột Ảnh */}
              <td colSpan={5} className="p-24 text-center">
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

      {/* 4. MODAL PHÓNG TO ẢNH (Phải sử dụng selectedImg làm điều kiện) */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300 cursor-zoom-out"
          onClick={() => setSelectedImg(null)}
        >
          {/* Container chứa ảnh */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">

            <img
              src={selectedImg}
              // Thay đổi quan trọng: max-w-[95vw] và max-h-[85vh] giúp ảnh chiếm gần hết màn hình
              className="max-w-[95vw] max-h-[82vh] sm:max-h-[85vh] rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 object-contain border-4 border-white/10"
              alt="Large View"
            />

          </div>
        </div>
      )}
    </div>
  );
};