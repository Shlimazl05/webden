
// import { useState, useEffect, useCallback} from 'react';
// import { ICategory, CreateCategoryPayload } from '@/features/category/category.types';
// import { categoryApi } from '@/features/category/api/category.admin.api';
// import toast from 'react-hot-toast';

// export const useCategoryFeature = () => {
//   // --- 1. STATE DỮ LIỆU & PHÂN TRANG & TÌM KIẾM ---
//   const [categories, setCategories] = useState<ICategory[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const itemsPerPage = 10;

//   // --- 2. STATE ĐIỀU KHIỂN MODAL (Đã bỏ Delete Modal) ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

//   // --- 3. XỬ LÝ DEBOUNCE (Giữ nguyên) ---
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//       setCurrentPage(1);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // --- 4. HÀM FETCH DATA ---
//   const fetchCategories = useCallback(async (page: number, search: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await categoryApi.getAll(page, itemsPerPage, search);
      
//       if (response && response.categories) {
//         setCategories(response.categories);
//         setTotalPages(response.pagination?.totalPages || 1);
//         setCurrentPage(response.pagination?.currentPage || 1);
//       } else {
//         setCategories(Array.isArray(response) ? response : []);
//       }
//     } catch (err) {
//       setCategories([]);
//       setError("Không thể tải danh sách");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories(currentPage, debouncedSearch);
//   }, [fetchCategories, currentPage, debouncedSearch]);

//   // --- 5. XỬ LÝ THÊM / SỬA (Đã bao gồm Image trong formData) ---
//   const handleSubmit = async (formData: CreateCategoryPayload) => {
//     try {
//       if (selectedCategory) {
//         await categoryApi.update(selectedCategory._id, formData);
//       } else {
//         await categoryApi.create(formData);
//       }
//       // Refresh lại dữ liệu sau khi lưu thành công
//       await fetchCategories(currentPage, debouncedSearch); 
//     } catch (err) {
//       throw err; // Quăng lỗi ra để Modal hiển thị Toast error
//     }
//   };

//   // --- 6. XỬ LÝ ẨN / HIỆN (Trả về promise để dùng Toast ở UI) ---
//   const handleToggleStatus = async (category: ICategory): Promise<void> => {
//     const newStatus = category.status === 'Active' ? 'Hidden' : 'Active';
    
//     // Tạo một promise để cập nhật API
//     const updatePromise = categoryApi.update(category._id, { status: newStatus });
    
//     try {
//       await updatePromise;
//       // Cập nhật state cục bộ ngay lập tức để UI mượt mà (Optimistic Update)
//       setCategories(prev => 
//         prev ? prev.map(c => c._id === category._id ? { ...c, status: newStatus } : c) : null
//       );
      
//     } catch (err) {
//       throw err;
//     }
//   };

//   // --- HELPERS ---
//   const handleOpenAdd = () => { setSelectedCategory(null); setIsModalOpen(true); };
//   const handleOpenEdit = (category: ICategory) => { setSelectedCategory(category); setIsModalOpen(true); };
//   const handleCloseModal = () => { setIsModalOpen(false); setSelectedCategory(null); };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return {
//     categories, loading, error, currentPage, totalPages, searchTerm,
//     handlePageChange,
//     handleSearch: setSearchTerm, 
//     refresh: () => fetchCategories(currentPage, debouncedSearch),
//     isModalOpen, selectedCategory, handleOpenAdd, handleOpenEdit, handleCloseModal, handleSubmit,
//     handleToggleStatus
//   };
// };

// import { useState, useEffect, useCallback, useMemo } from 'react';
// import { categoryApi } from '../api/category.admin.api';
// import { ICategory, CreateCategoryPayload } from '../category.types';

// export const useCategoryFeature = (itemsPerPage = 10) => {
//   // --- 1. QUẢN LÝ DỮ LIỆU & PHÂN TRANG & BỘ LỌC ---
//   const [categories, setCategories] = useState<ICategory[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
  
