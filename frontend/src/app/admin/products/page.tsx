

"use client";

import React from 'react';
import { Plus, PackageSearch, Edit3 } from "lucide-react";

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
  // 1. Kiểm tra quyền truy cập Admin
  const { isAuthorized } = useAdminAuth();
  
  // 2. Lấy Logic điều khiển từ Hook sản phẩm
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
    handleCloseModal, 
    selectedProduct,
    handleToggleStatus,
    // Logic xem chi tiết
    detailProduct,
    handleOpenDetail,
    handleCloseDetail
  } = useProductFeature();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <AdminPageContainer>
        <AdminPageHeader title="QUẢN LÝ SẢN PHẨM">
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-8 h-11 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all text-[14px] uppercase tracking-wider"
          >
            <Plus size={20} strokeWidth={3} /> Thêm sản phẩm
          </button>
        </AdminPageHeader>

        <div className="mb-10 max-w-sm">
          <ProductSearch onSearch={handleSearch} />
        </div>

        <div className="max-h-[620px] overflow-y-auto custom-scrollbar pr-2">
          <AdminInnerBox>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="aspect-[3/4.5] bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                  <ProductCard 
                    key={product._id}
                    product={product}
                    onView={handleOpenDetail}    // Mở modal chi tiết
                    onEdit={handleOpenEdit}      // Mở modal sửa
                    onToggleStatus={handleToggleStatus} 
                    onDelete={openDeleteModal} 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="p-6 bg-slate-50 rounded-full mb-4">
                  <PackageSearch size={48} className="text-slate-300" />
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Chưa có sản phẩm nào
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

        <div className="mt-6 border-t border-slate-50">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </AdminPageContainer>

      {/* --- MODALS --- */}

      {/* Modal Xem chi tiết: Tái sử dụng nội dung hiển thị */}
      <ProductDetailModal 
        isOpen={!!detailProduct}
        onClose={handleCloseDetail}
        product={detailProduct}
        actions={
          <button 
            onClick={() => {
              handleOpenEdit(detailProduct!);
              handleCloseDetail();
            }}
            className="h-11 px-8 bg-indigo-600 text-white rounded-xl font-bold uppercase text-[12px] tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <Edit3 size={18} /> Chỉnh sửa
          </button>
        }
      />

      {/* Modal Thêm/Sửa */}
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
        title="Xác nhận xóa" 
        message="Hành động này sẽ xóa vĩnh viễn sản phẩm khỏi kho hàng." 
      />
    </div>
  );
}