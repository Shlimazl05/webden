// export interface Customer {
//   _id: string;
//   name: string;
//   email?: string;
//   phone: string;
//   address?: string;
//   totalSpent: number;
//   orderCount: number;
//   status: 'Active' | 'Blocked';
//   createdAt: string;
// }

// export interface UpdateStatusPayload {
//   customerId: string;
//   status: 'Active' | 'Blocked';
// }

export type UserStatus = 'Active' | 'Blocked';

export interface IUser {
  _id: string;
  username: string;
  phone: string;
  email?: string;
  role: 'Customer' | 'Admin';
  status: UserStatus;
  createdAt: string;
}

export interface ICustomer extends IUser {
  name: any;
  address?: string;
  totalSpent: number;
  orderCount: number;
}

export interface IAdmin extends IUser {
  

}

export interface UpdateUserStatusPayload {
  customerId: any;
  userId: string;
  status: UserStatus;
}




// export type UserStatus = 'Active' | 'Blocked';

// export interface IUser {
//   _id: string;
//   username: string;
//   phone: string;
//   email?: string; // khong bắt buộc
//   role: 'Customer' | 'Admin';
//   status: UserStatus;
//   createdAt: string;
//   updatedAt?: string; // Thêm updatedAt vì Schema có timestamps: true
// }

// export interface ICustomer extends IUser {
//   name: string; // Đổi từ any sang string để chặt chẽ hơn
//   address?: string; // không bắt buộc
//   totalSpent: number;
//   orderCount: number;
// }

// export interface IAdmin extends IUser {
  
// }

// export interface UpdateUserStatusPayload {
//   userId: string; // Dùng userId là đủ để định danh
//   status: UserStatus;
// }