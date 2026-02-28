
// "use client";
// import React, { useEffect, useState } from "react";
// import { X, FolderPlus, Edit3, Loader2 } from "lucide-react";
// import { ICategory, CreateCategoryPayload } from "../../category.types";
// import toast from "react-hot-toast";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   initialData: ICategory | null;
//   onSubmit: (data: CreateCategoryPayload) => Promise<void>;
// }

// // Cấu hình Style thông báo Luxury
// const toastStyle = {
//   borderRadius: '20px',
//   background: '#0F172A',
//   color: '#fff',
//   fontWeight: '900',
//   fontSize: '12px',
//   letterSpacing: '0.1em',
//   textTransform: 'uppercase' as const,
//   border: '1px solid #C5A059',
// };

// export const AddCategoryModal = ({ isOpen, onClose, initialData, onSubmit }: Props) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState<"Active" | "Hidden">("Active");
//   const [loading, setLoading] = useState(false); // Trạng thái đợi API

//   useEffect(() => {
//     if (initialData && isOpen) {
//       setName(initialData.name);
//       setDescription(initialData.description || "");
//       setStatus(initialData.status);
//     } else if (!initialData) {
//       setName("");
//       setDescription("");
//       setStatus("Active");
//     }
//   }, [initialData, isOpen]);

//   const handleLocalSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!name.trim()) {
//       toast.error("Vui lòng nhập tên danh mục!", { style: toastStyle });
//       return;
//     }

//     setLoading(true);
    
//     // Sử dụng toast.promise để tạo hiệu ứng chuyên nghiệp
//     const savePromise = onSubmit({
//       name: name.trim(),
//       description: description.trim(),
//       status: status
//     });

//     toast.promise(savePromise, {
//       loading: 'Đang xử lý dữ liệu...',
//       success: () => {
//         onClose(); // Lưu xong tự đóng modal
//         return initialData ? "Cập nhật thành công!" : "Đã thêm danh mục mới!";
//       },
//       error: "Có lỗi xảy ra, vui lòng thử lại.",
//     }, { style: toastStyle });

//     try {
//       await savePromise;
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   const isEdit = !!initialData;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-300">
//       <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-[#EFE7D3]">
        
//         {/* Header */}
//         <div className="px-10 py-8 flex justify-between items-center border-b border-[#EFE7D3]">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-[#FBF7EE] text-[#C5A059] rounded-2xl shadow-sm border border-[#EFE7D3]">
//               {isEdit ? <Edit3 size={26} strokeWidth={2.5} /> : <FolderPlus size={26} strokeWidth={2.5} />}
//             </div>
//             <h2 className="text-[28px] font-black text-[#0F172A] tracking-tight uppercase">
//               {isEdit ? "Chỉnh sửa" : "Thêm mới"}
//             </h2>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="p-2 text-slate-400 hover:text-[#C5A059] hover:bg-[#FBF7EE] rounded-xl transition-all"
//           >
//             <X size={28} strokeWidth={3} />
//           </button>
//         </div>

//         <form className="p-10 space-y-9" onSubmit={handleLocalSubmit}>
//           {/* Tên danh mục */}
//           <div className="space-y-3">
//             <label className="block text-[13px] font-black text-[#C5A059] uppercase tracking-[0.2em] ml-1">
//               Tên danh mục <span className="text-red-500">*</span>
//             </label>
//             <input
//               disabled={loading}
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Ví dụ: ĐÈN CHÙM PHA LÊ"
//               className="w-full h-16 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#0F172A] text-[16px] placeholder:text-slate-300 focus:border-[#C5A059] focus:bg-white transition-all uppercase tracking-wide disabled:opacity-50"
//             />
//           </div>

//           {/* Mô tả */}
//           <div className="space-y-3">
//             <label className="block text-[13px] font-black text-[#C5A059] uppercase tracking-[0.15em] ml-1">
//               Mô tả ngắn gọn
//             </label>
//             <textarea
//               disabled={loading}
//               rows={3}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="NHẬP MÔ TẢ CHO NHÓM SẢN PHẨM..."
//               className="w-full p-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#0F172A] text-[15px] placeholder:text-slate-300 focus:border-[#C5A059] focus:bg-white transition-all resize-none tracking-tight disabled:opacity-50"
//             />
//           </div>

//           {/* Trạng thái */}
//           <div className="space-y-3">
//             <label className="block text-[13px] font-black text-[#C5A059] uppercase tracking-[0.15em] ml-1">
//               Trạng thái hiển thị
//             </label>
//             <div className="relative">
//               <select
//                 disabled={loading}
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value as "Active" | "Hidden")}
//                 className="w-full h-16 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#0F172A] text-[15px] appearance-none cursor-pointer focus:border-[#C5A059] focus:bg-white transition-all uppercase tracking-widest disabled:opacity-50"
//               >
//                 <option value="Active">ĐANG HOẠT ĐỘNG (HIỂN THỊ)</option>
//                 <option value="Hidden">TẠM ẨN KHỎI WEBSITE</option>
//               </select>
//               <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A059]">
//                 <svg width="14" height="10" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="3"><path d="M1 1l5 5 5-5" /></svg>
//               </div>
//             </div>
//           </div>

