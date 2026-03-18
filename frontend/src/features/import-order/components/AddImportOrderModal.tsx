

// "use client";
// import React, { useState, useEffect } from "react";
// import { X, Plus, Trash2, Save, Package, Calculator, Loader2, Building2, Tag, Layers, ChevronDown } from "lucide-react";
// import toast from "react-hot-toast";
// import { productApi } from "@/features/product/api/product.admin.api";
// import { supplierApi } from "@/features/supplier/supplier.api";
// import { categoryApi } from "@/features/category/api/category.admin.api"; // Giả định đường dẫn API danh mục

// const toastStyle = {
//   borderRadius: '12px', background: '#1e293b', color: '#fff', fontSize: '14px', fontWeight: '700',
// };

// export const AddImportOrderModal = ({ isOpen, onClose, onSubmit }: any) => {
//   const [loading, setLoading] = useState(false);
//   const [suppliers, setSuppliers] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]); // State danh mục
//   const [allProducts, setAllProducts] = useState([]);
//   const [supplierId, setSupplierId] = useState("");
//   const [selectedCategoryId, setSelectedCategoryId] = useState(""); // State danh mục chọn
//   const [items, setItems] = useState([{ productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);

//   useEffect(() => {
//     if (isOpen) {
//       supplierApi.getAll(1, 100).then((res: any) => setSuppliers(res.suppliers || res));
//       productApi.getAllProducts({ limit: 100 }).then((res: any) => setAllProducts(res.products || res));
//       categoryApi.getAll(1, 100).then((res: any) => setCategories(res.categories || res)); // Lấy danh mục
//     }
//   }, [isOpen]);

//   const addItem = () => setItems([...items, { productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);
//   const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

//   const updateItem = (index: number, field: string, value: any) => {
//     const newItems = [...items];
//     // Chặn số âm cho tất cả các trường nhập số
//     const finalValue = (field === 'quantity' || field === 'importPrice' || field === 'newSalePrice')
//       ? Math.max(0, value)
//       : value;
//     (newItems[index] as any)[field] = finalValue;
//     setItems(newItems);
//   };

//   const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.importPrice), 0);

//   const handleSave = async () => {
//     if (!supplierId) return toast.error("VUI LÒNG CHỌN NHÀ CUNG CẤP", { style: toastStyle });
//     if (items.some(i => !i.productId)) return toast.error("VUI LÒNG CHỌN SẢN PHẨM", { style: toastStyle });
//     // Kiểm tra số lượng phải ít nhất là 1 khi lưu
//     if (items.some(i => i.quantity < 1)) return toast.error("SỐ LƯỢNG PHẢI LỚN HƠN 0", { style: toastStyle });

//     setLoading(true);
//     const savePromise = onSubmit({ supplierId, items, totalAmount, status: 'Completed' });
//     toast.promise(savePromise, {
//       loading: 'Đang xử lý nhập kho...',
//       success: () => {
//         onClose();
//         setItems([{ productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);
//         setSupplierId("");
//         setSelectedCategoryId("");
//         return "NHẬP KHO THÀNH CÔNG!";
//       },
//       error: (err) => err.response?.data?.message || "LỖI HỆ THỐNG",
//     }, { style: toastStyle });
//     try { await savePromise; } catch (err) { } finally { setLoading(false); }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
//       <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[24px] shadow-2xl flex flex-col border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">

//         {/* HEADER */}
//         <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md">
//               <Package size={20} strokeWidth={3} />
//             </div>
//             <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Lập phiếu nhập hàng</h2>
//           </div>
//           <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
//             <X size={26} strokeWidth={3.5} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">

//           {/* THÔNG TIN CHUNG (Ngang hàng & Tự giãn) */}
//           <div className="flex flex-col gap-8">

