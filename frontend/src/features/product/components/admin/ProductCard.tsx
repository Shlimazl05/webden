

// "use client";
// import React from 'react';
// import { Eye, EyeOff, Trash2 } from 'lucide-react';
// import { IProduct } from '../../product.types';

// interface ProductCardProps {
//   product: IProduct;
//   onDelete: (id: string) => void;
//   onToggleStatus: (product: IProduct) => void; // Hàm để nút ẩn hiện hoạt động
//   onEdit: (product: IProduct) => void;
//   onView: (product: IProduct) => void;
// }

// export const ProductCard = ({ product, onDelete, onToggleStatus, onEdit, onView}: ProductCardProps) => {
//   const isHidden = product.status === 'Hidden';

//   return (
//     <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
      
//       {/* 1. Ảnh sản phẩm - Luôn giữ rõ nét dù ẩn hay hiện */}
//       <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-50 mb-3">
//         <img 
//           src={product.imageUrl || "/img/placeholder.svg"} 
//           alt={product.productName}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//       </div>

//       {/* 2. Thông tin Tên & Giá - Hiển thị đúng định dạng tên bạn nhập */}
//       <div className="flex-1 flex flex-col px-1">
//         <h3 className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 min-h-[38px] mb-2">
//           {product.productName}
//         </h3>
        
//         <p className="text-[15px] font-black text-red-600 mb-3">
//           {product.salePrice?.toLocaleString('vi-VN')} <span className="text-[12px] underline ml-0.5">đ</span>
//         </p>
//       </div>

//       {/* 3. Nút hành động */}
//       <div className="flex gap-2">
//         {/* Nút Ẩn/Hiện: Thay đổi màu và icon để nhận biết trạng thái */}
//         <button 
//           onClick={() => onToggleStatus(product)}
//           className={`flex-1 h-9 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
//             isHidden ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white hover:bg-slate-600'
//           }`}
//           title={isHidden ? "Hiện sản phẩm" : "Ẩn sản phẩm"}
//         >
//           {isHidden ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
//         </button>

//         <button 
//           onClick={() => onDelete(product._id)}
//           className="flex-1 h-9 bg-[#e13d45] text-white rounded-xl flex items-center justify-center hover:bg-[#c9353c] transition-colors shadow-sm"
//         >
//           <Trash2 size={16} strokeWidth={2.5} />
//         </button>
//       </div>
//     </div>
//   );
// };

"use client";
import React from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { IProduct } from '../../product.types';

interface ProductCardProps {
  product: IProduct;
  onDelete: (id: string) => void;
  onToggleStatus: (product: IProduct) => void;
  onEdit: (product: IProduct) => void;
  onView: (product: IProduct) => void;
}

export const ProductCard = ({ product, onDelete, onToggleStatus, onEdit, onView }: ProductCardProps) => {
  const isHidden = product.status === 'Hidden';

  return (
    <div 
      onClick={() => onView(product)} // Bấm vào toàn bộ Card để xem chi tiết
      className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group cursor-pointer"
    >
      
      {/* 1. Ảnh sản phẩm */}
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-50 mb-3">
        <img 
          src={product.imageUrl || "/img/placeholder.svg"} 
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 2. Thông tin Tên & Giá */}
      <div className="flex-1 flex flex-col px-1">
        <h3 className="text-[15px] font-bold text-slate-800 leading-snug line-clamp-2 min-h-[35px] mb-2 ">
          {product.productName}
        </h3>
        
        <p className="text-[15px] font-black text-red-600 mb-3">
          {product.salePrice?.toLocaleString('vi-VN')} <span className="text-[12px] underline ml-0.5">đ</span>
        </p>
      </div>

      {/* 3. Nút hành động */}
      <div className="flex gap-2">
        {/* Nút Ẩn/Hiện */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện bấm Card (onView) bị kích hoạt
            onToggleStatus(product);
          }}
          className={`flex-1 h-9 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
            isHidden ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white hover:bg-slate-600'
          }`}
          title={isHidden ? "Hiện sản phẩm" : "Ẩn sản phẩm"}
        >
          {isHidden ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
        </button>

        {/* Nút Xóa */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện bấm Card (onView) bị kích hoạt
            onDelete(product._id);
          }}
          className="flex-1 h-9 bg-[#e13d45] text-white rounded-xl flex items-center justify-center hover:bg-[#c9353c] transition-colors shadow-sm"
        >
          <Trash2 size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};