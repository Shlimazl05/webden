
// "use client";
// import React from 'react';
// import { useAdminAuth } from "@/features/auth/auth.hooks";
// import { useProductFeature } from "@/features/product/hooks/product.hooks";
// import { ProductCard } from "@/features/product/components/admin/ProductCard";
// import { ProductSearch } from "@/features/product/components/admin/ProductSearch";
// import { ConfirmModal } from "@/components/ui/ConfirmModal";
// import { AddProductModal } from "@/features/product/components/admin/AddProductModal"; // Import Modal mới
// import { Plus, PackageSearch } from "lucide-react";

// import { 
//   AdminPageContainer, 
//   AdminPageHeader, 
//   AdminInnerBox 
// } from "@/components/layout/AdminPageContainer";

// export default function ProductManagementPage() {
//   const { isAuthorized } = useAdminAuth();
  
//   // Lấy thêm các hàm handleOpenAdd, isModalOpen... từ hook
//   const { 
//     products, loading, handleSearch, 
//     isDeleteModalOpen, openDeleteModal, closeDeleteModal, confirmDelete,
//     isModalOpen, handleOpenAdd, handleCloseModal, selectedProduct 
//   } = useProductFeature();

//   if (!isAuthorized) return null;

//   return (
//     <div className="animate-in fade-in duration-500 pb-10">
//       <AdminPageContainer>
//         <AdminPageHeader title="QUẢN LÝ SẢN PHẨM">
//           {/* NÚT BẤM ĐÃ ĐƯỢC GẮN LỆNH MỞ MODAL */}
//           <button 
//             onClick={handleOpenAdd}
//             className="flex items-center gap-2 px-8 h-11 bg-[#c9a24d] text-white rounded-full font-black shadow-lg shadow-yellow-200/40 hover:scale-105 transition-all text-xs uppercase tracking-widest"
//           >
//             <Plus size={20} strokeWidth={3} /> 
//             Thêm sản phẩm
//           </button>
//         </AdminPageHeader>

//         <div className="mb-10 max-w-sm">
//           <ProductSearch onSearch={handleSearch} />
//         </div>

//         <div className="max-h-[620px] overflow-y-auto custom-scrollbar pr-2">
//           <AdminInnerBox>
//             {loading ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {[1, 2, 3, 4, 5].map(i => (
//                   <div key={i} className="aspect-[3/4.5] bg-slate-50 animate-pulse rounded-2xl" />
//                 ))}
//               </div>
//             ) : products && products.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {products.map((product) => (
//                   <ProductCard 
//                     key={product._id} 
//                     product={product} 
//                     onDelete={openDeleteModal}
//                   />
//                 ))}
//               </div>
//             ) : (
//               /* HIỆN TẠI KHI RELOAD SẼ HIỆN PHẦN NÀY */
//               <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
//                 <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
//                   <PackageSearch size={48} className="text-slate-300" strokeWidth={1.5} />
//                 </div>
//                 <h3 className="text-sm font-black text-[#001529] uppercase tracking-[0.2em]">Chưa có sản phẩm nào</h3>
//                 <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-wider">Hệ thống không tìm thấy dữ liệu đèn trong kho</p>
//                 <button 
//                   onClick={handleOpenAdd}
//                   className="mt-8 text-[11px] font-black text-[#c9a24d] border-b-2 border-[#c9a24d] pb-1 hover:text-[#b8943f] transition-all uppercase tracking-widest"
//                 >
//                   Tạo sản phẩm đầu tiên ngay
//                 </button>
//               </div>
//             )}
//           </AdminInnerBox>
//         </div>
//       </AdminPageContainer>

//       {/* MODAL THÊM SẢN PHẨM */}
//       <AddProductModal 
//         isOpen={isModalOpen} 
//         onClose={handleCloseModal} 
//         initialData={selectedProduct} 
//       />

//       {/* MODAL XÁC NHẬN XÓA */}
//       <ConfirmModal 
//         isOpen={isDeleteModalOpen}
//         onClose={closeDeleteModal}
//         onConfirm={confirmDelete}
//         title="Xóa sản phẩm"
//         message="Dữ liệu sẽ bị xóa vĩnh viễn khỏi hệ thống."
//       />
//     </div>
//   );
// }
"use client";

import React from 'react';
import { useAdminAuth } from "@/features/auth/auth.hooks";
import { useProductFeature } from "@/features/product/hooks/useAdminProduct"; // Import hook từ file trên
import { ProductCard } from "@/features/product/components/admin/ProductCard";
import { ProductSearch } from "@/features/product/components/admin/ProductSearch";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { AddProductModal } from "@/features/product/components/admin/AddProductModal";
import { Plus, PackageSearch } from "lucide-react";
import { AdminPageContainer, AdminPageHeader, AdminInnerBox } from "@/components/layout/AdminPageContainer";

// ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT: BẮT BUỘC PHẢI CÓ EXPORT DEFAULT
export default function ProductManagementPage() {
  const { isAuthorized } = useAdminAuth();
  
  // Gọi Hook để lấy toàn bộ dữ liệu và hành động
  const { 
    products, loading, handleSearch, 
    isDeleteModalOpen, openDeleteModal, closeDeleteModal, confirmDelete,
    isModalOpen, handleOpenAdd, handleCloseModal, selectedProduct 
  } = useProductFeature();

  if (!isAuthorized) return null;

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <AdminPageContainer>
        <AdminPageHeader title="QUẢN LÝ SẢN PHẨM">
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-8 h-11 bg-[#c9a24d] text-white rounded-full font-black shadow-lg hover:scale-105 transition-all text-xs uppercase tracking-widest"
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
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="aspect-[3/4.5] bg-slate-50 animate-pulse rounded-2xl" />)}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} onDelete={openDeleteModal} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <PackageSearch size={48} className="text-slate-300 mb-4" />
                <h3 className="text-sm font-black text-[#001529] uppercase">Chưa có sản phẩm nào</h3>
                <button onClick={handleOpenAdd} className="mt-4 text-[#c9a24d] font-black uppercase text-[10px] border-b-2 border-[#c9a24d]">
                  Tạo sản phẩm ngay
                </button>
              </div>
            )}
          </AdminInnerBox>
        </div>
      </AdminPageContainer>

      <AddProductModal isOpen={isModalOpen} onClose={handleCloseModal} initialData={selectedProduct} />
      <ConfirmModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={confirmDelete} title="Xóa sản phẩm" message="Dữ liệu sẽ bị xóa vĩnh viễn." />
    </div>
  );
}