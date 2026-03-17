

// import { useState, useEffect } from 'react';
// import { adminDashboardApi } from './admin.api';

// export const useAdminStats = () => {
//   const [stats, setStats] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

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


import { useState, useEffect } from 'react';
import { adminDashboardApi } from './admin.api';
import { AdminStats } from './dashboard.types'; // Import interface vừa tạo

export const useAdminStats = () => {
  // Thay <any> bằng <AdminStats | null>
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await adminDashboardApi.getStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, refresh: fetchStats };
};