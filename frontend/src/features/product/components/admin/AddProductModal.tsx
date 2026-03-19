
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { X, Camera, Save, Package, FileText, Info, Loader2, ImagePlus, Trash2, Plus, UploadCloud } from "lucide-react";
// import toast from "react-hot-toast";
// import { IProduct } from "../../product.types";
// import { productApi } from "../../api/product.admin.api";

// import toast from "react-hot-toast";
// import { ProductForm } from "./ProductForm";
// import { useState } from "react";
// import { productApi } from "../../api/product.admin.api";

// interface ICategory { _id: string; name: string; }
// interface Props {
//   isOpen: boolean; onClose: () => void; initialData?: IProduct | null;
//   categories?: ICategory[]; refreshData?: () => void;
// }

// const toastStyle = {
//   borderRadius: '12px', background: '#1e293b', color: '#fff', fontSize: '14px', fontWeight: '700',
// };

// export const AddProductModal = ({ isOpen, onClose, initialData, categories = [], refreshData }: Props) => {
//   const [loading, setLoading] = useState(false);
//   const mainImageRef = useRef<HTMLInputElement>(null);
//   const subImageRef = useRef<HTMLInputElement>(null);

//   const [formData, setFormData] = useState({
//     productCode: "", productName: "", salePrice: 0, stockQuantity: 0,
//     categoryId: "", status: "Active", description: "", imageUrl: "" as any, images: [] as any[] 
//   });

//   const [previews, setPreviews] = useState({ main: "", subs: [] as string[] });

//   useEffect(() => {
//     if (initialData && isOpen) {
//       setFormData({
//         productCode: initialData.productCode, productName: initialData.productName,
//         salePrice: initialData.salePrice, stockQuantity: initialData.stockQuantity,
//         categoryId: typeof initialData.categoryId === 'string' ? initialData.categoryId : (initialData.categoryId as any)?._id || "",
//         status: initialData.status, description: initialData.specifications?.description || "",
//         imageUrl: initialData.imageUrl || "", images: initialData.images || []
//       });
//       setPreviews({ main: initialData.imageUrl || "", subs: initialData.images || [] });
//     } else if (!initialData) {
//       setFormData({
//         productCode: "", productName: "", salePrice: 0, stockQuantity: 0,
//         categoryId: "", status: "Active", description: "", imageUrl: "", images: []
//       });
//       setPreviews({ main: "", subs: [] });
//     }
//   }, [initialData, isOpen]);

//   // Hàm hỗ trợ chuyển File sang chuỗi Base64 để Backend không bị lỗi "Cast to string"
//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const base64 = await fileToBase64(file);
//       setFormData({ ...formData, imageUrl: base64 });
//       setPreviews({ ...previews, main: base64 });
//     }
//   };

//   const handleSubImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     const base64Promises = files.map(file => fileToBase64(file));
//     const base64Images = await Promise.all(base64Promises);
//     setFormData({ ...formData, images: [...formData.images, ...base64Images] });
//     setPreviews({ ...previews, subs: [...previews.subs, ...base64Images] });
//   };

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.productName.trim()) return toast.error("Vui lòng nhập tên sản phẩm");
//     if (!formData.categoryId) return toast.error("Vui lòng chọn danh mục");
//     if (!formData.imageUrl) return toast.error("Vui lòng tải ảnh chính");

//     setLoading(true);

//     const payload: any = {
//       productName: formData.productName,
//       salePrice: Number(formData.salePrice),
//       stockQuantity: Number(formData.stockQuantity),
//       categoryId: formData.categoryId,
//       status: formData.status,
//       imageUrl: formData.imageUrl,
//       images: formData.images,
//       specifications: { description: formData.description }
//     };

//     // CHỈ gửi productCode nếu là đang CHỈNH SỬA
//     if (isEdit) {
//       payload.productCode = formData.productCode;
//     }

//     const promise = initialData 
//       ? productApi.updateProduct(initialData._id, payload as any) 
//       : productApi.createProduct(payload as any);

