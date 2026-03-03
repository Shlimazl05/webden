import { IProduct } from "../product/product.types";
import { ISupplier } from "../supplier/supplier.types";

/**
 * Trạng thái của đơn nhập hàng
 * Draft: Bản nháp (chưa tăng kho)
 * Completed: Đã nhập kho (đã cộng số lượng vào bảng Product)
 * Cancelled: Đã hủy (đã trừ kho ngược lại nếu trước đó là Completed)
 */
export type ImportStatus = 'Draft' | 'Completed' | 'Cancelled';

/**
 * Chi tiết từng mặt hàng trong hóa đơn nhập
 */
export interface IImportDetail {
  _id: string;
  productId: string | IProduct; // Có thể là ID hoặc Object đã populate
  quantity: number;             // Số lượng nhập
  importPrice: number;          // Giá vốn nhập vào
  subTotal: number;             // Thành tiền (quantity * importPrice)
  newSalePrice?: number;        // Giá bán mới (tùy chọn cập nhật lại giá web)
}

/**
 * Thông tin tổng quát của Hóa đơn nhập
 */
export interface IImportOrder {
  _id: string;
  importCode: string;           // Mã phiếu (VD: PN-001)
  importDate: string;           // Ngày nhập
  supplierId: string | ISupplier; // Thông tin nhà cung cấp
  totalAmount: number;          // Tổng giá trị đơn hàng
  status: ImportStatus;         // Trạng thái
  note?: string;                // Ghi chú
  details: IImportDetail[];     // Danh sách các món hàng
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Dữ liệu gửi lên khi tạo mới hóa đơn
 */
export interface CreateImportOrderPayload {
  supplierId: string;
  note?: string;
  status: ImportStatus;
  items: {
    productId: string;
    quantity: number;
    importPrice: number;
    newSalePrice?: number;
  }[];
}

/**
 * Phân trang cho danh sách hóa đơn
 */
export interface PaginatedImportOrder {
  orders: IImportOrder[];
  pagination: {
    totalOrders: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}