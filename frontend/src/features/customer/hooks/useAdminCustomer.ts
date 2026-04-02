
import { useState, useEffect, useCallback } from 'react'; // Phải có các import này
import { ICustomer } from '../customer.types';
import { customerApi } from '../api/customer.admin.api';

export const useCustomerManagement = (page: number = 1) => {
  const [customers, setCustomers] = useState<ICustomer[] | null>(null);
  const [totalPages, setTotalPages] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Hàm để xóa tìm kiếm về rỗng
  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);
  // 1. Hàm fetch dữ liệu: Nhận từ khóa tìm kiếm và số trang
  const fetchCustomers = useCallback(async (search: string, p: number) => {
    try {
      setLoading(true);
      // Gọi API với tham số search, page và limit cố định là 5
      const res = await customerApi.getCustomers(search, p, 10);
      
      /**
       * LƯU Ý: Backend trả về { success: true, data: { customers: [], totalPages: x } }
       * Nên res ở đây chính là phần data (do file API đã .data rồi)
       */
      setCustomers(res.customers || []);
      setTotalPages(res.totalPages || 0);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu khách hàng:", error);
      setCustomers([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Tự động fetch lại khi searchTerm hoặc page thay đổi
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCustomers(searchTerm, page);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, page, fetchCustomers]); 


  // 3. Hàm xử lý khóa/mở khóa khách hàng
  const handleToggleStatus = async (id: string) => {
    const currentCustomer = customers?.find(c => c._id === id);
    if (!currentCustomer) return;

    const newStatus = currentCustomer.status === 'Active' ? 'Blocked' : 'Active';

    try {
      await customerApi.updateStatus({
        customerId: id,
        userId: id, 
        status: newStatus
      });

      // Cập nhật UI ngay lập tức mà không cần load lại trang
      setCustomers(prev => 
        prev ? prev.map(c => c._id === id ? { ...c, status: newStatus } : c) : null
      );
    } catch (error: any) {
      console.error("Lỗi cập nhật trạng thái:", error);
      // Nếu lỗi thì fetch lại để đồng bộ với Database
      fetchCustomers(searchTerm, page);
    }
  };

  return { 
    customers, 
    totalPages, 
    loading, 
    handleToggleStatus, 
    setSearchTerm,
    clearSearch,
    refresh: () => fetchCustomers(searchTerm, page)
  };
};