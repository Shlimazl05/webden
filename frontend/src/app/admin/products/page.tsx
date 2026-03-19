
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

  // Giải nén tất cả từ Hook - Đảm bảo có setDetailProduct
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
    handleCloseModal, // Thêm hàm này để đóng modal Add
    detailProduct,
    setDetailProduct,   // QUAN TRỌNG: Lấy hàm này để cập nhật data tức thì
    isEditingDetail,
    handleOpenDetail,
    handleCloseDetail,
    handleEditFromDetail,
    handleBackToDetail,
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

      {/* --- MODAL CHI TIẾT THÔNG MINH --- */}
      <ProductDetailModal
        isOpen={!!detailProduct}
        onClose={handleCloseDetail}
        product={detailProduct}
        isEditing={isEditingDetail}
        onCancelEdit={handleBackToDetail}
        categories={categories}
        refreshData={refresh}
        onUpdateSuccess={(newData) => {
          setDetailProduct(newData); // Đã xóa f.
        }}
        actions={!isEditingDetail && ( // Đã xóa f.
          <button
            onClick={handleEditFromDetail} // Đã xóa f.
            className="h-11 px-8 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 text-sm"
          >
            <Edit3 size={18} /> Chỉnh sửa thông tin
          </button>
        )}
      />

      {/* Modal Thêm mới - Dùng đúng hàm handleCloseModal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
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