// "use client";

// import { useState, useEffect } from 'react';
// import { IProduct } from '@/features/product/product.types';

// export const useProductFeature = () => {
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- TRẠNG THÁI MODAL THÊM/SỬA ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

//   // --- TRẠNG THÁI MODAL XÓA ---
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState<string | null>(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setProducts([]); // Khởi tạo mảng rỗng để bắt đầu thêm mới
//       setLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleOpenAdd = () => {
//     setSelectedProduct(null);
//     setIsModalOpen(true);
//   };

//   const handleOpenEdit = (product: IProduct) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => setIsModalOpen(false);

//   const openDeleteModal = (id: string) => {
//     setProductToDelete(id);
//     setIsDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setProductToDelete(null);
//   };

//   const confirmDelete = () => {
//     if (productToDelete) {
//       setProducts(prev => prev.filter(p => p._id !== productToDelete));
//       closeDeleteModal(); // Sử dụng hàm wrapper để reset cả ID
//     }
//   };

//   const handleSearch = (q: string) => console.log("Tìm kiếm:", q);

//   return {
//     products,
//     loading,
//     handleSearch,
//     isModalOpen,
//     selectedProduct,
//     handleOpenAdd,
//     handleOpenEdit,
//     handleCloseModal,
//     isDeleteModalOpen,
//     openDeleteModal,
//     closeDeleteModal,
//     confirmDelete
//   };
// };

"use client";

import { useState, useEffect, useCallback } from 'react';
import { IProduct } from '@/features/product/product.types';
import { productApi } from '@/features/product/api/product.admin.api';
import toast from 'react-hot-toast';

export const useProductFeature = () => {
  // --- Data & Pagination State ---
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  /**
   * Fetch products from server with pagination and search filtering
   */
  const fetchProducts = useCallback(async (page: number, search: string) => {
    try {
      setLoading(true);
      // Gọi API lấy danh sách sản phẩm
      const response = await productApi.getAllProducts({ 
        page, 
        limit: itemsPerPage, 
        search 
      });

      // Kiểm tra cấu trúc response để gán dữ liệu an toàn
       if (response && !Array.isArray(response)) {
        const data = response as any; 
        setProducts(data.products || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.currentPage || 1);
      } else if (Array.isArray(response)) {
        setProducts(response);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync data when page or search term changes
  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [fetchProducts, currentPage, searchTerm]);

  // --- Handlers ---

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1); // Reset về trang đầu khi thực hiện tìm kiếm mới
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

  const openDeleteModal = (id: string) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  /**
   * Execute delete operation and refresh list
   */
  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await productApi.deleteProduct(productToDelete);
      toast.success("Đã xóa sản phẩm thành công");
      
      // Kiểm tra nếu xóa hết item ở trang hiện tại thì lùi về trang trước
      if (products.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        await fetchProducts(currentPage, searchTerm);
      }
    } catch (error) {
      toast.error("Không thể xóa sản phẩm, vui lòng thử lại");
    } finally {
      closeDeleteModal();
    }
  };

  return {
    // Data & Logic
    products,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    
    // Modal Add/Edit
    isModalOpen,
    selectedProduct,
    handleOpenAdd,
    handleOpenEdit,
    handleCloseModal,

    // Modal Delete
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete
  };
};