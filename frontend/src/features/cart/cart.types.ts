// // Import kiểu dữ liệu từ feature khác nếu có liên quan
// import { IProduct } from "@/features/product/product.types"; 

// /**
//  * 1. Chi tiết từng dòng trong giỏ hàng (CartDetails)
//  */
// export interface ICartDetail {
//   _id: string;               // cartDetailId (ObjectId)
//   product: IProduct;         // Thông tin sản phẩm (đã populate)
//   quantity: number;          // Số lượng mua
//   unitPrice: number;         // Giá chốt tại thời điểm bỏ vào giỏ
//   selected: boolean;         // Trạng thái tích chọn trên UI (Frontend-only)
// }

// /**
//  * 2. Giỏ hàng tổng (Cart)
//  */
// export interface ICart {
//   _id: string;               // cartId (ObjectId)
//   userId: string;            // Chủ sở hữu giỏ hàng
//   items: ICartDetail[];      // Danh sách chi tiết giỏ hàng
//   createdAt?: string;
//   updatedAt?: string;
// }

// /**
//  * 3. Dữ liệu bổ sung để hiển thị trên giao diện (Optional)
//  * Dùng để tính toán nhanh ở các component như CartSummary
//  */
// export interface ICartSummary {
//   subTotal: number;          // Tổng tiền các món đang được 'selected'
//   totalItems: number;        // Tổng số lượng sản phẩm trong giỏ
// }

import { IProduct } from "@/features/product/product.types"; 

/**
 * 1. Chi tiết từng dòng trong giỏ hàng (CartDetails)
 */
export interface ICartDetail {
  _id: string;               
  product: IProduct;         
  quantity: number;          
  unitPrice: number;         
  selected: boolean; // Quan trọng để tính toán tiền hàng theo từng dòng chọn
}

/**
 * 2. Giỏ hàng tổng (Cart)
 */
export interface ICart {
  _id: string;               
  userId: string;            
  items: ICartDetail[];      
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 3. Tinh chỉnh ICartSummary cho khớp với UI ní vừa làm
 * Dùng để truyền dữ liệu vào Component CartSummary
 */
export interface ICartSummary {
  selectedCount: number;     // Số dòng sản phẩm được chọn (ní vừa yêu cầu thêm)
  subTotal: number;          // Tổng tiền các món đang chọn
  shippingFee: number;       // Phí vận chuyển (nhảy tự động 0đ hoặc 150k)
  totalAmount: number;       // Con số cuối cùng khách phải trả (subTotal + shippingFee)
}