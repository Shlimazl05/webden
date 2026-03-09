// // ĐĂNG KÝ
// export interface RegisterInput {
//   username: string;
//   phone: string;
//   password?: string; // Tùy chọn nếu bạn muốn tách logic
// }

// export interface AuthResponse {
//   message: string;
//   data?: any;
// }

// //LOGIN
// export interface LoginInput {
//   identifier: string; // Tên đăng nhập hoặc Số điện thoại
//   password: string;
// }

// src/features/auth/auth.types.ts

export interface User {
  _id: string;      // Thống nhất dùng _id như MongoDB
  username: string;
  phone: string;
  role: string;     // Để phân quyền admin/user
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: User;       // Thay 'any' bằng interface User cụ thể
  message?: string;
}

// LOGIN
export interface LoginInput {
  identifier: string; 
  password: string;
}

// ĐĂNG KÝ
export interface RegisterInput {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
}