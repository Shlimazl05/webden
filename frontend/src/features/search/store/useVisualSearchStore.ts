import { create } from 'zustand';
import { IProduct } from '@/features/product/product.types';

interface VisualSearchState {
    results: IProduct[];
    previewImage: string | null; 
    categoryName: string | null; 
    setVisualData: (results: IProduct[], preview: string, category: string) => void;
    clearVisualData: () => void;
}

export const useVisualSearchStore = create<VisualSearchState>((set) => ({
    results: [],
    previewImage: null,
    categoryName: null,
    setVisualData: (results, preview, category) => set({ results, previewImage: preview, categoryName: category }),
    clearVisualData: () => set({ results: [], previewImage: null, categoryName: null  }),
}));