import { axiosInstance } from "@/lib/axiosInstance";
import { ICheckoutForm, IOrderResponse } from "../checkout/checkout.types";

/**
 * Gửi thông tin form và danh sách sản phẩm được chọn lên backend để tạo đơn hàng
 */
export const createOrderApi = async (payload: ICheckoutForm): Promise<IOrderResponse> => {
    // Đổi endpoint "/order/create" thành endpoint thật của backend
    const response = await axiosInstance.post("/orders/create", payload);
    return response.data;
};