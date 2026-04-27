


import { useState, useEffect, useCallback } from 'react';
import { adminDashboardApi } from './admin.api';
import { AdminStats } from './dashboard.types';

// Định nghĩa các kiểu filter hợp lệ để TypeScript hỗ trợ tốt hơn
export type DateRange = 'today' | '7days' | 'thisMonth' | 'all' | string;

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Chuyển range thành kiểu string để nhận được 'today', 'all',...
  // Mặc định là '30' (số ngày)
  const [range, setRange] = useState<DateRange>('30');

  // 2. Cập nhật hàm fetch để nhận tham số là string
  const fetchStats = useCallback(async (filterType: DateRange) => {
    try {
      setLoading(true);
      // Gọi API với filterType mới (ví dụ: 'all' hoặc 'today')
      const res = await adminDashboardApi.getStats(filterType);
      if (res.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Gọi lại fetchStats mỗi khi 'range' (filter) thay đổi
  useEffect(() => {
    fetchStats(range);
  }, [range, fetchStats]);

  return {
    stats,
    loading,
    range,
    setRange,
    refresh: () => fetchStats(range)
  };
};