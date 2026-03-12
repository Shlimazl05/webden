

// "use client";
// import React, { useState, useEffect } from "react";
// import { X, Plus, Trash2, Save, Package, Calculator, Loader2, Building2, Tag, Coins, CirclePercent, ChevronDown, Layers } from "lucide-react";
// import toast from "react-hot-toast";
// import { productApi } from "@/features/product/api/product.admin.api";
// import { supplierApi } from "@/features/supplier/supplier.api";
// import { categoryApi } from "@/features/category/api/category.admin.api";

// const toastStyle = {
//   borderRadius: '12px', background: '#1e293b', color: '#fff', fontSize: '14px', fontWeight: '700',
// };

// export const AddImportOrderModal = ({ isOpen, onClose, onSubmit }: any) => {
//   const [loading, setLoading] = useState(false);
//   const [suppliers, setSuppliers] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const [supplierId, setSupplierId] = useState("");
//   const [items, setItems] = useState([{ productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState("");
//   useEffect(() => {
//     if (isOpen) {
//       supplierApi.getAll(1, 100).then((res: any) => setSuppliers(res.suppliers || res));
//       productApi.getAllProducts({ limit: 100 }).then((res: any) => setAllProducts(res.products || res));
//       categoryApi.getAll(1, 100).then((res: any) => setCategories(res.categories || res));
//     }
//   }, [isOpen]);

//   const addItem = () => setItems([...items, { productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);
//   const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
  
//   const updateItem = (index: number, field: string, value: any) => {
//     const newItems = [...items];
//     (newItems[index] as any)[field] = value;
//     setItems(newItems);
//   };

//   const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.importPrice), 0);

//   const handleSave = async () => {
//     if (!supplierId) return toast.error("VUI LÒNG CHỌN NHÀ CUNG CẤP", { style: toastStyle });
//     if (items.some(i => !i.productId)) return toast.error("VUI LÒNG CHỌN SẢN PHẨM", { style: toastStyle });
//     setLoading(true);
//     const savePromise = onSubmit({ supplierId, items, totalAmount, status: 'Completed' });
//     toast.promise(savePromise, {
//       loading: 'Đang xử lý nhập kho...',
//       success: () => {
//         onClose();
//         setItems([{ productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);
//         return "NHẬP KHO THÀNH CÔNG!";
//       },
//       error: (err) => err.response?.data?.message || "LỖI HỆ THỐNG",
//     }, { style: toastStyle });
//     try { await savePromise; } catch (err) {} finally { setLoading(false); }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
//       {/* SỬA LỖI 4 GÓC: Dùng rounded-[24px] và overflow-hidden toàn bộ */}
//       <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[24px] shadow-2xl flex flex-col border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
//         {/* HEADER: Phẳng hóa góc trên */}
//         <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md">
//               <Package size={20} strokeWidth={3} />
//             </div>
//             <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Lập phiếu nhập hàng</h2>
//           </div>
//           {/* NÚT ĐÓNG ĐẬM NÉT */}
//           <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
//             <X size={26} strokeWidth={3.5} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
          
//           {/* THÔNG TIN NHÀ CUNG CẤP */}
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 ml-1 text-indigo-600">
//               <Building2 size={16} strokeWidth={3} />
//               <label className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Đối tác cung cấp *</label>
//             </div>
//             <div className="relative">
//               <select
//                 value={supplierId}
//                 onChange={e => setSupplierId(e.target.value)}
//                 className={`w-full h-11 pl-5 pr-10 rounded-xl font-bold text-sm outline-none transition-all appearance-none cursor-pointer border-2
//           ${supplierId ? "bg-indigo-50/30 border-indigo-500 text-indigo-700" : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200"}`}
//               >
//                 <option value="">-- CHỌN NHÀ CUNG CẤP --</option>
//                 {suppliers.map((s: any) => <option key={s._id} value={s._id}>{s.name}</option>)}
//               </select>
//               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
//                 <ChevronDown size={18} strokeWidth={3} className={supplierId ? "text-indigo-600" : "text-slate-300"} />
//               </div>
//             </div>
//           </div>

