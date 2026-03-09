

// import axiosInstance from "@/lib/axiosInstance";
// import { ICategory, CreateCategoryPayload } from "../category.types";

// // Định nghĩa kiểu dữ liệu trả về kèm phân trang
// export interface PaginatedCategory {
//   categories: ICategory[];
//   pagination: {
//     currentPage: number;
//     totalPages: number;
//     totalCategories: number;
//     limit: number;
//   };
// }

// export const categoryApi = {
//   // 1. CẬP NHẬT: Thêm tham số search vào getAll
//   getAll: async (page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedCategory> => {
//     // Axios sẽ tự động nối params thành query string: /categories?page=1&limit=10&search=...
//     const response = await axiosInstance.get(`/categories`, {
//       params: { 
//         page, 
//         limit, 
//         search: search.trim() // Gửi từ khóa tìm kiếm lên server
//       }
//     });

//     // Trả về dữ liệu từ Backend { success: true, data: { categories, pagination } }
//     return response.data.data;
//   },

//   // 2. Tạo mới danh mục
//   create: async (data: CreateCategoryPayload): Promise<ICategory> => {
//     const response = await axiosInstance.post('/categories', data);
//     return response.data.data;
//   },

//   // 3. Cập nhật danh mục
//   update: async (id: string, data: Partial<CreateCategoryPayload>): Promise<ICategory> => {
//     const response = await axiosInstance.put(`/categories/${id}`, data);
//     return response.data.data;
//   },

//   // 4. Xóa danh mục
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
  /**
   * 1. Lấy danh sách danh mục (có Phân trang + Tìm kiếm)
   */
  getAll: async (page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedCategory> => {
    const response = await axiosInstance.get(`/categories`, {
      params: { 
        page, 
        limit, 
        search: search.trim() 
      }
    });
    // Trả về dữ liệu từ Backend { success: true, data: { categories, pagination } }
    return response.data.data;
  },

  /**
   * 2. Tạo mới danh mục (Gửi kèm name, description, status, image)
   */
  create: async (data: CreateCategoryPayload): Promise<ICategory> => {
    // Nếu bạn gửi ảnh dưới dạng base64, data này sẽ là JSON
    const response = await axiosInstance.post('/categories', data);
    return response.data.data;
  },

  /**
   * 3. Cập nhật danh mục
   * Dùng chung cho cả Sửa thông tin và Ẩn/Hiện trạng thái
   */
  update: async (id: string, data: Partial<CreateCategoryPayload>): Promise<ICategory> => {
    const response = await axiosInstance.put(`/categories/${id}`, data);
    return response.data.data;
  },

  /**
   * 4. Xóa danh mục (Giữ lại để dùng khi thực sự cần xóa cứng)
   */
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/${id}`);
  }
};