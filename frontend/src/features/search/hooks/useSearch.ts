"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { productClientApi } from '@/features/product/api/product.client.api'; // Dùng đúng file client api
import { IProduct } from '@/features/product/product.types';

export const useSearch = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [results, setResults] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setResults([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                // Gọi API từ lớp Client
                const res: any = await productClientApi.getAll({
                    search: query,
                    limit: 20
                });

                // --- FIX LỖI Ở ĐÂY ---
                // Vì productClientApi trả về response.data.data (là object {products, pagination})
                // Nên ta phải trỏ vào .products
                const actualProducts = res?.products || [];
                setResults(actualProducts);

                console.log("Kết quả tìm kiếm:", actualProducts); 
            } catch (error) {
                console.error("Lỗi API Search:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return { query, results, isLoading, count: results.length };
};