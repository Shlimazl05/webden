// src/features/orders/hooks/useAdminOrder.ts
import { useState, useEffect, useCallback } from 'react';
import { orderAdminApi } from '../api/order.admin.api';
import { IOrder, OrderStatus } from '../order.types';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import router from 'next/router';

export const useAdminOrder = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedOrderId = searchParams.get('id');
  // Debounce search 500ms
  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(searchTerm); setCurrentPage(1); }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await orderAdminApi.getAll(
        currentPage, 
        10, 
        activeTab === 'all' ? '' : activeTab, 
        debouncedSearch
      );
      
      console.log("Dữ liệu nhận được từ API:", res); // DEBUG TẠI ĐÂY

      // Kiểm tra xem res có đúng cấu trúc { orders, pagination } không
      if (res && res.orders) {
        setOrders(res.orders);
        setTotalPages(res.pagination?.totalPages || 1);
      } else if (Array.isArray(res)) {
        // Trường hợp API trả về thẳng mảng
        setOrders(res);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err); // PHẢI CÓ DÒNG NÀY ĐỂ DEBUG
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeTab, debouncedSearch]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
  //   try {
  //     await orderAdminApi.updateStatus(orderId, status);
  //     toast.success("CẬP NHẬT TRẠNG THÁI THÀNH CÔNG");
  //     fetchOrders();
  //   } catch (err: any) {
  //     const msg = err.response?.data?.message || "KHÔNG THỂ CẬP NHẬT";
  //     toast.error(msg.toUpperCase());
  //   }
  // };
  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    // 1. Loading toast với thông điệp nhẹ nhàng hơn
    const toastId = toast.loading("Đang xử lý đơn hàng...");

    try {
      await orderAdminApi.updateStatus(orderId, status);
      
      // 2. Success Toast: Tông màu trắng - xanh lá (kiểu tối giản chuyên nghiệp)
      toast.success("Xác nhận đơn hàng thành công", {
        id: toastId,
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#ffffff',
          color: '#334155', // Slate-700 (màu chữ hiện đại)
          borderLeft: '5px solid #10b981', // Điểm nhấn xanh lá ở cạnh trái
          padding: '12px 20px',
          fontWeight: '500',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
      });

      fetchOrders();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Không thể thực hiện thao tác này";

      // 3. Error Toast: Thay "LỖI HỆ THỐNG" bằng tiêu đề nghiệp vụ
      // Sử dụng emoji liên quan đến kho hàng thay vì dấu chấm than cảnh báo
      toast.error(`Kho hàng không đủ\n${msg}`, {
        id: toastId,
        duration: 6000,
        icon: '📦', // Icon hộp hàng cho liên quan đến kho
        style: {
          borderRadius: '10px',
          background: '#ffffff', // Nền trắng nhìn sang hơn nền hồng
          color: '#334155', 
          borderLeft: '5px solid #ef4444', // Điểm nhấn đỏ ở cạnh trái
          padding: '12px 20px',
          whiteSpace: 'pre-line', // Quan trọng để xuống dòng
          lineHeight: '1.6',
          textAlign: 'left',
          fontSize: '14px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
      });
    }
  };

  // Hàm chọn đơn hàng
  const goToDetail = (id: string) => {
    router.push(`/admin/orders?id=${id}`);
  };// Hàm quay lại danh sách
  const goBackToList = () => {
    router.push('/admin/orders');
  };

  return {
    orders, loading, currentPage, totalPages, activeTab, searchTerm, selectedOrderId, goToDetail, goBackToList,
    handleSearch: setSearchTerm,
    handlePageChange: setCurrentPage,
    handleTabChange: (tab: string) => { setActiveTab(tab); setCurrentPage(1); },
    handleUpdateStatus,
    refresh: fetchOrders
  };
};