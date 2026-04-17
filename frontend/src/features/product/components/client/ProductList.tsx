"use client";
import React from 'react';
import { ProductCard } from './ProductCard';
import { IProduct } from '../../product.types';

export const ProductList = ({ products, loading }: { products: IProduct[], loading: boolean }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-[3/5] bg-slate-50 animate-pulse rounded-xl " />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="py-20 text-center border border-dashed border-slate-200 rounded-3xl">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">
                    Không có sản phẩm nào trong danh mục này
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-700">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={() => { }}
                />
            ))}
        </div>
    );
};