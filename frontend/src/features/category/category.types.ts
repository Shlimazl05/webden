// export interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   description?: string;
//   productCount?: number; // Thêm trường này để quản trị viên biết danh mục có bao nhiêu đèn
//   status: 'Active' | 'Hidden';
//   createdAt: string;
// }

// // Kiểu dữ liệu để gửi lên khi tạo mới
// export interface CreateCategoryPayload {
//   name: string;
//   description?: string;
//   status?: string;
// }

/**
 * Interface đại diện cho một danh mục sản phẩm trong hệ thống
 */
export interface ICategory {
  image?: string;
  _id: string;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;    // Thêm để hiển thị icon tương ứng (Lucide icon name)
  productCount?: number; // Số lượng đèn thuộc danh mục này
  status: 'Active' | 'Hidden';
  createdAt: string;
}

/**
 * Dữ liệu yêu cầu khi tạo mới danh mục
 */
export interface CreateCategoryPayload {
  name: string;
  image?: string;
  description?: string;
  iconName?: string;
  status?: 'Active' | 'Hidden';
}