import axiosInstance from "@/lib/axiosInstance";

export const orderAdminApi = {
  /**
   * Lấy toàn bộ danh sách đơn hàng toàn hệ thống
   * @param params Bao gồm filter theo status, searchQuery, pagination
   */
  getAllOrders: async (params: any) => {
    const response = await axiosInstance.get('/admin/orders', { params });
    return response.data;
  },

  /**
   * Cập nhật trạng thái đơn hàng (Xác nhận, Đang giao, Hủy...)
   * @param id ID của đơn hàng
   * @param status Trạng thái mới
   */
  updateStatus: async (id: string, status: string) => {
    const response = await axiosInstance.patch(`/admin/orders/${id}`, { status });
    return response.data;
  },

  /**
   * Xem chi tiết một đơn hàng cụ thể kèm thông tin khách hàng
   */
  getOrderDetail: async (id: string) => {
    const response = await axiosInstance.get(`/admin/orders/${id}`);
    return response.data;
  }
};