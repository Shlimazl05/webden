// // src/features/orders/api/order.admin.api.ts
// import axiosInstance from "@/lib/axiosInstance";
// import { IOrder, OrderStatus } from "../order.types";

// export const orderAdminApi = {
//   // Lấy toàn bộ đơn hàng (kèm phân trang, lọc trạng thái, tìm kiếm)
//   getAll: async (page = 1, limit = 10, status = '', search = '') => {
//     const res = await axiosInstance.get('/orders/admin/all', {
//       params: { page, limit, status, search }
//     });
//     return res.data.data;
//   },

//   // Admin cập nhật trạng thái (Ví dụ: Từ Chờ xác nhận -> Đang xử lý)
//   updateStatus: async (orderId: string, status: OrderStatus) => {
//     const res = await axiosInstance.patch(`/orders/admin/${orderId}/status`, { status });
//     return res.data.data;
//   },

//   // Xóa đơn hàng (Chỉ dùng khi đơn nháp hoặc lỗi dữ liệu)
//   delete: async (id: string) => {
//     await axiosInstance.delete(`/orders/admin/${id}`);
//   }
// };

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