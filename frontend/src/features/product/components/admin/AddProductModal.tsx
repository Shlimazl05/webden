
// "use client";
// import React, { useState } from "react";
// import { X, Camera, Plus, Save, Package, FileText, Trash2 } from "lucide-react";
// import { IProduct } from "../../product.types";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   initialData?: IProduct | null;
// }

// export const AddProductModal = ({ isOpen, onClose, initialData }: Props) => {
//   const [images, setImages] = useState<string[]>([]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#001529]/40 backdrop-blur-sm animate-in fade-in duration-300">
//       <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-[#EFE7D3]">
        
//         {/* HEADER */}
//         <div className="px-10 py-5 flex justify-between items-center border-b border-[#EFE7D3] bg-[#FBF7EE]/50">
//           <div className="flex items-center gap-4">
//             <div className="p-2.5 bg-white text-[#C5A059] rounded-2xl shadow-sm border border-[#EFE7D3]">
//               <Package size={24} strokeWidth={2.5} />
//             </div>
//             <h2 className="text-xl font-black text-[#001529] uppercase tracking-tighter">
//               {initialData ? "Chỉnh sửa sản phẩm" : "Thêm đèn mới vào kho"}
//             </h2>
//           </div>
//           <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 transition-all">
//             <X size={28} strokeWidth={3} />
//           </button>
//         </div>

//         {/* BODY (Scrollable) */}
//         <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
//             {/* CỘT TRÁI: QUẢN LÝ HÌNH ẢNH (Đã chỉnh vừa đủ cửa sổ) */}
//             <div className="lg:col-span-5 flex flex-col gap-4">
//               <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">
//                 Hình ảnh sản phẩm
//               </label>
              
//               {/* Khung ảnh chính: Cố định chiều cao h-[380px] để không bị lấn xuống */}
//               <div className="relative h-[380px] w-full bg-[#FBF7EE] rounded-[2rem] border-2 border-dashed border-[#EFE7D3] flex flex-col items-center justify-center overflow-hidden shadow-inner group">
//                 {images.length > 0 ? (
//                   <img src={images[0]} className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm text-[#EFE7D3]">
//                       <Camera size={32} />
//                     </div>
//                     <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Chưa có ảnh</p>
//                   </div>
//                 )}
//                 <button className="absolute bottom-4 right-4 p-3 bg-[#C5A059] text-white rounded-xl shadow-lg hover:scale-110 transition-all">
//                   <Plus size={20} strokeWidth={3} />
//                 </button>
//               </div>

//               {/* Danh sách ảnh phụ nhỏ gọn */}
//               <div className="grid grid-cols-5 gap-2">
//                 {[1, 2, 3, 4, 5].map((_, i) => (
//                   <div key={i} className="aspect-square bg-[#FBF7EE] rounded-xl border border-[#EFE7D3] flex items-center justify-center cursor-pointer hover:border-[#C5A059] transition-all">
//                     <Plus size={16} className="text-[#EFE7D3]" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* CỘT PHẢI: THÔNG TIN CHI TIẾT */}
//             <div className="lg:col-span-7 space-y-6">
              
//               <div className="space-y-2">
//                 <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Tên sản phẩm</label>
//                 <input type="text" placeholder="ĐÈN CHÙM PHA LÊ LUXURY" className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#001529] focus:bg-white transition-all uppercase text-sm" />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Mã sản phẩm</label>
//                   <input type="text" placeholder="SKU-001" className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#001529] transition-all uppercase text-sm" />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Giá bán (VNĐ)</label>
//                   <input type="number" placeholder="0" className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-red-600 transition-all text-sm" />
//                 </div>
//               </div>

