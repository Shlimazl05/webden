// import { create } from 'zustand';
// import { IProduct } from '@/features/product/product.types';

// interface VisualSearchState {
//     results: IProduct[];
//     previewImage: string | null; 
//     categoryName: string | null; 
//     success: boolean; 
//     message: string | null;
//     setVisualData: (results: IProduct[], preview: string, category: string) => void;
//     clearVisualData: () => void;
// }

// export const useVisualSearchStore = create<VisualSearchState>((set) => ({
//     results: [],
//     previewImage: null,
//     categoryName: null,
//     success: true, 
//     message: null,
//     setVisualData: (results, preview, category) => set({ results, previewImage: preview, categoryName: category }),
//     clearVisualData: () => set({ results: [], previewImage: null, categoryName: null  }),
// }));


import { create } from 'zustand';
import { IProduct } from '@/features/product/product.types';

interface VisualSearchState {
    results: IProduct[];
    previewImage: string | null;
    categoryName: string | null;
    success: boolean;    // 👈 Thêm mới
    message: string | null; // 👈 Thêm mới
    // 👈 Cập nhật hàm này để nhận 5 tham số
    setVisualData: (results: IProduct[], preview: string, category: string, success: boolean, message: string) => void;
    clearVisualData: () => void;
}

export const useVisualSearchStore = create<VisualSearchState>((set) => ({
    results: [],
    previewImage: null,
    categoryName: null,
    success: true,   // Mặc định ban đầu là true
    message: null,
    // 👈 Cập nhật logic set dữ liệu
    setVisualData: (results, preview, category, success, message) =>
        set({
            results,
            previewImage: preview,
            categoryName: category,
            success,
            message
        }),
    clearVisualData: () => set({
        results: [],
        previewImage: null,
        categoryName: null,
        success: true,
        message: null
    }),
}));