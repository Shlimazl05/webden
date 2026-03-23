
export type UserStatus = 'Active' | 'Blocked';

export interface IUser {
  address?: string;
  _id: string;
  username: string;
  phone: string;
  email?: string; // khong bắt buộc
  role: 'Customer' | 'Admin';
  status: UserStatus;
  createdAt: string;
  updatedAt?: string; // Thêm updatedAt vì Schema có timestamps: true
}

export interface ICustomer extends IUser {
  name: string; // Đổi từ any sang string để chặt chẽ hơn
  address?: string; // không bắt buộc
  totalSpent: number;
  orderCount: number;
}

export interface IAdmin extends IUser {
  
}

export interface UpdateUserStatusPayload {
  customerId: any;
  userId: string; // Dùng userId là đủ để định danh
  status: UserStatus;
}

export interface UpdateProfilePayload {
  email?: string;
  address?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}