//               {/* THAY THẾ: NHẬP MÔ TẢ SẢN PHẨM */}
//               <div className="bg-[#FBF7EE] p-6 rounded-[2rem] border border-[#EFE7D3] space-y-4">
//                 <div className="flex items-center gap-2">
//                   <FileText size={18} className="text-[#C5A059]" />
//                   <h3 className="font-black text-[#001529] uppercase text-[12px] tracking-widest">Mô tả sản phẩm</h3>
//                 </div>
//                 <textarea 
//                   rows={6}
//                   placeholder="Nhập mô tả chi tiết: chất liệu, kích thước, công suất, không gian sử dụng..."
//                   className="w-full p-5 bg-white border border-[#EFE7D3] rounded-2xl outline-none font-semibold text-[#001529] text-sm focus:border-[#C5A059] transition-all resize-none custom-scrollbar"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4 text-sm font-black">
//                 <div className="space-y-2">
//                   <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Số lượng kho</label>
//                   <input type="number" placeholder="10" className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none text-[#001529]" />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Trạng thái</label>
//                   <select className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none text-[#001529] appearance-none cursor-pointer uppercase text-xs">
//                     <option value="Active">ĐANG HOẠT ĐỘNG</option>
//                     <option value="Inactive">TẠM ẨN</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="px-10 py-6 border-t border-[#EFE7D3] bg-[#FBF7EE]/30 flex gap-4">
//           <button onClick={onClose} className="h-14 px-10 bg-white border border-[#EFE7D3] text-slate-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all">
//             Hủy bỏ
//           </button>
//           <button className="h-14 flex-1 bg-gradient-to-tr from-[#C5A059] to-[#E0C27C] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
//             <Save size={18} strokeWidth={2.5} />
//             Lưu sản phẩm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// "use client";
// import React, { useState } from "react";
// import { X, Camera, Plus, Save, Package, FileText, ChevronDown, Hash } from "lucide-react";
// import { IProduct } from "../../product.types";

// interface ICategory {
//   _id: string;
//   name: string;
// }

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   initialData?: IProduct | null;
//   categories?: ICategory[]; // Thêm dấu ? để chấp nhận trường hợp chưa có dữ liệu
// }

// // SỬA TẠI ĐÂY: Thêm = [] để gán giá trị mặc định là mảng rỗng nếu prop bị undefined
// export const AddProductModal = ({ 
//   isOpen, 
//   onClose, 
//   initialData, 
//   categories = [] 
// }: Props) => {
//   const [images, setImages] = useState<string[]>([]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#001529]/40 backdrop-blur-sm animate-in fade-in duration-300">
//       <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-[#EFE7D3]">
        
//         {/* HEADER */}
//         <div className="px-10 py-5 flex justify-between items-center border-b border-[#EFE7D3] bg-[#FBF7EE]/50">
//           <div className="flex items-center gap-4">
//             <div className="p-2.5 bg-white text-[#C5A059] rounded-2xl shadow-sm border border-[#EFE7D3]">
//               <Package size={24} strokeWidth={2.5} />
//             </div>
//             <h2 className="text-xl font-black text-[#001529] uppercase tracking-tighter">
//               {initialData ? "Chỉnh sửa sản phẩm" : "Thêm đèn mới vào kho"}
//             </h2>
//           </div>
//           <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 transition-all">
//             <X size={28} strokeWidth={3} />
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
//             {/* CỘT TRÁI: HÌNH ẢNH */}
//             <div className="lg:col-span-5 flex flex-col gap-4">
//               <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em] flex items-center gap-2">
//                 <Camera size={14} /> Ảnh sản phẩm
//               </label>
              
