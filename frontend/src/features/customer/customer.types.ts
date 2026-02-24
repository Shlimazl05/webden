export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  orderCount: number;
  status: 'Active' | 'Blocked';
  createdAt: string;
}

export interface UpdateStatusPayload {
  customerId: string;
  status: 'Active' | 'Blocked';
}