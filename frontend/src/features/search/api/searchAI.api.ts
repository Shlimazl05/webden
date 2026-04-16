import axiosInstance from "@/lib/axiosInstance";
import { IProduct } from "../../product/product.types";

export const searchApi = {
    visualSearch: async (file: File): Promise<IProduct[]> => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axiosInstance.post('/search/visual-search', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Backend trả về mảng sản phẩm trực tiếp hoặc trong data.data
        return response.data.data || response.data;
    }
};