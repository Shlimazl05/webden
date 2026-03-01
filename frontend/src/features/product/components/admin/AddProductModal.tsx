
"use client";
import React, { useState, useEffect } from "react";
import { X, Camera, Save, Package, FileText, Info, Loader2, ImagePlus, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { IProduct } from "../../product.types";
import { productApi } from "../../api/product.admin.api";

interface ICategory {
  _id: string;
  name: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IProduct | null;
  categories?: ICategory[];
  refreshData?: () => void;
}

const toastStyle = {
  borderRadius: '12px', background: '#1e293b', color: '#fff', fontSize: '14px', fontWeight: '700',
};

export const AddProductModal = ({ isOpen, onClose, initialData, categories = [], refreshData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productCode: "",
    productName: "",
    salePrice: 0,
    stockQuantity: 0,
    categoryId: "",
    status: "Active",
    description: "",
    imageUrl: "", 
    images: [] as string[] 
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        productCode: initialData.productCode,
        productName: initialData.productName,
        salePrice: initialData.salePrice,
        stockQuantity: initialData.stockQuantity,
        categoryId: typeof initialData.categoryId === 'string' ? initialData.categoryId : (initialData.categoryId as any)?._id || "",
        status: initialData.status,
        description: initialData.specifications?.description || "",
        imageUrl: initialData.imageUrl || "",
        images: initialData.images || []
      });
    } else if (!initialData) {
      setFormData({
        productCode: "", productName: "", salePrice: 0, stockQuantity: 0,
        categoryId: "", status: "Active", description: "", imageUrl: "", images: []
      });
    }
  }, [initialData, isOpen]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName || !formData.categoryId) {
      toast.error("VUI LÒNG NHẬP TÊN VÀ DANH MỤC", { style: toastStyle });
      return;
    }
    setLoading(true);
    const payload = {
      ...formData,
      salePrice: Number(formData.salePrice),
      stockQuantity: Number(formData.stockQuantity),
      specifications: { description: formData.description }
    };
    const promise = initialData ? productApi.updateProduct(initialData._id, payload as any) : productApi.createProduct(payload as any);
    toast.promise(promise, {
      loading: 'Đang xử lý...',
      success: () => { if (refreshData) refreshData(); onClose(); return "THÀNH CÔNG!"; },
      error: "LỖI HỆ THỐNG",
    }, { style: toastStyle });
    try { await promise; } catch (err) {} finally { setLoading(false); }
  };

  if (!isOpen) return null;
  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/30 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-in zoom-in-95 duration-200">
        
        {/* HEADER GỌN GÀNG */}
        <div className="px-8 py-5 flex justify-between items-center border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-indigo-100">
              <Package size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              {isEdit ? `Sửa: ${formData.productCode}` : "Thêm sản phẩm mới"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-900 transition-all hover:bg-slate-50 rounded-full">
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="grid grid-cols-12 gap-10">
            
            {/* CỘT TRÁI: QUẢN LÝ HÌNH ẢNH (GỌN HƠN) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div>
                <label className="text-[12px] font-bold text-slate-800 uppercase tracking-widest mb-3 block">Ảnh chính (Đại diện)</label>
                <div className="aspect-square w-full max-w-[240px] mx-auto bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden relative group hover:border-indigo-400 transition-all cursor-pointer shadow-inner">
                  {formData.imageUrl ? (
                    <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Main" />
                  ) : (
                    <div className="text-center p-4">
                      <Camera size={32} className="mx-auto mb-2 text-slate-300" />
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Tải ảnh lên</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[12px] font-bold text-slate-800 uppercase tracking-widest mb-3 block">Bộ sưu tập ảnh phụ</label>
                <div className="grid grid-cols-3 gap-3">
                  {formData.images.map((img, index) => (
                    <div key={index} className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative group border border-slate-200">
                      <img src={img} className="w-full h-full object-cover" alt="Sub" />
                      <button className="absolute inset-0 bg-rose-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button type="button" className="aspect-square bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-white transition-all">
                    <Plus size={20} />
                    <span className="text-[9px] font-bold uppercase mt-1">Thêm</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: THÔNG TIN CHI TIẾT (RÕ CHỮ) */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-widest mb-1.5 block">Tên sản phẩm *</label>
                  <input 
                    type="text" value={formData.productName}
                    onChange={(e) => setFormData({...formData, productName: e.target.value})}
                    placeholder="VD: ĐÈN CHÙM PHA LÊ PHÒNG KHÁCH"
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-900 text-sm focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all uppercase"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-widest mb-1.5 block">Danh mục</label>
                  <select 
                    value={formData.categoryId}
                    onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-900 text-sm focus:border-indigo-600 appearance-none cursor-pointer uppercase transition-all"
                  >
                    <option value="">-- CHỌN NHÓM ĐÈN --</option>
                    {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-widest mb-1.5 block">Giá niêm yết (VNĐ)</label>
                  <input 
                    type="number" value={formData.salePrice}
                    onChange={(e) => setFormData({...formData, salePrice: Number(e.target.value)})}
                    className="w-full h-11 px-4 bg-white border-2 border-slate-100 rounded-xl outline-none font-black text-rose-600 text-[15px] focus:border-rose-400 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-widest mb-1.5 block">Số lượng tồn kho</label>
                  <input 
                    type="number" value={formData.stockQuantity}
                    onChange={(e) => setFormData({...formData, stockQuantity: Number(e.target.value)})}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-900 text-sm"
                  />
                </div>

                {/* HIỂN THỊ MÃ SKU CHỈ KHI SỬA */}
                {isEdit && (
                  <div>
                    <label className="text-[12px] font-black text-indigo-600 uppercase tracking-widest mb-1.5 block">Mã sản phẩm</label>
                    <div className="h-11 px-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center font-black text-indigo-700 text-sm">
                      {formData.productCode}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-[12px] font-black text-slate-700 uppercase tracking-widest mb-2 block">Chế độ hiển thị Web</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, status: 'Active'})}
                    className={`flex-1 h-11 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all border-2 ${formData.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-500' : 'bg-white text-slate-400 border-slate-100'}`}
                  >
                    Đang bán
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, status: 'Hidden'})}
                    className={`flex-1 h-11 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all border-2 ${formData.status === 'Hidden' ? 'bg-slate-100 text-slate-700 border-slate-400' : 'bg-white text-slate-400 border-slate-100'}`}
                  >
                    Tạm ẩn
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-black text-slate-700 uppercase tracking-widest mb-1.5 block">Mô tả chi tiết & Thông số</label>
                <textarea 
                  rows={4} value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Công suất, kích thước, chất liệu..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-semibold text-slate-900 text-sm focus:bg-white focus:border-indigo-600 transition-all resize-none shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER: NÚT LƯU BÉ LẠI, NẰM BÊN PHẢI */}
        <div className="px-8 py-5 border-t border-slate-50 bg-slate-50/30 flex justify-end items-center gap-4">
          <button type="button" onClick={onClose} disabled={loading} className="text-slate-400 font-bold uppercase text-[11px] tracking-widest hover:text-slate-900 px-4">Hủy bỏ</button>
          <button 
            onClick={handleSave} disabled={loading}
            className="h-11 px-10 bg-indigo-600 text-white rounded-xl font-bold uppercase text-[12px] tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {isEdit ? "Cập nhật" : "Lưu vào kho"}
          </button>
        </div>
      </div>
    </div>
  );
};