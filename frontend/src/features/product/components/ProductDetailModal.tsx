

"use client";
import React from "react";
import { X } from "lucide-react";
import { IProduct } from "../../product/product.types";
import { ProductDetailContent } from "./ProductDetailContent";
import { ProductForm } from "./admin/ProductForm";
import toast from "react-hot-toast";
import { productApi } from "../../product/api/product.admin.api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct | null;
  isEditing: boolean;
  onCancelEdit: () => void;
  categories: any[];
  refreshData: () => void;
  onUpdateSuccess?: (updatedProduct: IProduct) => void;
  actions?: React.ReactNode;
}

export const ProductDetailModal = ({
  isOpen,
  onClose,
  product,
  isEditing,
  onCancelEdit,
  categories,
  refreshData,
  onUpdateSuccess,
  actions
}: Props) => {

  if (!isOpen || !product) return null;

  const handleUpdate = async (formData: any) => {
    try {
      const payload = {
        productName: formData.productName,
        salePrice: Number(formData.salePrice),
        stockQuantity: Number(formData.stockQuantity),
        categoryId: formData.categoryId,
        status: formData.status,
        imageUrl: formData.imageUrl,
        images: formData.images, // Mảng ảnh đã xóa/thêm mới từ Form
        specifications: {
          description: formData.description
        }
      };

      const response = await productApi.updateProduct(product._id, payload);

      // Lấy dữ liệu mới: Ưu tiên dữ liệu từ server, nếu không có thì dùng payload vừa gửi
      // Đảm bảo cấu trúc object đồng nhất với IProduct
      const updatedData = (response?.data || {
        ...product,
        ...payload,
        specifications: {
          ...product?.specifications,
          ...payload.specifications
        }
      }) as unknown as IProduct;

      toast.success("Cập nhật sản phẩm thành công!");

      // QUAN TRỌNG: Gọi hàm này để cập nhật state detailProduct ở Page
      if (onUpdateSuccess) onUpdateSuccess(updatedData);

      refreshData();    // Cập nhật danh sách ở trang quản lý
      onCancelEdit();   // Quay về màn hình xem chi tiết
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi cập nhật sản phẩm");
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white w-full max-w-5xl h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-in zoom-in-95 duration-300">

        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all group"
        >
          <X size={28} strokeWidth={2.5} />
        </button>

        {isEditing ? (
          <ProductForm
            isEdit={true}
            initialData={product}
            categories={categories}
            onClose={onCancelEdit}
            onSubmit={handleUpdate}
            showCloseButton={false}
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:p-16">
              {/* Product ở đây sẽ là dữ liệu mới nhất sau khi onUpdateSuccess chạy */}
              <ProductDetailContent product={product} />
            </div>

            <div className="px-10 py-6 border-t border-slate-50 bg-slate-50/50 flex justify-end">
              {actions}
            </div>
          </>
        )}
      </div>
    </div>
  );
};