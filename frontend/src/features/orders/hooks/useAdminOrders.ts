// // src/features/orders/order.hooks.ts
// import { useState } from 'react';

// export const useOrderManagement = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   // Hàm xử lý tìm kiếm
//   const handleSearch = (value: string) => {
//     setSearchQuery(value);
//     // Sau này code gọi API thực tế sẽ nằm ở đây:
//     // fetchOrders({ tab: activeTab, search: value });
//     console.log("Đang tìm kiếm đơn hàng:", value);
//   };

//   // Hàm thay đổi Tab
//   const handleTabChange = (tabId: string) => {
//     setActiveTab(tabId);
//     // Gọi lại API khi đổi Tab
//     console.log("Chuyển sang tab:", tabId);
//   };

//   return {
//     activeTab,
//     handleTabChange,
//     handleSearch,
//     searchQuery
//   };
// };

// src/features/orders/hooks/useAdminOrders.ts
// src/features/orders/hooks/useAdminOrders.ts
import { useState, useEffect } from 'react';
import { orderAdminApi } from '../api/order.admin.api';

export const useAdminOrders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]); // Chứa danh sách đơn hàng thật

  // 1. Hàm lấy dữ liệu từ API
  const fetchAllOrders = async (query?: string) => {
    try {
      setLoading(true);
      // Gọi trực tiếp API dành cho Admin
      const data = await orderAdminApi.getAllOrders({ 
        status: activeTab, 
        search: query || searchQuery 
      });
      
      setOrders(data); // Lưu dữ liệu vào state
      console.log("Dữ liệu đơn hàng Admin:", data);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng Admin:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Hàm xử lý thay đổi Tab (Tất cả, Chờ xác nhận...)
  // CẦN THIẾT để page.tsx hết lỗi gạch đỏ
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log("Admin chuyển sang tab:", tabId);
    // Sau này: fetchAllOrders(); 
  };

  // 3. Hàm xử lý Tìm kiếm
  // CẦN THIẾT để page.tsx hết lỗi gạch đỏ
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    console.log("Admin đang tìm kiếm đơn hàng:", value);
    // Sau này: fetchAllOrders(value);
  };

  // Tự động load dữ liệu khi đổi Tab
  useEffect(() => {
    // fetchAllOrders(); 
  }, [activeTab]);

  // QUAN TRỌNG: Phải return đúng và đủ các tên mà page.tsx đang gọi
  return { 
    activeTab, 
    loading, 
    orders,
    handleTabChange, // Trả về để page.tsx sử dụng
    handleSearch,    // Trả về để page.tsx sử dụng
    fetchAllOrders 
  };
};