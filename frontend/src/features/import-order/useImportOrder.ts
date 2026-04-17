


import { useState, useEffect, useCallback } from 'react';
import { importOrderApi } from '../import-order/import-order.api';
import { IImportOrder } from '../import-order/import-order.types';
import toast from 'react-hot-toast';

export const useImportOrderFeature = () => {
  // --- 1. STATE DỮ LIỆU & PHÂN TRANG ---
  const [orders, setOrders] = useState<IImportOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState(''); // Text hiện trong ô input
  const [debouncedSearch, setDebouncedSearch] = useState(''); // Text thực tế để gọi API
  const itemsPerPage = 10;

  // --- 2. STATE MODALS ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /**
   * Logic Debounce: Đợi người dùng dừng gõ 500ms 
   * Tránh việc gọi API liên tục làm lag máy và lỗi kết quả
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Luôn reset về trang 1 khi từ khóa tìm kiếm thay đổi
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /**
   * Hàm Fetch chính: Gọi API lấy dữ liệu từ Backend
   */
  const fetchOrders = useCallback(async (page: number, search: string) => {
    try {
      setLoading(true);
      const res = await importOrderApi.getAll(page, itemsPerPage, search);
      
      if (res && res.orders) {
        setOrders(res.orders);
        setTotalPages(res.pagination?.totalPages || 1);
        setCurrentPage(res.pagination?.currentPage || 1);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Lỗi tải danh sách phiếu nhập:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Tự động gọi API khi Trang hiện tại thay đổi 
   * HOẶC khi Từ khóa tìm kiếm (đã debounce) thay đổi
   */
  useEffect(() => {
    fetchOrders(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch, fetchOrders]);

  // --- 3. CÁC HÀM XỬ LÝ SỰ KIỆN (HANDLERS) ---

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query); // Chỉ cập nhật text UI, việc fetch đã có useEffect lo
  };

  const handleCreate = async (data: any) => {
    try {
      await importOrderApi.create(data);
      // Sau khi tạo thành công, load lại dữ liệu ở trang 1, search rỗng
      setSearchTerm("");
      setCurrentPage(1);
      await fetchOrders(1, "");
    } catch (err) {
      throw err; // Ném lỗi để toast.promise ở Modal xử lý
    }
  };

  const executeDelete = async () => {
    if (!selectedId) return;
    try {
      await importOrderApi.delete(selectedId);
      toast.success("Đã xóa và hoàn tác kho hàng", {
        style: { borderRadius: '12px', background: '#1e293b', color: '#fff', fontWeight: 'bold' }
      });
      
      // Kiểm tra nếu xóa hết item ở trang hiện tại thì lùi trang
      if (orders.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        await fetchOrders(currentPage, debouncedSearch);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "LỖI KHI XÓA PHIẾU");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedId(null);
    }
  };

  return {
    // Data & State
    orders,
    loading,
    currentPage,
    totalPages,
    searchTerm,
    
    // Logic handlers
    handleSearch,
    handlePageChange,
    refresh: () => fetchOrders(currentPage, debouncedSearch),

    // Modal Add/Edit
    isModalOpen,
    handleOpenAdd: () => setIsModalOpen(true),
    handleCloseModal: () => setIsModalOpen(false),
    handleCreate,

    // Modal Delete
    isDeleteModalOpen,
    handleOpenDelete: (id: string) => { 
      setSelectedId(id); 
      setIsDeleteModalOpen(true); 
    },
    handleCloseDelete: () => {
      setIsDeleteModalOpen(false);
      setSelectedId(null);
    },
    executeDelete
  };
};