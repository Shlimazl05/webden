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
import { Category, CreateCategoryPayload } from "../category.types";

export const categoryApi = {
  // 1. Lấy danh sách danh mục
  getAll: async (): Promise<Category[]> => {
    const response = await axiosInstance.get('/categories');
    // Backend trả về { success: true, data: [...] } 
    // nên ta cần lấy đúng trường data
    return response.data.data || response.data;
  },

  // 2. Tạo mới danh mục
  create: async (data: CreateCategoryPayload): Promise<Category> => {
    const response = await axiosInstance.post('/categories', data);
    return response.data.data || response.data;
  },

  // 3. Cập nhật danh mục (Dành cho nút Cây viết)
  update: async (id: string, data: Partial<CreateCategoryPayload>): Promise<Category> => {
    const response = await axiosInstance.put(`/categories/${id}`, data);
    return response.data.data || response.data;
  },

  // 4. Xóa danh mục
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/${id}`);
  }
};