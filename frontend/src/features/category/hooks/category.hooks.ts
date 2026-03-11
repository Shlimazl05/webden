
// import { useState, useEffect, useCallback, useMemo } from 'react';
// import { categoryApi } from '../api/category.admin.api';
// import { ICategory, CreateCategoryPayload } from '../category.types';

// export const useCategoryFeature = (itemsPerPage = 10) => {
//   // --- 1. STATE DỮ LIỆU & BỘ LỌC ---
//   const [categories, setCategories] = useState<ICategory[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');

//   // State quản lý bộ lọc trạng thái
//   const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Hidden'>('All');

//   // --- 2. XỬ LÝ DEBOUNCE TÌM KIẾM ---
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//       setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // --- 3. HÀM FETCH DATA (SỬA LỖI TẠI ĐÂY) ---
//   const fetchCategories = useCallback(async (page: number, search: string, status: string) => {
//     try {
//       setLoading(true);

//       // CHỖ SỬA: Chuyển 'All' thành '' để API hiểu là lấy tất cả
//       const finalStatus = status === 'All' ? '' : status;

//       // GỌI API với finalStatus thay vì status
//       const response = await categoryApi.getAll(page, itemsPerPage, search, finalStatus);

//       setCategories(response.categories || []);
//       setTotalPages(response.pagination?.totalPages || 1);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [itemsPerPage]);

//   // Kích hoạt fetch khi page, search hoặc filter thay đổi
//   useEffect(() => {
//     fetchCategories(currentPage, debouncedSearch, statusFilter);
//   }, [currentPage, debouncedSearch, statusFilter, fetchCategories]);


//   // --- 4. TÍNH TOÁN THỐNG KÊ (STATS) ---
//   const stats = useMemo(() => {
//     if (!categories) return { total: 0, active: 0, hidden: 0 };

//     // Lưu ý: stats này hiện tại tính trên danh sách đã lọc trả về
//     return {
//       total: categories.length,
//       active: categories.filter(c => c.status === 'Active').length,
//       hidden: categories.filter(c => c.status === 'Hidden').length,
//     };
//   }, [categories]);


//   // --- 5. LOGIC ACTIONS (SUBMIT, TOGGLE) ---
//   const handleSubmit = async (formData: CreateCategoryPayload) => {
//     if (selectedCategory) {
//       await categoryApi.update(selectedCategory._id, formData);
//     } else {
//       await categoryApi.create(formData);
//     }
//     // Sau khi thêm/sửa, fetch lại để cập nhật danh sách
//     await fetchCategories(currentPage, debouncedSearch, statusFilter);
//   };

//   const handleToggleStatus = useCallback(async (category: ICategory) => {
//     const newStatus = category.status === 'Active' ? 'Hidden' : 'Active';

//     // Optimistic Update: Cập nhật ngay trên giao diện
//     setCategories(prev =>
//       prev ? prev.map(c => c._id === category._id ? { ...c, status: newStatus } : c) : null
//     );

//     try {
//       await categoryApi.update(category._id, { status: newStatus });
//       // Nếu đang lọc, có thể mục đó sẽ biến mất khỏi danh sách hiện tại, nên fetch lại
//       if (statusFilter !== 'All') {
//         fetchCategories(currentPage, debouncedSearch, statusFilter);
//       }
//     } catch (err) {
//       fetchCategories(currentPage, debouncedSearch, statusFilter);
//       throw err;
//     }
//   }, [currentPage, debouncedSearch, statusFilter, fetchCategories]);


//   // --- 6. MODAL CONTROL & HELPERS ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

//   const handleOpenAdd = () => { setSelectedCategory(null); setIsModalOpen(true); };
//   const handleOpenEdit = (category: ICategory) => { setSelectedCategory(category); setIsModalOpen(true); };
//   const handleCloseModal = () => { setIsModalOpen(false); setSelectedCategory(null); };

//   return {
//     categories,
//     loading,
//     currentPage,
//     totalPages,
//     stats,
//     statusFilter,
//     setStatusFilter: (s: 'All' | 'Active' | 'Hidden') => {
//       setStatusFilter(s);
//       setCurrentPage(1); // Reset về trang 1 khi đổi bộ lọc
//     },
//     handleSearch: setSearchTerm,
//     handlePageChange: (page: number) => {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     },
//     handleOpenAdd,
//     handleOpenEdit,
//     handleCloseModal,
//     handleSubmit,
//     handleToggleStatus,
//     isModalOpen,
//     selectedCategory,
//     refresh: () => fetchCategories(currentPage, debouncedSearch, statusFilter)
//   };
// };


// src/features/category/hooks/category.hooks.ts
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