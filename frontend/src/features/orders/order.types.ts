import { IProduct } from "@/features/product/product.types";

/**
 * Chi tiết sản phẩm trong đơn hàng
 * Tương ứng class OrderDetails trong sơ đồ
 */
export interface IOrderDetail {
  _id: string;              // orderDetailId: ObjectId
  quantity: number;         // quantity: Number
  unitPrice: number;        // unitPrice: Number (Giá chốt lúc mua)
  product: IProduct;        // Liên kết thực thể Product
}

/**
 * Thông tin đơn hàng chính
 * Tương ứng class Order trong sơ đồ
 */
export interface IOrder {
  items: any;
  _id: string;              // orderId: ObjectId
  orderCode: string;        // orderCode: String
  orderDate: string;        // orderDate: Date
  totalAmount: number;      // totalAmount: Number
  shippingFee: number;      // shippingFee: Number
  address: string;          // address: String
  paymentMethod: string;    // paymentMethod: String
  phone: string;            // phone: String
  status: string;           // status: String
  statusHistory: string;    // statusHistory: String
  
  // Quan hệ 1...* với OrderDetails
  orderDetails: IOrderDetail[]; 
  
  // ID tham chiếu đến các class khác (không chứa object để tách biệt)
  customerId: string;
  paymentId?: string;
}