//     toast.promise(promise, {
//       loading: 'Đang xử lý dữ liệu...',
//       success: () => { if (refreshData) refreshData(); onClose(); return "THÀNH CÔNG!"; },
//       error: (err) => err.response?.data?.message || "LỖI HỆ THỐNG!",
//     }, { style: toastStyle });

//     try { await promise; } catch (err) {} finally { setLoading(false); }
//   };

//   if (!isOpen) return null;
//   const isEdit = !!initialData;

//   return (
//     <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
//       <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-in zoom-in-95 duration-200">
        
//         {/* HEADER */}
//         <div className="px-8 py-5 flex justify-between items-center border-b border-slate-50 bg-white">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
//               <Package size={20} strokeWidth={2.5} />
//             </div>
//             <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
//               {isEdit ? `Chỉnh sửa: ${formData.productCode}` : "Thêm sản phẩm mới"}
//             </h2>
//           </div>
//           <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-900 transition-all hover:bg-slate-50 rounded-full">
//             <X size={24} strokeWidth={3} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
//           <div className="grid grid-cols-12 gap-10">
            
//             {/* CỘT TRÁI: UPLOAD HÌNH ẢNH */}
//             <div className="col-span-12 lg:col-span-4 space-y-6">
//               <div>
//                 <label className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-3 block">Ảnh sản phẩm chính *</label>
//                 <div 
//                   onClick={() => mainImageRef.current?.click()}
//                   className="aspect-square w-full max-w-[260px] mx-auto bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden relative group hover:border-indigo-400 transition-all cursor-pointer shadow-inner"
//                 >
//                   {previews.main ? (
//                     <img src={previews.main} className="w-full h-full object-cover" alt="Main" />
//                   ) : (
//                     <div className="text-center p-4">
//                       <UploadCloud size={40} className="mx-auto mb-2 text-slate-300 group-hover:text-indigo-400 transition-colors" />
//                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Bấm để tải ảnh</p>
//                     </div>
//                   )}
//                   <input type="file" ref={mainImageRef} hidden accept="image/*" onChange={handleMainImageChange} />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-3 block">Ảnh bổ sung</label>
//                 <div className="grid grid-cols-3 gap-2">
//                   {previews.subs.map((img, index) => (
//                     <div key={index} className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative group border border-slate-200">
//                       <img src={img} className="w-full h-full object-cover" alt="Sub" />
//                       <button type="button" onClick={() => {
//                          const newSubs = previews.subs.filter((_, i) => i !== index);
//                          const newImgs = formData.images.filter((_, i) => i !== index);
//                          setPreviews({...previews, subs: newSubs});
//                          setFormData({...formData, images: newImgs});
//                       }} className="absolute inset-0 bg-rose-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all"><Trash2 size={16} /></button>
//                     </div>
//                   ))}
//                   <button type="button" onClick={() => subImageRef.current?.click()} className="aspect-square bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-white transition-all">
//                     <Plus size={20} strokeWidth={3} />
//                     <span className="text-[9px] font-black uppercase mt-1">Thêm</span>
//                   </button>
//                   <input type="file" ref={subImageRef} hidden multiple accept="image/*" onChange={handleSubImagesChange} />
//                 </div>
//               </div>
//             </div>

