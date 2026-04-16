


"use client";
import React from 'react';
import { useSearch } from '../hooks/useSearch';
import { SearchX, Loader2, ArrowRight } from 'lucide-react';
import { ProductList } from '@/features/product/components/client/ProductList';

export const SearchResultContent = () => {
    const { query, results, isLoading, count } = useSearch();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Đang tìm kiếm...</p>
            </div>
        );
    }

    return (
        /* Nền xám nhạt bên ngoài để làm nổi bật khung trắng */
        <main className="min-h-screen bg-slate-50/50 pt-28 pb-20 px-4 md:px-10">

            {/* KHUNG CHÍNH: Bo góc cực lớn giống ảnh (rounded-[3rem]) */}
            <div className="max-w-[1400px] mx-auto bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden p-8 md:p-16">

                {/* HEADER: Tiêu đề và nút theo style trong ảnh */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-3xl font-black text-[#2D2D8A]  tracking-tight">
                            Kết quả tìm kiếm: <span className=" italic">"{query}"</span>
                        </h1>
                        <p className="text-[15px] font-bold text-slate-400 tracking-[0.2em]">
                            Tìm thấy {count} sản phẩm phù hợp
                        </p>
                    </div>

                </div>

                {/* DANH SÁCH SẢN PHẨM */}
                {results.length > 0 ? (
                    <ProductList products={results} loading={false} />
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <SearchX size={32} className="text-slate-200" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 uppercase">Không tìm thấy sản phẩm</h2>
                        <p className="text-slate-400 text-sm mt-2">Hãy thử thay đổi từ khóa tìm kiếm của bạn</p>
                    </div>
                )}
            </div>
        </main>
    );
};