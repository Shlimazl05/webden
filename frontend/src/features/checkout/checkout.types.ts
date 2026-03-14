
export type PaymentMethod = 'COD' | 'SePay';
export interface ICheckoutForm {
    recipientName: string;
    phone: string;
    address: string;
    note: string;
    paymentMethod: PaymentMethod;
    items?: any[];
    totalAmount?: number;
    finalAmount?: number;
}

export interface IOrderResponse {
    success: boolean;
    message: string;
    data?: any; // Đổi thành Type đơn hàng thực tế của backend sau
}