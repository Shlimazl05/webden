/**
 * ĐỊNH NGHĨA KIỂU DỮ LIỆU NHÀ CUNG CẤP (SUPPLIER)
 * Bám sát sơ đồ lớp và thực tế quản lý kho
 */
export interface ISupplier {
  _id: string;               // MongoDB ObjectId
  name: string;            // Tên nhà cung cấp (Sơ đồ: nameSL)
  phone: string;             // Số điện thoại liên hệ
  email: string;             // Địa chỉ email giao dịch
  address: string;           // Địa chỉ kho/văn phòng
  status: 'Active' | 'Hidden'; // Trạng thái hợp tác
  createdAt?: string;        // Ngày tạo dữ liệu
  updatedAt?: string;        // Ngày cập nhật cuối cùng
}

/**
 * Payload dùng để gửi lên Server khi Thêm mới hoặc Cập nhật
 */
export interface CreateSupplierPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  status: 'Active' | 'Hidden';
}

/**
 * Kiểu dữ liệu trả về cho danh sách có phân trang (Nếu cần)
 */
export interface PaginatedSupplier {
  suppliers: ISupplier[];
  pagination: {
    totalSuppliers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}