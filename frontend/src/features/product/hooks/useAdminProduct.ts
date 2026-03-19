

// "use client";

// import { useState, useEffect, useCallback } from 'react';
// import { IProduct } from '@/features/product/product.types';
// import { productApi, PaginatedProduct } from '@/features/product/api/product.admin.api';
// import { categoryApi } from '@/features/category/api/category.admin.api';
// import toast from 'react-hot-toast';

// export const useProductFeature = () => {
//   // --- Data & Pagination State ---
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const itemsPerPage = 10;

//   // --- Modal Thêm/Sửa State ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

//   // --- Modal Xóa State ---
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState<string | null>(null);

//   // --- MỚI: Modal Xem chi tiết State ---
//   const [detailProduct, setDetailProduct] = useState<IProduct | null>(null);

//   /**
//    * 1. Lấy danh sách danh mục cho Modal
//    */
//   const fetchCategories = useCallback(async () => {
//     try {
//       const response = await categoryApi.getAll(1, 100);
//       if (response && 'categories' in response) {
//         setCategories(response.categories);
//       } else if (Array.isArray(response)) {
//         setCategories(response);
//       }
//     } catch (error) {
//       console.error("Lỗi lấy danh mục:", error);
//     }
//   }, []);

//   /**
//    * 2. Lấy danh sách sản phẩm (Phân trang + Tìm kiếm)
//    */
//   const fetchProducts = useCallback(async (page: number, search: string) => {
//     try {
//       setLoading(true);
//       const response = await productApi.getAllProducts({ 
//         page, 
//         limit: itemsPerPage, 
//         search 
//       });

//       if (response && !Array.isArray(response)) {
//         const data = response as PaginatedProduct; 
//         setProducts(data.products || []);
//         setTotalPages(data.pagination?.totalPages || 1);
//         setCurrentPage(data.pagination?.currentPage || 1);
//       } else if (Array.isArray(response)) {
//         setProducts(response);
//         setTotalPages(1);
//       }
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Xử lý Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//       setCurrentPage(1);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   useEffect(() => {
//     fetchProducts(currentPage, debouncedSearch);
//   }, [fetchProducts, currentPage, debouncedSearch]);

//   // --- Handlers ---

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleSearch = (query: string) => {
//     setSearchTerm(query);
//   };

//   const handleToggleStatus = async (product: IProduct) => {
//     try {
//       const newStatus = product.status === 'Active' ? 'Hidden' : 'Active';
//       await productApi.updateProduct(product._id, { status: newStatus } as any);
//       setProducts(prev => 
//         prev.map(p => p._id === product._id ? { ...p, status: newStatus } : p)
//       );
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleOpenAdd = () => {
//     setSelectedProduct(null);
//     setIsModalOpen(true);
//   };

//   const handleOpenEdit = (product: IProduct) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   // --- MỚI: Handlers cho Xem chi tiết ---
//   const handleOpenDetail = (product: IProduct) => {
//     setDetailProduct(product);
//   };

//   const handleCloseDetail = () => {
//     setDetailProduct(null);
//   };

//   const openDeleteModal = (id: string) => {
//     setProductToDelete(id);
//     setIsDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setProductToDelete(null);
//   };

//   const confirmDelete = async () => {
//     if (!productToDelete) return;
//     try {
//       await productApi.deleteProduct(productToDelete);
//       toast.success("Đã xóa sản phẩm thành công");
      
//       if (products.length === 1 && currentPage > 1) {
//         setCurrentPage(prev => prev - 1);
//       } else {
//         await fetchProducts(currentPage, debouncedSearch);
//       }
//     } catch (error) {
//       toast.error("Không thể xóa sản phẩm");
//     } finally {
//       closeDeleteModal();
//     }
//   };

//   return {
//     products,
//     categories,
//     loading,
//     currentPage,
//     totalPages,
//     handlePageChange,
//     handleSearch,
//     handleToggleStatus,
//     refresh: () => fetchProducts(currentPage, debouncedSearch),
    
//     // Modal Add/Edit
//     isModalOpen,
//     selectedProduct,
//     handleOpenAdd,
//     handleOpenEdit,
//     handleCloseModal,

//     // MỚI: Modal Detail
//     detailProduct,
//     handleOpenDetail,
//     handleCloseDetail,

//     // Modal Delete
//     isDeleteModalOpen,
//     openDeleteModal,
//     closeDeleteModal,
//     confirmDelete
//   };
// };


"use client";

import { useState, useEffect, useCallback } from 'react';
import { IProduct } from '@/features/product/product.types';
import { productApi, PaginatedProduct } from '@/features/product/api/product.admin.api';
import { categoryApi } from '@/features/category/api/category.admin.api';
import toast from 'react-hot-toast';

export const useProductFeature = () => {
  // --- Data & Pagination State ---
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const itemsPerPage = 10;

  // --- Modal Thêm/Sửa State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  // --- Modal Xem chi tiết State ---
  const [detailProduct, setDetailProduct] = useState<IProduct | null>(null);
  const [isEditingDetail, setIsEditingDetail] = useState(false); // Trạng thái xem/sửa trong modal

  // --- Modal Xóa State ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  /**
   * 1. Lấy danh sách danh mục
   */
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

  /**
   * 2. Lấy danh sách sản phẩm
   */
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
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search
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

  // --- Handlers ---

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
      throw error;
    }
  };

  // Logic Modal Thêm/Sửa (Độc lập)
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
      setTimeout(() => {
        handleOpenDetail(productToBack);
      }, 150);
    }
  };

  // Logic Xem chi tiết & Chuyển đổi tức thì (Smart Modal)
  const handleOpenDetail = (product: IProduct) => {
    setDetailProduct(product);
    setIsEditingDetail(false); // Luôn bắt đầu bằng chế độ xem
  };

  const handleCloseDetail = () => {
    setDetailProduct(null);
    setIsEditingDetail(false);
  };

  const handleEditFromDetail = () => {
    setIsEditingDetail(true); // Chuyển sang sửa mà không đóng modal
  };

  const handleBackToDetail = () => {
    setIsEditingDetail(false); // Quay lại xem mà không đóng modal
  };

  // Logic Xóa
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
      if (products.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        await fetchProducts(currentPage, debouncedSearch);
      }
    } catch (error) {
      toast.error("Không thể xóa sản phẩm");
    } finally {
      closeDeleteModal();
    }
  };

  // TRẢ VỀ CÁC BIẾN (Đây là phần quan trọng để page.tsx không báo lỗi)
  return {
    products,
    categories,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    handleToggleStatus,
    refresh: () => fetchProducts(currentPage, debouncedSearch),

    // Modal Add/Edit
    isModalOpen,
    selectedProduct,
    handleOpenAdd,
    handleOpenEdit,
    handleCloseModal,
    handleCancelEdit,

    // Modal Detail (Smart Modal)
    detailProduct,
    setDetailProduct,
    isEditingDetail,      // PHẢI CÓ DÒNG NÀY
    handleOpenDetail,
    handleCloseDetail,
    handleEditFromDetail, // PHẢI CÓ DÒNG NÀY
    handleBackToDetail,   // PHẢI CÓ DÒNG NÀY

    // Modal Delete
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete
  };
};