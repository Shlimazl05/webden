// // src/features/admin/admin.hooks.ts
// import { useState, useEffect } from 'react';

// export const useAdminStats = () => {
//   const [stats, setStats] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStats({ revenue: "128M", products: "452", customers: "1,205", orders: "12" });
//       setLoading(false);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   return { stats, loading };
// };
// src/features/admin/admin.hooks.ts
import { useState, useEffect } from 'react';

export const useAdminStats = () => {
  const [stats, setStats] = useState<any>(null); // Khởi tạo là null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // QUAN TRỌNG: Để hiện dấu --, bạn phải setStats(null) ở đây
      setStats(null); 
      
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return { stats, loading };
};