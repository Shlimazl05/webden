// "use client";
// import React, { useState } from "react";
// import { Hash, Box, FileText, ChevronRight } from "lucide-react";
// import { IProduct } from "../product.types";

// export const ProductDetailContent = ({ product }: { product: IProduct }) => {
//   const [activeImg, setActiveImg] = useState(product.imageUrl || "/img/placeholder.svg");

//   return (
//     <div className="grid grid-cols-12 gap-8 lg:gap-12 p-2">
//       {/* CỘT TRÁI: GALLERY ẢNH */}
//       <div className="col-span-12 lg:col-span-5 space-y-4">
//         <div className="aspect-[3/4] w-full bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-inner group">
//           <img src={activeImg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={product.productName} />
//         </div>
        
//         {/* Album ảnh phụ (Bấm vào để đổi ảnh chính) */}
//         {product.images && product.images.length > 0 && (
//           <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2">
//             <button 
//               onClick={() => setActiveImg(product.imageUrl || "")}
//               className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === product.imageUrl ? 'border-indigo-600 shadow-md' : 'border-transparent'}`}
//             >
//               <img src={product.imageUrl} className="w-full h-full object-cover" alt="thumb" />
//             </button>
//             {product.images.map((img, idx) => (
//               <button 
//                 key={idx} 
//                 onClick={() => setActiveImg(img)}
//                 className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === img ? 'border-indigo-600 shadow-md' : 'border-transparent'}`}
//               >
//                 <img src={img} className="w-full h-full object-cover" alt="sub" />
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* CỘT PHẢI: THÔNG TIN SẢN PHẨM */}
//       <div className="col-span-12 lg:col-span-7 space-y-8">
//         <div className="space-y-3">
//           <div className="flex items-center gap-2">
//             <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
//               {(product.categoryId as any)?.name || "Sản phẩm"}
//             </span>
//             {product.status === 'Active' ? (
//               <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Đang kinh doanh</span>
//             ) : (
//               <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">Tạm ngưng</span>
//             )}
//           </div>
//           <h1 className="text-3xl font-black text-slate-950 leading-tight tracking-tight">{product.productName}</h1>
//           <div className="flex items-baseline gap-2">
//             <span className="text-3xl font-black text-rose-600 tracking-tighter">
//               {product.salePrice?.toLocaleString('vi-VN')}
//             </span>
//             <span className="text-lg font-bold text-rose-600 underline">đ</span>
//           </div>
//         </div>

//         {/* Thông số nhanh */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="p-5 bg-slate-50/80 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
//             <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2 mb-2">
//               <Hash size={14} className="text-indigo-600" /> Mã định danh
//             </p>
//             <p className="text-lg font-black text-indigo-600">{product.productCode}</p>
//           </div>
//           <div className="p-5 bg-slate-50/80 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
//             <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2 mb-2">
//               <Box size={14} className="text-indigo-600" /> Tình trạng kho
//             </p>
//             <p className="text-lg font-black text-slate-900">{product.stockQuantity} <span className="text-sm font-bold text-slate-400">cái</span></p>
//           </div>
//         </div>

//         {/* Thông số chi tiết */}
//         <div className="space-y-4">
//           <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
//             <FileText size={18} className="text-indigo-600" strokeWidth={2.5} /> Thông số & Đặc điểm
//           </h3>
//           <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
//             <div className="text-sm text-slate-600 leading-relaxed font-bold whitespace-pre-wrap">
//               {product.specifications?.description || "Sản phẩm chưa cập nhật thông số chi tiết."}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";
import React, { useState } from "react";
import { Box, FileText, Tag, CircleDollarSign, LayoutGrid } from "lucide-react";
import { IProduct } from "../../product/product.types";

export const ProductDetailContent = ({ product }: { product: IProduct }) => {
  const [activeImg, setActiveImg] = useState(product.imageUrl || "/img/placeholder.svg");

  return (
    <div className="grid grid-cols-12 gap-12">
      {/* CỘT TRÁI: Gallery Ảnh Vuông khớp tuyệt đối */}
      <div className="col-span-12 lg:col-span-5 space-y-6">
        <div className="aspect-square w-full bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm group">
          <img 
            src={activeImg} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt={product.productName} 
          />
        </div>
        
        {/* Album ảnh nhỏ */}
        {product.images && product.images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2">
            <button 
              onClick={() => setActiveImg(product.imageUrl || "")}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === product.imageUrl ? 'border-indigo-600 shadow-md' : 'border-transparent'}`}
            >
              <img src={product.imageUrl} className="w-full h-full object-cover" alt="thumb" />
            </button>
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImg(img)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === img ? 'border-indigo-600 shadow-md' : 'border-transparent'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="sub" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CỘT PHẢI: Thông tin TÁCH BIỆT RÕ RÀNG */}
      <div className="col-span-12 lg:col-span-7 space-y-5">
        
        {/* Hàng 1: Tags Trạng thái & Danh mục */}
        <div className="flex flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full border border-indigo-100">
            <LayoutGrid size={12} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Danh mục: {(product.categoryId as any)?.name || "Chưa rõ"}
            </span>
          </div>
          <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border ${product.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${product.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${product.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">
              {product.status === 'Active' ? 'Đang kinh doanh' : 'Tạm ngưng'}
            </span>
          </div>
        </div>

        {/* Hàng 2: Tên Sản Phẩm (Dòng riêng biệt, không in hoa) */}
        <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100/50">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Tên sản phẩm</p>
          <h1 className="text-3xl font-black text-slate-950 leading-tight">
            {product.productName}
          </h1>
        </div>

        {/* Hàng 3: Giá bán */}
        <div className="bg-rose-50/30 p-5 rounded-3xl border border-rose-100/50">
          <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1 ml-1">Giá bán niêm yết</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-rose-600 tracking-tighter">
              {product.salePrice?.toLocaleString('vi-VN')}
            </span>
            <span className="text-lg font-bold text-rose-600 underline">đ</span>
          </div>
        </div>

        {/* Hàng 4: Tình trạng kho */}
        <div className="bg-indigo-50/30 p-5 rounded-3xl border border-indigo-100/50">
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 ml-1">Số lượng sẵn có</p>
          <div className="flex items-center gap-2">
            <Box className="text-indigo-600" size={24} strokeWidth={2.5} />
            <span className="text-2xl font-black text-slate-900">{product.stockQuantity}</span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Sản phẩm trong kho</span>
          </div>
        </div>

        {/* Hàng 5: Thông số kỹ thuật */}
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-3 ml-1">
            <FileText size={18} className="text-indigo-600" strokeWidth={2.5} /> 
            <h3 className="text-[12px] font-black text-slate-950 uppercase tracking-[0.2em]">Thông số kỹ thuật</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-inner min-h-[100px]">
            <p className="text-[15px] text-slate-700 leading-relaxed font-bold whitespace-pre-wrap">
              {product.specifications?.description || "Sản phẩm chưa có mô tả."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};