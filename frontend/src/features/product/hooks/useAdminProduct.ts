"use client";

import { useState, useEffect } from 'react';
import { IProduct } from '@/features/product/product.types';

export const useProductFeature = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // --- TRẠNG THÁI MODAL THÊM/SỬA ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  // --- TRẠNG THÁI MODAL XÓA ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts([]); // Khởi tạo mảng rỗng để bắt đầu thêm mới
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const openDeleteModal = (id: string) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(prev => prev.filter(p => p._id !== productToDelete));
      closeDeleteModal(); // Sử dụng hàm wrapper để reset cả ID
    }
  };

  const handleSearch = (q: string) => console.log("Tìm kiếm:", q);

  return {
    products,
    loading,
    handleSearch,
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