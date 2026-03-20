// "use client";
// import React from 'react';

// // Business Logic & Hooks
// import { useAdminAuth } from "@/features/auth/auth.hooks";
// import { useAdminOrder } from "@/features/orders/hooks/useAdminOrders";

// // UI Components
// import { OrderTabs } from "@/features/orders/components/OrderTabs";
// import { EmptyOrderState } from "@/features/orders/components/EmptyOrderState"; // Import nó vào đây
// import { SearchBar } from "@/components/ui/SearchBar";
// import { Pagination } from "@/components/ui/Pagination";
// import { AdminOrderCard } from "@/features/orders/components/admin/AdminOrderCard";
// // Layout Wrappers
// import { 
//   AdminPageContainer, 
//   AdminPageHeader 
// } from "@/components/layout/AdminPageContainer";

// export default function AdminOrdersPage() {
//   const { isAuthorized } = useAdminAuth();
//   const f = useAdminOrder();

//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500 pb-10">
//       <AdminPageContainer>
//         <AdminPageHeader title="QUẢN LÝ ĐƠN HÀNG" />

//         {/* 1. Thanh Tabs lọc trạng thái */}
//         <OrderTabs activeTab={f.activeTab} onTabChange={f.handleTabChange} />

//         {/* 2. Thanh tìm kiếm */}
//         <div className="mb-10 max-w-md">
//           <SearchBar onSearch={f.handleSearch} placeholder="Tìm mã đơn hoặc SĐT khách..." />
//         </div>

//         {/* 3. KHU VỰC HIỂN THỊ LOGIC THÔNG MINH */}
//         <div className="min-h-[400px]">
//           {f.loading ? (
//             // Trạng thái đang tải (Skeleton)
//             <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />
//           ) : f.orders.length > 0 ? (
//             // Nếu có đơn hàng -> Hiện bảng
//             <>
//               <div className="space-y-2">
//                 {f.orders.map((order: any) => (
//                   <AdminOrderCard 
//                     key={order._id} 
//                     order={order} 
//                     onUpdateStatus={f.handleUpdateStatus} 
//                   />
//                 ))}
//               </div>
//               {/* Phân trang chỉ hiện khi có dữ liệu */}
//               <div className="mt-8 border-t border-slate-50 pt-4">
//                 <Pagination 
//                   currentPage={f.currentPage} 
//                   totalPages={f.totalPages} 
//                   onPageChange={f.handlePageChange} 
//                 />
//               </div>
//             </>
//           ) : (
//             // ĐÃ SỬA TẠI ĐÂY: Nếu không có đơn hàng -> Hiện Empty State sắc nét
//             <EmptyOrderState />
//           )}
//         </div>

//       </AdminPageContainer>
//     </div>
//   );
// }

"use client";
import React from 'react';
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useAdminOrder } from "@/features/orders/hooks/useAdminOrders";

import { OrderTabs } from "@/features/orders/components/OrderTabs";
import { EmptyOrderState } from "@/features/orders/components/EmptyOrderState";
import { SearchBar } from "@/components/ui/SearchBar";
import { Pagination } from "@/components/ui/Pagination";
import { AdminOrderCard } from "@/features/orders/components/admin/AdminOrderCard";
import { AdminOrderDetailView } from "@/features/orders/components/admin/AdminOrderDetailView"; // Import Component chi tiết
import { IOrder } from '@/features/orders/order.types';

export default function AdminOrdersPage() {
  const { isAuthorized } = useAdminAuth();
  const f = useAdminOrder();

  if (!isAuthorized) return null;

  // Tìm đơn hàng đang chọn từ URL (Hook f đã quản lý selectedOrderId)
  const selectedOrder = f.orders.find(o => o._id === f.selectedOrderId);

  return (
    <div className="min-h-screen bg-white">
      {/* KHUNG CỐ ĐỊNH CHÍNH */}
      <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[85vh] flex flex-col relative">

        {selectedOrder ? (
          /* --- VIEW 1: TRANG CHI TIẾT --- */
          <AdminOrderDetailView
            order={selectedOrder}
            onBack={f.goBackToList}
            onUpdateStatus={f.handleUpdateStatus}
          />
        ) : (
          /* --- VIEW 2: TRANG DANH SÁCH --- */
          <div className="animate-in fade-in duration-500 flex flex-col h-full">
            {/* Header: Tiêu đề trang */}
            <div className="p-8 pb-0">
              <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                Quản lý đơn hàng
              </h1>
            </div>

            {/* Khu vực điều khiển: Tabs & Search */}
            <div className="px-8 mt-6">
              <div className="border-b border-slate-50">
                <OrderTabs activeTab={f.activeTab} onTabChange={f.handleTabChange} />
              </div>

              <div className="mb-4 mt-2 max-w-md">
                <SearchBar
                  onSearch={f.handleSearch}
                  placeholder="Tìm mã đơn hoặc SĐT khách..."
                />
              </div>
            </div>

            {/* Nội dung danh sách */}
            <div className="flex-1 p-8 pt-4">
              {f.loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-full h-32 bg-slate-50 animate-pulse rounded-[2rem]" />
                  ))}
                </div>
              ) : f.orders.length > 0 ? (
                <>
                  <div className="flex flex-col gap-1">
                    {f.orders.map((order: IOrder) => (
                      <AdminOrderCard
                        key={order._id}
                        order={order}
                        onUpdateStatus={f.handleUpdateStatus}
                        onClick={() => f.goToDetail(order._id)} // Click để đổi URL
                      />
                    ))}
                  </div>

                  <div className="mt-8 py-4 flex justify-center">
                    <Pagination
                      currentPage={f.currentPage}
                      totalPages={f.totalPages}
                      onPageChange={f.handlePageChange}
                    />
                  </div>
                </>
              ) : (
                <div className="py-20 text-center">
                  <EmptyOrderState />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}