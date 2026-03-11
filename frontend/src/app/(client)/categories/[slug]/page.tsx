

"use client";
import React, { use } from 'react';

// UI Components
import { CategoryHero } from '@/features/category/components/client/CategoryHero';
import { ProductFilterSidebar } from '@/features/product/components/client/ProductFilterSidebar';
import { ProductList } from '@/features/product/components/client/ProductList';

// Types & Hooks
import { PageProps } from '@/features/category/category.types';
import { useCategoryProducts } from '@/features/category/hooks/useCategoryProducts';

export default function CategoryDetailPage({ params }: PageProps) {
    // 1. Giải nén slug từ params (Tiêu chuẩn Next.js 15)
    const { slug } = use(params);

    // 2. Sử dụng Hook Orchestrator để lấy toàn bộ logic và dữ liệu
    const {
        category,
        products,
        loading,
        selectedPrice,
        setSelectedPrice,
        handleReset
    } = useCategoryProducts(slug);

    // Trạng thái Loading ban đầu (Khi chưa có thông tin danh mục)
    if (loading && !category) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50/30">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    // Trạng thái Không tìm thấy danh mục
    if (!category && !loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/30 text-slate-400">
                <p className="font-bold uppercase tracking-widest mb-4">Danh mục không tồn tại</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="text-indigo-600 font-bold text-sm underline"
                >
                    Quay lại trang chủ
                </button>
            </div>
        );
    }

    return (
        <main className="max-w-[1440px] mx-auto px-6 py-10 min-h-screen bg-slate-50/30 animate-in fade-in duration-700">

            {/* 1. Header Danh mục (Ảnh & Mô tả) */}
            {category && <CategoryHero category={category} />}

            <div className="flex flex-col lg:flex-row gap-10 mt-12">

                {/* 2. Sidebar Bộ lọc bên trái */}
                <div className="flex-shrink-0">
                    <ProductFilterSidebar
                        count={products.length}
                        selectedPrice={selectedPrice}
                        onPriceChange={setSelectedPrice}
                        onReset={handleReset}
                    />
                </div>

                {/* 3. Danh sách sản phẩm bên phải (1 hàng 4 sản phẩm) */}
                <div className="flex-1">
                    <ProductList products={products} loading={loading} />
                </div>

            </div>
        </main>
    );
}