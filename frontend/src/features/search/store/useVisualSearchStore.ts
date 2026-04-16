import { create } from 'zustand';
import { IProduct } from '@/features/product/product.types';

interface VisualSearchState {
    results: IProduct[];
    previewImage: string | null;
    setVisualData: (results: IProduct[], preview: string) => void;
    clearVisualData: () => void;
}

export const useVisualSearchStore = create<VisualSearchState>((set) => ({
    results: [],
    previewImage: null,
    setVisualData: (results, preview) => set({ results, previewImage: preview }),
    clearVisualData: () => set({ results: [], previewImage: null }),
}));