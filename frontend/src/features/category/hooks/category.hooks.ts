

// import { useState, useEffect, useCallback } from 'react';
// import { ICategory, CreateCategoryPayload } from '@/features/category/category.types';
// import { categoryApi } from '@/features/category/api/category.admin.api';
// import toast from 'react-hot-toast';

// export const useCategoryFeature = () => {
//   const [categories, setCategories] = useState<ICategory[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

//   // --- 1. FETCH DATA ---
//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await categoryApi.getAll();
//       setCategories(data);
//     } catch (err: any) {
//       setError(err.message || "Không thể tải danh sách");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   // --- 2. XỬ LÝ THÊM / SỬA (Submit) ---
//   const handleSubmit = async (formData: CreateCategoryPayload) => {
//     // Lưu ý: Không dùng alert ở đây vì Component đã bọc toast.promise bên ngoài onSubmit
//     if (selectedCategory) {
//       await categoryApi.update(selectedCategory._id, formData);
//     } else {
//       await categoryApi.create(formData);
//     }
//     await fetchCategories(); // Refresh danh sách sau khi lưu
//   };

//   // --- 3. XỬ LÝ ẨN / HIỆN NHANH (Toggle Status) ---
//   // ĐÂY LÀ HÀM BẠN ĐANG THIẾU DẪN ĐẾN LỖI
//   const handleToggleStatus = async (category: ICategory) => {
//     const newStatus = category.status === 'Active' ? 'Hidden' : 'Active';
    
//     // Gọi API cập nhật trạng thái
//     await categoryApi.update(category._id, {
//       ...category,
//       status: newStatus
//     });

//     // Cập nhật State cục bộ để giao diện thay đổi ngay lập tức
//     setCategories(prev => 
//       prev ? prev.map(c => c._id === category._id ? { ...c, status: newStatus } : c) : null
//     );
//   };

//   // --- 4. XỬ LÝ XÓA ---
//   const executeDelete = async () => {
//     if (!categoryToDelete) return;
//     try {
//       await categoryApi.delete(categoryToDelete);
//       setCategories(prev => prev ? prev.filter(c => c._id !== categoryToDelete) : null);
//       handleCloseDeleteModal();
//       toast.success("Đã xóa danh mục thành công", {
//         style: { borderRadius: '15px', fontWeight: 'bold' }
//       });
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Không thể xóa danh mục");
//     }
//   };

//   // --- 5. TÌM KIẾM ---
//   const handleSearch = (query: string) => {
//     if (!query.trim()) {
//       fetchCategories();
//       return;
//     }
//     const filtered = categories?.filter(c => 
//       c.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setCategories(filtered || null);
//   };

//   // --- HELPER FUNCTIONS ---
//   const handleOpenAdd = () => {
//     setSelectedCategory(null);
//     setIsModalOpen(true);
//   };

//   const handleOpenEdit = (category: ICategory) => {
//     setSelectedCategory(category);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedCategory(null);
//   };

//   const handleOpenDeleteConfirm = (id: string) => {
//     setCategoryToDelete(id);
//     setIsDeleteModalOpen(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setCategoryToDelete(null);
//   };

//   return {
//     categories,
//     loading,
//     error,
//     refresh: fetchCategories,

//     // Modal Add/Edit
//     isModalOpen,
//     selectedCategory,
//     handleOpenAdd,
//     handleOpenEdit,
//     handleCloseModal,
//     handleSubmit,

//     // Status Toggle (Hàm mới)
//     handleToggleStatus, 

//     // Delete
//     isDeleteModalOpen,
//     handleOpenDeleteConfirm,
//     handleCloseDeleteModal,
//     executeDelete,

//     // Search
//     handleSearch
//   };
// };
import { useState, useEffect, useCallback } from 'react';
import { ICategory, CreateCategoryPayload } from '@/features/category/category.types';
import { categoryApi } from '@/features/category/api/category.admin.api';
import toast from 'react-hot-toast';

export const useCategoryFeature = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  // --- 1. FETCH DATA (SỬA LỖI TRUY CẬP UNDEFINED) ---
  const fetchCategories = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoryApi.getAll(page, itemsPerPage);
      
      // Kiểm tra cấu trúc response để gán data an toàn
      if (response && response.categories) {
        // Nếu Backend trả về đúng chuẩn phân trang { categories: [], pagination: {} }
        setCategories(response.categories);
        setTotalPages(response.pagination?.totalPages || 1);
        setCurrentPage(response.pagination?.currentPage || 1);
      } else if (Array.isArray(response)) {
        // Nếu Backend trả về mảng trực tiếp [{}, {}]
        setCategories(response);
        setTotalPages(1);
      } else {
        // Trường hợp data rỗng hoặc lỗi cấu trúc
        setCategories([]);
      }
      
    } catch (err: any) {
      console.error("Fetch API Error:", err);
      setError(err.message || "Không thể tải danh sách");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories(currentPage);
  }, [fetchCategories, currentPage]);

  // --- 2. XỬ LÝ THÊM / SỬA (FIXED) ---
  const handleSubmit = async (formData: CreateCategoryPayload) => {
    try {
      if (selectedCategory) {
        await categoryApi.update(selectedCategory._id, formData);
      } else {
        await categoryApi.create(formData);
      }
      // Quan trọng: Phải đợi fetch xong để đồng bộ UI
      await fetchCategories(currentPage); 
    } catch (err: any) {
      // Quăng lỗi ra ngoài để toast.promise ở Modal bắt được
      throw err; 
    }
  };

  // --- 3. XỬ LÝ ẨN / HIỆN NHANH ---
  const handleToggleStatus = async (category: ICategory) => {
    try {
      const newStatus = category.status === 'Active' ? 'Hidden' : 'Active';
      await categoryApi.update(category._id, { status: newStatus });

      setCategories(prev => 
        prev ? prev.map(c => c._id === category._id ? { ...c, status: newStatus } : c) : null
      );
    } catch (err) {
      toast.error("Không thể thay đổi trạng thái");
      throw err;
    }
  };

  // --- 4. XỬ LÝ XÓA ---
  const executeDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await categoryApi.delete(categoryToDelete);
      
      // Kiểm tra nếu xóa hết item ở trang hiện tại thì lùi trang
      if (categories?.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        await fetchCategories(currentPage);
      }
      
      handleCloseDeleteModal();
      toast.success("Đã xóa danh mục");
    } catch (err: any) {
      toast.error("Lỗi khi xóa dữ liệu");
    }
  };

  // --- 5. TÌM KIẾM ---
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      fetchCategories(1);
      return;
    }
    const filtered = categories?.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    setCategories(filtered || []);
  };

  // --- HELPERS ---
  const handleOpenAdd = () => { setSelectedCategory(null); setIsModalOpen(true); };
  const handleOpenEdit = (category: ICategory) => { setSelectedCategory(category); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedCategory(null); };
  const handleOpenDeleteConfirm = (id: string) => { setCategoryToDelete(id); setIsDeleteModalOpen(true); };
  const handleCloseDeleteModal = () => { setIsDeleteModalOpen(false); setCategoryToDelete(null); };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    categories, loading, error, currentPage, totalPages,
    handlePageChange,
    refresh: () => fetchCategories(currentPage),
    isModalOpen, selectedCategory, handleOpenAdd, handleOpenEdit, handleCloseModal, handleSubmit,
    handleToggleStatus, 
    isDeleteModalOpen, handleOpenDeleteConfirm, handleCloseDeleteModal, executeDelete,
    handleSearch
  };
};