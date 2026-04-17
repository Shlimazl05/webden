import { useState } from "react";
import { productApi } from "../../api/product.admin.api";
import toast from "react-hot-toast";
import { ProductForm } from "./ProductForm";

export const EditProductModal = ({ isOpen, onClose, initialData, categories, refreshData }: any) => {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (formData: any) => {
        setLoading(true);
        try {
            await productApi.updateProduct(initialData._id, {
                ...formData,
                specifications: { description: formData.description }
            });
            toast.success("Cập nhật thành công!");
            if (refreshData) refreshData();
            onClose();
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Lỗi cập nhật");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95">
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