//               <div className="relative h-[400px] w-full bg-[#FBF7EE] rounded-[2rem] border-2 border-dashed border-[#EFE7D3] flex flex-col items-center justify-center overflow-hidden shadow-inner group">
//                 {images.length > 0 ? (
//                   <img src={images[0]} className="w-full h-full object-cover" alt="Product" />
//                 ) : (
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm text-[#EFE7D3]">
//                       <Camera size={32} />
//                     </div>
//                     <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Chưa có ảnh</p>
//                   </div>
//                 )}
//                 <button className="absolute bottom-4 right-4 p-3 bg-[#C5A059] text-white rounded-xl shadow-lg hover:scale-110 transition-all">
//                   <Plus size={20} strokeWidth={3} />
//                 </button>
//               </div>

//               <div className="grid grid-cols-5 gap-2">
//                 {[1, 2, 3, 4, 5].map((_, i) => (
//                   <div key={i} className="aspect-square bg-[#FBF7EE] rounded-xl border border-[#EFE7D3] flex items-center justify-center cursor-pointer hover:border-[#C5A059] transition-all group">
//                     <Plus size={16} className="text-[#EFE7D3] group-hover:text-[#C5A059]" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* CỘT PHẢI: THÔNG TIN CHI TIẾT */}
//             <div className="lg:col-span-7 space-y-8">
              
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Tên sản phẩm</label>
//                   <input type="text" placeholder="Vd: ĐÈN CHÙM PHA LÊ LUXURY" className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#001529] focus:bg-white focus:border-[#C5A059] transition-all uppercase text-sm" />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   {/* CHỌN DANH MỤC */}
//                   <div className="space-y-2">
//                     <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Danh mục</label>
//                     <div className="relative">
//                       <select className="w-full h-14 pl-6 pr-10 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-bold text-[#001529] focus:bg-white focus:border-[#C5A059] appearance-none cursor-pointer transition-all text-sm uppercase">
//                         <option value="">-- Chọn danh mục --</option>
//                         {/* Dùng Optional Chaining ?. để an toàn */}
//                         {categories?.map((cat) => (
//                           <option key={cat._id} value={cat._id}>
//                             {cat.name.toUpperCase()}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5A059] pointer-events-none" size={18} />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Mã sản phẩm (SKU)</label>
//                     <div className="relative">
//                       <input type="text" placeholder="SKU-001" className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#001529] focus:bg-white focus:border-[#C5A059] transition-all uppercase text-sm" />
//                       <Hash className="absolute right-4 top-1/2 -translate-y-1/2 text-[#EFE7D3]" size={18} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Các phần còn lại giữ nguyên... */}
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Giá bán</label>
//                   <div className="relative">
//                     <input type="number" placeholder="0" className="w-full h-14 pl-6 pr-12 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-red-600 focus:bg-white focus:border-[#C5A059] transition-all text-sm" />
//                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">VNĐ</span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Số lượng</label>
//                   <input type="number" placeholder="0" className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#001529] focus:bg-white focus:border-[#C5A059] transition-all text-sm" />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Trạng thái</label>
//                   <div className="relative">
//                     <select className="w-full h-14 pl-6 pr-10 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-bold text-[#001529] appearance-none cursor-pointer focus:bg-white focus:border-[#C5A059] transition-all text-[11px] uppercase">
//                       <option value="Active">ĐANG HOẠT ĐỘNG</option>
//                       <option value="Inactive">TẠM ẨN</option>
//                     </select>
//                     <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5A059] pointer-events-none" size={18} />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-[#FBF7EE] p-6 rounded-[2.5rem] border border-[#EFE7D3] space-y-4">
//                 <div className="flex items-center gap-2">
//                   <FileText size={16} className="text-[#C5A059]" />
//                   <h3 className="font-black text-[#001529] uppercase text-[12px] tracking-widest">Mô tả sản phẩm</h3>
//                 </div>
//                 <textarea 
//                   rows={4}
//                   placeholder="Thông tin chi tiết về đèn..."
//                   className="w-full p-5 bg-white border border-[#EFE7D3] rounded-2xl outline-none font-medium text-[#001529] text-sm focus:border-[#C5A059] transition-all resize-none custom-scrollbar shadow-inner"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="px-10 py-6 border-t border-[#EFE7D3] bg-[#FBF7EE]/30 flex gap-4">
//           <button onClick={onClose} className="h-14 px-10 bg-white border border-[#EFE7D3] text-slate-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all">
//             Hủy bỏ
//           </button>
//           <button className="h-14 flex-1 bg-[#001529] text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-[#002244] transition-all flex items-center justify-center gap-3">
//             <Save size={18} strokeWidth={2.5} className="text-[#C5A059]" />
//             Lưu sản phẩm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";
import React, { useState, useEffect } from "react";
import { X, Camera, Plus, Save, Package, FileText, ChevronDown, Hash } from "lucide-react";
import axios from "axios";

interface ICategory {
  _id: string;
  name: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null;
  categories?: ICategory[];
  refreshData?: () => void; // Hàm để load lại danh sách sau khi thêm thành công
}

export const AddProductModal = ({ 
  isOpen, 
  onClose, 
  initialData, 
  categories = [],
  refreshData
}: Props) => {
  // 1. STATE QUẢN LÝ FORM
  const [formData, setFormData] = useState({
    productCode: "",
    productName: "",
    salePrice: 0,
    stockQuantity: 0,
    categoryId: "",
    status: "Active",
    description: "", // Chúng ta sẽ đưa vào specifications.description
    imageUrl: "" // Tạm thời để trống hoặc link ảnh mẫu
  });

  const [loading, setLoading] = useState(false);

  // Cập nhật form nếu là chế độ chỉnh sửa (Edit)
  useEffect(() => {
    if (initialData) {
      setFormData({
        productCode: initialData.productCode || "",
        productName: initialData.productName || "",
        salePrice: initialData.salePrice || 0,
        stockQuantity: initialData.stockQuantity || 0,
        categoryId: initialData.categoryId?._id || initialData.categoryId || "",
        status: initialData.status || "Active",
        description: initialData.specifications?.description || "",
        imageUrl: initialData.imageUrl || ""
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  // 2. XỬ LÝ LƯU SẢN PHẨM
  const handleSave = async () => {
    // Validate cơ bản
    if (!formData.productName || !formData.productCode || !formData.categoryId) {
      alert("Vui lòng điền đầy đủ: Tên, Mã sản phẩm và Danh mục");
      return;
    }

    try {
      setLoading(true);
      
      const payload = {
        productCode: formData.productCode,
        productName: formData.productName,
        salePrice: Number(formData.salePrice),
        stockQuantity: Number(formData.stockQuantity),
        categoryId: formData.categoryId,
        status: formData.status,
        specifications: {
          description: formData.description
        },
        imageUrl: formData.imageUrl || "https://via.placeholder.com/300" // Ảnh mặc định
      };

      const url = initialData 
        ? `http://localhost:5000/api/products/${initialData._id}` 
        : "http://localhost:5000/api/products/add";
      
      const method = initialData ? "put" : "post";

      const response = await axios[method](url, payload);

      if (response.status === 201 || response.status === 200) {
        alert(initialData ? "Cập nhật thành công!" : "Thêm sản phẩm thành công!");
        if (refreshData) refreshData(); // Load lại danh sách ở trang cha
        onClose(); // Đóng modal
      }
    } catch (error: any) {
      console.error("Lỗi khi lưu:", error);
      alert(error.response?.data?.message || "Có lỗi xảy ra khi lưu sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#001529]/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-[#EFE7D3]">
        
        {/* HEADER */}
        <div className="px-10 py-5 flex justify-between items-center border-b border-[#EFE7D3] bg-[#FBF7EE]/50">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-white text-[#C5A059] rounded-2xl shadow-sm border border-[#EFE7D3]">
              <Package size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-black text-[#001529] uppercase tracking-tighter">
              {initialData ? "Chỉnh sửa sản phẩm" : "Thêm đèn mới vào kho"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 transition-all">
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* CỘT TRÁI: HÌNH ẢNH */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em] flex items-center gap-2">
                <Camera size={14} /> Ảnh sản phẩm
              </label>
              
              <div className="relative h-[400px] w-full bg-[#FBF7EE] rounded-[2rem] border-2 border-dashed border-[#EFE7D3] flex flex-col items-center justify-center overflow-hidden shadow-inner group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm text-[#EFE7D3]">
                    <Camera size={32} />
                  </div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Chức năng upload ảnh đang phát triển</p>
                </div>
                <button className="absolute bottom-4 right-4 p-3 bg-[#C5A059] text-white rounded-xl shadow-lg hover:scale-110 transition-all">
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* CỘT PHẢI: THÔNG TIN CHI TIẾT */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Tên sản phẩm</label>
                  <input 
                    type="text" 
                    placeholder="Vd: ĐÈN CHÙM PHA LÊ LUXURY" 
                    className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#001529] focus:bg-white focus:border-[#C5A059] transition-all uppercase text-sm"
                    value={formData.productName}
                    onChange={(e) => setFormData({...formData, productName: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Danh mục</label>
                    <div className="relative">
                      <select 
                        className="w-full h-14 pl-6 pr-10 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-bold text-[#001529] focus:bg-white focus:border-[#C5A059] appearance-none cursor-pointer transition-all text-sm uppercase"
                        value={formData.categoryId}
                        onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                      >
                        <option value="">-- CHỌN DANH MỤC --</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>{cat.name.toUpperCase()}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5A059] pointer-events-none" size={18} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Mã sản phẩm (SKU)</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="SKU-001" 
                        className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#001529] focus:bg-white focus:border-[#C5A059] transition-all uppercase text-sm"
                        value={formData.productCode}
                        onChange={(e) => setFormData({...formData, productCode: e.target.value})}
                      />
                      <Hash className="absolute right-4 top-1/2 -translate-y-1/2 text-[#EFE7D3]" size={18} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Giá bán</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full h-14 pl-6 pr-12 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-red-600 focus:bg-white focus:border-[#C5A059] transition-all text-sm"
                      value={formData.salePrice}
                      onChange={(e) => setFormData({...formData, salePrice: Number(e.target.value)})}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">VNĐ</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Số lượng</label>
                  <input 
                    type="number" 
                    className="w-full h-14 px-6 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-black text-[#001529] focus:bg-white focus:border-[#C5A059] transition-all text-sm"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({...formData, stockQuantity: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Trạng thái</label>
                  <div className="relative">
                    <select 
                      className="w-full h-14 pl-6 pr-10 bg-[#FBF7EE] border border-[#EFE7D3] rounded-2xl outline-none font-bold text-[#001529] appearance-none cursor-pointer focus:bg-white focus:border-[#C5A059] transition-all text-[11px] uppercase"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="Active">ĐANG HOẠT ĐỘNG</option>
                      <option value="Inactive">TẠM ẨN</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5A059] pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div className="bg-[#FBF7EE] p-6 rounded-[2.5rem] border border-[#EFE7D3] space-y-4">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-[#C5A059]" />
                  <h3 className="font-black text-[#001529] uppercase text-[12px] tracking-widest">Mô tả sản phẩm</h3>
                </div>
                <textarea 
                  rows={4}
                  placeholder="Thông tin chi tiết về đèn..."
                  className="w-full p-5 bg-white border border-[#EFE7D3] rounded-2xl outline-none font-medium text-[#001529] text-sm focus:border-[#C5A059] transition-all resize-none custom-scrollbar shadow-inner"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-10 py-6 border-t border-[#EFE7D3] bg-[#FBF7EE]/30 flex gap-4">
          <button 
            onClick={onClose} 
            disabled={loading}
            className="h-14 px-10 bg-white border border-[#EFE7D3] text-slate-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="h-14 flex-1 bg-[#001529] text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-[#002244] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Save size={18} strokeWidth={2.5} className="text-[#C5A059]" />
            {loading ? "ĐANG XỬ LÝ..." : initialData ? "CẬP NHẬT SẢN PHẨM" : "LƯU SẢN PHẨM"}
          </button>
        </div>
      </div>
    </div>
  );
};