
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
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";

// Layout Wrappers
import {
  AdminPageContainer,
  AdminPageHeader
} from "@/components/layout/AdminPageContainer";

// Icons
import { Plus, Layers, Eye, EyeOff } from "lucide-react";

export default function CategoryPage() {
  // 1. Kiểm tra quyền truy cập Admin
  const { isAuthorized } = useAdminAuth();

  // 2. Lấy Logic điều khiển từ Hook tổng hợp
  const feature = useCategoryFeature();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <AdminPageContainer>

        {/* --- HEADER: Tiêu đề và nút Thêm mới --- */}
        <AdminPageHeader title="PHÂN LOẠI SẢN PHẨM">
          <button
            onClick={feature.handleOpenAdd}
            className="flex items-center gap-2 px-6 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-sm transition-all active:scale-95 text-[14px] uppercase tracking-wider"
          >
            <Plus size={20} strokeWidth={3} />
            Thêm danh mục
          </button>
        </AdminPageHeader>

        {/* --- 2. THANH CÔNG CỤ: Tìm kiếm & Bộ lọc Advanced --- */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 items-center justify-between">
          <div className="w-full max-w-sm">
            <SearchBar onSearch={feature.handleSearch} placeholder="Tìm kiếm tên danh mục..." />
          </div>



        </div>

        
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Bộ lọc trạng thái kiểu Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-2xl w-fit shadow-inner">
            {['All', 'Active', 'Hidden'].map((s) => (
              <button
                key={s}
                onClick={() => feature.setStatusFilter(s as any)}
                className={`px-6 py-2 rounded-xl text-[12px] font-bold transition-all duration-300 ${feature.statusFilter === s
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                {s === 'All' ? 'TẤT CẢ' : s === 'Active' ? 'ĐANG HIỂN THỊ' : 'ĐANG ẨN'}
              </button>
            ))}
          </div>

          {/* Tổng danh mục  */}
          <div className="flex items-baseline gap-2 bg-white px-6 py-2.5 rounded-[1.5rem] border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow cursor-default">
            {/* Con số đen đậm, font cực dày để tạo điểm nhấn */}
            <span className="text-2xl font-black text-slate-900 leading-none">
              {feature.stats.total}
            </span>

            {/* Chữ danh mục viết hoa, giãn chữ (tracking) để trông sang hơn */}
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.15em]">
              Danh mục
            </span>
          </div>
        </div>

        {/* --- 3. BẢNG DỮ LIỆU --- */}
        <div className="custom-scrollbar pr-2 mt-6">
          {feature.loading ? (
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

        {/* --- 4. PHÂN TRANG --- */}
        <div className="mt-8 border-t border-slate-50 pt-4">
          <Pagination
            currentPage={feature.currentPage}
            totalPages={feature.totalPages}
            onPageChange={feature.handlePageChange}
          />
        </div>

      </AdminPageContainer>

      {/* --- 5. CỬA SỔ ĐIỀU KHIỂN (MODALS) --- */}
      <AddCategoryModal
        isOpen={feature.isModalOpen}
        onClose={feature.handleCloseModal}
        initialData={feature.selectedCategory}
        onSubmit={feature.handleSubmit}
      />
    </div>
  );
}