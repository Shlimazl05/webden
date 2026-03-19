

// "use client";

// import React from 'react';
// import { Plus, PackageSearch, Edit3 } from "lucide-react";

// // Business Logic & Hooks
// import { useAdminAuth } from "@/features/auth/auth.hooks";
// import { useProductFeature } from "@/features/product/hooks/useAdminProduct";

// // UI Components
// import { ProductCard } from "@/features/product/components/admin/ProductCard";
// import { ProductSearch } from "@/features/product/components/admin/ProductSearch";
// import { ConfirmModal } from "@/components/ui/ConfirmModal";
// import { AddProductModal } from "@/features/product/components/admin/AddProductModal";
// import { ProductDetailModal } from "@/features/product/components/ProductDetailModal";
// import { Pagination } from "@/components/ui/Pagination";

// // Layout Wrappers
// import { 
//   AdminPageContainer, 
//   AdminPageHeader, 
//   AdminInnerBox 
// } from "@/components/layout/AdminPageContainer";

// export default function ProductManagementPage() {
//   // 1. Kiểm tra quyền truy cập Admin
//   const { isAuthorized } = useAdminAuth();
  
//   // 2. Lấy Logic điều khiển từ Hook sản phẩm
//   const { 
//     products, 
//     categories, 
//     loading, 
//     currentPage,
//     totalPages,
//     handlePageChange,
//     handleSearch, 
//     refresh, 
//     isDeleteModalOpen, 
//     openDeleteModal, 
//     closeDeleteModal, 
//     confirmDelete,
//     isModalOpen, 
//     handleOpenAdd, 
//     handleOpenEdit,
//     handleCloseModal, 
//     selectedProduct,
//     handleToggleStatus,
//     // Logic xem chi tiết
//     detailProduct,
//     handleOpenDetail,
//     handleCloseDetail
//   } = useProductFeature();

//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500 pb-10">
//       <AdminPageContainer>
//         <AdminPageHeader title="QUẢN LÝ SẢN PHẨM">
//           <button 
//             onClick={handleOpenAdd}
//             className="flex items-center gap-2 px-8 h-11 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all text-[14px] uppercase tracking-wider"
//           >
//             <Plus size={20} strokeWidth={3} /> Thêm sản phẩm
//           </button>
//         </AdminPageHeader>

//         <div className="mb-10 max-w-sm">
//           <ProductSearch onSearch={handleSearch} />
//         </div>

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
//                     onView={handleOpenDetail}    // Mở modal chi tiết
//                     onEdit={handleOpenEdit}      // Mở modal sửa
//                     onToggleStatus={handleToggleStatus} 
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
//                   Chưa có sản phẩm nào
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

//         <div className="mt-6 border-t border-slate-50">
//           <Pagination 
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </AdminPageContainer>

//       {/* --- MODALS --- */}

//       {/* Modal Xem chi tiết: Tái sử dụng nội dung hiển thị */}
//       <ProductDetailModal 
//         isOpen={!!detailProduct}
//         onClose={handleCloseDetail}
//         product={detailProduct}
//         actions={
//           <button 
//             onClick={() => {
//               handleOpenEdit(detailProduct!);
//               handleCloseDetail();
//             }}
//             className="h-11 px-8 bg-indigo-600 text-white rounded-xl font-bold uppercase text-[12px] tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
//           >
//             <Edit3 size={18} /> Chỉnh sửa
//           </button>
//         }
//       />

//       {/* Modal Thêm/Sửa */}
//       <AddProductModal 
//         isOpen={isModalOpen} 
//         onClose={handleCloseModal} 
//         initialData={selectedProduct}
//         categories={categories} 
//         refreshData={refresh}   
//       />

//       {/* Modal xác nhận xóa */}
//       <ConfirmModal 
//         isOpen={isDeleteModalOpen} 
//         onClose={closeDeleteModal} 
//         onConfirm={confirmDelete} 
//         title="Xác nhận xóa" 
//         message="Hành động này sẽ xóa vĩnh viễn sản phẩm khỏi kho hàng." 
//       />
//     </div>
//   );
// }
// src/app/admin/products/page.tsx
"use client";

import React from 'react';
import { Plus, PackageSearch, Edit3, LayoutGrid } from "lucide-react";

