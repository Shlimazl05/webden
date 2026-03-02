

"use client";
import React from 'react';
import { Eye, EyeOff, Trash2, Layers } from 'lucide-react';
import { IProduct } from '../../product.types';

interface ProductCardProps {
  product: IProduct;
  onDelete: (id: string) => void;
  onToggleStatus: (product: IProduct) => void;
  onEdit: (product: IProduct) => void;
  onView: (product: IProduct) => void;
}

export const ProductCard = ({ product, onDelete, onToggleStatus, onEdit, onView }: ProductCardProps) => {
  // 1. Trạng thái ẩn của bản thân sản phẩm (Admin bấm tay)
  const isManualHidden = product.status === 'Hidden';
  
  // 2. Trạng thái ẩn của danh mục cha (Kế thừa)
  const isCategoryHidden = (product.categoryId as any)?.status === 'Hidden';

  // 3. Trạng thái hiển thị thực tế trên Website (Cho khách hàng)
  const isVisibleOnClient = !isManualHidden && !isCategoryHidden;

  return (
    <div 
      onClick={() => onView(product)}
      className={`bg-white p-2.5 rounded-2xl border transition-all flex flex-col h-full group cursor-pointer relative ${
        !isVisibleOnClient ? 'border-slate-100 shadow-none' : 'border-slate-100 shadow-sm hover:shadow-md'
      }`}
    >
      {/* 1. Ảnh sản phẩm */}
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-50 mb-3">
        <img 
          src={product.imageUrl || "/img/placeholder.svg"} 
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Chỉ hiện Badge nếu Danh mục bị ẩn */}
        {isCategoryHidden && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white text-[9px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-md z-10 animate-in fade-in zoom-in">
            <Layers size={10} strokeWidth={3} /> DANH MỤC ĐANG ẨN
          </div>
        )}
      </div>

      {/* 2. Thông tin Tên & Giá */}
      <div className="flex-1 flex flex-col px-1">
        <h3 className={`text-[13px] font-bold leading-snug line-clamp-2 min-h-[38px] mb-2 ${
          !isVisibleOnClient ? 'text-slate-400' : 'text-slate-800'
        }`}>
          {product.productName}
        </h3>
        
        <p className={`text-[15px] font-black mb-3 ${
          !isVisibleOnClient ? 'text-slate-300' : 'text-red-600'
        }`}>
          {product.salePrice?.toLocaleString('vi-VN')} <span className="text-[12px] underline ml-0.5">đ</span>
        </p>
      </div>

      {/* 3. Nút hành động */}
      <div className="flex gap-2">
        {/* Nút con mắt: Luôn phản ánh ĐÚNG trạng thái của sản phẩm, không phụ thuộc danh mục */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus(product);
          }}
          className={`flex-1 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-sm ${
            isManualHidden 
            ? 'bg-amber-500 text-white' // Màu cam nếu Admin chủ động ẩn
            : 'bg-slate-500 text-white hover:bg-slate-600' // Màu xám nếu sản phẩm đang Active
          }`}
          title={isManualHidden ? "Hiện sản phẩm" : "Ẩn sản phẩm"}
        >
          {isManualHidden ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product._id);
          }}
          className="flex-1 h-9 bg-[#e13d45] text-white rounded-xl flex items-center justify-center hover:bg-[#c9353c] transition-all active:scale-90 shadow-sm"
        >
          <Trash2 size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};