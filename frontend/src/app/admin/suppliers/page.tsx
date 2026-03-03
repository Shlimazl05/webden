// src/app/admin/suppliers/page.tsx
"use client";
import React from 'react';
import { Plus } from "lucide-react";
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useSupplierFeature } from "@/features/supplier/supplier.hooks";
import { SupplierTable } from "@/features/supplier/components/SupplierTable";
import { AddSupplierModal } from "@/features/supplier/components/AddSupplierModal";
import { SearchBar } from "@/components/ui/SearchBar";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { Pagination } from "@/components/ui/Pagination";
import { AdminPageContainer, AdminPageHeader } from "@/components/layout/AdminPageContainer";

export default function SupplierPage() {
  const { isAuthorized } = useAdminAuth();
  const f = useSupplierFeature(); // f viết tắt của feature để code ngắn gọn

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500">
      <AdminPageContainer>
        <AdminPageHeader title="QUẢN LÝ NHÀ CUNG CẤP">
          <button onClick={f.handleOpenAdd} className="flex items-center gap-2 px-6 h-11 bg-indigo-600 text-white rounded-xl font-bold text-[13px] uppercase tracking-wider hover:bg-indigo-700 shadow-md transition-all active:scale-95">
            <Plus size={18} strokeWidth={3} /> Thêm nhà cung cấp
          </button>
        </AdminPageHeader>

        <div className="mb-10 max-w-sm">
          <SearchBar onSearch={f.handleSearch} placeholder="Tìm tên nhà cung cấp, số điện thoại..." />
        </div>

        <SupplierTable 
          suppliers={f.suppliers} loading={f.loading} 
          onEdit={f.handleOpenEdit} onDelete={f.handleOpenDelete} onToggle={f.handleToggleStatus} 
        />

        <Pagination currentPage={f.currentPage} totalPages={f.totalPages} onPageChange={f.handlePageChange} />
      </AdminPageContainer>

      <AddSupplierModal isOpen={f.isModalOpen} onClose={f.handleCloseModal} initialData={f.selectedSupplier} onSubmit={f.handleSubmit} />
      
      <ConfirmModal 
        isOpen={f.isDeleteModalOpen} onClose={f.handleCloseDelete} onConfirm={f.executeDelete} 
        title="Xác nhận xóa" message="Hành động này sẽ xóa vĩnh viễn nhà cung cấp khỏi hệ thống." 
      />
    </div>
  );
}