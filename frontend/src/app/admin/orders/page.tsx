"use client";
import React from 'react';

// Business Logic & Hooks
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useAdminOrder } from "@/features/orders/hooks/useAdminOrders";

// UI Components
import { OrderTable } from "@/features/orders/components/admin/OrderTable";
import { OrderTabs } from "@/features/orders/components/OrderTabs";
import { EmptyOrderState } from "@/features/orders/components/EmptyOrderState"; // Import nó vào đây
import { SearchBar } from "@/components/ui/SearchBar";
import { Pagination } from "@/components/ui/Pagination";
import { AdminOrderCard } from "@/features/orders/components/admin/AdminOrderCard";
// Layout Wrappers
import { 
  AdminPageContainer, 
  AdminPageHeader 
} from "@/components/layout/AdminPageContainer";

export default function AdminOrdersPage() {
  const { isAuthorized } = useAdminAuth();
  const f = useAdminOrder();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <AdminPageContainer>
        <AdminPageHeader title="QUẢN LÝ ĐƠN HÀNG" />

        {/* 1. Thanh Tabs lọc trạng thái */}
        <OrderTabs activeTab={f.activeTab} onTabChange={f.handleTabChange} />

        {/* 2. Thanh tìm kiếm */}
        <div className="mb-10 max-w-md">
          <SearchBar onSearch={f.handleSearch} placeholder="Tìm mã đơn hoặc SĐT khách..." />
        </div>

        {/* 3. KHU VỰC HIỂN THỊ LOGIC THÔNG MINH */}
        <div className="min-h-[400px]">
          {f.loading ? (
            // Trạng thái đang tải (Skeleton)
            <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />
          ) : f.orders.length > 0 ? (
            // Nếu có đơn hàng -> Hiện bảng
            <>
              <div className="space-y-2">
                {f.orders.map((order: any) => (
                  <AdminOrderCard 
                    key={order._id} 
                    order={order} 
                    onUpdateStatus={f.handleUpdateStatus} 
                  />
                ))}
              </div>
              {/* Phân trang chỉ hiện khi có dữ liệu */}
              <div className="mt-8 border-t border-slate-50 pt-4">
                <Pagination 
                  currentPage={f.currentPage} 
                  totalPages={f.totalPages} 
                  onPageChange={f.handlePageChange} 
                />
              </div>
            </>
          ) : (
            // ĐÃ SỬA TẠI ĐÂY: Nếu không có đơn hàng -> Hiện Empty State sắc nét
            <EmptyOrderState />
          )}
        </div>

      </AdminPageContainer>
    </div>
  );
}