// import axiosInstance from "@/lib/axiosInstance";
// import { IProduct } from "@/features/product/product.types";

// export const productApi = {
//   getAll: async (): Promise<IProduct[]> => {
//     const response = await axiosInstance.get('/products');
//     return response.data;
//   },
//   delete: async (id: string): Promise<void> => {
//     await axiosInstance.delete(`/products/${id}`);
//   }
// };


import axiosInstance from "@/lib/axiosInstance";
import { IProduct } from "@/features/product/product.types";

/**
 * Định nghĩa các hàm gọi API cho sản phẩm
 * Sau này khi có Backend thật, bạn chỉ cần thay đổi các URL bên dưới
 */
export const productApi = {
  
  // 1. Lấy tất cả danh sách sản phẩm (Admin thường lấy hết cả Inactive)
  // Có hỗ trợ truyền params để tìm kiếm hoặc lọc sau này
  getAllProducts: async (params?: any): Promise<IProduct[]> => {
    const response = await axiosInstance.get("/products", { params });
    // Tùy vào cấu trúc Backend của bạn, thường là response.data hoặc response.data.data
    return response.data.data || response.data;
  },

  // 2. Lấy chi tiết 1 sản phẩm theo ID (dùng khi bấm xem chi tiết)
  getProductById: async (id: string): Promise<IProduct> => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data.data || response.data;
  },

  // 3. Thêm sản phẩm mới (Nhận dữ liệu từ AddProductModal)
  createProduct: async (productData: Partial<IProduct>): Promise<IProduct> => {
    const response = await axiosInstance.post("/products", productData);
    return response.data;
  },

  // 4. Cập nhật sản phẩm (Dùng khi sửa)
  updateProduct: async (id: string, productData: Partial<IProduct>): Promise<IProduct> => {
    const response = await axiosInstance.patch(`/products/${id}`, productData);
    return response.data;
  },

  // 5. Xóa sản phẩm
  deleteProduct: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/products/${id}`);
  }
};