//             {/* NHÀ CUNG CẤP */}
//             <div className="space-y-3 w-fit">
//               <div className="flex items-center gap-2 ml-1 text-indigo-600">
//                 <Building2 size={16} strokeWidth={3} />
//                 <label className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Đối tác cung cấp *</label>
//               </div>
//               {/* Thêm h-11 vào container relative để cố định vị trí mũi tên top-1/2 */}
//               <div className="relative w-fit min-w-[260px] h-11">
//                 <div className="invisible px-12 font-bold text-sm whitespace-nowrap">
//                   {suppliers.find((s: any) => s._id === supplierId)?.name || "-- CHỌN NHÀ CUNG CẤP TRONG DANH SÁCH --"}
//                 </div>
//                 <select
//                   value={supplierId}
//                   onChange={e => setSupplierId(e.target.value)}
//                   className={`absolute inset-0 w-full h-11 pl-5 pr-10 rounded-xl font-bold text-sm outline-none transition-all appearance-none cursor-pointer border-2
//             ${supplierId ? "bg-indigo-50/30 border-indigo-500 text-indigo-700 shadow-sm" : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200"}`}
//                 >
//                   <option value="">-- CHỌN NHÀ CUNG CẤP TRONG DANH SÁCH --</option>
//                   {suppliers.map((s: any) => <option key={s._id} value={s._id}>{s.name}</option>)}
//                 </select>
//                 {/* Mũi tên sẽ luôn nằm giữa nhờ h-11 của parent */}
//                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
//                   <ChevronDown size={18} strokeWidth={3} className={supplierId ? "text-indigo-600" : "text-slate-300"} />
//                 </div>
//               </div>
//             </div>

//             {/* DANH MỤC (Nằm dưới Nhà cung cấp) */}
//             <div className="space-y-3 w-fit">
//               <div className="flex items-center gap-2 ml-1 text-orange-500">
//                 <Layers size={16} strokeWidth={3} />
//                 <label className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Lọc theo danh mục</label>
//               </div>
//               <div className="relative w-fit min-w-[200px] h-11">
//                 <div className="invisible px-12 font-bold text-sm whitespace-nowrap uppercase">
//                   {categories.find((c: any) => c._id === selectedCategoryId)?.name || "-- TẤT CẢ DANH MỤC --"}
//                 </div>
//                 <select
//                   value={selectedCategoryId}
//                   onChange={e => setSelectedCategoryId(e.target.value)}
//                   className={`absolute inset-0 w-full h-11 pl-5 pr-10 rounded-xl font-bold text-sm outline-none transition-all appearance-none cursor-pointer border-2
//             ${selectedCategoryId ? "bg-orange-50/30 border-orange-500 text-orange-700 shadow-sm" : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200"}`}
//                 >
//                   <option value="">-- TẤT CẢ DANH MỤC --</option>
//                   {categories.map((c: any) => <option key={c._id} value={c._id}>{c.name.toUpperCase()}</option>)}
//                 </select>
//                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
//                   <ChevronDown size={18} strokeWidth={3} className={selectedCategoryId ? "text-orange-500" : "text-slate-300"} />
//                 </div>
//               </div>
//             </div>

//           </div>

//           {/* DANH SÁCH HÀNG NHẬP */}
//           <div className="space-y-4">
//             <div className="flex justify-between items-center px-1">
//               <h3 className="text-[12px] font-black text-slate-950 uppercase tracking-[0.2em] flex items-center gap-2">
//                 <div className="w-2 h-2 bg-indigo-600 rounded-full shadow-sm"></div>
//                 Danh sách sản phẩm nhập
//               </h3>
//               <button onClick={addItem} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-indigo-100 active:scale-95">
//                 <Plus size={16} strokeWidth={3.5} /> Thêm dòng mới
//               </button>
//             </div>

//             <div className="space-y-4">
//               {items.map((item, index) => (
//                 <div key={index} className="grid grid-cols-12 gap-4 items-end bg-white p-5 rounded-[20px] border-l-8 border-l-indigo-600 border border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-md transition-all">
//                   <div className="col-span-4 space-y-2">
//                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                       <Tag size={12} strokeWidth={3} className="text-indigo-500" /> Sản phẩm
//                     </label>
//                     <select
//                       value={item.productId}
//                       onChange={e => updateItem(index, 'productId', e.target.value)}
//                       className="w-full h-11 px-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 text-[14px] outline-none focus:border-indigo-600 focus:bg-white transition-all truncate"
//                     >
//                       <option value="">-- CHỌN ĐÈN --</option>
//                       {allProducts
//                         .filter((p: any) => !selectedCategoryId || (p.categoryId?._id || p.categoryId) === selectedCategoryId)
//                         .map((p: any) => (
//                           <option key={p._id} value={p._id} className="truncate">{p.productName}</option>
//                         ))
//                       }
//                     </select>
//                   </div>

//                   <div className="col-span-2 space-y-2">
//                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-center block">Số lượng</label>
//                     <input
//                       type="number"
//                       value={item.quantity || ""}
//                       onChange={e => updateItem(index, 'quantity', e.target.value === "" ? 0 : Number(e.target.value))}
//                       className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl font-black text-slate-900 text-center focus:bg-white transition-all"
//                     />
//                   </div>

