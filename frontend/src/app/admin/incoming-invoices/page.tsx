"use client";
import React from 'react';
import { Plus } from "lucide-react";

// Business Logic & Hooks
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useImportOrderFeature } from "@/features/import-order/useImportOrder";

// UI Components
import { ImportOrderTable } from "@/features/import-order/components/ImportOrderTable";
import { AddImportOrderModal } from "@/features/import-order/components/AddImportOrderModal";
import { SearchBar } from "@/components/ui/SearchBar";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { Pagination } from "@/components/ui/Pagination";

// Layout Wrappers
import { 
  AdminPageContainer, 
  AdminPageHeader 
} from "@/components/layout/AdminPageContainer";

export default function ImportOrdersPage() {
  // 1. Authorization check
  const { isAuthorized } = useAdminAuth();
  
  // 2. Feature controller
  const f = useImportOrderFeature();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <AdminPageContainer>
        
        {/* Header section with primary action */}
        <AdminPageHeader title="HÓA ĐƠN NHẬP HÀNG">
          <button 
            onClick={f.handleOpenAdd} 
            className="flex items-center gap-2 px-6 h-11 bg-indigo-600 text-white rounded-xl font-bold text-[13px] uppercase tracking-wider hover:bg-indigo-700 shadow-md transition-all active:scale-95"
          >
            <Plus size={18} strokeWidth={3} /> Lập phiếu nhập
          </button>
        </AdminPageHeader>

        {/* Filters & Search */}
        <div className="mb-10 max-w-sm">
          <SearchBar 
            onSearch={f.handleSearch} 
            placeholder="Tìm mã phiếu hoặc nhà cung cấp..." 
          />
        </div>

        {/* Main Table - Supports Expandable Rows internally */}
        <ImportOrderTable 
          orders={f.orders} 
          loading={f.loading} 
          onDelete={f.handleOpenDelete} 
        />

        {/* Pagination control */}
        <div className="mt-8 border-t border-slate-50 pt-4">
          <Pagination 
            currentPage={f.currentPage} 
            totalPages={f.totalPages} 
            onPageChange={f.handlePageChange} 
          />
        </div>
      </AdminPageContainer>

      {/* --- FORMS & DIALOGS --- */}

      {/* Modal: Create New Import Order */}
      <AddImportOrderModal 
        isOpen={f.isModalOpen} 
        onClose={f.handleCloseModal} 
        onSubmit={f.handleCreate} 
      />
      
      {/* Modal: Safety Delete Confirmation */}
      <ConfirmModal 
        isOpen={f.isDeleteModalOpen} 
        onClose={f.handleCloseDelete} 
        onConfirm={f.executeDelete} 
        title="Xác nhận xóa" 
        message="Xóa hóa đơn này sẽ tự động TRỪ số lượng tồn kho của các sản phẩm liên quan. Bạn chắc chắn chứ?" 
      />
    </div>
  );
}