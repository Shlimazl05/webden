
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

export interface ICartStore {
  cartCount: number;
  fetchCartCount: () => Promise<void>;
  clearCart: () => void;
  // addToCartLocal: (product: IProduct) => void;
}