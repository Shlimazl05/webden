

"use client";
import React, { useEffect, useState } from "react";
import { Box, FileText, LayoutGrid, ReceiptText } from "lucide-react";
import { IProduct } from "../../product/product.types";
import { useCartStore } from "@/features/cart/hooks/useCartStore";

export const ProductDetailContent = ({ product }: { product: IProduct }) => {
  const [activeImg, setActiveImg] = useState(product.imageUrl || "/img/placeholder.svg");
  const fetchCartCount = useCartStore((state) => state.fetchCartCount);
  
  return (
    <div className="grid grid-cols-12 gap-8 lg:gap-10">

      {/* --- HÀNG 1: ẢNH VÀ THÔNG TIN CƠ BẢN --- */}

      {/* CỘT TRÁI: Gallery Ảnh (5 cột) */}
      <div className="col-span-12 lg:col-span-5 space-y-6">
        <div className="aspect-square w-full bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm group">
          <img
            src={activeImg}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt={product.productName}
          />
        </div>

        {/* Album ảnh nhỏ */}
        {product.images && product.images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2 px-1">
            <button
              onClick={() => setActiveImg(product.imageUrl || "")}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === product.imageUrl ? 'border-[var(--color-primary)] shadow-md' : 'border-transparent opacity-50'}`}
            >
              <img src={product.imageUrl} className="w-full h-full object-cover" alt="thumb" />
            </button>
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === img ? 'border-[var(--color-primary)] shadow-md' : 'border-transparent opacity-50'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="sub" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CỘT PHẢI: Thông tin giá & kho (7 cột) */}
      <div className="col-span-12 lg:col-span-7 space-y-6 flex flex-col items-start">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full border border-indigo-100">
            <LayoutGrid size={12} strokeWidth={2.5} />
            <span className="ui-label !text-indigo-700 !mb-0 text-[10px]">
              {(product.categoryId as any)?.name || "Chưa phân loại"}
            </span>
          </div>
          <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border ${product.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${product.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${product.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            </span>
            <span className="ui-label !mb-0 text-[10px]">
              {product.status === 'Active' ? 'Đang kinh doanh' : 'Tạm ngưng'}
            </span>
          </div>
        </div>

        {/* Tên sản phẩm */}
        <div className="w-full text-left">
          <p className="ui-label !text-slate-400 mb-1 ml-1">Tên sản phẩm</p>
          <h1 className="text-3xl font-bold text-slate-900 leading-tight tracking-tight">
            {product.productName}
          </h1>
        </div>

        {/* Giá và Kho */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-rose-50/30 p-5 rounded-[2rem] border border-rose-100/50">
            <p className="ui-label !text-rose-400 mb-1 ml-1">Giá bán </p>
            <div className="ui-price !text-3xl !text-rose-600">
              {product.salePrice?.toLocaleString('vi-VN')}
              <span className="currency-symbol !text-lg">đ</span>
            </div>
          </div>

          <div className="bg-indigo-50/30 p-5 rounded-[2rem] border border-indigo-100/50">
            <p className="ui-label !text-indigo-400 mb-1 ml-1">Số lượng sẵn có</p>
            <div className="flex items-center gap-2">
              <Box className="text-indigo-600" size={24} strokeWidth={2} />
              <span className="text-3xl font-bold text-slate-900">{product.stockQuantity}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Sản phẩm</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- HÀNG 2: THÔNG SỐ KỸ THUẬT (Dàn hết 12 cột - Dưới ảnh và thông tin) --- */}

      <div className="col-span-12 mt-4 text-left">
        <div className="flex items-center gap-2 mb-4 ml-1">
          <div className="p-2 bg-indigo-50 text-[var(--color-primary)] rounded-xl shadow-sm border border-indigo-100">
            <ReceiptText size={18} strokeWidth={2.5} />
          </div>
          <h3 className="ui-section-title !m-0 !text-[16px]">Thông số kỹ thuật chi tiết</h3>
        </div>

        <div className="w-full bg-slate-50/50 p-8 rounded-[3rem] border border-slate-100 shadow-inner">
          <div className="ui-value !text-[15px] !font-medium leading-loose text-slate-700 whitespace-pre-line">
            {product.specifications?.description || "Sản phẩm này hiện chưa có thông tin thông số kỹ thuật chi tiết."}
          </div>
        </div>
      </div>

    </div>
  );
};