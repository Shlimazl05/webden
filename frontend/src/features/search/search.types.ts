


import { IProduct } from "@/features/product/product.types";

// Cấu trúc mới khớp hoàn toàn với phản hồi từ Backend Controller
export interface IVisualSearchResponse {
    success: boolean;       // Trạng thái tìm kiếm (true/false)
    message: string;        // Thông báo hiển thị (Tìm thấy... hoặc Không tìm thấy...)
    products: IProduct[];   // Danh sách 10 sản phẩm tương đồng nhất
    categoryName?: string;  // Tên danh mục mà AI nhận diện được
}