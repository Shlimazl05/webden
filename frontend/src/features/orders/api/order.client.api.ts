import axiosInstance from "@/lib/axiosInstance";

export const orderClientApi = {
    // Lấy đơn hàng của cá nhân người dùng đang đăng nhập
    getMyOrders: async (page = 1, limit = 10, status = '') => {
        // Lưu ý: Endpoint này phải được Backend hỗ trợ (Lấy userId từ Token)
        const res = await axiosInstance.get('/orders/mine', {
            params: { page, limit, status }
        });
        return res.data;
    },

    // Khách hàng thường chỉ có quyền Hủy đơn khi đơn chưa được xác nhận
    cancelMyOrder: async (orderId: string) => {
        const res = await axiosInstance.patch(`/orders/mine${orderId}/cancel`);
        return res.data;
    }
};