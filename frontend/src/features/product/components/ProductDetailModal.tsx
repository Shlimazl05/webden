// "use client";
// import React from "react";
// import { X } from "lucide-react";
// import { IProduct } from "../../product/product.types";
// import { ProductDetailContent } from "@/features/product/components/ProductDetailContent";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   product: IProduct | null;
//   actions?: React.ReactNode; // Nơi truyền các nút bấm khác nhau
// }

// export const ProductDetailModal = ({ isOpen, onClose, product, actions }: Props) => {
//   if (!isOpen || !product) return null;

//   return (
//     <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-300">
//       <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-in zoom-in-95 duration-300">
        
//         {/* Nút đóng nổi lơ lửng */}
//         <button 
//           onClick={onClose} 
//           className="absolute right-8 top-8 z-50 p-2 bg-white/80 backdrop-blur-md text-slate-400 hover:text-rose-500 shadow-lg rounded-full transition-all border border-slate-100"
//         >
//           <X size={24} strokeWidth={3} />
//         </button>

//         {/* Nội dung chính tái sử dụng */}
//         <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
//           <ProductDetailContent product={product} />
//         </div>

//         {/* Footer linh hoạt */}
//         <div className="px-10 py-6 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center">
//           <button 
//             onClick={onClose} 
//             className="text-slate-400 font-black uppercase text-[11px] tracking-widest hover:text-slate-900 transition-all"
//           >
//             Quay lại
//           </button>
//           <div className="flex gap-3">
//             {actions} {/* Các nút bấm riêng sẽ hiện ở đây */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";
import React from "react";
import { X } from "lucide-react";
import { IProduct } from "../../product/product.types";
import { ProductDetailContent } from "./ProductDetailContent";
import { ProductForm } from "./admin/ProductForm"; // Import Form dùng chung
import toast from "react-hot-toast";
import { productApi } from "../../product/api/product.admin.api";

interface Props {
  isOpen: boolean;
  onClose: () => void;       // Hàm đóng hẳn Modal
  product: IProduct | null;

  // Các Props mới để xử lý chuyển đổi trạng thái
  isEditing: boolean;        // Trạng thái đang xem hay đang sửa
  onCancelEdit: () => void;  // Hàm quay lại màn hình xem (handleBackToDetail)
  categories: any[];         // Danh mục để truyền vào Form
  refreshData: () => void;   // Load lại danh sách sau khi lưu
  actions?: React.ReactNode; // Nút "Chỉnh sửa" truyền từ ngoài vào
}

export const ProductDetailModal = ({
  isOpen,
  onClose,
  product,
  isEditing,
  onCancelEdit,
  categories,
  refreshData,
  actions
}: Props) => {

  if (!isOpen || !product) return null;

  // Hàm xử lý lưu ngay tại Modal này
  const handleUpdate = async (formData: any) => {
    try {
      // Đảm bảo tạo ra một Payload sạch sẽ và đầy đủ
      const payload = {
        productName: formData.productName,
        salePrice: Number(formData.salePrice),
        stockQuantity: Number(formData.stockQuantity),
        categoryId: formData.categoryId,
        status: formData.status,
        imageUrl: formData.imageUrl, // Ảnh chính
        images: formData.images,     // ẢNH PHỤ - Đảm bảo dòng này có dữ liệu
        specifications: {
          description: formData.description
        }
      };

      await productApi.updateProduct(product._id, payload);

      toast.success("Cập nhật sản phẩm thành công!");
      refreshData();
      onCancelEdit();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi cập nhật sản phẩm");
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      {/* 
          Khung Modal giữ nguyên kích thước và bo góc 
          Dù nội dung bên trong thay đổi, khung này vẫn đứng yên.
      */}
      <div className="relative bg-white w-full max-w-5xl h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-in zoom-in-95 duration-300">

        {/* NÚT ĐÓNG HẲN MODAL (Luôn xuất hiện ở cả 2 chế độ) */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all group"
        >
          <X size={28} strokeWidth={2.5} />
        </button>

        {/* --- PHẦN NỘI DUNG THAY ĐỔI THEO TRẠNG THÁI --- */}
        {isEditing ? (
          /* CHẾ ĐỘ SỬA: Hiển thị Form */
          <ProductForm
            isEdit={true}
            initialData={product}
            categories={categories}
            onClose={onCancelEdit} // Bấm Hủy trong Form sẽ quay lại màn Xem
            onSubmit={handleUpdate} // Bấm Lưu sẽ gọi hàm Update ở trên
            showCloseButton={false}
          />
        ) : (
          /* CHẾ ĐỘ XEM: Hiển thị Content */
          <>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:p-16">
              <ProductDetailContent product={product} />
            </div>

            {/* FOOTER: Chỉ hiện ở chế độ Xem (Chứa nút "Chỉnh sửa") */}
            <div className="px-10 py-6 border-t border-slate-50 bg-slate-50/50 flex justify-end">
              {actions}
            </div>
          </>
        )}
      </div>
    </div>
  );
};