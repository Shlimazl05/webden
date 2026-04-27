
import axiosInstance from "@/lib/axiosInstance";

export const adminDashboardApi = {
    // 1. Cập nhật kiểu dữ liệu từ number thành string | number
    getStats: async (days: string | number) => {
        // 2. Sử dụng template string để truyền tham số xuống Backend
        // Lưu ý: Đảm bảo Backend của bạn nhận tham số với tên 'range' 
        // (Trong file dashboardService.js mới, nó sẽ nhận giá trị này làm filterType)
        const res = await axiosInstance.get(`/dashboard/stats?range=${days}`);
        return res.data;
    }
};