

// "use client";

// import React from 'react';
// import { Plus, PackageSearch } from "lucide-react";

// // Business Logic & Hooks
// import { useAdminAuth } from "@/features/auth/auth.hooks";
// import { useProductFeature } from "@/features/product/hooks/useAdminProduct";

// // UI Components
// import { ProductCard } from "@/features/product/components/admin/ProductCard";
// import { ProductSearch } from "@/features/product/components/admin/ProductSearch";
// import { ConfirmModal } from "@/components/ui/ConfirmModal";
// import { AddProductModal } from "@/features/product/components/admin/AddProductModal";
// import { Pagination } from "@/components/ui/Pagination";

// // Layout Wrappers
// import { 
//   AdminPageContainer, 
//   AdminPageHeader, 
//   AdminInnerBox 
// } from "@/components/layout/AdminPageContainer";

// export default function ProductManagementPage() {
//   const { isAuthorized } = useAdminAuth();
  
//   const { 
//     products, 
//     loading, 
//     currentPage,
//     totalPages,
//     handlePageChange,
//     handleSearch, 
//     isDeleteModalOpen, 
//     openDeleteModal, 
//     closeDeleteModal, 
//     confirmDelete,
//     isModalOpen, 
//     handleOpenAdd, 
//     handleCloseModal, 
//     selectedProduct 
//   } = useProductFeature();

//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500 pb-10">
//       <AdminPageContainer>
//         {/* Page Action Header */}
//         <AdminPageHeader title="QUẢN LÝ SẢN PHẨM">
//           <button 
//             onClick={handleOpenAdd}
//             className="flex items-center gap-2 px-8 h-11 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all text-[14px] uppercase tracking-wider"
//           >
//             <Plus size={20} strokeWidth={3} /> Thêm sản phẩm
//           </button>
//         </AdminPageHeader>

//         {/* Search & Filter Section */}
//         <div className="mb-10 max-w-sm">
//           <ProductSearch onSearch={handleSearch} />
//         </div>

//         {/* Data Display Area */}
//         <div className="max-h-[620px] overflow-y-auto custom-scrollbar pr-2">
//           <AdminInnerBox>
//             {loading ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {[...Array(10)].map((_, i) => (
//                   <div key={i} className="aspect-[3/4.5] bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />
//                 ))}
//               </div>
//             ) : products && products.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {products.map((product) => (
//                   <ProductCard 
//                     key={product._id} 
//                     product={product} 
//                     onDelete={openDeleteModal} 
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-24 text-center">
//                 <div className="p-6 bg-slate-50 rounded-full mb-4">
//                   <PackageSearch size={48} className="text-slate-300" />
//                 </div>
//                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
//                   Chưa có sản phẩm nào trong danh sách
//                 </h3>
//                 <button 
//                   onClick={handleOpenAdd} 
//                   className="mt-4 text-indigo-600 font-bold uppercase text-[11px] border-b-2 border-indigo-100 hover:border-indigo-600 transition-all"
//                 >
//                   Tạo sản phẩm đầu tiên
//                 </button>
//               </div>
//             )}
//           </AdminInnerBox>
//         </div>

//         {/* Pagination Controller */}
//         <div className="mt-6 border-t border-slate-50">
//           <Pagination 
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </AdminPageContainer>

//       {/* Forms & Dialogs */}
//       <AddProductModal 
//         isOpen={isModalOpen} 
//         onClose={handleCloseModal} 
//         initialData={selectedProduct} 
//       />

//       <ConfirmModal 
//         isOpen={isDeleteModalOpen} 
//         onClose={closeDeleteModal} 
//         onConfirm={confirmDelete} 
//         title="Xác nhận xóa sản phẩm" 
//         message="Hành động này sẽ xóa vĩnh viễn sản phẩm khỏi hệ thống và không thể hoàn tác." 
//       />
//     </div>
//   );
// }

"use client";

import React from 'react';
import { Plus, PackageSearch } from "lucide-react";

// Business Logic & Hooks
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useProductFeature } from "@/features/product/hooks/useAdminProduct";

// UI Components
import { ProductCard } from "@/features/product/components/admin/ProductCard";
import { ProductSearch } from "@/features/product/components/admin/ProductSearch";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { AddProductModal } from "@/features/product/components/admin/AddProductModal";
import { Pagination } from "@/components/ui/Pagination";

// Layout Wrappers
import { 
  AdminPageContainer, 
  AdminPageHeader, 
  AdminInnerBox 
} from "@/components/layout/AdminPageContainer";

export default function ProductManagementPage() {
  // 1. Kiểm tra quyền truy cập Admin
  const { isAuthorized } = useAdminAuth();
  
  // 2. Lấy Logic điều khiển từ Hook sản phẩm
  const { 
    products, 
    categories, // Dữ liệu danh mục để truyền vào Modal
    loading, 
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch, 
    refresh, // Hàm tải lại dữ liệu sau khi thêm/sửa
    isDeleteModalOpen, 
    openDeleteModal, 
    closeDeleteModal, 
    confirmDelete,
    isModalOpen, 
    handleOpenAdd, 
    handleCloseModal, 
    selectedProduct 
  } = useProductFeature();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <AdminPageContainer>
        {/* Header trang và nút thêm mới chuẩn Indigo */}
        <AdminPageHeader title="QUẢN LÝ SẢN PHẨM">
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-8 h-11 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all text-[13px] uppercase tracking-wider"
          >
            <Plus size={20} strokeWidth={3} /> Thêm sản phẩm
          </button>
        </AdminPageHeader>

        {/* Thanh tìm kiếm (Server-side Search) */}
        <div className="mb-10 max-w-sm">
          <ProductSearch onSearch={handleSearch} />
        </div>

        {/* Khu vực hiển thị danh sách dạng lưới */}
        <div className="max-h-[620px] overflow-y-auto custom-scrollbar pr-2">
          <AdminInnerBox>
            {loading ? (
              // Trạng thái Loading Skeleton
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="aspect-[3/4.5] bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              // Hiển thị danh sách sản phẩm
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                  <ProductCard 
                    key={product._id} 
                    product={product} 
                    onDelete={openDeleteModal} 
                  />
                ))}
              </div>
            ) : (
              // Trạng thái trống (Empty State)
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="p-6 bg-slate-50 rounded-full mb-4">
                  <PackageSearch size={48} className="text-slate-300" />
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Chưa có sản phẩm nào trong danh sách
                </h3>
                <button 
                  onClick={handleOpenAdd} 
                  className="mt-4 text-indigo-600 font-bold uppercase text-[11px] border-b-2 border-indigo-100 hover:border-indigo-600 transition-all"
                >
                  Tạo sản phẩm đầu tiên
                </button>
              </div>
            )}
          </AdminInnerBox>
        </div>

        {/* Thanh phân trang (Server-side Pagination) */}
        <div className="mt-6 border-t border-slate-50">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </AdminPageContainer>

      {/* --- CÁC CỬA SỔ ĐIỀU KHIỂN --- */}

      {/* Modal Thêm/Sửa: Đã ráp categories và refreshData */}
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialData={selectedProduct}
        categories={categories} // Truyền danh sách danh mục vào form
        refreshData={refresh}   // Truyền hàm reload để cập nhật bảng sau khi lưu
      />

      {/* Modal xác nhận xóa nhỏ gọn */}
      <ConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={closeDeleteModal} 
        onConfirm={confirmDelete} 
        title="Xác nhận xóa" 
        message="Dữ liệu sản phẩm sẽ bị xóa vĩnh viễn khỏi hệ thống và không thể khôi phục." 
      />
    </div>
  );
}