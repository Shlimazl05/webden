
import { useState, useEffect, useCallback } from 'react';
import { ICategory, CreateCategoryPayload } from '@/features/category/category.types';
import { categoryApi } from '@/features/category/api/category.admin.api';
import toast from 'react-hot-toast';

export const useCategoryFeature = () => {
  // --- 1. STATE DỮ LIỆU & PHÂN TRANG & TÌM KIẾM ---
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa người dùng đang gõ
  const [debouncedSearch, setDebouncedSearch] = useState(''); // Từ khóa thực tế dùng để gọi API
  const itemsPerPage = 10;

  // --- 2. STATE ĐIỀU KHIỂN MODALS ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  // --- 3. XỬ LÝ DEBOUNCE TÌM KIẾM ---
  // Đợi người dùng ngừng gõ 500ms mới bắt đầu tìm kiếm thật
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset về trang 1 mỗi khi từ khóa thay đổi
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // --- 4. HÀM FETCH DATA (SERVER-SIDE) ---
  const fetchCategories = useCallback(async (page: number, search: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoryApi.getAll(page, itemsPerPage, search);
      
      if (response && response.categories) {
        setCategories(response.categories);
        setTotalPages(response.pagination?.totalPages || 1);
        setCurrentPage(response.pagination?.currentPage || 1);
      } else if (Array.isArray(response)) {
        setCategories(response);
        setTotalPages(1);
      } else {
        setCategories([]);
      }
    } catch (err: any) {
      console.error("Fetch API Error:", err);
      setCategories([]);
      setError("Không thể tải danh sách");
    } finally {
      setLoading(false);
    }
  }, []);

  // Gọi fetch khi Trang thay đổi HOẶC Từ khóa Debounced thay đổi
  useEffect(() => {
    fetchCategories(currentPage, debouncedSearch);
  }, [fetchCategories, currentPage, debouncedSearch]);

  // --- 5. HÀM XỬ LÝ TÌM KIẾM (CẬP NHẬT) ---
  const handleSearch = (query: string) => {
    setSearchTerm(query); // Chỉ cập nhật UI, logic gọi API nằm ở useEffect Debounce phía trên
  };

  // --- 6. XỬ LÝ THÊM / SỬA ---
  const handleSubmit = async (formData: CreateCategoryPayload) => {
    try {
      if (selectedCategory) {
        await categoryApi.update(selectedCategory._id, formData);
      } else {
        await categoryApi.create(formData);
      }
      await fetchCategories(currentPage, debouncedSearch); 
    } catch (err: any) {
      throw err; 
    }
  };

  // --- 7. XỬ LÝ ẨN / HIỆN NHANH ---
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

  // --- 8. XỬ LÝ XÓA ---
  const executeDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await categoryApi.delete(categoryToDelete);
      
      if (categories?.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        await fetchCategories(currentPage, debouncedSearch);
      }
      
      handleCloseDeleteModal();
      toast.success("Đã xóa danh mục thành công");
    } catch (err: any) {
      toast.error("Lỗi khi xóa dữ liệu");
    }
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
    categories, loading, error, currentPage, totalPages, searchTerm,
    handlePageChange,
    handleSearch, 
    refresh: () => fetchCategories(currentPage, debouncedSearch),
    isModalOpen, selectedCategory, handleOpenAdd, handleOpenEdit, handleCloseModal, handleSubmit,
    handleToggleStatus, 
    isDeleteModalOpen, handleOpenDeleteConfirm, handleCloseDeleteModal, executeDelete
  };
};