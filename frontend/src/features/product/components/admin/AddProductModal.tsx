
"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { productApi } from "@/features/product/api/product.admin.api";
import { ProductForm } from "./ProductForm"; // Giả định bạn đã tách Form ra

export const AddProductModal = ({ isOpen, onClose, categories, refreshData }: any) => {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData: any) => {
    setLoading(true);
    try {
      await productApi.createProduct({
        ...formData,
        specifications: { description: formData.description }
      });
      toast.success("Thêm sản phẩm thành công!");
      if (refreshData) refreshData();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi khi thêm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    /* Lớp nền mờ (Backdrop) */
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">

      {/* 
          KHUNG MODAL CHÍNH:
          - max-h-[90vh]: Giới hạn chiều cao tối đa bằng 90% màn hình.
          - flex flex-col: Để chia Header, Body, Footer theo chiều dọc.
          - overflow-hidden: Để các góc rounded không bị nội dung bên trong tràn qua.
      */}
      <div className="bg-white w-full max-w-5xl max-h-[90vh] flex flex-col rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

        {/* 
            Gọi ProductForm: 
            Lưu ý: Bạn phải đảm bảo bên trong ProductForm, phần nội dung nhập liệu 
            được bọc bởi một thẻ div có class 'flex-1 overflow-y-auto'.
        */}
        <ProductForm
          isEdit={false}
          loading={loading}
          onSubmit={handleCreate}
          onClose={onClose}
          categories={categories}
        />

      </div>
    </div>
  );
};