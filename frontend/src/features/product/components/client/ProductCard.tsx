


"use client";
import React from 'react';
import { IProduct } from '../../product.types';
import Link from 'next/link';

interface ProductCardProps {
    product: IProduct;
    onAddToCart: (product: IProduct) => void;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link
            href={`/products/${product._id}`}
            // CẬP NHẬT: Thêm hover:-translate-y-1 và hover:shadow-xl để card nổi lên khi rê chuột
            className="group bg-white rounded-xl  border-2 border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
        >
            {/* 1. Ảnh sản phẩm - Tỷ lệ 3/4 */}
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
                <img
                    src={product.imageUrl || "/img/placeholder.svg"}
                    alt={product.productName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* 2. Thông tin: Đổi border-slate-200 thành border-slate-100 để đường kẻ mờ và tinh tế hơn */}
            <div className="p-4 flex flex-col gap-2 border-t-2 border-slate-100">
                <h3 className="text-slate-800 font-bold text-[14px] leading-tight line-clamp-2 min-h-[34px]">
                    {product.productName}
                </h3>

                <div className="flex items-baseline gap-1">
                    <span className="text-[16px] font-bold text-red-600">
                        {product.salePrice?.toLocaleString('vi-VN')}
                    </span>
                    <span className="text-[13px] font-bold text-red-600 underline">đ</span>
                </div>
            </div>
        </Link>
    );
};