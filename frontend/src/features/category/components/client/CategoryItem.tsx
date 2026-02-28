"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ICategory } from '../../category.types';

interface CategoryItemProps {
  category: Partial<ICategory> & { imageUrl?: string };
  fallbackIcon: React.ReactNode;
}

/**
 * Thành phần hiển thị từng danh mục sản phẩm đơn lẻ
 * Được tối ưu hóa kích thước theo thông số 156.3px x 192.5px
 */
export const CategoryItem = ({ category, fallbackIcon }: CategoryItemProps) => {
  return (
    <Link 
      href={`/?category=${category.slug}`}
      className="group flex flex-col items-center justify-center p-5 hover:bg-indigo-50/20 transition-all duration-500 border-b lg:border-b-0 border-slate-50 min-h-[192px]"
    >
      {/* 
          Container ảnh: Tăng lên w-28 h-28 (112px) 
          Đảm bảo ảnh tràn viền với rounded-2xl và overflow-hidden
      */}
      <div className="w-28 h-28 rounded-[24px] bg-slate-50 shadow-sm border border-slate-100 flex items-center justify-center mb-3 group-hover:shadow-xl group-hover:border-indigo-200 group-hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
        {category.imageUrl ? (
          <Image 
            src={category.imageUrl} 
            alt={category.name || 'Category'} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          /* Trạng thái dự phòng khi chưa có ảnh thực tế */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white to-slate-50">
            {fallbackIcon}
          </div>
        )}
      </div>
      
      {/* Tên danh mục: Sử dụng text-sm font-black để đồng bộ với UI cao cấp */}
      <span className="text-[13px] font-black text-[#001529] text-center leading-tight group-hover:text-indigo-600 transition-colors px-2 uppercase tracking-tighter">
        {category.name}
      </span>
    </Link>
  );
};