//           {/* CỘT 2: DANH MỤC (Thêm mới theo yêu cầu) */}
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 ml-1 text-orange-500"> {/* Icon màu cam */}
//               <Layers size={16} strokeWidth={3} />
//               <label className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Lọc theo danh mục</label>
//             </div>
//             <div className="relative">
//               <select
//                 value={selectedCategoryId}
//                 onChange={e => setSelectedCategoryId(e.target.value)}
//                 className={`w-full h-11 pl-5 pr-10 rounded-xl font-bold text-sm outline-none transition-all appearance-none cursor-pointer border-2
//           ${selectedCategoryId ? "bg-orange-50/30 border-orange-500 text-orange-700" : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200"}`}
//               >
//                 <option value="">-- TẤT CẢ DANH MỤC --</option>
//                 {categories.map((c: any) => <option key={c._id} value={c._id}>{c.name.toUpperCase()}</option>)}
//               </select>
//               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
//                 <ChevronDown size={18} strokeWidth={3} className={selectedCategoryId ? "text-orange-500" : "text-slate-300"} />
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
                  
//                   {/* Cột chọn Sản phẩm (Xử lý tên dài) */}
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
//                         .filter((p: any) => {
//                           // Nếu chưa chọn danh mục thì hiện tất cả
//                           if (!selectedCategoryId) return true;

//                           // Lấy ID của danh mục từ sản phẩm (xử lý cả trường hợp là string hoặc object)
//                           const pCategoryId = typeof p.categoryId === 'string' ? p.categoryId : p.categoryId?._id;

//                           return pCategoryId === selectedCategoryId;
//                         })
//                         .map((p: any) => (
//                           <option key={p._id} value={p._id}>{p.productName}</option>
//                         ))
//                       }
//                     </select>
//                   </div>

//                   {/* Cột Số lượng */}
//                   <div className="col-span-2 space-y-2">
//                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 text-center justify-center">
//                        Số lượng
//                     </label>
//                     <input 
//                       type="number" 
//                       min="1"
//                       value={item.quantity || ""} 
//                       onChange={e => {
//                         const val = e.target.value === "" ? 0 : Number(e.target.value);
//                         // Tự động đưa về 1 nếu người dùng nhập số nhỏ hơn 1
//                         updateItem(index, 'quantity', Math.max(0, val));
//                       }} 
//                       className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl font-black text-slate-900 text-center focus:bg-white transition-all" 
//                     />
//                   </div>

//                   {/* Cột Giá nhập */}
//                   <div className="col-span-2 space-y-2">
//                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                       Giá nhập
//                     </label>
//                     <input 
//                       type="number" 
//                       min="0"
//                       value={item.importPrice || ""} 
//                       onChange={e => {
//                         const val = e.target.value === "" ? 0 : Number(e.target.value);
//                         // Tự động đưa về 0 nếu nhập số âm
//                         updateItem(index, 'importPrice', Math.max(0, val));
//                       }}
//                       className="w-full h-11 px-4 bg-indigo-50/30 border border-indigo-100 rounded-xl font-black text-indigo-700 focus:bg-white transition-all shadow-inner" 
//                     />
//                   </div>

//                   {/* Cột Giá bán mới */}
//                   <div className="col-span-3 space-y-2">
//                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                       Giá bán mới
//                     </label>
//                     <input 
//                       type="number" 
//                       min="0"
//                       value={item.newSalePrice || ""} 
//                       onChange={e => {
//                         const val = e.target.value === "" ? 0 : Number(e.target.value);
//                         // Tự động đưa về 0 nếu nhập số âm
//                         updateItem(index, 'newSalePrice', Math.max(0, val));
//                       }} 
//                       placeholder="Giữ giá cũ..." 
//                       className="w-full h-11 px-4 bg-rose-50/20 border border-rose-100 rounded-xl font-black text-rose-600 placeholder:text-slate-300 focus:bg-white transition-all" 
//                     />
//                   </div>

//                   {/* NÚT XÓA DÒNG ĐẬM NÉT */}
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

//         {/* FOOTER: Phẳng hóa góc dưới */}
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
import { categoryApi } from "@/features/category/api/category.admin.api"; // Giả định đường dẫn API danh mục

const toastStyle = {
  borderRadius: '12px', background: '#1e293b', color: '#fff', fontSize: '14px', fontWeight: '700',
};

