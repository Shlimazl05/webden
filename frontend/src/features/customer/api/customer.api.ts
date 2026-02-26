import { axiosInstance } from "@/lib/axiosInstance";
import { ICustomer } from "../customer.types";

export const customerApi = {
  /**
   * Lấy thông tin hồ sơ của người dùng hiện tại
   */
  getMe: async (): Promise<ICustomer> => {
    const response = await axiosInstance.get('/customers/me');
    return response.data;
  },

  /**
   * Cập nhật thông tin hồ sơ cá nhân
   * Sử dụng Partial<ICustomer> để cho phép cập nhật một vài trường lẻ
   */
  updateProfile: async (payload: Partial<ICustomer>): Promise<ICustomer> => {
    const response = await axiosInstance.patch('/customers/me', payload);
    return response.data;
  }
};