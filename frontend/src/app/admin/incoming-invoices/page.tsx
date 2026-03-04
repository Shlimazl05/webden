


// src/app/admin/incoming-invoices/page.tsx
"use client";
import React from 'react';
import { Plus } from "lucide-react";
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
    <div className="animate-in fade-in duration-500">
      <AdminPageContainer>
        <AdminPageHeader title="QUẢN LÝ NHẬP KHO">
          <button onClick={f.handleOpenAdd} className="flex items-center gap-2 px-6 h-11 bg-indigo-600 text-white rounded-xl font-bold text-[14px] uppercase tracking-wider hover:bg-indigo-700 shadow-md transition-all active:scale-95">
            <Plus size={18} strokeWidth={3} /> Lập phiếu nhập
          </button>
        </AdminPageHeader>

        <div className="mb-10 max-w-sm">
          <SearchBar onSearch={f.handleSearch} placeholder="Tìm mã phiếu hoặc đối tác..." />
        </div>

        <ImportOrderTable 
          orders={f.orders} 
          loading={f.loading} 
          onDelete={f.handleOpenDelete} 
        />

        <div className="mt-8 border-t border-slate-50 pt-4">
          <Pagination currentPage={f.currentPage} totalPages={f.totalPages} onPageChange={f.handlePageChange} />
        </div>
      </AdminPageContainer>

      <AddImportOrderModal isOpen={f.isModalOpen} onClose={f.handleCloseModal} onSubmit={f.handleCreate} />
      
      <ConfirmModal 
        isOpen={f.isDeleteModalOpen} onClose={f.handleCloseDelete} onConfirm={f.executeDelete} 
        title="Xác nhận xóa" message="Hành động này sẽ xóa vĩnh viễn và trừ số lượng sản phẩm trong kho." 
      />
    </div>
  );
}