

// import { useState, useEffect, useCallback } from 'react';
// import { Category } from './category.types';

// export const useCategoryFeature = () => {
//   // 1. Quản lý dữ liệu từ API
//   const [categories, setCategories] = useState<Category[] | null>(null);
//   const [loading, setLoading] = useState(true);

//   // 2. Quản lý trạng thái Modal THÊM / SỬA
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

//   // 3. Quản lý trạng thái Modal XÁC NHẬN XÓA
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

//   // Giả lập gọi dữ liệu (Sau này thay bằng gọi API thật từ category.api.ts)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setCategories([
//         { _id: '1', name: 'Đèn Chùm Pha Lê', slug: 'den-chum-pha-le', productCount: 24, status: 'Active', createdAt: '' },
//         { _id: '2', name: 'Đèn Thả Hiện Đại', slug: 'den-tha-hien-dai', productCount: 15, status: 'Active', createdAt: '' },
//         { _id: '3', name: 'Đèn Tường Cổ Điển', slug: 'den-tuong-co-dien', productCount: 8, status: 'Active', createdAt: '' },
//       ]);
//       setLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   // --- ACTIONS CHO THÊM / SỬA ---
//   const handleOpenAdd = () => {
//     setSelectedCategory(null);
//     setIsModalOpen(true);
//   };

//   const handleOpenEdit = (category: Category) => {
//     setSelectedCategory(category);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedCategory(null);
//   };

//   // --- ACTIONS CHO XÓA ---
//   // Mở modal xác nhận thay vì dùng confirm()
//   const handleOpenDeleteConfirm = (id: string) => {
//     setCategoryToDelete(id);
//     setIsDeleteModalOpen(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setCategoryToDelete(null);
//   };

//   // Hàm thực thi xóa thật sự (gọi khi bấm "Xác nhận" trên UI Modal)
//   const executeDelete = () => {
//     if (categoryToDelete) {
//       console.log("Đã thực hiện xóa danh mục ID:", categoryToDelete);
//       // Sau này gọi API: await categoryApi.delete(categoryToDelete);
//       // Tạm thời xóa trên UI để demo
//       setCategories(prev => prev ? prev.filter(c => c._id !== categoryToDelete) : null);
      
//       handleCloseDeleteModal();
//     }
//   };

//   // --- HÀNH ĐỘNG KHÁC ---
//   const handleSearch = (query: string) => {
//     console.log("Đang tìm kiếm danh mục:", query);
//   };

//   return {
//     // Data & Loading
//     categories,
//     loading,

//     // State & Actions cho Add/Edit
//     isModalOpen,
//     selectedCategory,
//     handleOpenAdd,
//     handleOpenEdit,
//     handleCloseModal,

//     // State & Actions cho Delete (Đã sửa để dùng Modal UI)
//     isDeleteModalOpen,
//     handleOpenDeleteConfirm,
//     handleCloseDeleteModal,
//     executeDelete,

//     // Search
//     handleSearch
//   };
// };

import { useState, useEffect, useCallback } from 'react';
import { Category, CreateCategoryPayload } from '@/features/category/category.types';
import { categoryApi } from '@/features/category/api/category.admin.api'; // Import file API đã viết

export const useCategoryFeature = () => {
  // 1. Quản lý dữ liệu từ API
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Quản lý trạng thái Modal THÊM / SỬA
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // 3. Quản lý trạng thái Modal XÁC NHẬN XÓA
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  // --- HÀM LẤY DANH SÁCH (Fetch Data) ---
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Không thể tải danh sách danh mục");
    } finally {
      setLoading(false);
    }
  }, []);

  // Tự động gọi khi vào trang
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // --- ACTIONS CHO THÊM / SỬA ---
  const handleOpenAdd = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // HÀM LƯU (Dùng cho cả Thêm và Sửa)
  const handleSubmit = async (formData: CreateCategoryPayload) => {
    try {
      if (selectedCategory) {
        // Nếu có category đang chọn -> Gọi API Cập nhật (PUT)
        await categoryApi.update(selectedCategory._id, formData);
        alert("Cập nhật danh mục thành công!");
      } else {
        // Nếu không -> Gọi API Thêm mới (POST)
        await categoryApi.create(formData);
        alert("Thêm danh mục mới thành công!");
      }
      fetchCategories(); // Tải lại danh sách mới nhất từ server
      handleCloseModal();
    } catch (err: any) {
      alert(err.response?.data?.message || "Có lỗi xảy ra khi lưu dữ liệu");
    }
  };

  // --- ACTIONS CHO XÓA ---
  const handleOpenDeleteConfirm = (id: string) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const executeDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await categoryApi.delete(categoryToDelete);
      // Cập nhật giao diện ngay lập tức bằng cách lọc mảng hiện tại
      setCategories(prev => prev ? prev.filter(c => c._id !== categoryToDelete) : null);
      handleCloseDeleteModal();
    } catch (err: any) {
      alert(err.response?.data?.message || "Không thể xóa danh mục này");
    }
  };

  // --- HÀM TÌM KIẾM ---
  const handleSearch = async (query: string) => {
    // Nếu bạn muốn lọc tại Client (cho nhanh với dữ liệu ít)
    if (!query) {
      fetchCategories();
      return;
    }
    const filtered = categories?.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    setCategories(filtered || null);
  };

  return {
    categories,
    loading,
    error,
    refresh: fetchCategories,

    // Add/Edit
    isModalOpen,
    selectedCategory,
    handleOpenAdd,
    handleOpenEdit,
    handleCloseModal,
    handleSubmit, // Truyền hàm này xuống Modal

    // Delete
    isDeleteModalOpen,
    handleOpenDeleteConfirm,
    handleCloseDeleteModal,
    executeDelete,

    // Search
    handleSearch
  };
};