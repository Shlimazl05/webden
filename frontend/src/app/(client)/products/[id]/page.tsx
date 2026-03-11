"use client";
import React, { useEffect, useState, use } from 'react';
import { ProductDetailContent } from '@/features/product/components/client/ProductDetailContent';
import { productClientApi } from '@/features/product/api/product.client.api';
import { IProduct } from '@/features/product/product.types';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await productClientApi.getById(id);
                setProduct(data);
            } catch (error) {
                console.error("Lỗi tải sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest">
            Sản phẩm không tồn tại
        </div>
    );

    return (
        <main className="max-w-[1300px] mx-auto px-6 py-12 lg:py-20 min-h-screen bg-white">
            <ProductDetailContent product={product} />
        </main>
    );
}