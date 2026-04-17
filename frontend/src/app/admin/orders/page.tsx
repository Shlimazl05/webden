

// "use client";
// import React from 'react';
// import { ShoppingBag } from 'lucide-react';
// import { useAdminAuth } from "@/features/auth/auth.hooks";
// import { useAdminOrder } from "@/features/orders/hooks/useAdminOrders";

// import { OrderTabs } from "@/features/orders/components/OrderTabs";
// import { EmptyOrderState } from "@/features/orders/components/EmptyOrderState";
// import { SearchBar } from "@/components/ui/SearchBar";
// import { Pagination } from "@/components/ui/Pagination";
// import { AdminOrderCard } from "@/features/orders/components/admin/AdminOrderCard";
// import { AdminOrderDetailView } from "@/features/orders/components/admin/AdminOrderDetailView"; // Import Component chi tiết
// import { IOrder } from '@/features/orders/order.types';

// export default function AdminOrdersPage() {
//   const { isAuthorized } = useAdminAuth();
//   const f = useAdminOrder();

//   if (!isAuthorized) return null;

//   // Tìm đơn hàng đang chọn từ URL (Hook f đã quản lý selectedOrderId)
//   const selectedOrder = f.orders.find(o => o._id === f.selectedOrderId);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* KHUNG CỐ ĐỊNH CHÍNH */}
//       <div className="max-w-6xl mx-auto bg-white rounded-xl  shadow-sm border border-slate-100 overflow-hidden min-h-[85vh] flex flex-col relative">

//         {selectedOrder ? (
//           /* --- VIEW 1: TRANG CHI TIẾT --- */
//           <AdminOrderDetailView
//             order={selectedOrder}
//             onBack={f.goBackToList}
//             onUpdateStatus={f.handleUpdateStatus}
//           />
//         ) : (
//           /* --- VIEW 2: TRANG DANH SÁCH --- */
//           <div className="animate-in fade-in duration-500 flex flex-col h-full">
//             {/* Header: Tiêu đề trang */}
//               <div className="p-8 pb-0 flex items-center gap-3">
//                 {/* Box Icon: Màu Rose đồng bộ */}
//                 <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl  flex items-center justify-center shadow-sm border border-rose-100 flex-shrink-0">
//                   <ShoppingBag size={22} strokeWidth={2.5} />
//                 </div>

//                 {/* Tiêu đề: Giữ nguyên logic font của bạn */}
//                 <h1 className="text-[22px] font-black text-slate-800 tracking-tight uppercase leading-none">
//                   Quản lý đơn hàng
//                 </h1>
//               </div>

//             {/* Khu vực điều khiển: Tabs & Search */}
//             <div className="px-8 mt-6">
//               <div className="border-b border-slate-50">
//                 <OrderTabs activeTab={f.activeTab} onTabChange={f.handleTabChange} />
//               </div>

//               <div className="mb-4 mt-2 max-w-md">
//                 <SearchBar
//                   onSearch={f.handleSearch}
//                   placeholder="Tìm mã đơn hoặc SĐT khách..."
//                 />
//               </div>
//             </div>

//             {/* Nội dung danh sách */}
//             <div className="flex-1 p-8 pt-4">
//               {f.loading ? (
//                 <div className="space-y-4">
//                   {[1, 2, 3].map((i) => (
//                     <div key={i} className="w-full h-32 bg-slate-50 animate-pulse rounded-[2rem]" />
//                   ))}
//                 </div>
//               ) : f.orders.length > 0 ? (
//                 <>
//                   <div className="flex flex-col gap-1">
//                     {f.orders.map((order: IOrder) => (
//                       <AdminOrderCard
//                         key={order._id}
//                         order={order}
//                         onUpdateStatus={f.handleUpdateStatus}
//                         onClick={() => f.goToDetail(order._id)} // Click để đổi URL
//                       />
//                     ))}
//                   </div>

//                   <div className="mt-8 py-4 flex justify-center">
//                     <Pagination
//                       currentPage={f.currentPage}
//                       totalPages={f.totalPages}
//                       onPageChange={f.handlePageChange}
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <div className="py-20 text-center">
//                   <EmptyOrderState />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useAdminOrder } from "@/features/orders/hooks/useAdminOrders";

// Import 2 component layout quan trọng nhất
import { AdminPageContainer, AdminPageHeader } from "@/components/layout/AdminPageContainer";

import { OrderTabs } from "@/features/orders/components/OrderTabs";
import { EmptyOrderState } from "@/features/orders/components/EmptyOrderState";
import { SearchBar } from "@/components/ui/SearchBar";
import { Pagination } from "@/components/ui/Pagination";
import { AdminOrderCard } from "@/features/orders/components/admin/AdminOrderCard";
import { AdminOrderDetailView } from "@/features/orders/components/admin/AdminOrderDetailView";
import { IOrder } from '@/features/orders/order.types';

export default function AdminOrdersPage() {
  const { isAuthorized } = useAdminAuth();
  const f = useAdminOrder();

  if (!isAuthorized) return null;

  const selectedOrder = f.orders.find(o => o._id === f.selectedOrderId);

  return (
    <div className="animate-in fade-in duration-500">
      {/* 1. SỬ DỤNG CONTAINER CHUẨN (Sẽ tự động rộng bằng Dashboard) */}
      <AdminPageContainer>

        {selectedOrder ? (
          /* --- VIEW 1: TRANG CHI TIẾT --- */
          <AdminOrderDetailView
            order={selectedOrder}
            onBack={f.goBackToList}
            onUpdateStatus={f.handleUpdateStatus}
          />
        ) : (
          /* --- VIEW 2: TRANG DANH SÁCH --- */
          <div className="flex flex-col h-full">

            {/* 2. DÙNG ADMIN PAGE HEADER ĐÃ NÂNG CẤP (Icon Box + Title) */}
            <AdminPageHeader
              title="Quản lý đơn hàng"
              icon={<ShoppingBag size={22} strokeWidth={2.5} />}
              colorClass="text-rose-500"
              bgColorClass="bg-rose-50"
            />

            {/* Khu vực điều khiển: Bỏ bớt padding vì AdminPageContainer đã có p-10 */}
            <div className="mt-2">
              <div className="border-b border-slate-50">
                <OrderTabs activeTab={f.activeTab} onTabChange={f.handleTabChange} />
              </div>

              <div className="mb-4 mt-6 max-w-md">
                <SearchBar
                  onSearch={f.handleSearch}
                  placeholder="Tìm mã đơn hoặc SĐT khách..."
                />
              </div>
            </div>

            {/* Nội dung danh sách */}
            <div className="flex-1 pt-4">
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
                        onClick={() => f.goToDetail(order._id)}
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
      </AdminPageContainer>
    </div>
  );
}