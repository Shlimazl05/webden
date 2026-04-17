"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, Save, Package, Loader2, UploadCloud, Trash2, Plus, Tag } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';

// Tận dụng các class ui- đã tạo trong globals.css
export const ProductForm = ({ initialData, isEdit, loading, onSubmit, onClose, categories, showCloseButton = true }: any) => {
    const mainImageRef = useRef<HTMLInputElement>(null);
    const subImageRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        productCode: "", productName: "", salePrice: 0, stockQuantity: 0,
        categoryId: "", status: "Active", description: "", imageUrl: "" as any, images: [] as any[]
    });
    const [previews, setPreviews] = useState({ main: "", subs: [] as string[] });

    useEffect(() => {
        if (initialData) {
            setFormData({
                productCode: initialData.productCode, productName: initialData.productName,
                salePrice: initialData.salePrice, stockQuantity: initialData.stockQuantity,
                categoryId: typeof initialData.categoryId === 'string' ? initialData.categoryId : initialData.categoryId?._id || "",
                status: initialData.status, description: initialData.specifications?.description || "",
                imageUrl: initialData.imageUrl || "", images: initialData.images || []

            });
            setPreviews({ main: initialData.imageUrl || "", subs: initialData.images || [] });
        }
    }, [initialData]);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setFormData({ ...formData, imageUrl: base64 });
            setPreviews({ ...previews, main: base64 });
        }
    };

    const handleSubImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const base64Promises = files.map(file => fileToBase64(file));
        const base64Images = await Promise.all(base64Promises);

        // SỬA TẠI ĐÂY: Sử dụng (prev) để lấy dữ liệu mới nhất trong kho lưu trữ
        setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), ...base64Images]
        }));

        setPreviews(prev => ({
            ...prev,
            subs: [...(prev.subs || []), ...base64Images]
        }));
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* HEADER */}
            <div className="px-8 py-5 flex justify-between items-center border-b border-slate-100 bg-white rounded-t-[2.5rem]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-xl  flex items-center justify-center shadow-lg shadow-indigo-100">
                        <Package size={20} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        {isEdit ? `Chỉnh sửa: ${formData.productCode}` : "Thêm sản phẩm mới"}
                    </h2>
                </div>
                {showCloseButton && (
                    <button onClick={onClose} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
                        <X size={24} strokeWidth={2} />
                    </button>
                )}
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="grid grid-cols-12 gap-10">
                    {/* CỘT TRÁI: ẢNH */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <div className="space-y-3">
                            <label className="ui-label !text-slate-700 flex items-center gap-2">Ảnh chính sản phẩm *</label>
                            <div
                                onClick={() => mainImageRef.current?.click()}
                                className="aspect-square w-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden relative group hover:border-[var(--color-primary)] transition-all cursor-pointer"
                            >
                                {previews.main ? (
                                    <img src={previews.main} className="w-full h-full object-cover" alt="Main" />
                                ) : (
                                    <div className="text-center p-4">
                                        <UploadCloud size={40} className="mx-auto mb-2 text-slate-300 group-hover:text-[var(--color-primary)]" />
                                        <p className="ui-label">Bấm để tải ảnh</p>
                                    </div>
                                )}
                                <input type="file" ref={mainImageRef} hidden accept="image/*" onChange={handleMainImageChange} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="ui-label !text-slate-700">Ảnh bổ sung</label>
                            <div className="grid grid-cols-3 gap-2">
                                {previews.subs.map((img, index) => (
                                    <div key={index} className="aspect-square bg-slate-100 rounded-xl  overflow-hidden relative group">
                                        <img src={img} className="w-full h-full object-cover" alt="Sub" />
                                        <button type="button" onClick={() => {
                                            const newSubs = previews.subs.filter((_, i) => i !== index);
                                            setPreviews({ ...previews, subs: newSubs });
                                            setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
                                        }} className="absolute inset-0 bg-rose-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => subImageRef.current?.click()} className="aspect-square bg-slate-50 rounded-xl  border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all">
                                    <Plus size={20} />
                                </button>
                                <input type="file" ref={subImageRef} hidden multiple accept="image/*" onChange={handleSubImagesChange} />
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: FORM */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="col-span-2 space-y-2">
                                <label className="ui-label !text-slate-700">Tên sản phẩm *</label>
                                <input
                                    type="text" value={formData.productName}
                                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl  font-medium outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all"
                                    placeholder="Nhập tên sản phẩm..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="ui-label !text-slate-700">Danh mục</label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl  outline-none font-medium cursor-pointer"
                                >
                                    <option value="">-- Chọn danh mục --</option>
                                    {categories.map((cat: any) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="ui-label !text-rose-600">Giá bán (VNĐ)</label>
                                <input
                                    min="0"
                                    type="number" value={formData.salePrice || ""}
                                    onChange={(e) => {
                                        const val = Number(e.target.value);
                                        // Bảo vệ lớp 2: Ép giá trị không bao giờ âm
                                        setFormData({ ...formData, salePrice: Math.max(0, val) });
                                    }}
                                    className="w-full h-11 px-4 bg-rose-50/20 border border-rose-100 rounded-xl  outline-none font-bold text-rose-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="ui-label !text-slate-700">Số lượng kho</label>
                                <input
                                    min="0"
                                    type="number" value={formData.stockQuantity}
                                    onChange={(e) => {
                                        const val = Number(e.target.value);
                                        setFormData({ ...formData, stockQuantity: Math.max(0, val) });
                                    }}
                                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl  outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="ui-label !text-slate-700">Trạng thái</label>
                                <div className="flex gap-2">
                                    {['Active', 'Hidden'].map(s => (
                                        <button key={s} type="button" onClick={() => setFormData({ ...formData, status: s })}
                                            className={`flex-1 h-11 rounded-xl  text-xs font-bold transition-all border-2 ${formData.status === s ? 'bg-indigo-50 border-[var(--color-primary)] text-[var(--color-primary)]' : 'bg-white border-slate-100 text-slate-400'}`}>
                                            {s === 'Active' ? 'Đang bán' : 'Tạm ẩn'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="ui-label !text-slate-700">Mô tả sản phẩm</label>
                            <TextareaAutosize
                                minRows={3}
                                maxRows={12} // THÊM DÒNG NÀY: Giới hạn tối đa 12 dòng
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Nhập thông số kỹ thuật..."
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium resize-none focus:bg-white focus:border-[var(--color-primary)] transition-all shadow-inner custom-scrollbar overflow-y-auto"
                            /* Thêm overflow-y-auto để khi chạm mốc 12 dòng nó sẽ tự cuộn bên trong ô */
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3 rounded-b-[2.5rem]">
                <button type="button" onClick={onClose} className="px-6 text-slate-400 font-bold text-xs hover:text-slate-900 transition-all uppercase tracking-widest">Hủy bỏ</button>
                <button
                    onClick={() => onSubmit(formData)}
                    disabled={loading}
                    className="h-12 px-10 bg-[var(--color-primary)] text-white rounded-xl  font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {isEdit ? "Cập nhật sản phẩm" : "Lưu sản phẩm"}
                </button>
            </div>
        </div>
    );
};