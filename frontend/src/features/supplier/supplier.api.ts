import axiosInstance from "@/lib/axiosInstance";
import { 
  ISupplier, 
  CreateSupplierPayload, 
  PaginatedSupplier 
} from "../supplier/supplier.types";

/**
 * API SERVICE CHO NHÀ CUNG CẤP (SUPPLIER)
 * Đồng bộ cấu trúc với Category và Product
 */
export const supplierApi = {
  
  /**
   * 1. Lấy danh sách nhà cung cấp (kèm phân trang và tìm kiếm)
   * @param page - Trang hiện tại
   * @param limit - Số bản ghi mỗi trang
   * @param search - Từ khóa tìm kiếm (tên hoặc số điện thoại)
   */
  getAll: async (
    page: number = 1, 
    limit: number = 10, 
    search: string = ''
  ): Promise<PaginatedSupplier> => {
    const response = await axiosInstance.get('/suppliers', {
      params: { 
        page, 
        limit, 
        search: search.trim() 
      }
    });
    // Trả về data từ Backend { success: true, data: { suppliers, pagination } }
    return response.data.data;
  },

  /**
   * 2. Thêm nhà cung cấp mới
   * @param data - Thông tin nhà cung cấp từ Modal
   */
  create: async (data: CreateSupplierPayload): Promise<ISupplier> => {
    const response = await axiosInstance.post('/suppliers', data);
    return response.data.data;
  },

  /**
   * 3. Cập nhật thông tin nhà cung cấp
   * @param id - ID nhà cung cấp cần sửa
   * @param data - Dữ liệu mới (tên, sđt, địa chỉ, trạng thái...)
   */
  update: async (id: string, data: Partial<CreateSupplierPayload>): Promise<ISupplier> => {
    // Sử dụng PUT để ghi đè hoặc PATCH tùy theo Backend của bạn
    const response = await axiosInstance.put(`/suppliers/${id}`, data);
    return response.data.data;
  },

  /**
   * 4. Xóa nhà cung cấp
   * @param id - ID nhà cung cấp cần xóa
   */
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/suppliers/${id}`);
  },

  /**
   * 5. Lấy chi tiết 1 nhà cung cấp (Nếu cần dùng sau này)
   */
  getById: async (id: string): Promise<ISupplier> => {
    const response = await axiosInstance.get(`/suppliers/${id}`);
    return response.data.data;
  }
};