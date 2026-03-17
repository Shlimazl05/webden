

import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';

export const useAdminStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/dashboard/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi lấy thống kê:", error);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, refresh: fetchStats };
};