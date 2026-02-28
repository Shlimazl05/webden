import { axiosInstance } from "@/lib/axiosInstance";
import { ICategory } from "../category.types";

/**
 * Tầng giao tiếp API cho danh mục sản phẩm phía người dùng (Client)
 * Chỉ bao gồm các phương thức truy xuất dữ liệu công khai
 */
export const categoryApi = {
  /**
   * Lấy danh sách toàn bộ danh mục sản phẩm đang hoạt động
   * @returns Mảng các đối tượng ICategory
   */
  getCategories: async (): Promise<ICategory[]> => {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },

  /**
   * Lấy thông tin chi tiết một danh mục thông qua đường dẫn thân thiện (slug)
   * Phục vụ cho việc lọc sản phẩm hoặc SEO
   * @param slug - Chuỗi định danh của danh mục
   */
  getCategoryBySlug: async (slug: string): Promise<ICategory> => {
    const response = await axiosInstance.get(`/categories/slug/${slug}`);
    return response.data;
  }
};