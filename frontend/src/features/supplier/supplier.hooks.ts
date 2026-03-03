// src/features/supplier/hooks/supplier.hooks.ts
import { useState, useEffect, useCallback } from 'react';
import { ISupplier, CreateSupplierPayload } from '../supplier/supplier.types';
import { supplierApi } from '../supplier/supplier.api'; // Giả định bạn đã tạo file API tương tự Category
import toast from 'react-hot-toast';

export const useSupplierFeature = () => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [modal, setModal] = useState({ open: false, data: null as ISupplier | null });
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null as string | null });

  // Debounce Search Logic
  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(searchTerm); setCurrentPage(1); }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchSuppliers = useCallback(async (page: number, search: string) => {
    try {
      setLoading(true);
      const res = await supplierApi.getAll(page, 10, search);
      if (res && res.suppliers) {
        setSuppliers(res.suppliers);
        setTotalPages(res.pagination.totalPages);
        setCurrentPage(res.pagination.currentPage);
      }
    } catch (err) { setSuppliers([]); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchSuppliers(currentPage, debouncedSearch); }, [currentPage, debouncedSearch, fetchSuppliers]);

  const handleSubmit = async (data: CreateSupplierPayload) => {
    const promise = modal.data ? supplierApi.update(modal.data._id, data) : supplierApi.create(data);
    await promise;
    fetchSuppliers(currentPage, debouncedSearch);
  };

  const handleToggleStatus = async (sup: ISupplier) => {
    const newStatus = sup.status === 'Active' ? 'Hidden' : 'Active';
    await supplierApi.update(sup._id, { status: newStatus } as any);
    setSuppliers(prev => prev.map(s => s._id === sup._id ? { ...s, status: newStatus } : s));
  };

  const executeDelete = async () => {
    if (!deleteModal.id) return;
    await supplierApi.delete(deleteModal.id);
    fetchSuppliers(currentPage, debouncedSearch);
    setDeleteModal({ open: false, id: null });
    toast.success("Đã xóa nhà cung cấp");
  };

  return {
    suppliers, loading, currentPage, totalPages, searchTerm,
    handleSearch: setSearchTerm,
    handlePageChange: setCurrentPage,
    // Modal Add/Edit
    isModalOpen: modal.open,
    selectedSupplier: modal.data,
    handleOpenAdd: () => setModal({ open: true, data: null }),
    handleOpenEdit: (data: ISupplier) => setModal({ open: true, data }),
    handleCloseModal: () => setModal({ open: false, data: null }),
    handleSubmit,
    handleToggleStatus,
    // Modal Delete
    isDeleteModalOpen: deleteModal.open,
    handleOpenDelete: (id: string) => setDeleteModal({ open: true, id }),
    handleCloseDelete: () => setDeleteModal({ open: false, id: null }),
    executeDelete
  };
};