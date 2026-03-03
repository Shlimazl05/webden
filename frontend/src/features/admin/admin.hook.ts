
// import { useState, useEffect } from 'react';

// export const useAdminStats = () => {
//   const [stats, setStats] = useState<any>(null); // Khởi tạo là null
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // QUAN TRỌNG: Để hiện dấu --, bạn phải setStats(null) ở đây
//       setStats(null); 
      
//       setLoading(false);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   return { stats, loading };
// };

import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';

export const useAdminStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/stats');
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