// Business Logic & Hooks
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useProductFeature } from "@/features/product/hooks/useAdminProduct";

// UI Components
import { ProductCard } from "@/features/product/components/admin/ProductCard";
import { ProductSearch } from "@/features/product/components/admin/ProductSearch";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { AddProductModal } from "@/features/product/components/admin/AddProductModal";
import { ProductDetailModal } from "@/features/product/components/ProductDetailModal";
import { Pagination } from "@/components/ui/Pagination";

// Layout Wrappers
import {
  AdminPageContainer,
  AdminPageHeader,
  AdminInnerBox
} from "@/components/layout/AdminPageContainer";

export default function ProductManagementPage() {
  const { isAuthorized } = useAdminAuth();

  const {
    products,
    categories,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    refresh,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    isModalOpen,
    handleOpenAdd,
    handleOpenEdit,
    handleCancelEdit,
    selectedProduct,
    handleToggleStatus,
    // Các biến cho logic Xem & Sửa tức thì (Smart Modal)
    detailProduct,
    isEditingDetail,      // Trạng thái đang xem hay đang sửa trong Modal chi tiết
    handleOpenDetail,
    handleCloseDetail,
    handleEditFromDetail, // Hàm chuyển sang chế độ sửa
    handleBackToDetail,   // Hàm quay lại chế độ xem
  } = useProductFeature();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      <AdminPageContainer>
        <AdminPageHeader title="Quản lý sản phẩm">
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-6 h-11 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 text-[14px]"
          >
            <Plus size={20} strokeWidth={2.5} />
            Thêm sản phẩm mới
          </button>
        </AdminPageHeader>

        {/* TÌM KIẾM & THỐNG KÊ NHANH */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full max-w-sm">
            <ProductSearch onSearch={handleSearch} />
          </div>

          <div className="flex items-center gap-2 text-slate-400 px-2">
            <LayoutGrid size={16} />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Hiển thị {products?.length || 0} sản phẩm
            </span>
          </div>
        </div>

        {/* NỘI DUNG CHÍNH (GRID SẢN PHẨM) */}
        <div className="max-h-[650px] overflow-y-auto custom-scrollbar pr-2">
          <AdminInnerBox>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="aspect-[3/4.5] bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onView={handleOpenDetail}
                    onEdit={handleOpenEdit}
                    onToggleStatus={handleToggleStatus}
                    onDelete={openDeleteModal}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                <div className="p-8 bg-white rounded-full mb-6 shadow-sm">
                  <PackageSearch size={54} className="text-slate-200" />
                </div>
                <h3 className="ui-label !text-slate-400 mb-4">Kho hàng đang trống</h3>
                <button onClick={handleOpenAdd} className="px-6 py-2.5 bg-white text-indigo-600 border border-indigo-100 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                  Bắt đầu tạo sản phẩm
                </button>
              </div>
            )}
          </AdminInnerBox>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </AdminPageContainer>

      {/* --- MODAL CHI TIẾT THÔNG MINH (Instant Switch) --- */}
      <ProductDetailModal
        isOpen={!!detailProduct}
        onClose={handleCloseDetail}
        product={detailProduct}
        isEditing={isEditingDetail}      // Trạng thái từ Hook
        onCancelEdit={handleBackToDetail} // Hàm quay lại khi bấm Hủy
        categories={categories}          // Truyền danh mục cho Form sửa
        refreshData={refresh}            // Refresh sau khi sửa xong
        actions={
          /* Nút chỉnh sửa chỉ hiện khi đang ở chế độ xem */
          !isEditingDetail && (
            <button
              onClick={handleEditFromDetail} // Chuyển sang chế độ Sửa ngay lập tức
              className="h-11 px-8 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 text-sm"
            >
              <Edit3 size={18} /> Chỉnh sửa thông tin
            </button>
          )
        }
      />

      {/* Modal Thêm mới (Riêng biệt cho quy trình tạo mới) */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
        initialData={selectedProduct}
        categories={categories}
        refreshData={refresh}
      />

      {/* Modal xác nhận xóa */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Xác nhận xóa sản phẩm"
        message="Hành động này sẽ xóa vĩnh viễn sản phẩm khỏi kho hàng. Bạn chắc chắn chứ?"
      />
    </div>
  );
}