//                   <div className="col-span-2 space-y-2">
//                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Giá nhập</label>
//                     <input
//                       type="number"
//                       value={item.importPrice || ""}
//                       onChange={e => updateItem(index, 'importPrice', e.target.value === "" ? 0 : Number(e.target.value))}
//                       className="w-full h-11 px-4 bg-indigo-50/30 border border-indigo-100 rounded-xl font-black text-indigo-700 focus:bg-white transition-all shadow-inner"
//                     />
//                   </div>

//                   <div className="col-span-3 space-y-2">
//                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Giá bán mới</label>
//                     <input
//                       type="number"
//                       value={item.newSalePrice || ""}
//                       onChange={e => updateItem(index, 'newSalePrice', e.target.value === "" ? 0 : Number(e.target.value))}
//                       placeholder="Giữ giá cũ..."
//                       className="w-full h-11 px-4 bg-rose-50/20 border border-rose-100 rounded-xl font-black text-rose-600 placeholder:text-slate-300 focus:bg-white transition-all"
//                     />
//                   </div>

//                   <div className="col-span-1 flex justify-center pb-1">
//                     <button onClick={() => removeItem(index)} className="p-2.5 text-rose-500 hover:bg-rose-100 rounded-xl transition-all active:scale-90">
//                       <Trash2 size={22} strokeWidth={3} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/80 flex justify-between items-center">
//           <div className="flex items-center gap-4 text-slate-900">
//             <Calculator size={30} strokeWidth={3} />
//             <div>
//               <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">Tổng giá trị phiếu</p>
//               <h3 className="text-3xl font-black text-rose-700 tracking-tighter leading-none">
//                 {totalAmount.toLocaleString('vi-VN')} <span className="text-sm underline">đ</span>
//               </h3>
//             </div>
//           </div>
//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="h-12 px-12 bg-indigo-600 text-white rounded-xl font-black text-[13px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50"
//           >
//             {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} strokeWidth={3} />}
//             Xác nhận nhập kho
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


"use client";
import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Save, Package, Calculator, Loader2, Building2, Tag, Layers, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { productApi } from "@/features/product/api/product.admin.api";
import { supplierApi } from "@/features/supplier/supplier.api";
import { categoryApi } from "@/features/category/api/category.admin.api";

const toastStyle = {
  borderRadius: '12px', background: '#1e293b', color: '#fff', fontSize: '14px', fontWeight: '600',
};

