
// "use client";
// import React from 'react';

// // Business Logic & Hooks
// import { useAdminAuth } from "@/features/auth/auth.hooks";
// import { useCategoryFeature } from "@/features/category/hooks/category.hooks";

// // UI Components
// import { CategoryTable } from "@/features/category/components/admin/CategoryTable";
// import { AddCategoryModal } from "@/features/category/components/admin/AddCategoryModal";
// import { CategorySearch } from "@/features/category/components/admin/CategorySearch";
// import { ConfirmModal } from "@/components/ui/ConfirmModal";
// import { Pagination } from "@/components/ui/Pagination";

// // Layout Wrappers
// import { 
//   AdminPageContainer, 
//   AdminPageHeader 
// } from "@/components/layout/AdminPageContainer";

// import { Plus } from "lucide-react";

// export default function CategoryPage() {
//   // 1. Kiểm tra quyền truy cập Admin
//   const { isAuthorized } = useAdminAuth();
  
//   // 2. Lấy Logic điều khiển từ Hook
//   const feature = useCategoryFeature();

//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500">
//       <AdminPageContainer>
        
//         {/* Header: Tiêu đề và nút Thêm mới màu Indigo */}
//         <AdminPageHeader title="PHÂN LOẠI SẢN PHẨM">
//           <button 
//             onClick={feature.handleOpenAdd}
//             className="flex items-center gap-2 px-6 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-sm transition-all active:scale-95 text-[14px] uppercase tracking-wider"
//           >
//             <Plus size={20} strokeWidth={3} /> 
//             Thêm danh mục
//           </button>
//         </AdminPageHeader>

//         {/* Thanh tìm kiếm */}
//         <div className="mb-10 max-w-sm">
//           <CategorySearch onSearch={feature.handleSearch} />
//         </div>

//         {/* Khu vực hiển thị Bảng dữ liệu */}
//         <div className="custom-scrollbar pr-2 mt-6">
//           <CategoryTable 
//             categories={feature.categories}
//             loading={feature.loading}
//             onEdit={feature.handleOpenEdit}
//             onDelete={feature.handleOpenDeleteConfirm}
//             onToggleStatus={feature.handleToggleStatus} 
//           />
//         </div>

//         {/* PHÂN TRANG: Đặt phía dưới bảng, căn giữa */}
//         <div className="mt-8 border-t border-slate-50 pt-4">
//           <Pagination 
//             currentPage={feature.currentPage || 1} // Giả định hook có currentPage
//             totalPages={feature.totalPages || 1}   // Giả định hook có totalPages
//             onPageChange={feature.handlePageChange} // Giả định hook có hàm này
//           />
//         </div>

//       </AdminPageContainer>

//       {/* --- CỬA SỔ ĐIỀU KHIỂN (MODALS) --- */}

//       {/* Modal Thêm/Sửa: Không màu vàng, không làm mờ nền */}
//       <AddCategoryModal 
//         isOpen={feature.isModalOpen} 
//         onClose={feature.handleCloseModal} 
//         initialData={feature.selectedCategory}
//         onSubmit={feature.handleSubmit}
//       />
//     </div>
//   );
// }


"use client";
import React from 'react';

// Business Logic & Hooks
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useCategoryFeature } from "@/features/category/hooks/category.hooks";

// UI Components
import { CategoryTable } from "@/features/category/components/admin/CategoryTable";
import { AddCategoryModal } from "@/features/category/components/admin/AddCategoryModal";
import { CategorySearch } from "@/features/category/components/admin/CategorySearch";
import { Pagination } from "@/components/ui/Pagination"; // Đã bỏ ConfirmModal vì không dùng nút xóa nữa

// Layout Wrappers
import { 
  AdminPageContainer, 
  AdminPageHeader 
} from "@/components/layout/AdminPageContainer";

import { Plus } from "lucide-react";

export default function CategoryPage() {
  // 1. Kiểm tra quyền truy cập Admin
  const { isAuthorized } = useAdminAuth();
  
  // 2. Lấy Logic điều khiển từ Hook (Bản đã cập nhật bỏ Delete)
  const feature = useCategoryFeature();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <AdminPageContainer>
        
        {/* Header: Tiêu đề và nút Thêm mới */}
        <AdminPageHeader title="PHÂN LOẠI SẢN PHẨM">
          <button 
            onClick={feature.handleOpenAdd}
            className="flex items-center gap-2 px-6 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-sm transition-all active:scale-95 text-[14px] uppercase tracking-wider"
          >
            <Plus size={20} strokeWidth={3} /> 
            Thêm danh mục
          </button>
        </AdminPageHeader>

        {/* Thanh tìm kiếm */}
        <div className="mb-10 max-w-sm">
          <CategorySearch onSearch={feature.handleSearch} />
        </div>

        {/* Khu vực hiển thị Bảng dữ liệu */}
        <div className="custom-scrollbar pr-2 mt-6">
          {feature.loading ? (
    // Hiển thị skeleton hoặc loading khi đang tải
    <div className="w-full h-64 bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />
  ) : (
    <CategoryTable 
      categories={feature.categories}
      loading={feature.loading}
      onEdit={feature.handleOpenEdit}
      onToggleStatus={feature.handleToggleStatus} 
    />
  )}
        </div>

        {/* PHÂN TRANG */}
        <div className="mt-8 border-t border-slate-50 pt-4">
          <Pagination 
            currentPage={feature.currentPage}
            totalPages={feature.totalPages}
            onPageChange={feature.handlePageChange}
          />
        </div>

      </AdminPageContainer>

      {/* --- CỬA SỔ ĐIỀU KHIỂN (MODALS) --- */}

      {/* Modal Thêm/Sửa  */}
      <AddCategoryModal 
        isOpen={feature.isModalOpen} 
        onClose={feature.handleCloseModal} 
        initialData={feature.selectedCategory}
        onSubmit={feature.handleSubmit}
      />

     
    </div>
  );
}