// import axiosInstance from "@/lib/axiosInstance";
// import { Category, CreateCategoryPayload } from "../category.types";

// export const categoryApi = {
//   // Lấy danh sách danh mục
//   getAll: async (): Promise<Category[]> => {
//     const response = await axiosInstance.get('/categories');
//     return response.data;
//   },

//   // Tạo mới danh mục
//   create: async (data: CreateCategoryPayload): Promise<Category> => {
//     const response = await axiosInstance.post('/categories', data);
//     return response.data;
//   },

//   // Xóa danh mục
//   delete: async (id: string): Promise<void> => {
//     await axiosInstance.delete(`/categories/${id}`);
//   }
// };
import axiosInstance from "@/lib/axiosInstance";
import { ICategory, CreateCategoryPayload } from "../category.types";

// Định nghĩa kiểu dữ liệu trả về kèm phân trang
export interface PaginatedCategory {
  categories: ICategory[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCategories: number;
    limit: number;
  };
}

export const categoryApi = {
  // 1. Cập nhật getAll để nhận tham số page và limit
  getAll: async (page: number = 1, limit: number = 10): Promise<PaginatedCategory> => {
    // Gọi API với query string: /categories?page=1&limit=10
    const response = await axiosInstance.get(`/categories`, {
      params: { page, limit }
    });

    // Cấu trúc trả về từ Backend nên là: 
    // { success: true, data: { categories: [...], pagination: {...} } }
    return response.data.data;
  },

  // 2. Tạo mới danh mục
  create: async (data: CreateCategoryPayload): Promise<ICategory> => {
    const response = await axiosInstance.post('/categories', data);
    return response.data.data;
  },

  // 3. Cập nhật danh mục
  update: async (id: string, data: Partial<CreateCategoryPayload>): Promise<ICategory> => {
    const response = await axiosInstance.put(`/categories/${id}`, data);
    return response.data.data;
  },

  // 4. Xóa danh mục
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/${id}`);
  }
};