export const AddImportOrderModal = ({ isOpen, onClose, onSubmit }: any) => {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);

  useEffect(() => {
    if (isOpen) {
      supplierApi.getAll(1, 100).then((res: any) => setSuppliers(res.suppliers || res));
      productApi.getAllProducts({ limit: 100 }).then((res: any) => setAllProducts(res.products || res));
      categoryApi.getAll(1, 100).then((res: any) => setCategories(res.categories || res));
    }
  }, [isOpen]);

  const addItem = () => setItems([...items, { productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    const finalValue = (field === 'quantity' || field === 'importPrice' || field === 'newSalePrice')
      ? Math.max(0, value)
      : value;
    (newItems[index] as any)[field] = finalValue;
    setItems(newItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.importPrice), 0);

  const handleSave = async () => {
    if (!supplierId) return toast.error("Vui lòng chọn nhà cung cấp", { style: toastStyle });
    if (items.some(i => !i.productId)) return toast.error("Vui lòng chọn sản phẩm", { style: toastStyle });
    if (items.some(i => i.quantity < 1)) return toast.error("Số lượng phải lớn hơn 0", { style: toastStyle });

    setLoading(true);
    const savePromise = onSubmit({ supplierId, items, totalAmount, status: 'Completed' });
    toast.promise(savePromise, {
      loading: 'Đang xử lý nhập kho...',
      success: () => {
        onClose();
        setItems([{ productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);
        setSupplierId("");
        setSelectedCategoryId("");
        return "Nhập kho thành công!";
      },
      error: (err) => err.response?.data?.message || "Lỗi hệ thống",
    }, { style: toastStyle });
    try { await savePromise; } catch (err) { } finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-[28px] shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">

        {/* HEADER */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <Package size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Lập phiếu nhập hàng</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10 bg-slate-50/30">

          {/* THÔNG TIN CHUNG */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NHÀ CUNG CẤP */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 ml-1 text-[var(--color-primary)]">
                <Building2 size={16} strokeWidth={2} />
                <label className="ui-label !text-slate-700">Đối tác cung cấp *</label>
              </div>
              <div className="relative h-12">
                <select
                  value={supplierId}
                  onChange={e => setSupplierId(e.target.value)}
                  className={`w-full h-full pl-5 pr-10 rounded-xl font-medium text-sm outline-none transition-all appearance-none cursor-pointer border-2
                    ${supplierId ? "bg-white border-[var(--color-primary)] text-slate-900 shadow-sm" : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"}`}
                >
                  <option value="">-- Chọn nhà cung cấp trong danh sách --</option>
                  {suppliers.map((s: any) => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={18} className={supplierId ? "text-[var(--color-primary)]" : "text-slate-300"} />
                </div>
              </div>
            </div>

            {/* DANH MỤC */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 ml-1 text-orange-500">
                <Layers size={16} strokeWidth={2} />
                <label className="ui-label !text-slate-700">Lọc nhanh theo danh mục</label>
              </div>
              <div className="relative h-12">
                <select
                  value={selectedCategoryId}
                  onChange={e => setSelectedCategoryId(e.target.value)}
                  className={`w-full h-full pl-5 pr-10 rounded-xl font-medium text-sm outline-none transition-all appearance-none cursor-pointer border-2
                    ${selectedCategoryId ? "bg-white border-orange-500 text-slate-900 shadow-sm" : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"}`}
                >
                  <option value="">-- Tất cả danh mục sản phẩm --</option>
                  {categories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={18} className={selectedCategoryId ? "text-orange-500" : "text-slate-300"} />
                </div>
              </div>
            </div>
          </div>

          {/* DANH SÁCH HÀNG NHẬP */}
          <div className="space-y-4">
            <div className="flex justify-between items-end px-1 border-b border-slate-200 pb-3">
              <h3 className="ui-section-title flex items-center gap-2">
                <div className="w-2 h-6 bg-[var(--color-primary)] rounded-full"></div>
                Danh sách sản phẩm nhập
              </h3>
              <button onClick={addItem} className="px-4 py-2 bg-indigo-50 text-[var(--color-primary)] rounded-xl text-[12px] font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm active:scale-95">
                <Plus size={16} strokeWidth={2.5} /> Thêm dòng mới
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-5 items-end bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="col-span-4 space-y-2">
                    <label className="ui-label flex items-center gap-2">
                      <Tag size={12} className="text-indigo-600" /> Sản phẩm
                    </label>
                    <select
                      value={item.productId}
                      onChange={e => updateItem(index, 'productId', e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-100 rounded-xl font-medium text-slate-900 text-[14px] outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all"
                    >
                      <option value="">-- Chọn sản phẩm --</option>
                      {allProducts
                        .filter((p: any) => !selectedCategoryId || (p.categoryId?._id || p.categoryId) === selectedCategoryId)
                        .map((p: any) => (
                          <option key={p._id} value={p._id}>{p.productName}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="col-span-2 space-y-2 text-center">
                    <label className="ui-label block">Số lượng</label>
                    <input
                      type="number"
                      value={item.quantity || ""}
                      onChange={e => updateItem(index, 'quantity', e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 text-center focus:border-[var(--color-primary)] focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <label className="ui-label block">Giá nhập (đ)</label>
                    <input
                      type="number"
                      value={item.importPrice || ""}
                      onChange={e => updateItem(index, 'importPrice', e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 focus:border-[var(--color-primary)] focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="col-span-3 space-y-2">
                    <label className="ui-label block text-rose-500">Giá bán mới (đ)</label>
                    <input
                      type="number"
                      value={item.newSalePrice || ""}
                      onChange={e => updateItem(index, 'newSalePrice', e.target.value === "" ? 0 : Number(e.target.value))}
                      placeholder="Giữ giá cũ..."
                      className="w-full h-11 px-4 bg-rose-50/30 border border-rose-100 rounded-xl font-bold text-rose-600 placeholder:text-rose-300 focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="col-span-1 flex justify-center pb-0.5">
                    <button onClick={() => removeItem(index)} className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-10 py-6 border-t border-slate-100 bg-white flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
              <Calculator size={24} strokeWidth={2} />
            </div>
            <div>
              <p className="ui-label !mb-0 text-[10px]">Tổng giá trị phiếu nhập</p>
              <h3 className="text-3xl font-bold text-rose-600 tracking-tight">
                {totalAmount.toLocaleString('vi-VN')}<span className="text-lg ml-1 font-medium underline">đ</span>
              </h3>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="h-12 px-10 bg-[var(--color-primary)] text-white rounded-xl font-bold text-[14px] shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Xác nhận nhập kho
          </button>
        </div>
      </div>
    </div>
  );
};