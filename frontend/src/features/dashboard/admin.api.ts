import axiosInstance from "@/lib/axiosInstance";

export const adminDashboardApi = {
    getStats: async () => {
        const res = await axiosInstance.get('/dashboard/stats');
        return res.data;
    }
};