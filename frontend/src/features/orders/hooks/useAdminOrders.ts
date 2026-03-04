// src/features/orders/hooks/useAdminOrder.ts
import { useState, useEffect, useCallback } from 'react';
import { orderAdminApi } from '../api/order.admin.api';
import { IOrder, OrderStatus } from '../order.types';
import toast from 'react-hot-toast';

export const useAdminOrder = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search 500ms
  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(searchTerm); setCurrentPage(1); }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await orderAdminApi.getAll(
        currentPage, 
        10, 
        activeTab === 'all' ? '' : activeTab, 
        debouncedSearch
      );
      setOrders(res.orders || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (err) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeTab, debouncedSearch]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await orderAdminApi.updateStatus(orderId, status);
      toast.success("CẬP NHẬT TRẠNG THÁI THÀNH CÔNG");
      fetchOrders();
    } catch (err) {
      toast.error("KHÔNG THỂ CẬP NHẬT");
    }
  };

  return {
    orders, loading, currentPage, totalPages, activeTab, searchTerm,
    handleSearch: setSearchTerm,
    handlePageChange: setCurrentPage,
    handleTabChange: (tab: string) => { setActiveTab(tab); setCurrentPage(1); },
    handleUpdateStatus,
    refresh: fetchOrders
  };
};