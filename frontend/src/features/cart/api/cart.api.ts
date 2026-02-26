import { axiosInstance } from "@/lib/axiosInstance"; 
import { ICart } from "../cart.types";

/**
 * Tầng giao tiếp API cho tính năng Giỏ hàng
 * Sử dụng axiosInstance đã cấu hình sẵn Interceptors để tự động xử lý Token
 */

/**
 * 1. Lấy toàn bộ dữ liệu giỏ hàng của người dùng
 * Backend sẽ tự nhận diện User qua Token trong Header
 */
export const getCartApi = async (): Promise<ICart> => {
  const response = await axiosInstance.get("/cart");
  // Vì trong interceptor ní 'return response', nên ở đây mình lấy .data
  return response.data; 
};

/**
 * 2. Thêm một sản phẩm mới vào giỏ hàng
 * @param payload { productId: string, quantity: number }
 */
export const addToCartApi = async (payload: { productId: string; quantity: number }) => {
  const response = await axiosInstance.post("/cart/add", payload);
  return response.data;
};

/**
 * 3. Cập nhật số lượng của một dòng trong chi tiết giỏ hàng (CartDetail)
 * Sử dụng PATCH để cập nhật một phần dữ liệu
 */
export const updateCartItemApi = async (cartDetailId: string, quantity: number) => {
  const response = await axiosInstance.patch(`/cart/item/${cartDetailId}`, {
    quantity,
  });
  return response.data;
};

/**
 * 4. Xóa hoàn toàn một mục khỏi giỏ hàng
 */
export const removeCartItemApi = async (cartDetailId: string) => {
  const response = await axiosInstance.delete(`/cart/item/${cartDetailId}`);
  return response.data;
};

/**
 * 5. Xóa danh sách các mục đã chọn (Batch Delete)
 * Phục vụ tính năng "Xóa mục đã chọn" trên giao diện
 */
export const removeSelectedItemsApi = async (cartDetailIds: string[]) => {
  const response = await axiosInstance.post("/cart/remove-selected", {
    ids: cartDetailIds,
  });
  return response.data;
};

/**
 * 6. Đồng bộ trạng thái 'selected' lên server
 * (Nếu Backend hỗ trợ lưu trạng thái tích chọn)
 */
export const toggleSelectItemApi = async (cartDetailId: string, isSelected: boolean) => {
  const response = await axiosInstance.patch(`/cart/item/${cartDetailId}/select`, {
    isSelected,
  });
  return response.data;
};