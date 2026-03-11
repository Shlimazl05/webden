// ĐỊNH NGHĨA KIỂU DỮ LIỆU
export interface IProduct {
  basePrice: any;
  slug: any;
  categoryId: any;
  _id: string;               // MongoDB tự sinh ra
  productCode: string;       // Mã sản phẩm
  productName: string;       // Tên sản phẩm
  salePrice: number;         // Giá bán
  stockQuantity: number;     // Số lượng kho
  imageUrl?: string;         // Link ảnh
  images?: string[];
  status: 'Active' | 'Hidden'; // Trạng thái
  specifications?: {         // Thông số kỹ thuật (Object linh hoạt)
    power?: string;          // Công suất (ví dụ: 10W)
    material?: string;       // Chất liệu (ví dụ: Pha lê)
    size?: string;           // Kích thước
    [key: string]: any;      // Cho phép thêm các trường khác linh hoạt
  };
  createdAt?: string;
  updatedAt?: string;
}