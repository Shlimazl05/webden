
// "use client";
// import React from 'react';
// import { useAdminAuth } from '@/features/auth/auth.hooks';

// // THÀNH PHẦN LOGIC (HOOKS)
// import { useAdminOrders } from '@/features/orders/hooks/useAdminOrders';

// // THÀNH PHẦN GIAO DIỆN (UI COMPONENTS)
// import { OrderTabs } from '@/features/orders/components/OrderTabs';
// import { EmptyOrderState } from '@/features/orders/components/EmptyOrderState';
// import { OrderSearch } from '@/features/orders/components/OrderSearch'; 

// export default function OrdersPage() {
//   // 1. Kiểm tra quyền truy cập Admin
//   const { isAuthorized } = useAdminAuth();

//   // 2. Lấy bộ não xử lý đơn hàng từ Hook chuyên biệt cho Admin
//   const { activeTab, handleTabChange, handleSearch } = useAdminOrders();

//   // Nếu không có quyền, không hiển thị gì cả (useAdminAuth sẽ tự chuyển hướng về Login)
//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500">
//       {/* KHUNG BAO TRẮNG LỚN (Đồng bộ toàn phân vùng Admin) */}
//       <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-50 p-10 min-h-[700px]">
        
//         {/* TIÊU ĐỀ TRANG: Black font & Uppercase cho chuyên nghiệp */}
//         <h1 className="text-2xl font-black text-[#001529] mb-8 tracking-tighter uppercase">
//           Quản lý đơn hàng
//         </h1>

//         {/* KHU VỰC CÔNG CỤ: TÌM KIẾM */}
//         <div className="mb-10">
//           <OrderSearch onSearch={handleSearch} />
//         </div>

//         {/* BỘ LỌC TRẠNG THÁI (TABS) */}
//         <OrderTabs activeTab={activeTab} onTabChange={handleTabChange} />

//         {/* DANH SÁCH ĐƠN HÀNG: Hiện tại hiển thị trạng thái trống */}
//         <div className="mt-10">
//           {/* 
//               Sau này có dữ liệu, bạn sẽ check: 
//               {orders && orders.length > 0 ? <OrderList data={orders} /> : <EmptyOrderState />}
//           */}
//           <EmptyOrderState />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React from 'react';
import { useAdminAuth } from '@/features/auth/auth.hooks';
import { useAdminOrders } from '@/features/orders/hooks/useAdminOrders';
import { OrderTabs } from '@/features/orders/components/OrderTabs';
import { EmptyOrderState } from '@/features/orders/components/EmptyOrderState';
import { OrderSearch } from '@/features/orders/components/OrderSearch'; 

// Chỉ giữ lại Container và Header
import { 
  AdminPageContainer, 
  AdminPageHeader
} from "@/components/layout/AdminPageContainer";

export default function OrdersPage() {
  const { isAuthorized } = useAdminAuth();
  const { activeTab, handleTabChange, handleSearch } = useAdminOrders();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500">
      
      <AdminPageContainer>
        
        <AdminPageHeader title="QUẢN LÝ ĐƠN HÀNG" />

        <div className="mb-10 max-w-sm">
          <OrderSearch onSearch={handleSearch} />
        </div>

        <OrderTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* 
            VÙNG CUỘN NỘI BỘ: 
            Bỏ AdminInnerBox đi, để EmptyOrderState tự hiển thị khung của nó
        */}
        <div className="max-h-[550px] overflow-y-auto custom-scrollbar mt-6 pr-2">
          
          {/* Gọi trực tiếp EmptyOrderState */}
          <EmptyOrderState />

        </div>

      </AdminPageContainer>
    </div>
  );
}