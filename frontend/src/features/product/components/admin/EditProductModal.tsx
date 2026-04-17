// import { useState } from "react";
// import { productApi } from "../../api/product.admin.api";
// import toast from "react-hot-toast";
// import { ProductForm } from "./ProductForm";

// export const EditProductModal = ({ isOpen, onClose, initialData, categories, refreshData }: any) => {
//     const [loading, setLoading] = useState(false);

//     const handleUpdate = async (formData: any) => {
//         setLoading(true);
//         try {
//             await productApi.updateProduct(initialData._id, {
//                 ...formData,
//                 specifications: { description: formData.description }
//             });
//             toast.success("Cập nhật thành công!");
//             if (refreshData) refreshData();
//             onClose();
//         } catch (err: any) {
//             toast.error(err.response?.data?.message || "Lỗi cập nhật");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
//             <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95">
//                 <ProductForm
//                     isEdit={true}
//                     initialData={initialData}
//                     loading={loading}
//                     onSubmit={handleUpdate}
//                     onClose={onClose}
//                     categories={categories}
//                 />
//             </div>
//         </div>
//     );
// };


// D:\webden\frontend\src\features\product\components\admin\EditProductModal.tsx


import { useState } from "react";
import { productApi } from "../../api/product.admin.api";
import toast from "react-hot-toast";
import { ProductForm } from "./ProductForm";

// Định nghĩa style thông báo đồng bộ với trang Thêm mới
const toastStyle = {
    borderRadius: '12px',
    background: '#1e293b',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
};

export const EditProductModal = ({ isOpen, onClose, initialData, categories, refreshData }: any) => {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (formData: any) => {
        // --- BƯỚC 1: KIỂM TRA DỮ LIỆU (VALIDATION) ---
        // Chặn lỗi ngay tại Frontend để bảo vệ Server và giao diện
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

        const promise = productApi.updateProduct(initialData._id, payload);

        toast.promise(promise, {
            loading: 'Đang lưu các thay đổi...',
            success: () => {
                if (refreshData) refreshData();
                onClose();
                return "CẬP NHẬT THÀNH CÔNG!";
            },
            error: (err) => {
                const msg = err.response?.data?.message || "LỖI KHI CẬP NHẬT DỮ LIỆU!";
                return msg.toUpperCase();
            }
        }, { style: toastStyle });

        try {
            await promise;
        } catch (err) {
            console.error("Update Product Error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Bo góc rounded-[2rem] để đồng bộ với bộ khung Dashboard */}
            <div className="bg-white w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl rounded-[2.5rem] overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
                <ProductForm
                    isEdit={true}
                    initialData={initialData}
                    loading={loading}
                    onSubmit={handleUpdate}
                    onClose={onClose}
                    categories={categories}
                />
            </div>
        </div>
    );
};