
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { X, FolderPlus, Edit3, Loader2, Check, EyeOff } from "lucide-react";
// import { ICategory, CreateCategoryPayload } from "../../category.types";
// import toast from "react-hot-toast";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   initialData: ICategory | null;
//   onSubmit: (data: CreateCategoryPayload) => Promise<void>;
// }

// const toastStyle = {
//   borderRadius: '12px',
//   background: '#1e293b',
//   color: '#fff',
//   fontSize: '14px',
//   fontWeight: '600',
// };

// export const AddCategoryModal = ({ isOpen, onClose, initialData, onSubmit }: Props) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState<"Active" | "Hidden">("Active");
//   const [loading, setLoading] = useState(false);

//   // State xử lý ảnh
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (initialData && isOpen) {
//       setName(initialData.name);
//       setDescription(initialData.description || "");
//       setStatus(initialData.status);
//       setImagePreview(initialData.image || null);
//     } else if (!initialData) {
//       setName("");
//       setDescription("");
//       setStatus("Active");
//       setImagePreview(null);
//     }
//   }, [initialData, isOpen]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleLocalSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       toast.error("Vui lòng nhập tên danh mục!", { style: toastStyle });
//       return;
//     }

//     setLoading(true);
//     await onSubmit({ name, description, status, image: imagePreview || "" });
//           setLoading(false);
//     };

//     toast.promise(savePromise, {
//       loading: 'Đang lưu...',
//       success: () => {
//         onClose();
//         return "Thao tác thành công!";
//       },
//       error: "Lỗi hệ thống!",
//     }, { style: toastStyle });

//     try { await savePromise; } catch (err) {} finally { setLoading(false); }
//   };

//   if (!isOpen) return null;
//   const isEdit = !!initialData;

//   return (
//     // Nền tối nhẹ 20%, tuyệt đối không mờ (blur)
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 animate-in fade-in duration-200">
      
//       <div className="bg-white w-full max-w-[440px] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        
//         {/* Header - Tối giản */}
//         <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-slate-50">
//           <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
//             {isEdit ? "Sửa danh mục" : "Tạo danh mục mới"}
//           </h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
//           >
//             <X size={22} strokeWidth={2.5} />
//           </button>
//         </div>

//         <form className="p-8 space-y-6" onSubmit={handleLocalSubmit}>
          
//           {/* Tên danh mục - Chữ đen rõ nét */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">
//               Tên danh mục <span className="text-red-500">*</span>
//             </label>
//             <input
//               disabled={loading}
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="VD: ĐÈN CHÙM PHA LÊ"
//               className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl outline-none font-semibold text-slate-900 text-[15px] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 transition-all placeholder:text-slate-300"
//             />
//           </div>

//           {/* Mô tả */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">
//               Mô tả ngắn
//             </label>
//             <textarea
//               disabled={loading}
//               rows={2}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Nhập mô tả..."
//               className="w-full p-4 bg-white border border-slate-300 rounded-xl outline-none font-semibold text-slate-900 text-[15px] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 transition-all resize-none"
//             />
//           </div>

//           {/* Them anh dai dien */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Link Ảnh đại diện</label>
//             <input
//               disabled={loading}
//               type="text"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               placeholder="https://example.com/anh-den.jpg"
//               className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl outline-none font-semibold text-[15px] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 transition-all placeholder:font-normal placeholder:text-slate-300"
//             />
//           </div>

//           {/* Trạng thái - Làm rõ chữ và biểu tượng */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">
//               Trạng thái hiển thị
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => setStatus("Active")}
//                 className={`h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] transition-all border ${
//                   status === "Active" 
//                   ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
//                   : "bg-white text-slate-400 border-slate-200"
//                 }`}
//               >
//                 <Check size={18} className={status === "Active" ? "block" : "hidden"} />
//                 HIỂN THỊ
//               </button>
              
//               <button
//                 type="button"
//                 onClick={() => setStatus("Hidden")}
//                 className={`h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] transition-all border ${
//                   status === "Hidden" 
//                   ? "bg-slate-100 text-slate-700 border-slate-300" 
//                   : "bg-white text-slate-400 border-slate-200"
//                 }`}
//               >
//                 <EyeOff size={18} className={status === "Hidden" ? "block" : "hidden"} />
//                 TẠM ẨN
//               </button>
//             </div>
//           </div>

