


"use client";
import React from 'react';
import { useVisualSearchStore } from '../store/useVisualSearchStore';
import { SearchX, Camera, ArrowLeft, LayoutGrid } from 'lucide-react';
import { ProductList } from '@/features/product/components/client/ProductList';
import Link from 'next/link';

export const VisualSearchResultContent = () => {
    const { results, previewImage, categoryName, success, message } = useVisualSearchStore();

    return (
        <main className="min-h-screen bg-slate-50/50 pt-16 pb-20 px-4 md:px-10">
            <div className="max-w-[1400px] mx-auto bg-white rounded-xl md:rounded-xl shadow-sm border border-slate-100 p-6 md:p-12">

                {/* Header (Giữ nguyên để người dùng thấy ảnh họ đã upload) */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-10 border-b border-slate-50 pb-10">
                    {previewImage && (
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-white shadow-xl">
                            <img src={previewImage} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-black text-[#2D2D8A] uppercase">Kết quả tìm kiếm</h1>
                       
                    </div>
                    <Link href="/" className="md:ml-auto flex items-center gap-2 px-6 py-3 border rounded-full text-xs font-bold uppercase">
                        <ArrowLeft size={16} /> Quay lại
                    </Link>
                </div>

                {/* --- PHẦN NỘI DUNG THAY ĐỔI --- */}
                <div className="relative">
                    {success && results.length > 0 ? (
                        // TRƯỜNG HỢP 1: THÀNH CÔNG -> HIỆN DANH SÁCH
                        <div className="animate-in fade-in duration-1000">
                            <div className="mb-6 flex items-center gap-2 text-indigo-600 font-bold text-[16px]">
                                <LayoutGrid size={18} /> AI nhận diện danh mục: {categoryName}
                            </div>
                            <ProductList products={results} loading={false} />
                        </div>
                    ) : (
                        // TRƯỜNG HỢP 2: THẤT BẠI (Cái váy/Cái quạt) -> HIỆN THÔNG BÁO GIỮA TRANG
                        <div className="py-20 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                                <SearchX size={40} className="text-red-400" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                {message || "Không tìm thấy sản phẩm"}
                            </h2>   
                           
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};