//           {/* Footer - Buttons */}
//           <div className="flex gap-5 pt-6">
//             <button
//               type="button"
//               disabled={loading}
//               onClick={onClose}
//               className="flex-1 h-16 bg-white border border-[#EFE7D3] text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[13px] hover:bg-[#FBF7EE] transition-all active:scale-95 disabled:opacity-50"
//             >
//               Hủy bỏ
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 h-16 bg-gradient-to-tr from-[#C5A059] to-[#E0C27C] text-white rounded-2xl font-black uppercase tracking-widest text-[13px] shadow-xl shadow-yellow-200/40 hover:from-[#B99645] hover:to-[#D4B26A] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:translate-y-0"
//             >
//               {loading && <Loader2 className="animate-spin" size={20} />}
//               {isEdit ? "Cập nhật" : "Lưu danh mục"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
"use client";
import React, { useEffect, useState } from "react";
import { X, FolderPlus, Edit3, Loader2, Check, EyeOff } from "lucide-react";
import { ICategory, CreateCategoryPayload } from "../../category.types";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData: ICategory | null;
  onSubmit: (data: CreateCategoryPayload) => Promise<void>;
}

const toastStyle = {
  borderRadius: '12px',
  background: '#1e293b',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
};

export const AddCategoryModal = ({ isOpen, onClose, initialData, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Hidden">("Active");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && isOpen) {
      setName(initialData.name);
      setDescription(initialData.description || "");
      setStatus(initialData.status);
    } else if (!initialData) {
      setName("");
      setDescription("");
      setStatus("Active");
    }
  }, [initialData, isOpen]);

  const handleLocalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Vui lòng nhập tên danh mục!", { style: toastStyle });
      return;
    }

    setLoading(true);
    const savePromise = onSubmit({
      name: name.trim(),
      description: description.trim(),
      status: status
    });

    toast.promise(savePromise, {
      loading: 'Đang lưu...',
      success: () => {
        onClose();
        return "Thao tác thành công!";
      },
      error: "Lỗi hệ thống!",
    }, { style: toastStyle });

    try { await savePromise; } catch (err) {} finally { setLoading(false); }
  };

  if (!isOpen) return null;
  const isEdit = !!initialData;

  return (
    // Nền tối nhẹ 20%, tuyệt đối không mờ (blur)
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-[440px] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        
        {/* Header - Tối giản */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-slate-50">
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
            {isEdit ? "Sửa danh mục" : "Tạo danh mục mới"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleLocalSubmit}>
          
          {/* Tên danh mục - Chữ đen rõ nét */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">
              Tên danh mục <span className="text-red-500">*</span>
            </label>
            <input
              disabled={loading}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: ĐÈN CHÙM PHA LÊ"
              className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl outline-none font-semibold text-slate-900 text-[15px] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 transition-all placeholder:text-slate-300"
            />
          </div>

          {/* Mô tả */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">
              Mô tả ngắn
            </label>
            <textarea
              disabled={loading}
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả..."
              className="w-full p-4 bg-white border border-slate-300 rounded-xl outline-none font-semibold text-slate-900 text-[15px] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 transition-all resize-none"
            />
          </div>

          {/* Trạng thái - Làm rõ chữ và biểu tượng */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">
              Trạng thái hiển thị
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("Active")}
                className={`h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] transition-all border ${
                  status === "Active" 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                  : "bg-white text-slate-400 border-slate-200"
                }`}
              >
                <Check size={18} className={status === "Active" ? "block" : "hidden"} />
                HIỂN THỊ
              </button>
              
              <button
                type="button"
                onClick={() => setStatus("Hidden")}
                className={`h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] transition-all border ${
                  status === "Hidden" 
                  ? "bg-slate-100 text-slate-700 border-slate-300" 
                  : "bg-white text-slate-400 border-slate-200"
                }`}
              >
                <EyeOff size={18} className={status === "Hidden" ? "block" : "hidden"} />
                TẠM ẨN
              </button>
            </div>
          </div>

          {/* Footer - Nút bấm hành động */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="flex-1 h-12 text-slate-500 font-bold text-[13px] hover:bg-slate-50 rounded-xl transition-all"
            >
              HỦY BỎ
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-[1.5] h-12 bg-indigo-600 text-white rounded-xl font-bold text-[13px] shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                isEdit ? "CẬP NHẬT DỮ LIỆU" : "XÁC NHẬN LƯU"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