//           {/* Footer - Nút bấm hành động */}
//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               disabled={loading}
//               onClick={onClose}
//               className="flex-1 h-12 text-slate-500 font-bold text-[13px] hover:bg-slate-50 rounded-xl transition-all"
//             >
//               HỦY BỎ
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-[1.5] h-12 bg-indigo-600 text-white rounded-xl font-bold text-[13px] shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin" size={18} />
//               ) : (
//                 isEdit ? "CẬP NHẬT DỮ LIỆU" : "XÁC NHẬN LƯU"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, Loader2, Check, EyeOff, UploadCloud } from "lucide-react"; // Đã bỏ import thừa
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

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData && isOpen) {
      setName(initialData.name);
      setDescription(initialData.description || "");
      setStatus(initialData.status);
      setImagePreview(initialData.image || null);
    } else if (!initialData) {
      setName("");
      setDescription("");
      setStatus("Active");
      setImagePreview(null);
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLocalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Vui lòng nhập tên danh mục!", { style: toastStyle });
      return;
    }

    setLoading(true);
    const payload: CreateCategoryPayload = {
      name: name.trim(),
      description: description.trim(),
      status: status,
      image: imagePreview || "" 
    };

    const savePromise = onSubmit(payload);

    toast.promise(savePromise, {
      loading: 'Đang lưu...',
      success: () => {
        onClose();
        return "Thao tác thành công!";
      },
      error: "Lỗi hệ thống!",
    }, { style: toastStyle });

    try { 
      await savePromise; 
    } catch (err) {
      console.error(err);
    } finally { 
      setLoading(false); 
    }
  };

  if (!isOpen) return null;
  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[680px] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        
        {/* Header */}
        <div className="px-10 pt-10 pb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
            {isEdit ? "Sửa danh mục" : "Tạo danh mục mới"}
          </h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        <form className="p-10 space-y-8" onSubmit={handleLocalSubmit}>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* CỘT TRÁI: UPLOAD ẢNH */}
            <div className="space-y-3">
               <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">
                 Ảnh đại diện <span className="text-red-500">*</span>
               </label>
               <div 
                 onClick={() => !loading && fileInputRef.current?.click()}
                 className={`w-48 h-48 rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center transition-all overflow-hidden relative group ${!loading ? 'cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30' : 'cursor-not-allowed'}`}
               >
                 {imagePreview ? (
                   <>
                     <img src={imagePreview} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <UploadCloud className="text-white" size={32} />
                     </div>
                   </>
                 ) : (
                   <div className="flex flex-col items-center gap-2 text-slate-400">
                     <UploadCloud size={40} strokeWidth={1.5} />
                     <span className="text-[10px] font-bold uppercase tracking-wider">Tải ảnh lên</span>
                   </div>
                 )}
                 <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
               </div>
            </div>

            {/* CỘT PHẢI: THÔNG TIN */}
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Tên danh mục <span className="text-red-500">*</span></label>
                <input
                  disabled={loading}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: ĐÈN CHÙM"
                  className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl outline-none font-semibold text-slate-900 text-[15px] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Mô tả ngắn</label>
                <textarea
                  disabled={loading}
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả về loại danh mục này..."
                  className="w-full p-4 bg-white border border-slate-300 rounded-xl outline-none font-semibold text-slate-900 text-[15px] focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* DÒNG CUỐI: TRẠNG THÁI & ACTION */}
          <div className="flex flex-col sm:flex-row items-end justify-between gap-6 pt-6 border-t border-slate-50">
            <div className="w-full sm:w-64 space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">Trạng thái</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("Active")}
                  className={`h-11 rounded-xl flex items-center justify-center gap-2 font-bold text-[11px] border transition-all ${status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-white text-slate-400 border-slate-200"}`}
                >
                  <Check size={16} strokeWidth={3} className={status === "Active" ? "block" : "hidden"} /> HIỂN THỊ
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("Hidden")}
                  className={`h-11 rounded-xl flex items-center justify-center gap-2 font-bold text-[11px] border transition-all ${status === "Hidden" ? "bg-slate-100 text-slate-700 border-slate-300" : "bg-white text-slate-400 border-slate-200"}`}
                >
                  <EyeOff size={16} strokeWidth={3} className={status === "Hidden" ? "block" : "hidden"} /> TẠM ẨN
                </button>
              </div>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button type="button" onClick={onClose} disabled={loading} className="flex-1 sm:px-6 h-12 text-slate-400 font-bold text-[13px] hover:text-slate-600 transition-all">HỦY BỎ</button>
              <button type="submit" disabled={loading} className="flex-[1.5] sm:px-10 h-12 bg-indigo-600 text-white rounded-xl font-bold text-[13px] shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={18} /> : (isEdit ? "CẬP NHẬT" : "LƯU")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
