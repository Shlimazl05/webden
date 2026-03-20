


import { ReactNode } from "react";
import { IProduct } from "../product/product.types";

export type OrderStatus = 'Pending' | 'Processing' | 'Shipping' | 'Completed' | 'Cancelled';
export type PaymentMethod = 'COD' | 'SePay';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Partially_Paid';

export interface IOrderDetail {
  _id: string;
  productId: string | IProduct;
  quantity: number;
  unitPrice: number; // Giá chốt lúc khách bấm mua
}

export interface IOrder {
  checkoutUrl: any;
  recipientName: ReactNode;
  note?: string;
  _id: string;
  orderCode: string;           // Mã đơn: STL-1234
  customerId: any;             // Thông tin khách hàng
  orderDate: string;
  totalAmount: number;         // Tổng tiền hàng
  shippingFee: number;
  finalAmount: number;         // Tổng thanh toán (Tien hang + ship)
  address: string;
  phone: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    updatedAt: string;
    note: string;
  }[];
  orderDetails: IOrderDetail[];
  createdAt: string;
}