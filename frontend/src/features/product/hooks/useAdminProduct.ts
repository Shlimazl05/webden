

// "use client";

// import { useState, useEffect, useCallback } from 'react';
// import { IProduct } from '@/features/product/product.types';
// import { productApi } from '@/features/product/api/product.admin.api';
// import toast from 'react-hot-toast';

// export const useProductFeature = () => {
//   // --- Data & Pagination State ---
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const itemsPerPage = 10;

//   // --- Modal State ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState<string | null>(null);

//   /**
//    * Fetch products from server with pagination and search filtering
//    */
//   const fetchProducts = useCallback(async (page: number, search: string) => {
//     try {
//       setLoading(true);
//       // Gọi API lấy danh sách sản phẩm
//       const response = await productApi.getAllProducts({ 
//         page, 
//         limit: itemsPerPage, 
//         search 
//       });

//       // Kiểm tra cấu trúc response để gán dữ liệu an toàn
//        if (response && !Array.isArray(response)) {
//         const data = response as any; 
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

//   // Sync data when page or search term changes
//   useEffect(() => {
//     fetchProducts(currentPage, searchTerm);
//   }, [fetchProducts, currentPage, searchTerm]);

//   // --- Handlers ---

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleSearch = (query: string) => {
//     setSearchTerm(query);
//     setCurrentPage(1); // Reset về trang đầu khi thực hiện tìm kiếm mới
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

//   const openDeleteModal = (id: string) => {
//     setProductToDelete(id);
//     setIsDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setProductToDelete(null);
//   };

//   /**
//    * Execute delete operation and refresh list
//    */
//   const confirmDelete = async () => {
//     if (!productToDelete) return;
//     try {
//       await productApi.deleteProduct(productToDelete);
//       toast.success("Đã xóa sản phẩm thành công");
      
//       // Kiểm tra nếu xóa hết item ở trang hiện tại thì lùi về trang trước
//       if (products.length === 1 && currentPage > 1) {
//         setCurrentPage(prev => prev - 1);
//       } else {
//         await fetchProducts(currentPage, searchTerm);
//       }
//     } catch (error) {
//       toast.error("Không thể xóa sản phẩm, vui lòng thử lại");
//     } finally {
//       closeDeleteModal();
//     }
//   };

//   return {
//     // Data & Logic
//     products,
//     loading,
//     currentPage,
//     totalPages,
//     handlePageChange,
//     handleSearch,
    
//     // Modal Add/Edit
//     isModalOpen,
//     selectedProduct,
//     handleOpenAdd,
//     handleOpenEdit,
//     handleCloseModal,

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
import { categoryApi } from '@/features/category/api/category.admin.api'; // Import thêm API category
import toast from 'react-hot-toast';

export const useProductFeature = () => {
  // --- Data & Pagination State ---
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<any[]>([]); // State lưu danh mục cho Modal
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(''); // Thêm debounce cho search
  const itemsPerPage = 10;

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  /**
   * 1. Lấy danh sách danh mục (Dùng cho dropdown trong Modal)
   */
  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryApi.getAll(1, 100); // Lấy tối đa 100 danh mục
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
   * 2. Lấy danh sách sản phẩm (Phân trang + Tìm kiếm)
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

  // Xử lý Debounce cho ô tìm kiếm
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset về trang 1 khi search thay đổi
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Gọi fetch khi load trang lần đầu (lấy categories)
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Gọi fetch sản phẩm khi Page hoặc Debounced Search thay đổi
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

  return {
    products,
    categories, // Trả thêm dữ liệu danh mục ra cho Page.tsx
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    refresh: () => fetchProducts(currentPage, debouncedSearch), // Hàm refresh dùng sau khi Lưu/Sửa
    
    isModalOpen,
    selectedProduct,
    handleOpenAdd,
    handleOpenEdit,
    handleCloseModal,

    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete
  };
};