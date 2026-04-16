import axiosInstance from "@/lib/axiosInstance";
import { IProduct } from "../product.types";

export const productClientApi = {
    // Lấy danh sách sản phẩm (có lọc theo danh mục, giá, chất liệu)
    getAll: async (params: {
        categoryId?: string;
        status?: string;
        search?: string;
        limit?: number; 
        page?: number;
        minPrice?: number;
        maxPrice?: number;
        material?: string;
    }) => {
        const response = await axiosInstance.get(`/products`, {
            params: { ...params, limit: params.limit || 20, status: 'Active' }
        });
        return response.data.data; // Trả về { products, pagination }
    },

    // Lấy chi tiết 1 sản phẩm theo ID
    getById: async (id: string): Promise<IProduct> => {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data.data;
    },

    visualSearch: async (file: File): Promise<IProduct[]> => {
        const formData = new FormData();
        formData.append('image', file); // 'image' phải khớp với upload.single('image') ở Backend

        const response = await axiosInstance.post('/search/visual-search', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Trả về mảng sản phẩm tương đồng
        return response.data.data || response.data;
    }

};