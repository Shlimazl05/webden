// D:\webden\frontend\src\features\shipping\shipping.api.ts
import axiosInstance from "@/lib/axiosInstance";

export const shippingApi = {
    getRules: async () => {
        // Gọi đến baseURL/shipping
        const res = await axiosInstance.get('/shipping');
        return res.data; // Trả về { success: true, data: [] }
    },

    createRule: async (data: { minAmount: number; fee: number }) => {
        const res = await axiosInstance.post('/shipping', data);
        return res.data;
    },

    deleteRule: async (id: string) => {
        const res = await axiosInstance.delete(`/shipping/${id}`);
        return res.data;
    }
};