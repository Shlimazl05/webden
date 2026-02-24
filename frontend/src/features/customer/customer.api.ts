import axiosInstance from "@/lib/axiosInstance";
import { Customer, UpdateStatusPayload } from "./customer.types";

export const customerApi = {
  // Lấy danh sách khách hàng
  getCustomers: async (): Promise<Customer[]> => {
    const response = await axiosInstance.get('/customers');
    return response.data;
  },

  // Cập nhật trạng thái (Khóa/Mở khóa)
  updateStatus: async (payload: UpdateStatusPayload): Promise<void> => {
    await axiosInstance.patch(`/customers/${payload.customerId}/status`, {
      status: payload.status
    });
  }
};