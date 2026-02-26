import { useState, useEffect } from 'react';
import { ICustomer } from '../customer.types';
import { customerApi } from '../api/customer.admin.api';

export const useCustomerManagement = () => {
  const [customers, setCustomers] = useState<ICustomer[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      // KHI CÓ BACKEND: const data = await customerApi.getCustomers();
      
      // HIỆN TẠI: Dữ liệu giả lập
      const data: ICustomer[] = [
        {
          _id: '1', name: 'Hồ Cẩm Trúc', email: 'truc.ho@gmail.com', phone: '0901234567', totalSpent: 25500000, orderCount: 3, status: 'Active', createdAt: '15/01/2024',
          username: '',
          role: 'Customer'
        },
        {
          _id: '2', name: 'Nguyễn Văn An', email: 'an.nguyen@yahoo.com', phone: '0988777666', totalSpent: 1200000, orderCount: 1, status: 'Active', createdAt: '10/02/2024',
          username: '',
          role: 'Customer'
        },
      ];
      setCustomers(data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu khách hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleToggleStatus = (id: string) => {
    // Logic giả lập thay đổi trạng thái trên UI
    setCustomers(prev => 
      prev ? prev.map(c => c._id === id ? { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' } : c) : null
    );
    console.log("Cập nhật trạng thái khách hàng:", id);
  };

  return { customers, loading, handleToggleStatus, refresh: fetchCustomers };
};