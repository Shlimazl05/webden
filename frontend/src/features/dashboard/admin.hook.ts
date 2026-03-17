

// import { useState, useEffect } from 'react';
// import { adminDashboardApi } from './admin.api';
// import { AdminStats } from './dashboard.types'; // Import interface vừa tạo

// export const useAdminStats = () => {
//   // Thay <any> bằng <AdminStats | null>
//   const [stats, setStats] = useState<AdminStats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [range, setRange] = useState(30);

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const res = await adminDashboardApi.getStats();
//       if (res.success) {
//         setStats(res.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch stats", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   return { stats, loading, refresh: fetchStats };
// };


import { useState, useEffect, useCallback } from 'react';
import { adminDashboardApi } from './admin.api';
import { AdminStats } from './dashboard.types';

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  // 1. Thêm state để quản lý số ngày lọc (mặc định 30)
  const [range, setRange] = useState(30);

  // 2. Cập nhật hàm fetch để nhận tham số days
  const fetchStats = useCallback(async (days: number) => {
    try {
      setLoading(true);
      // Truyền range vào API call (đảm bảo adminDashboardApi.getStats đã nhận params)
      const res = await adminDashboardApi.getStats(days);
      if (res.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Gọi lại fetchStats mỗi khi 'range' thay đổi
  useEffect(() => {
    fetchStats(range);
  }, [range, fetchStats]);

  // 4. Trả về thêm range và setRange để UI sử dụng
  return {
    stats,
    loading,
    range,
    setRange,
    refresh: () => fetchStats(range)
  };
};