//   // Thêm state để quản lý bộ lọc trạng thái
//   const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Hidden'>('All');

//   // --- 2. QUẢN LÝ TRẠNG THÁI MODAL ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

//   // Debounce tìm kiếm 500ms
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//       setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // --- 3. LOGIC FETCH DATA (Đã sửa lỗi nhận status) ---
//   const fetchCategories = useCallback(async (page: number, search: string, status: string) => {
//     try {
//       setLoading(true);
//       // Gửi thêm status vào API (Nếu status là 'All' thì gửi chuỗi rỗng để lấy tất cả)
//       const filterStatus = status === 'All' ? '' : status;
//       const response = await categoryApi.getAll(page, itemsPerPage, search, status);

//       // LƯU Ý: Nếu backend của bạn chưa hỗ trợ filter status qua API, 
//       // ta sẽ filter tạm thời ở đây (Client-side), nhưng tốt nhất là filter từ server.
//       setCategories(response.categories || []);
//       setTotalPages(response.pagination?.totalPages || 1);
//     } catch (err) {
//       setCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [itemsPerPage]);

//   // Cập nhật useEffect để theo dõi cả statusFilter
//   useEffect(() => {
//     fetchCategories(currentPage, debouncedSearch, statusFilter);
//   }, [currentPage, debouncedSearch, statusFilter, fetchCategories]);


//   // --- 4. TÍNH TOÁN THỐNG KÊ (STATS) ---
//   // Sử dụng useMemo để tính toán số liệu cho Stats Cards mà không gây lag
//   const stats = useMemo(() => {
//     if (!categories) return { total: 0, active: 0, hidden: 0 };

//     // Lưu ý: Nếu có phân trang, số liệu này chỉ đúng cho trang hiện tại. 
//     // Trong thực tế chuyên nghiệp, Backend nên trả về các con số tổng này trong object pagination.
//     return {
//       total: categories.length,
//       active: categories.filter(c => c.status === 'Active').length,
//       hidden: categories.filter(c => c.status === 'Hidden').length,
//     };
//   }, [categories]);


//   // --- 5. LOGIC XỬ LÝ HÀNH ĐỘNG (ACTIONS) ---

//   const handleSubmit = async (formData: CreateCategoryPayload) => {
//     if (selectedCategory) {
//       await categoryApi.update(selectedCategory._id, formData);
//     } else {
//       await categoryApi.create(formData);
//     }
//     await fetchCategories(currentPage, debouncedSearch, statusFilter);
//   };

//   const handleToggleStatus = useCallback(async (category: ICategory) => {
//     const newStatus = category.status === 'Active' ? 'Hidden' : 'Active';

//     // Optimistic Update: Cập nhật UI ngay lập tức
//     setCategories(prev =>
//       prev ? prev.map(c => c._id === category._id ? { ...c, status: newStatus } : c) : null
//     );

//     try {
//       await categoryApi.update(category._id, { status: newStatus });
//     } catch (err) {
//       fetchCategories(currentPage, debouncedSearch, statusFilter);
//       throw err;
//     }
//   }, [currentPage, debouncedSearch, statusFilter, fetchCategories]);


//   // --- 6. HELPERS ĐIỀU KHIỂN UI ---
//   const handleOpenAdd = () => { setSelectedCategory(null); setIsModalOpen(true); };
//   const handleOpenEdit = (category: ICategory) => { setSelectedCategory(category); setIsModalOpen(true); };
//   const handleCloseModal = () => { setIsModalOpen(false); setSelectedCategory(null); };

//   return {
//     // Data & Stats
//     categories,
//     loading,
//     currentPage,
//     totalPages,
//     stats, // Trả về số liệu cho Stats Cards
//     statusFilter, // Trả về trạng thái lọc hiện tại
//     setStatusFilter: (s: 'All' | 'Active' | 'Hidden') => {
//       setStatusFilter(s);
//       setCurrentPage(1); // Reset về trang 1 khi đổi bộ lọc
//     },

//     // Actions
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


