"use client";
import React, { useState, useEffect } from 'react';
import { ProductFilterSidebar } from '@/features/product/components/client/ProductFilterSidebar';
import { ProductList } from '@/features/product/components/client/ProductList';
import { productClientApi } from '@/features/product/api/product.client.api';
import { IProduct } from '@/features/product/product.types';

export default function AllProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState('');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            let minPrice, maxPrice;
            if (selectedPrice) {
                const [min, max] = selectedPrice.split('-');
                minPrice = Number(min);
                maxPrice = max === 'up' ? undefined : Number(max);
            }

            const response = await productClientApi.getAll({
                limit: 100,
                status: 'Active',
                minPrice,
                maxPrice
            });

            if (response) {
                setProducts(response.products || []);
                setTotalCount(response.pagination?.totalProducts || 0);
            }
        } catch (error) {
            console.error("Lỗi fetch:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedPrice]);

    return (
        /* pt-[100px] để né Header */
        <main className="min-h-screen bg-[#fcfcfd] pt-[100px] pb-24">
            <div className="max-w-[1300px] mx-auto px-6">

                {/* 1. TIÊU ĐỀ: Chữ "Tất cả sản phẩm" đẹp ở giữa */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full font-black text-[10px] uppercase tracking-[0.3em] mb-2 animate-in fade-in slide-in-from-bottom-2">
                        Stellar Lights Collection
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black text-indigo-950 uppercase tracking-tighter leading-tight">
                        Tất cả <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">sản phẩm</span>
                    </h1>
                    <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
                </div>

                {/* 2. LAYOUT CHÍNH: Sidebar trái - List phải */}
                <div className="grid grid-cols-12 gap-10 items-start">

                    {/* BÊN TRÁI: BỘ LỌC (Sidebar) */}
                    <div className="col-span-12 lg:col-span-3 sticky top-28">
                        <ProductFilterSidebar
                            count={totalCount}
                            selectedPrice={selectedPrice}
                            onPriceChange={(val) => setSelectedPrice(val)}
                            onReset={() => setSelectedPrice('')}
                        />
                    </div>

                    {/* BÊN PHẢI: DANH SÁCH (Trong khung bao) */}
                    <div className="col-span-12 lg:col-span-9">
                        <div className="bg-white rounded-[40px] p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.02)] border border-slate-50 min-h-[600px]">

                            <div className="flex justify-between items-center mb-10 px-2">
                                <h3 className="font-black text-indigo-900 uppercase tracking-widest text-[11px] flex items-center gap-3">
                                    Danh sách hiển thị
                                    <span className="w-12 h-0.5 bg-indigo-100 rounded-full" />
                                </h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    Sắp xếp: Mới nhất
                                </p>
                            </div>

                            {/* Sử dụng component ProductList của bạn */}
                            <ProductList products={products} loading={loading} />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}