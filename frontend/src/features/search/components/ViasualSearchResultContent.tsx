"use client";
import React from 'react';
import { useVisualSearchStore } from '../store/useVisualSearchStore';
import { SearchX, Camera, ArrowLeft } from 'lucide-react';
import { ProductList } from '@/features/product/components/client/ProductList';
import Link from 'next/link';

export const VisualSearchResultContent = () => {
    const { results, previewImage } = useVisualSearchStore();

    return (
        <main className="min-h-screen bg-slate-50/50 pt-28 pb-20 px-4 md:px-10">
            <div className="max-w-[1400px] mx-auto bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden p-8 md:p-16">

                {/* HEADER: HIỂN THỊ ẢNH ĐÃ TÌM KIẾM */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-16">
                    {previewImage && (
                        <div className="relative shrink-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
                                <img src={previewImage} alt="Search" className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 right-0 bg-amber-500 p-2 rounded-tl-xl text-white">
                                    <Camera size={16} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full">Visual AI Search</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-[#2D2D8A] tracking-tight">
                            Kết quả tìm kiếm hình ảnh
                        </h1>
                        <p className="text-[15px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                            Tìm thấy {results.length} mẫu thiết kế tương đồng
                        </p>
                    </div>
                </div>

                {/* DANH SÁCH KẾT QUẢ */}
                {results.length > 0 ? (
                    <ProductList products={results} loading={false} />
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <SearchX size={32} className="text-slate-200" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 uppercase">Không tìm thấy sản phẩm</h2>
                        <p className="text-slate-400 text-sm mt-2 font-medium">Hãy thử lại với một góc chụp khác rõ ràng hơn</p>
                        <Link href="/" className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold">Về trang chủ</Link>
                    </div>
                )}
            </div>
        </main>
    );
};