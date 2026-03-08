// D:\webden\frontend\src\features\customer\api\customer.admin.api.ts
import axiosInstance from "@/lib/axiosInstance";
import { ICustomer, UpdateUserStatusPayload } from "../customer.types";

export const customerApi = {
  /**
   * Lấy danh sách khách hàng có lọc theo tìm kiếm và phân trang
   * @param search Từ khóa tìm kiếm (tên, sđt...)
   * @param page Trang hiện tại (mặc định là 1)
   * @param limit Số lượng bản ghi mỗi trang (mặc định là 5)
   */
  getCustomers: async (search?: string, page: number = 1, limit: number = 10): Promise<any> => {
    const response = await axiosInstance.get('/customers', {
      params: { 
        search, 
        page, 
        limit 
      }
    });
    
    // Trả về data.data (Backend của bạn trả về { success: true, data: { customers, totalPages } })
    return response.data.data; 
  },

  /**
   * Cập nhật trạng thái (Khóa/Mở khóa)
   */
  updateStatus: async (payload: UpdateUserStatusPayload): Promise<void> => {
    await axiosInstance.patch(`/customers/${payload.customerId}/status`, {
      status: payload.status
    });
  }
};