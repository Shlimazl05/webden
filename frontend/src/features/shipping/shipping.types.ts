// types/shipping.ts

export interface ShippingRule {
    id: string;
    minAmount: number; // Mức tiền tối thiểu của giỏ hàng
    fee: number;       // Phí ship tương ứng
    description?: string;
    isActive: boolean;
    createdAt?: string | Date;
}

// Kiểu dữ liệu khi gửi lên API để tạo mới (không cần ID)
export type CreateShippingInput = Omit<ShippingRule, 'id' | 'createdAt' | 'isActive'>;

// Kiểu dữ liệu khi cập nhật
export type UpdateShippingInput = Partial<CreateShippingInput>;

// Kiểu phản hồi từ API
export interface ShippingApiResponse {
    success: boolean;
    data?: ShippingRule[];
    message?: string;
}