export const AddImportOrderModal = ({ isOpen, onClose, onSubmit }: any) => {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]); // State danh mục
  const [allProducts, setAllProducts] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // State danh mục chọn
  const [items, setItems] = useState([{ productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);

  useEffect(() => {
    if (isOpen) {
      supplierApi.getAll(1, 100).then((res: any) => setSuppliers(res.suppliers || res));
      productApi.getAllProducts({ limit: 100 }).then((res: any) => setAllProducts(res.products || res));
      categoryApi.getAll(1, 100).then((res: any) => setCategories(res.categories || res)); // Lấy danh mục
    }
  }, [isOpen]);

  const addItem = () => setItems([...items, { productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    // Chặn số âm cho tất cả các trường nhập số
    const finalValue = (field === 'quantity' || field === 'importPrice' || field === 'newSalePrice')
      ? Math.max(0, value)
      : value;
    (newItems[index] as any)[field] = finalValue;
    setItems(newItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.importPrice), 0);

  const handleSave = async () => {
    if (!supplierId) return toast.error("VUI LÒNG CHỌN NHÀ CUNG CẤP", { style: toastStyle });
    if (items.some(i => !i.productId)) return toast.error("VUI LÒNG CHỌN SẢN PHẨM", { style: toastStyle });
    // Kiểm tra số lượng phải ít nhất là 1 khi lưu
    if (items.some(i => i.quantity < 1)) return toast.error("SỐ LƯỢNG PHẢI LỚN HƠN 0", { style: toastStyle });

    setLoading(true);
    const savePromise = onSubmit({ supplierId, items, totalAmount, status: 'Completed' });
    toast.promise(savePromise, {
      loading: 'Đang xử lý nhập kho...',
      success: () => {
        onClose();
        setItems([{ productId: "", quantity: 1, importPrice: 0, newSalePrice: 0 }]);
        setSupplierId("");
        setSelectedCategoryId("");
        return "NHẬP KHO THÀNH CÔNG!";
      },
      error: (err) => err.response?.data?.message || "LỖI HỆ THỐNG",
    }, { style: toastStyle });
    try { await savePromise; } catch (err) { } finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[24px] shadow-2xl flex flex-col border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">

        {/* HEADER */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md">
              <Package size={20} strokeWidth={3} />
            </div>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Lập phiếu nhập hàng</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
            <X size={26} strokeWidth={3.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">

          {/* THÔNG TIN CHUNG (Ngang hàng & Tự giãn) */}
          <div className="flex flex-col gap-8">

            {/* NHÀ CUNG CẤP */}
            <div className="space-y-3 w-fit">
              <div className="flex items-center gap-2 ml-1 text-indigo-600">
                <Building2 size={16} strokeWidth={3} />
                <label className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Đối tác cung cấp *</label>
              </div>
              {/* Thêm h-11 vào container relative để cố định vị trí mũi tên top-1/2 */}
              <div className="relative w-fit min-w-[260px] h-11">
                <div className="invisible px-12 font-bold text-sm whitespace-nowrap">
                  {suppliers.find((s: any) => s._id === supplierId)?.name || "-- CHỌN NHÀ CUNG CẤP TRONG DANH SÁCH --"}
                </div>
                <select
                  value={supplierId}
                  onChange={e => setSupplierId(e.target.value)}
                  className={`absolute inset-0 w-full h-11 pl-5 pr-10 rounded-xl font-bold text-sm outline-none transition-all appearance-none cursor-pointer border-2
            ${supplierId ? "bg-indigo-50/30 border-indigo-500 text-indigo-700 shadow-sm" : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200"}`}
                >
                  <option value="">-- CHỌN NHÀ CUNG CẤP TRONG DANH SÁCH --</option>
                  {suppliers.map((s: any) => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
                {/* Mũi tên sẽ luôn nằm giữa nhờ h-11 của parent */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                  <ChevronDown size={18} strokeWidth={3} className={supplierId ? "text-indigo-600" : "text-slate-300"} />
                </div>
              </div>
            </div>

            {/* DANH MỤC (Nằm dưới Nhà cung cấp) */}
            <div className="space-y-3 w-fit">
              <div className="flex items-center gap-2 ml-1 text-orange-500">
                <Layers size={16} strokeWidth={3} />
                <label className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Lọc theo danh mục</label>
              </div>
              <div className="relative w-fit min-w-[200px] h-11">
                <div className="invisible px-12 font-bold text-sm whitespace-nowrap uppercase">
                  {categories.find((c: any) => c._id === selectedCategoryId)?.name || "-- TẤT CẢ DANH MỤC --"}
                </div>
                <select
                  value={selectedCategoryId}
                  onChange={e => setSelectedCategoryId(e.target.value)}
                  className={`absolute inset-0 w-full h-11 pl-5 pr-10 rounded-xl font-bold text-sm outline-none transition-all appearance-none cursor-pointer border-2
            ${selectedCategoryId ? "bg-orange-50/30 border-orange-500 text-orange-700 shadow-sm" : "bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200"}`}
                >
                  <option value="">-- TẤT CẢ DANH MỤC --</option>
                  {categories.map((c: any) => <option key={c._id} value={c._id}>{c.name.toUpperCase()}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                  <ChevronDown size={18} strokeWidth={3} className={selectedCategoryId ? "text-orange-500" : "text-slate-300"} />
                </div>
              </div>
            </div>

          </div>

          {/* DANH SÁCH HÀNG NHẬP */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-[12px] font-black text-slate-950 uppercase tracking-[0.2em] flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full shadow-sm"></div>
                Danh sách sản phẩm nhập
              </h3>
              <button onClick={addItem} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-indigo-100 active:scale-95">
                <Plus size={16} strokeWidth={3.5} /> Thêm dòng mới
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-end bg-white p-5 rounded-[20px] border-l-8 border-l-indigo-600 border border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-md transition-all">
                  <div className="col-span-4 space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Tag size={12} strokeWidth={3} className="text-indigo-500" /> Sản phẩm
                    </label>
                    <select
                      value={item.productId}
                      onChange={e => updateItem(index, 'productId', e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 text-[14px] outline-none focus:border-indigo-600 focus:bg-white transition-all truncate"
                    >
                      <option value="">-- CHỌN ĐÈN --</option>
                      {allProducts
                        .filter((p: any) => !selectedCategoryId || (p.categoryId?._id || p.categoryId) === selectedCategoryId)
                        .map((p: any) => (
                          <option key={p._id} value={p._id} className="truncate">{p.productName}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-center block">Số lượng</label>
                    <input
                      type="number"
                      value={item.quantity || ""}
                      onChange={e => updateItem(index, 'quantity', e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl font-black text-slate-900 text-center focus:bg-white transition-all"
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Giá nhập</label>
                    <input
                      type="number"
                      value={item.importPrice || ""}
                      onChange={e => updateItem(index, 'importPrice', e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full h-11 px-4 bg-indigo-50/30 border border-indigo-100 rounded-xl font-black text-indigo-700 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div className="col-span-3 space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Giá bán mới</label>
                    <input
                      type="number"
                      value={item.newSalePrice || ""}
                      onChange={e => updateItem(index, 'newSalePrice', e.target.value === "" ? 0 : Number(e.target.value))}
                      placeholder="Giữ giá cũ..."
                      className="w-full h-11 px-4 bg-rose-50/20 border border-rose-100 rounded-xl font-black text-rose-600 placeholder:text-slate-300 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="col-span-1 flex justify-center pb-1">
                    <button onClick={() => removeItem(index)} className="p-2.5 text-rose-500 hover:bg-rose-100 rounded-xl transition-all active:scale-90">
                      <Trash2 size={22} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/80 flex justify-between items-center">
          <div className="flex items-center gap-4 text-slate-900">
            <Calculator size={30} strokeWidth={3} />
            <div>
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">Tổng giá trị phiếu</p>
              <h3 className="text-3xl font-black text-rose-700 tracking-tighter leading-none">
                {totalAmount.toLocaleString('vi-VN')} <span className="text-sm underline">đ</span>
              </h3>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="h-12 px-12 bg-indigo-600 text-white rounded-xl font-black text-[13px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} strokeWidth={3} />}
            Xác nhận nhập kho
          </button>
        </div>
      </div>
    </div>
  );
};