// import { IProduct } from "@/features/product/product.types";

// /**
//  * Chi tiết sản phẩm trong đơn hàng
//  * Tương ứng class OrderDetails trong sơ đồ
//  */
// export interface IOrderDetail {
//   _id: string;              // orderDetailId: ObjectId
//   quantity: number;         // quantity: Number
//   unitPrice: number;        // unitPrice: Number (Giá chốt lúc mua)
//   product: IProduct;        // Liên kết thực thể Product
// }

// /**
//  * Thông tin đơn hàng chính
//  * Tương ứng class Order trong sơ đồ
//  */
// export interface IOrder {
//   items: any;
//   _id: string;              // orderId: ObjectId
//   orderCode: string;        // orderCode: String
//   orderDate: string;        // orderDate: Date
//   totalAmount: number;      // totalAmount: Number
//   shippingFee: number;      // shippingFee: Number
//   address: string;          // address: String
//   paymentMethod: string;    // paymentMethod: String
//   phone: string;            // phone: String
//   status: string;           // status: String
//   statusHistory: string;    // statusHistory: String
  
//   // Quan hệ 1...* với OrderDetails
//   orderDetails: IOrderDetail[]; 
  
//   // ID tham chiếu đến các class khác (không chứa object để tách biệt)
//   customerId: string;
//   paymentId?: string;
// }


import { IProduct } from "../product/product.types";

export type OrderStatus = 'Pending' | 'Processing' | 'Shipping' | 'Completed' | 'Cancelled';
export type PaymentMethod = 'COD' | 'SEPAY';

export interface IOrderDetail {
  _id: string;
  productId: string | IProduct;
  quantity: number;
  unitPrice: number; // Giá chốt lúc khách bấm mua
}

export interface IOrder {
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
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    updatedAt: string;
    note: string;
  }[];
  orderDetails: IOrderDetail[];
  createdAt: string;
}