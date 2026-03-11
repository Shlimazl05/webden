// D:\webden\frontend\src\features\category\hooks\useCategoryProducts.ts
import { useState, useEffect, useCallback } from 'react';
import { categoryApi } from '../api/category.admin.api';
import { productClientApi } from '@/features/product/api/product.client.api';
import { ICategory } from '../category.types';
import { IProduct } from '@/features/product/product.types';

export const useCategoryProducts = (slug: string) => {
    const [category, setCategory] = useState<ICategory | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPrice, setSelectedPrice] = useState('');

    const parsePriceRange = (range: string) => {
        if (!range) return { minPrice: undefined, maxPrice: undefined };
        const [min, max] = range.split('-');
        return {
            // Ép kiểu số ngay tại đây để gửi lên API
            minPrice: min ? Number(min) : undefined,
            maxPrice: (max === 'up' || !max) ? undefined : Number(max)
        };
    };

    const loadCategory = useCallback(async () => {
        try {
            const catRes = await categoryApi.getAll(1, 100, '', 'Active');
            const found = catRes.categories.find(c => c.slug === slug);
            if (found) setCategory(found);
        } catch (error) {
            console.error("Lỗi lấy danh mục:", error);
        }
    }, [slug]);

    const loadProducts = useCallback(async () => {
        if (!category?._id) return;

        try {
            setLoading(true);
            const { minPrice, maxPrice } = parsePriceRange(selectedPrice);

            // Gửi yêu cầu lấy sản phẩm kèm bộ lọc giá
            const prodRes = await productClientApi.getAll({
                categoryId: category._id,
                limit: 20,
                minPrice,
                maxPrice
            });

            setProducts(prodRes.products || []);
        } catch (error) {
            console.error("Lỗi lấy sản phẩm:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [category?._id, selectedPrice]);

    useEffect(() => {
        if (slug) loadCategory();
    }, [slug, loadCategory]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return {
        category,
        products,
        loading,
        selectedPrice,
        setSelectedPrice,
        handleReset: () => setSelectedPrice('')
    };
};