
import axiosInstance from "@/lib/axiosInstance";

export const orderAdminApi = {
  getAll: async (page = 1, limit = 10, status = '', search = '') => {
    const res = await axiosInstance.get('/orders/admin/all', {
      params: { page, limit, status, search }
    });
    return res.data.data;
  },

  updateStatus: async (orderId: string, status: string) => {
    const res = await axiosInstance.patch(`/orders/admin/${orderId}/status`, { status });
    return res.data.data;
  }
};