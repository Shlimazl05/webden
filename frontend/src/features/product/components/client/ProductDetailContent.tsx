

"use client";
import React, { useState } from "react";
import {
    Box,
    FileText,
    ShoppingCart,
    Plus,
    Minus,
    Zap, // Icon cho nút Mua ngay
} from "lucide-react";
import { IProduct } from "../../product.types";
import toast from "react-hot-toast";

export const ProductDetailContent = ({ product }: { product: IProduct }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, {
            style: { borderRadius: '15px', background: '#1e293b', color: '#fff', fontWeight: 'bold' }
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700 max-w-[1200px] mx-auto">

            {/* 1. KHUNG BAO CHÍNH (Ảnh & Thông tin cơ bản) */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8 lg:p-12">
                <div className="grid grid-cols-12 gap-10">

                    {/* CỘT TRÁI: Ảnh sản phẩm */}
                    <div className="col-span-12 lg:col-span-4 flex justify-center items-start">
                        <div className="w-full max-w-[360px] aspect-[3/4] bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                            <img
                                src={product.imageUrl || "/img/placeholder.svg"}
                                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                                alt={product.productName}
                            />
                        </div>
                    </div>

                    {/* CỘT PHẢI: Thông tin tóm tắt */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col justify-between py-2">
                        <div className="space-y-10">
                            {/* Tên sản phẩm với vạch xanh dọc */}
                            <div className="border-l-4 border-indigo-500 pl-5">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-0.5">Tên sản phẩm</p>
                                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                                    {product.productName}
                                </h1>
                            </div>

                            {/* Giá niêm yết với vạch đỏ dọc */}
                            <div className="border-l-4 border-rose-500 pl-5">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-0.5">Giá niêm yết</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-rose-600 tracking-tighter">
                                        {product.salePrice?.toLocaleString('vi-VN')}
                                    </span>
                                    <span className="text-2xl font-bold text-rose-600 underline uppercase">đ</span>
                                </div>
                            </div>
                        </div>

                        {/* Phần Footer của thông tin: Số lượng, Tồn kho & Nút bấm */}
                        <div className="pt-8 mt-8 border-t border-slate-50 space-y-8">

                            {/* CẤU TRÚC XẾP CHỒNG: SỐ LƯỢNG TRÊN - TỒN KHO DƯỚI */}
                            <div className="flex flex-col gap-5">

                                {/* 1. SỐ LƯỢNG MUA (Ở TRÊN) */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số lượng mua</p>
                                    <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-sm w-fit h-12">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="h-full px-3 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600 active:scale-90"
                                        >
                                            <Minus size={16} strokeWidth={3} />
                                        </button>
                                        <span className="w-10 text-center font-black text-slate-900 text-base">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="h-full px-3 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600 active:scale-90"
                                        >
                                            <Plus size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>

                                {/* 2. TÌNH TRẠNG KHO (NGAY DƯỚI) */}
                                <div className="flex items-center gap-2 px-1">
                                    {/* Icon nhỏ lại (size 16) */}
                                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 border border-indigo-100/50">
                                        <Box size={16} strokeWidth={2.5} />
                                    </div>
                                    {/* Text hiển thị: Tồn kho: <số> sản phẩm */}
                                    <p className="text-[13px] font-bold text-slate-500">
                                        Tồn kho: <span className="text-slate-950 font-black">{product.stockQuantity}</span> sản phẩm
                                    </p>
                                </div>

                            </div>

                            {/* CỤM NÚT BẤM (Giữ nguyên) */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 h-14 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-slate-900 hover:text-white transition-all active:scale-95 shadow-sm"
                                >
                                    <ShoppingCart size={18} strokeWidth={2.5} /> Thêm vào giỏ
                                </button>
                                <button
                                    className="flex-[1.2] h-14 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100"
                                >
                                    <Zap size={18} fill="currentColor" /> Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. KHUNG CHI TIẾT SẢN PHẨM (Phía dưới) */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8 lg:p-12">
                <div className="flex items-center gap-2 border-l-4 border-indigo-500 pl-5 mb-10">
                    <FileText size={18} className="text-indigo-500" strokeWidth={2.5} />
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Chi tiết sản phẩm</h3>
                </div>

                <div className="pl-5 prose prose-slate max-w-none">
                    <p className="text-[15px] text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                        {product.specifications?.description || "Sản phẩm hiện đang được cập nhật thông tin mô tả chi tiết."}
                    </p>
                </div>
            </div>

        </div>
    );
};