import { useState, useEffect, useCallback, useMemo } from 'react';
import { categoryApi } from '../api/category.admin.api';
import { ICategory, CreateCategoryPayload } from '../category.types';

export const useCategoryFeature = (itemsPerPage = 10) => {
  // --- 1. STATE DỮ LIỆU & BỘ LỌC ---
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // State quản lý bộ lọc trạng thái
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Hidden'>('All');

  // --- 2. XỬ LÝ DEBOUNCE TÌM KIẾM ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // --- 3. HÀM FETCH DATA (SỬA LỖI TẠI ĐÂY) ---
  const fetchCategories = useCallback(async (page: number, search: string, status: string) => {
    try {
      setLoading(true);

      // CHỖ SỬA: Chuyển 'All' thành '' để API hiểu là lấy tất cả
      const finalStatus = status === 'All' ? '' : status;

      // GỌI API với finalStatus thay vì status
      const response = await categoryApi.getAll(page, itemsPerPage, search, finalStatus);

      setCategories(response.categories || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Fetch error:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  // Kích hoạt fetch khi page, search hoặc filter thay đổi
  useEffect(() => {
    fetchCategories(currentPage, debouncedSearch, statusFilter);
  }, [currentPage, debouncedSearch, statusFilter, fetchCategories]);


  // --- 4. TÍNH TOÁN THỐNG KÊ (STATS) ---
  const stats = useMemo(() => {
    if (!categories) return { total: 0, active: 0, hidden: 0 };

    // Lưu ý: stats này hiện tại tính trên danh sách đã lọc trả về
    return {
      total: categories.length,
      active: categories.filter(c => c.status === 'Active').length,
      hidden: categories.filter(c => c.status === 'Hidden').length,
    };
  }, [categories]);


  // --- 5. LOGIC ACTIONS (SUBMIT, TOGGLE) ---
  const handleSubmit = async (formData: CreateCategoryPayload) => {
    if (selectedCategory) {
      await categoryApi.update(selectedCategory._id, formData);
    } else {
      await categoryApi.create(formData);
    }
    // Sau khi thêm/sửa, fetch lại để cập nhật danh sách
    await fetchCategories(currentPage, debouncedSearch, statusFilter);
  };

  const handleToggleStatus = useCallback(async (category: ICategory) => {
    const newStatus = category.status === 'Active' ? 'Hidden' : 'Active';

    // Optimistic Update: Cập nhật ngay trên giao diện
    setCategories(prev =>
      prev ? prev.map(c => c._id === category._id ? { ...c, status: newStatus } : c) : null
    );

    try {
      await categoryApi.update(category._id, { status: newStatus });
      // Nếu đang lọc, có thể mục đó sẽ biến mất khỏi danh sách hiện tại, nên fetch lại
      if (statusFilter !== 'All') {
        fetchCategories(currentPage, debouncedSearch, statusFilter);
      }
    } catch (err) {
      fetchCategories(currentPage, debouncedSearch, statusFilter);
      throw err;
    }
  }, [currentPage, debouncedSearch, statusFilter, fetchCategories]);


  // --- 6. MODAL CONTROL & HELPERS ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const handleOpenAdd = () => { setSelectedCategory(null); setIsModalOpen(true); };
  const handleOpenEdit = (category: ICategory) => { setSelectedCategory(category); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedCategory(null); };

  return {
    categories,
    loading,
    currentPage,
    totalPages,
    stats,
    statusFilter,
    setStatusFilter: (s: 'All' | 'Active' | 'Hidden') => {
      setStatusFilter(s);
      setCurrentPage(1); // Reset về trang 1 khi đổi bộ lọc
    },
    handleSearch: setSearchTerm,
    handlePageChange: (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    handleOpenAdd,
    handleOpenEdit,
    handleCloseModal,
    handleSubmit,
    handleToggleStatus,
    isModalOpen,
    selectedCategory,
    refresh: () => fetchCategories(currentPage, debouncedSearch, statusFilter)
  };
};