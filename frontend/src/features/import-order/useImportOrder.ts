import { useState, useEffect, useCallback } from 'react';
import { importOrderApi } from '../import-order/import-order.api';
import toast from 'react-hot-toast';

export const useImportOrderFeature = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(searchTerm); setCurrentPage(1); }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchOrders = useCallback(async (page: number, search: string) => {
    try {
      setLoading(true);
      const res = await importOrderApi.getAll(page, 10, search);
      setOrders(res.orders || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (err) { setOrders([]); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchOrders(currentPage, debouncedSearch); }, [currentPage, debouncedSearch, fetchOrders]);

  const handleCreate = async (data: any) => {
    await importOrderApi.create(data);
    fetchOrders(1, "");
  };

  const executeDelete = async () => {
    if (!selectedId) return;
    try {
      await importOrderApi.delete(selectedId);
      toast.success("ĐÃ XÓA VÀ CẬP NHẬT KHO");
      fetchOrders(currentPage, debouncedSearch);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "KHÔNG THỂ XÓA");
    } finally { setIsDeleteModalOpen(false); }
  };

  return {
    orders, loading, currentPage, totalPages, handleSearch: setSearchTerm, handlePageChange: setCurrentPage,
    isModalOpen, handleOpenAdd: () => setIsModalOpen(true), handleCloseModal: () => setIsModalOpen(false), handleCreate,
    isDeleteModalOpen, handleOpenDelete: (id: string) => { setSelectedId(id); setIsDeleteModalOpen(true); },
    handleCloseDelete: () => setIsDeleteModalOpen(false), executeDelete,
    refresh: () => fetchOrders(currentPage, debouncedSearch)
  };
};