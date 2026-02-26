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
  employeeCode: string;
  position: string;
}

export interface UpdateUserStatusPayload {
  customerId: any;
  userId: string;
  status: UserStatus;
}