
import { useState, useCallback, useMemo } from 'react';
import { categoryApi } from '../api/category.admin.api';
import { ICategory, CreateCategoryPayload } from '../category.types';
import { useCategoryData } from './useCategoryData';

export const useCategoryFeature = (itemsPerPage = 10) => {
  // 1. Sử dụng Hook dữ liệu đã tách
  const data = useCategoryData(itemsPerPage);

  // 2. Logic điều khiển Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  // 3. Tính toán thống kê (Dùng useMemo để tối ưu hiệu năng)
  const stats = useMemo(() => {
    const list = data.categories || [];
    return {
      total: list.length,
      active: list.filter(c => c.status === 'Active').length,
      hidden: list.filter(c => c.status === 'Hidden').length,
    };
  }, [data.categories]);

  // 4. Các hành động xử lý nghiệp vụ (Actions)
  const handleSubmit = async (formData: CreateCategoryPayload) => {
    if (selectedCategory) {
      await categoryApi.update(selectedCategory._id, formData);
    } else {
      await categoryApi.create(formData);
    }
    await data.refresh();
  };

  const handleToggleStatus = useCallback(async (category: ICategory) => {
    const newStatus = category.status === 'Active' ? 'Hidden' : 'Active';

    // Optimistic Update: Cập nhật UI ngay lập tức
    data.setCategories(prev =>
      prev ? prev.map(c => c._id === category._id ? { ...c, status: newStatus } : c) : null
    );

    try {
      await categoryApi.update(category._id, { status: newStatus });
      // Nếu đang lọc, có thể mục đó cần biến mất khỏi danh sách nên refresh nhẹ
      if (data.statusFilter !== 'All') await data.refresh();
    } catch (err) {
      await data.refresh(); // Rollback nếu lỗi
      throw err;
    }
  }, [data]);

  // 5. Helpers điều khiển UI
  const handleOpenAdd = () => { setSelectedCategory(null); setIsModalOpen(true); };
  const handleOpenEdit = (cat: ICategory) => { setSelectedCategory(cat); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedCategory(null); };

  // Trả về một object duy nhất cho Page.tsx sử dụng
  return {
    // Data & Stats
    categories: data.categories,
    loading: data.loading,
    currentPage: data.currentPage,
    totalPages: data.totalPages,
    stats,
    statusFilter: data.statusFilter,

    // UI Handlers (Khớp 100% với các hàm Page.tsx đang gọi)
    handleSearch: data.setSearchTerm,
    setStatusFilter: (s: any) => { data.setStatusFilter(s); data.setCurrentPage(1); },
    handlePageChange: data.setCurrentPage,
    handleOpenAdd,
    handleOpenEdit,
    handleCloseModal,
    handleSubmit,
    handleToggleStatus,

    // Modal State
    isModalOpen,
    selectedCategory,
    refresh: data.refresh
  };
};