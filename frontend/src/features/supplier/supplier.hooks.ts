
// import { useState, useEffect, useCallback } from 'react';
// import { ISupplier, CreateSupplierPayload } from '../supplier/supplier.types';
// import { supplierApi } from '../supplier/supplier.api';
// import toast from 'react-hot-toast';

// export const useSupplierFeature = () => {
//   const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');

//   const [modal, setModal] = useState({ open: false, data: null as ISupplier | null });
//   const [deleteModal, setDeleteModal] = useState({ open: false, id: null as string | null });

//   // Debounce Search Logic
//   useEffect(() => {
//     const timer = setTimeout(() => { setDebouncedSearch(searchTerm); setCurrentPage(1); }, 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   const fetchSuppliers = useCallback(async (page: number, search: string) => {
//     try {
//       setLoading(true);
//       const res = await supplierApi.getAll(page, 10, search);
//       if (res && res.suppliers) {
//         setSuppliers(res.suppliers);
//         setTotalPages(res.pagination.totalPages);
//         setCurrentPage(res.pagination.currentPage);
//       }
//     } catch (err) { setSuppliers([]); } finally { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchSuppliers(currentPage, debouncedSearch); }, [currentPage, debouncedSearch, fetchSuppliers]);

//   const handleSubmit = async (data: CreateSupplierPayload) => {
//     const promise = modal.data ? supplierApi.update(modal.data._id, data) : supplierApi.create(data);
//     await promise;
//     fetchSuppliers(currentPage, debouncedSearch);
//   };

//   const handleToggleStatus = async (sup: ISupplier) => {
//     const newStatus = sup.status === 'Active' ? 'Hidden' : 'Active';
//     await supplierApi.update(sup._id, { status: newStatus } as any);
//     setSuppliers(prev => prev.map(s => s._id === sup._id ? { ...s, status: newStatus } : s));
//   };

//   const executeDelete = async () => {
//     if (!deleteModal.id) return;
//     await supplierApi.delete(deleteModal.id);
//     fetchSuppliers(currentPage, debouncedSearch);
//     setDeleteModal({ open: false, id: null });
//     toast.success("Đã xóa nhà cung cấp");
//   };

//   return {
//     suppliers, loading, currentPage, totalPages, searchTerm,
//     handleSearch: setSearchTerm,
//     handlePageChange: setCurrentPage,
//     // Modal Add/Edit
//     isModalOpen: modal.open,
//     selectedSupplier: modal.data,
//     handleOpenAdd: () => setModal({ open: true, data: null }),
//     handleOpenEdit: (data: ISupplier) => setModal({ open: true, data }),
//     handleCloseModal: () => setModal({ open: false, data: null }),
//     handleSubmit,
//     handleToggleStatus,
//     // Modal Delete
//     isDeleteModalOpen: deleteModal.open,
//     handleOpenDelete: (id: string) => setDeleteModal({ open: true, id }),
//     handleCloseDelete: () => setDeleteModal({ open: false, id: null }),
//     executeDelete
//   };
// };


import { useState, useEffect, useCallback } from 'react';
import { ISupplier, CreateSupplierPayload } from '../supplier/supplier.types';
import { supplierApi } from '../supplier/supplier.api';
import toast from 'react-hot-toast';

const toastStyle = {
  borderRadius: '12px',
  background: '#1e293b',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '700',
};