//             {/* CỘT PHẢI: THÔNG TIN CHI TIẾT */}
//             <div className="col-span-12 lg:col-span-8 space-y-6">
//               <div className="grid grid-cols-2 gap-5">
//                 <div className="col-span-2">
//                   <label className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-1.5 block">Tên sản phẩm *</label>
//                   <input 
//                     type="text" value={formData.productName}
//                     onChange={(e) => setFormData({...formData, productName: e.target.value})}
//                     placeholder="Ví dụ: Đèn chùm pha lê phòng khách..."
//                     className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-indigo-700 text-sm focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-1.5 block">Chọn danh mục</label>
//                   <select 
//                     value={formData.categoryId}
//                     onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
//                     className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-indigo-700 text-sm focus:border-indigo-600 cursor-pointer"
//                   >
//                     <option value="">-- CHỌN DANH MỤC --</option>
//                     {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name.toUpperCase()}</option>)}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-1.5 block">Giá bán (VNĐ)</label>
//                   <input 
//                     type="number" 
//                     min="0"
//                     value={formData.salePrice === 0 ? "" : formData.salePrice}
//                     onChange={(e) => setFormData({...formData, salePrice: e.target.value === "" ? 0 : Number(e.target.value)})}
//                     placeholder="Nhập giá bán..."
//                     className="w-full h-11 px-4 bg-white border-2 border-slate-100 rounded-xl outline-none font-black text-rose-600 text-base focus:border-rose-400 transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-1.5 block">Số lượng kho</label>
//                   <input 
//                     type="number" 
//                     min="0" 
//                     value={formData.stockQuantity} // Luôn giữ 0 nếu không nhập gì
//                     onChange={(e) => setFormData({...formData, stockQuantity: Number(e.target.value)})}
//                     className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-indigo-700 text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-3 block">Chế độ hiển thị</label>
//                 <div className="flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setFormData({...formData, status: 'Active'})}
//                     className={`flex-1 h-11 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${formData.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-500 shadow-sm' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
//                   >
//                     Đang bán
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setFormData({...formData, status: 'Hidden'})}
//                     className={`flex-1 h-11 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${formData.status === 'Hidden' ? 'bg-slate-100 text-slate-700 border-slate-400 shadow-sm' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
//                   >
//                     Tạm ẩn
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-2 block">Thông số & Mô tả</label>
//                 <textarea 
//                   rows={3} value={formData.description}
//                   onChange={(e) => setFormData({...formData, description: e.target.value})}
//                   placeholder="Nhập thông số kỹ thuật (công suất, kích thước...)"
//                   className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-800 text-sm focus:bg-white focus:border-indigo-600 transition-all resize-none shadow-inner"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="px-8 py-5 border-t border-slate-50 bg-slate-50/30 flex justify-end gap-3">
//           <button type="button" onClick={onClose} disabled={loading} className="px-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-950 transition-all">Hủy bỏ</button>
//           <button 
//             onClick={handleSave} disabled={loading}
//             className="h-11 px-10 bg-indigo-600 text-white rounded-xl font-black uppercase text-[12px] tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2"
//           >
//             {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
//             {isEdit ? "CẬP NHẬT" : "LƯU VÀO KHO"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { productApi } from "@/features/product/api/product.admin.api";
import { ProductForm } from "./ProductForm"; // Giả định bạn đã tách Form ra

export const AddProductModal = ({ isOpen, onClose, categories, refreshData }: any) => {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData: any) => {
    setLoading(true);
    try {
      await productApi.createProduct({
        ...formData,
        specifications: { description: formData.description }
      });
      toast.success("Thêm sản phẩm thành công!");
      if (refreshData) refreshData();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi khi thêm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    /* Lớp nền mờ (Backdrop) */
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">

      {/* 
          KHUNG MODAL CHÍNH:
          - max-h-[90vh]: Giới hạn chiều cao tối đa bằng 90% màn hình.
          - flex flex-col: Để chia Header, Body, Footer theo chiều dọc.
          - overflow-hidden: Để các góc rounded không bị nội dung bên trong tràn qua.
      */}
      <div className="bg-white w-full max-w-5xl max-h-[90vh] flex flex-col rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

        {/* 
            Gọi ProductForm: 
            Lưu ý: Bạn phải đảm bảo bên trong ProductForm, phần nội dung nhập liệu 
            được bọc bởi một thẻ div có class 'flex-1 overflow-y-auto'.
        */}
        <ProductForm
          isEdit={false}
          loading={loading}
          onSubmit={handleCreate}
          onClose={onClose}
          categories={categories}
        />

      </div>
    </div>
  );
};