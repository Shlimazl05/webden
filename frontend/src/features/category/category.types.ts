export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  productCount?: number; // Thêm trường này để quản trị viên biết danh mục có bao nhiêu đèn
  status: 'Active' | 'Hidden';
  createdAt: string;
}

// Kiểu dữ liệu để gửi lên khi tạo mới
export interface CreateCategoryPayload {
  name: string;
  description?: string;
  status?: string;
}