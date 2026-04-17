
"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { productApi } from "@/features/product/api/product.admin.api";
import { ProductForm } from "./ProductForm";

// Định nghĩa style thông báo đồng bộ với hệ thống của bạn
const toastStyle = {
  borderRadius: '12px',
  background: '#1e293b',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
};

export const AddProductModal = ({ isOpen, onClose, categories, refreshData }: any) => {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData: any) => {
    // --- BƯỚC 1: KIỂM TRA DỮ LIỆU (VALIDATION) ---
    // Việc này sẽ chặn đứng lỗi "Product validation failed" từ Backend
    if (!formData.productName?.trim()) {
      return toast.error("Vui lòng nhập tên sản phẩm!", { style: toastStyle });
    }
    if (!formData.categoryId) {
      return toast.error("Vui lòng chọn danh mục!", { style: toastStyle });
    }
    
    if (!formData.imageUrl) {
      return toast.error("Vui lòng tải ảnh chính cho sản phẩm!", { style: toastStyle });
    }

    // --- BƯỚC 2: GỌI API VỚI TOAST PROMISE ---
    setLoading(true);
    const payload = {
      ...formData,
      specifications: { description: formData.description }
    };

    const promise = productApi.createProduct(payload);

    toast.promise(promise, {
      loading: 'Đang khởi tạo sản phẩm mới...',
      success: () => {
        if (refreshData) refreshData();
        onClose();
        return "THÊM SẢN PHẨM THÀNH CÔNG!";
      },
      error: (err) => {
        // Nếu Backend vẫn trả về lỗi (ví dụ trùng mã sản phẩm)
        const msg = err.response?.data?.message || "LỖI HỆ THỐNG, VUI LÒNG THỬ LẠI!";
        return msg.toUpperCase();
      }
    }, { style: toastStyle });

    try {
      await promise;
    } catch (err) {
      console.error("Create Product Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
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