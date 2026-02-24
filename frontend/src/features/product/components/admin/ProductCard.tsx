// import React from "react";
// import { IProduct } from "../product.types";

// interface Props {
//   product: IProduct;
// }

// export default function ProductCard({ product }: Props) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
//       <div className="aspect-square w-full overflow-hidden rounded-lg mb-3">
//         <img
//           src={product.imageUrl || "/images/placeholder.png"}
//           alt={product.productName}
//           className="w-full h-full object-contain hover:scale-105 transition-transform"
//         />
//       </div>
//       <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10 mb-2">
//         {product.productName}
//       </h3>
//       <p className="text-blue-600 font-medium text-sm text-right">
//         {product.salePrice.toLocaleString("vi-VN")} đ
//       </p>
//     </div>
//   );
// }

"use client";
import React from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { IProduct } from '../../product.types';

interface ProductCardProps {
  product: IProduct;
  onDelete?: (id: string) => void;
}

export const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  return (
    <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
      
      {/* 1. Ảnh sản phẩm - Tỷ lệ 3:4 chuẩn chân dung */}
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-50 mb-3">
        <img 
          src={product.imageUrl || "/img/placeholder.svg"} 
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 2. Thông tin Tên & Giá */}
      <div className="flex-1 flex flex-col px-1">
        <h3 className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 min-h-[38px] mb-2">
          {product.productName}
        </h3>
        
        <p className="text-[15px] font-black text-red-600 mb-3">
          {product.salePrice?.toLocaleString('vi-VN')} <span className="text-[12px] underline ml-0.5">đ</span>
        </p>
      </div>

      {/* 3. Nút hành động - Nhỏ gọn và mỏng hơn */}
      <div className="flex gap-2">
        <button 
          className="flex-1 h-9 bg-slate-500 text-white rounded-xl flex items-center justify-center hover:bg-slate-600 transition-colors shadow-sm"
        >
          <Eye size={16} strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onDelete && onDelete(product._id)}
          className="flex-1 h-9 bg-[#e13d45] text-white rounded-xl flex items-center justify-center hover:bg-[#c9353c] transition-colors shadow-sm"
        >
          <Trash2 size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};