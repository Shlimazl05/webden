
"use client";
import React, { useEffect, useState } from 'react';
import HeroBanner from "@/features/home/components/HeroBanner";
import { CategoryGrid } from "@/features/category/components/client/CategoryGrid";
import { ProductList } from "@/features/product/components/client/ProductList";
import { productClientApi } from '@/features/product/api/product.client.api';
import { IProduct } from '@/features/product/product.types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        // Gọi API với limit: 8 để hiển thị 2 dòng (4 sp/dòng)
        const response = await productClientApi.getAll({
          limit: 8,
          page: 1
        });

        // Theo api.ts: response.data.data trả về { products, pagination }
        // Vậy ở đây ta lấy response.products
        if (response && response.products) {
          setProducts(response.products);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm mới nhất:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#fcfcfd]">
      <div className="max-w-[1300px] mx-auto px-6 pb-24 space-y-10">

        {/* 1. Banner quảng bá (Hero Section) */}
        <section className="pt-8">
          <HeroBanner />
        </section>

        {/* 2. Danh mục sản phẩm */}
        <section>
          <CategoryGrid />
        </section>

        {/* 3. Sản phẩm mới nhất */}
        <section className="bg-white rounded-xl p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.02)] border border-slate-50">
          <div className="flex items-center justify-between mb-12 border-b border-slate-50 pb-8">
            <h2 className="text-3xl font-black text-indigo-900 uppercase tracking-tighter">
              Sản phẩm mới nhất
            </h2>

            {/* Nút Xem tất cả: Cùng tone màu Indigo của HomePage */}
            <Link
              href="/products"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-700 rounded-full font-black text-[13px]  tracking-widest hover:bg-indigo-600 hover:text-white transition-all group"
            >
              Xem tất cả
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="min-h-[400px]">
            {/* 
                ProductList đã có sẵn grid-cols-4 ở bản Desktop 
                Khi truyền 8 sản phẩm, nó sẽ tự động xuống dòng thành 2 hàng.
             */}
            <ProductList products={products} loading={loading} />
          </div>
        </section>

      </div>
    </main>
  );
}