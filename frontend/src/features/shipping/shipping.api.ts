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

    // 3. Cập nhật quy tắc hiện có 
    updateRule: async (id: string, data: { minAmount: number; fee: number }) => {
        // Gửi yêu cầu PUT tới /shipping/:id kèm theo dữ liệu mới
        const res = await axiosInstance.put(`/shipping/${id}`, data);
        return res.data;
    },

    deleteRule: async (id: string) => {
        const res = await axiosInstance.delete(`/shipping/${id}`);
        return res.data;
    }
};