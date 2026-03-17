// import axiosInstance from "@/lib/axiosInstance";

// export const adminDashboardApi = {
//     getStats: async (days: number) => {
//         const res = await axiosInstance.get('/dashboard/stats');
//         return res.data;
//     }
// };

import axiosInstance from "@/lib/axiosInstance";

export const adminDashboardApi = {
    // Truyền tham số days vào URL dưới dạng query parameter
    getStats: async (days: number) => {
        // Sử dụng template string để nối chuỗi: ?range=30
        const res = await axiosInstance.get(`/dashboard/stats?range=${days}`);
        return res.data;
    }
};