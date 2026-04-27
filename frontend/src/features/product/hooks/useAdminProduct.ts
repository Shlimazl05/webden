


"use client";

import { useState, useEffect, useCallback } from 'react';
import { IProduct } from '@/features/product/product.types';
import { productApi, PaginatedProduct } from '@/features/product/api/product.admin.api';
import { categoryApi } from '@/features/category/api/category.admin.api';
import toast from 'react-hot-toast';

const toastStyle = {
  borderRadius: '12px',
  background: '#1e293b',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
};

export const useProductFeature = () => {
  // ... (Giữ nguyên các State cũ của bạn)
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [detailProduct, setDetailProduct] = useState<IProduct | null>(null);
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryApi.getAll(1, 100);
      if (response && 'categories' in response) {
        setCategories(response.categories);
      } else if (Array.isArray(response)) {
        setCategories(response);
      }
    } catch (error) {
      console.error("Lỗi lấy danh mục:", error);
    }
  }, []);

  const fetchProducts = useCallback(async (page: number, search: string) => {
    try {
      setLoading(true);
      const response = await productApi.getAllProducts({
        page,
        limit: itemsPerPage,
        search
      });
      if (response && !Array.isArray(response)) {
        const data = response as PaginatedProduct;
        setProducts(data.products || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.currentPage || 1);
      } else if (Array.isArray(response)) {
        setProducts(response);
        setTotalPages(1);
      }
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts(currentPage, debouncedSearch);
  }, [fetchProducts, currentPage, debouncedSearch]);

  // --- HÀM XỬ LÝ LƯU SẢN PHẨM (THÊM MỚI / CẬP NHẬT) ---
  const handleSaveProduct = async (data: any) => {
    // 1. Kiểm tra dữ liệu (Validation) trước khi gọi API
    if (!data.productName?.trim()) {
      return toast.error("Vui lòng nhập tên sản phẩm!", { style: toastStyle });
    }
    if (!data.categoryId) {
      return toast.error("Vui lòng chọn danh mục!", { style: toastStyle });
    }
    
    if (!data.imageUrl) {
      return toast.error("Vui lòng tải ảnh chính cho sản phẩm!", { style: toastStyle });
    }

    const isEdit = !!selectedProduct;
    const promise = isEdit
      ? productApi.updateProduct(selectedProduct._id, data)
      : productApi.createProduct(data);

    // 2. Sử dụng toast.promise để hiển thị trạng thái xử lý
    toast.promise(promise, {
      loading: isEdit ? 'Đang cập nhật sản phẩm...' : 'Đang thêm sản phẩm mới...',
      success: () => {
        fetchProducts(currentPage, debouncedSearch);
        handleCloseModal();
        return isEdit ? "Cập nhật thành công!" : "Thêm sản phẩm thành công!";
      },
      error: (err) => {
        // Xử lý lỗi từ Backend nếu có (ví dụ trùng mã sản phẩm)
        const errMsg = err.response?.data?.message || "CÓ LỖI XẢY RA, VUI LÒNG THỬ LẠI!";
        return errMsg.toUpperCase();
      }
    }, { style: toastStyle });

    try {
      await promise;
    } catch (e) {
      console.error("Lỗi khi lưu sản phẩm:", e);
    }
  };

  // --- Handlers cũ ---
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleToggleStatus = async (product: IProduct) => {
    try {
      const newStatus = product.status === 'Active' ? 'Hidden' : 'Active';
      await productApi.updateProduct(product._id, { status: newStatus } as any);
      setProducts(prev =>
        prev.map(p => p._id === product._id ? { ...p, status: newStatus } : p)
      );
    } catch (error) {
      toast.error("KHÔNG THỂ THAY ĐỔI TRẠNG THÁI");
    }
  };

  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCancelEdit = () => {
    const productToBack = selectedProduct;
    handleCloseModal();
    if (productToBack) {
      setTimeout(() => handleOpenDetail(productToBack), 150);
    }
  };

  const handleOpenDetail = (product: IProduct) => {
    setDetailProduct(product);
    setIsEditingDetail(false);
  };

  const handleCloseDetail = () => {
    setDetailProduct(null);
    setIsEditingDetail(false);
  };

  const handleEditFromDetail = () => setIsEditingDetail(true);
  const handleBackToDetail = () => setIsEditingDetail(false);

  const openDeleteModal = (id: string) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await productApi.deleteProduct(productToDelete);
      toast.success("Đã xóa sản phẩm thành công");
      fetchProducts(currentPage, debouncedSearch);
    } catch (error) {
      toast.error("Không thể xóa sản phẩm");
    } finally {
      closeDeleteModal();
    }
  };

  return {
    products,
    categories,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    handleToggleStatus,
    handleSaveProduct, // XUẤT HÀM MỚI NÀY RA ĐỂ SỬ DỤNG
    refresh: () => fetchProducts(currentPage, debouncedSearch),

    isModalOpen,
    selectedProduct,
    handleOpenAdd,
    handleOpenEdit,
    handleCloseModal,
    handleCancelEdit,

    detailProduct,
    setDetailProduct,
    isEditingDetail,
    handleOpenDetail,
    handleCloseDetail,
    handleEditFromDetail,
    handleBackToDetail,

    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete
  };
};