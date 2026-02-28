

// "use client";
// import React from 'react';
// import { useAdminAuth } from "@/features/auth/auth.hooks";
// import { useCategoryFeature } from "@/features/category/hooks/category.hooks";
// import { CategoryTable } from "@/features/category/components/admin/CategoryTable";
// import { AddCategoryModal } from "@/features/category/components/admin/AddCategoryModal";
// import { CategorySearch } from "@/features/category/components/admin/CategorySearch";
// import { ConfirmModal } from "@/components/ui/ConfirmModal";
// import { Plus } from "lucide-react";

// // IMPORT CÁC LAYOUT COMPONENTS CHUNG
// import { 
//   AdminPageContainer, 
//   AdminPageHeader 
// } from "@/components/layout/AdminPageContainer";

// export default function CategoryPage() {
//   // 1. Kiểm tra quyền truy cập của Admin
//   const { isAuthorized } = useAdminAuth();
  
//   // 2. Lấy toàn bộ bộ não xử lý từ Hook (Fetch, Add, Edit, Delete, Search)
//   const feature = useCategoryFeature();

//   // Nếu chưa xác thực, không hiển thị gì (useAdminAuth sẽ tự chuyển hướng)
//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500">
      
//       {/* LỚP BAO 1: Khung trắng lớn toàn trang (Luxury Style) */}
//       <AdminPageContainer>
        
//         {/* TIÊU ĐỀ TRANG & NÚT THÊM MỚI (Đã gộp vào Header cho gọn) */}
//         <AdminPageHeader title="PHÂN LOẠI SẢN PHẨM">
//           <button 
//             onClick={feature.handleOpenAdd}
//             className="flex items-center gap-2 px-8 h-11 bg-[#C5A059] text-white rounded-full font-black shadow-lg shadow-yellow-200/40 hover:scale-105 transition-all text-xs uppercase tracking-widest"
//           >
//             <Plus size={20} strokeWidth={3} /> 
//             Thêm danh mục
//           </button>
//         </AdminPageHeader>

//         {/* THANH TÌM KIẾM (Hình viên thuốc sắc nét) */}
//         <div className="mb-10 max-w-sm">
//           <CategorySearch onSearch={feature.handleSearch} />
//         </div>

//         {/* VÙNG CUỘN NỘI BỘ (Thanh kéo Luxury Scroll) */}
//         <div className="max-h-[600px] overflow-y-auto custom-scrollbar pr-2 mt-6">
          
//           <CategoryTable 
//             categories={feature.categories} 
//             loading={feature.loading} 
//             onEdit={feature.handleOpenEdit}
//             onDelete={feature.handleOpenDeleteConfirm} 
//           />

//         </div>

//       </AdminPageContainer>

//       {/* --- CÁC CỬA SỔ ĐIỀU KHIỂN (MODALS) --- */}

//       {/* Modal Thêm / Chỉnh sửa: Cần có onSubmit để lưu dữ liệu thật */}
//       <AddCategoryModal 
//         isOpen={feature.isModalOpen} 
//         onClose={feature.handleCloseModal} 
//         initialData={feature.selectedCategory}
//         onSubmit={feature.handleSubmit} // <-- DÒNG QUAN TRỌNG NHẤT ĐÃ THÊM
//       />

//       {/* Modal Xác nhận xóa: Chuyên nghiệp thay cho confirm() của trình duyệt */}
//       <ConfirmModal 
//         isOpen={feature.isDeleteModalOpen}
//         onClose={feature.handleCloseDeleteModal}
//         onConfirm={feature.executeDelete}
//         title="Xác nhận xóa"
//         message="Bạn có chắc chắn muốn xóa danh mục này? Mọi sản phẩm thuộc danh mục này sẽ bị ảnh hưởng. Hành động này không thể hoàn tác."
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
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { Pagination } from "@/components/ui/Pagination";

// Layout Wrappers
import { 
  AdminPageContainer, 
  AdminPageHeader 
} from "@/components/layout/AdminPageContainer";

import { Plus } from "lucide-react";

export default function CategoryPage() {
  // 1. Kiểm tra quyền truy cập Admin
  const { isAuthorized } = useAdminAuth();
  
  // 2. Lấy Logic điều khiển từ Hook
  const feature = useCategoryFeature();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <AdminPageContainer>
        
        {/* Header: Tiêu đề và nút Thêm mới màu Indigo */}
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
          <CategoryTable 
            categories={feature.categories}
            loading={feature.loading}
            onEdit={feature.handleOpenEdit}
            onDelete={feature.handleOpenDeleteConfirm}
            onToggleStatus={feature.handleToggleStatus} 
          />
        </div>

        {/* PHÂN TRANG: Đặt phía dưới bảng, căn giữa */}
        <div className="mt-8 border-t border-slate-50 pt-4">
          <Pagination 
            currentPage={feature.currentPage || 1} // Giả định hook có currentPage
            totalPages={feature.totalPages || 1}   // Giả định hook có totalPages
            onPageChange={feature.handlePageChange} // Giả định hook có hàm này
          />
        </div>

      </AdminPageContainer>

      {/* --- CỬA SỔ ĐIỀU KHIỂN (MODALS) --- */}

      {/* Modal Thêm/Sửa: Không màu vàng, không làm mờ nền */}
      <AddCategoryModal 
        isOpen={feature.isModalOpen} 
        onClose={feature.handleCloseModal} 
        initialData={feature.selectedCategory}
        onSubmit={feature.handleSubmit}
      />

      {/* Modal Xác nhận xóa: Nhỏ gọn, rõ ràng */}
      <ConfirmModal 
        isOpen={feature.isDeleteModalOpen}
        onClose={feature.handleCloseDeleteModal}
        onConfirm={feature.executeDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác và sẽ ảnh hưởng đến các sản phẩm liên quan."
      />
    </div>
  );
}