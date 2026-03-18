


// // src/app/admin/incoming-invoices/page.tsx
// "use client";
// import React from 'react';
// import { Plus } from "lucide-react";
// import { useAdminAuth } from "@/features/auth/auth.hooks";
// import { useImportOrderFeature } from "@/features/import-order/useImportOrder";
// import { ImportOrderTable } from "@/features/import-order/components/ImportOrderTable";
// import { AddImportOrderModal } from "@/features/import-order/components/AddImportOrderModal";
// import { SearchBar } from "@/components/ui/SearchBar";
// import { ConfirmModal } from "@/components/ui/ConfirmModal";
// import { Pagination } from "@/components/ui/Pagination";
// import { AdminPageContainer, AdminPageHeader } from "@/components/layout/AdminPageContainer";

// export default function ImportOrdersPage() {
//   const { isAuthorized } = useAdminAuth();
//   const f = useImportOrderFeature();

//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500">
//       <AdminPageContainer>
//         <AdminPageHeader title="Quản lí nhập kho">
//           <button onClick={f.handleOpenAdd} className="flex items-center gap-2 px-6 h-11 bg-indigo-600 text-white rounded-xl font-bold text-[14px] uppercase tracking-wider hover:bg-indigo-700 shadow-md transition-all active:scale-95">
//             <Plus size={18} strokeWidth={3} /> Lập phiếu nhập
//           </button>
//         </AdminPageHeader>

//         <div className="mb-10 max-w-sm">
//           <SearchBar onSearch={f.handleSearch} placeholder="Tìm mã phiếu hoặc đối tác..." />
//         </div>

//         <ImportOrderTable 
//           orders={f.orders} 
//           loading={f.loading} 
//           onDelete={f.handleOpenDelete} 
//         />

//         <div className="mt-8 border-t border-slate-50 pt-4">
//           <Pagination currentPage={f.currentPage} totalPages={f.totalPages} onPageChange={f.handlePageChange} />
//         </div>
//       </AdminPageContainer>

//       <AddImportOrderModal isOpen={f.isModalOpen} onClose={f.handleCloseModal} onSubmit={f.handleCreate} />
      
//       <ConfirmModal 
//         isOpen={f.isDeleteModalOpen} onClose={f.handleCloseDelete} onConfirm={f.executeDelete} 
//         title="Xác nhận xóa" message="Hành động này sẽ xóa vĩnh viễn và trừ số lượng sản phẩm trong kho." 
//       />
//     </div>
//   );
// }

// src/app/admin/incoming-invoices/page.tsx
"use client";
import React from 'react';
import { Plus, LayoutGrid } from "lucide-react"; // Thêm icon để trang trí header
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useImportOrderFeature } from "@/features/import-order/useImportOrder";
import { ImportOrderTable } from "@/features/import-order/components/ImportOrderTable";
import { AddImportOrderModal } from "@/features/import-order/components/AddImportOrderModal";
import { SearchBar } from "@/components/ui/SearchBar";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { Pagination } from "@/components/ui/Pagination";
import { AdminPageContainer, AdminPageHeader } from "@/components/layout/AdminPageContainer";

export default function ImportOrdersPage() {
  const { isAuthorized } = useAdminAuth();
  const f = useImportOrderFeature();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-700">
      <AdminPageContainer>
        {/* Cập nhật Header: Bỏ Uppercase, tăng độ dày font */}
        <AdminPageHeader title="Quản lý nhập kho">
          <button
            onClick={f.handleOpenAdd}
            className="flex items-center gap-2 px-5 h-11 bg-indigo-600 text-white rounded-xl font-bold text-[14px] hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            <Plus size={20} strokeWidth={2.5} />
            Lập phiếu nhập mới
          </button>
        </AdminPageHeader>

        {/* Khu vực tìm lọc: Gọn gàng hơn */}
        <div className="mb-8 flex items-center justify-between">
          <div className="w-full max-w-sm">
            <SearchBar
              onSearch={f.handleSearch}
              placeholder="Tìm mã phiếu hoặc đối tác..."
            />
          </div>

          {/* Có thể thêm hiển thị tổng số bản ghi ở đây cho chuyên nghiệp */}
          <div className="hidden md:flex items-center gap-2 text-slate-500">
            <LayoutGrid size={16} />
            <span className="text-xs font-medium uppercase tracking-widest">
              Tổng {f.orders.length} phiếu nhập
            </span>
          </div>
        </div>

        {/* Bảng dữ liệu - Đã được tối ưu Typography bên trong */}
        <ImportOrderTable
          orders={f.orders}
          loading={f.loading}
          onDelete={f.handleOpenDelete}
        />

        {/* Phân trang: Tăng khoảng cách để không bị dính vào bảng */}
        <div className="mt-10 mb-10 border-t border-slate-100 pt-6">
          <Pagination
            currentPage={f.currentPage}
            totalPages={f.totalPages}
            onPageChange={f.handlePageChange}
          />
        </div>
      </AdminPageContainer>

      {/* Modal thêm mới: Đã được bạn cập nhật màu sắc rực rỡ */}
      <AddImportOrderModal
        isOpen={f.isModalOpen}
        onClose={f.handleCloseModal}
        onSubmit={f.handleCreate}
      />

      {/* Cập nhật ConfirmModal: Màu sắc cảnh báo rõ ràng */}
      <ConfirmModal
        isOpen={f.isDeleteModalOpen}
        onClose={f.handleCloseDelete}
        onConfirm={f.executeDelete}
        title="Xác nhận xóa phiếu nhập"
        message="Hành động này sẽ xóa vĩnh viễn và trừ số lượng sản phẩm trong kho. Bạn chắc chắn chứ?"
      />
    </div>
  );
}