export const useSupplierFeature = () => {
  // --- 1. QUẢN LÝ DỮ LIỆU & PHÂN TRANG ---
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // --- 2. QUẢN LÝ TRẠNG THÁI CỬA SỔ (MODALS) ---
  const [modal, setModal] = useState({ open: false, data: null as ISupplier | null });
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null as string | null });

  // Xử lý Debounce Search: Đợi người dùng ngừng gõ 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset về trang 1 khi từ khóa thay đổi
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  /**
   * Lấy danh sách nhà cung cấp từ Server
   */
  const fetchSuppliers = useCallback(async (page: number, search: string) => {
    try {
      setLoading(true);
      const res = await supplierApi.getAll(page, 10, search);
      if (res && res.suppliers) {
        setSuppliers(res.suppliers);
        setTotalPages(res.pagination.totalPages || 1);
        setCurrentPage(res.pagination.currentPage || 1);
      } else if (Array.isArray(res)) {
        setSuppliers(res);
        setTotalPages(1);
      }
    } catch (err) {
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Gọi fetch khi trang hoặc từ khóa debounced thay đổi
  useEffect(() => {
    fetchSuppliers(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch, fetchSuppliers]);

  /**
   * Xử lý Lưu thông tin (Thêm mới hoặc Cập nhật)
   */
  const handleSubmit = async (data: CreateSupplierPayload) => {
    const isEdit = !!modal.data;
    const promise = isEdit 
      ? supplierApi.update(modal.data!._id, data) 
      : supplierApi.create(data);

    // Tích hợp thông báo theo yêu cầu riêng cho từng tác vụ
    toast.promise(promise, {
      loading: 'Đang xử lý dữ liệu...',
      success: () => {
        handleCloseModal(); // Đóng modal ngay khi thành công
        fetchSuppliers(currentPage, debouncedSearch);
        return isEdit ? "CẬP NHẬT THÀNH CÔNG!" : "THÊM THÀNH CÔNG!";
      },
      error: (err) => err.response?.data?.message || "LỖI HỆ THỐNG!",
    }, { style: toastStyle });

    try {
      await promise;
    } catch (err) {
      throw err; // Để Modal bắt được lỗi nếu cần xử lý thêm tại chỗ
    }
  };

  /**
   * Ẩn/Hiện (Giao dịch/Tạm ngừng) nhanh từ bảng
   */
  const handleToggleStatus = async (sup: ISupplier) => {
    try {
      const newStatus = sup.status === 'Active' ? 'Hidden' : 'Active';
      await supplierApi.update(sup._id, { status: newStatus });
      
      // Cập nhật State cục bộ để UI thay đổi tức thì
      setSuppliers(prev => 
        prev.map(s => s._id === sup._id ? { ...s, status: newStatus } : s)
      );
    } catch (err) {
      toast.error("Không thể thay đổi trạng thái!", { style: toastStyle });
    }
  };

  /**
   * Thực hiện Xóa vĩnh viễn
   */
  const executeDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await supplierApi.delete(deleteModal.id);
      toast.success("ĐÃ XÓA NHÀ CUNG CẤP", { style: toastStyle });
      
      // Kiểm tra nếu xóa hết item ở trang hiện tại thì lùi trang
      if (suppliers.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        fetchSuppliers(currentPage, debouncedSearch);
      }
    } catch (err) {
      toast.error("LỖI KHI XÓA DỮ LIỆU");
    } finally {
      handleCloseDelete();
    }
  };

  // --- HELPERS ---
  const handleOpenAdd = () => setModal({ open: true, data: null });
  const handleOpenEdit = (data: ISupplier) => setModal({ open: true, data });
  const handleCloseModal = () => setModal({ open: false, data: null });
  
  const handleOpenDelete = (id: string) => setDeleteModal({ open: true, id });
  const handleCloseDelete = () => setDeleteModal({ open: false, id: null });

  return {
    suppliers, loading, currentPage, totalPages, searchTerm,
    handleSearch: setSearchTerm,
    handlePageChange: setCurrentPage,
    // Modal Add/Edit
    isModalOpen: modal.open,
    selectedSupplier: modal.data,
    handleOpenAdd,
    handleOpenEdit,
    handleCloseModal,
    handleSubmit,
    handleToggleStatus,
    // Modal Delete
    isDeleteModalOpen: deleteModal.open,
    handleOpenDelete,
    handleCloseDelete,
    executeDelete,
    refresh: () => fetchSuppliers(currentPage, debouncedSearch)
  };
};